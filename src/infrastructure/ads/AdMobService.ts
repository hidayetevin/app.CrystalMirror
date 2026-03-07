/**
 * AdMob entegrasyonu (Capacitor plugin ile).
 */
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdPluginEvents } from '@capacitor-community/admob';
import { IAdService, RewardResult } from '../../domain/ports/IAdService';

export class AdMobService implements IAdService {
    private isInitialized = false;

    async initialize(): Promise<void> {
        if (this.isInitialized) return;
        try {
            await AdMob.initialize({});
            this.isInitialized = true;
        } catch (e) {
            console.error('AdMob init failed', e);
        }
    }

    async showBanner(): Promise<void> {
        await this.initialize();
        const options: BannerAdOptions = {
            adId: import.meta.env.VITE_ADMOB_BANNER_ID || 'ca-app-pub-3940256099942544/6300978111',
            adSize: BannerAdSize.ADAPTIVE_BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: true // Canlı yayında false olmalı
        };

        try {
            await AdMob.showBanner(options);
        } catch (e) {
            console.error('AdMob banner failed', e);
        }
    }

    async hideBanner(): Promise<void> {
        if (!this.isInitialized) return;
        try {
            await AdMob.hideBanner();
            // Remove da yapılabilir ancak hide daha pürüzsüz geçiş sunar
        } catch (e) {
            console.warn('AdMob hide banner failed', e);
        }
    }

    async showInterstitial(): Promise<void> {
        await this.initialize();
        const adId = import.meta.env.VITE_ADMOB_INTERSTITIAL_ID || 'ca-app-pub-3940256099942544/1033173712';
        try {
            await AdMob.prepareInterstitial({ adId, isTesting: true });
            await AdMob.showInterstitial();
        } catch (e) {
            console.error('AdMob interstitial error', e);
        }
    }

    async showRewarded(): Promise<RewardResult> {
        await this.initialize();
        const adId = import.meta.env.VITE_ADMOB_REWARDED_ID || 'ca-app-pub-3940256099942544/5224354917';

        return new Promise(async (resolve) => {
            try {
                await AdMob.prepareRewardVideoAd({ adId, isTesting: true });

                const onRewarded = await AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem) => {
                    resolve({ earned: true, amount: rewardItem.amount, type: rewardItem.type });
                });

                const onClosed = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
                    cleanup();
                });

                const onFailed = await AdMob.addListener(RewardAdPluginEvents.FailedToLoad, () => {
                    cleanup();
                    resolve({ earned: false, amount: 0, type: '' });
                });

                const cleanup = () => {
                    onRewarded.remove();
                    onClosed.remove();
                    onFailed.remove();
                };

                await AdMob.showRewardVideoAd();
            } catch (e) {
                console.error('AdMob rewarded error', e);
                resolve({ earned: false, amount: 0, type: '' });
            }
        });
    }
}
