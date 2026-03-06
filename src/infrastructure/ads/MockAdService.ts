/**
 * Web/Dev ortamı için reklam mock servisi.
 */
import { IAdService, RewardResult } from '../../domain/ports/IAdService';

export class MockAdService implements IAdService {
    async initialize(): Promise<void> {
        console.log('[MockAdService] Initialized');
    }

    async showBanner(): Promise<void> {
        console.log('[MockAdService] Banner Shown');
    }

    async hideBanner(): Promise<void> {
        console.log('[MockAdService] Banner Hidden');
    }

    async showInterstitial(): Promise<void> {
        console.log('[MockAdService] Interstitial loading...');
        return new Promise(resolve => setTimeout(() => {
            console.log('[MockAdService] Interstitial shown.');
            resolve();
        }, 800));
    }

    async showRewarded(): Promise<RewardResult> {
        console.log('[MockAdService] Rewarded video loading...');
        return new Promise(resolve => setTimeout(() => {
            console.log('[MockAdService] Rewarded video finished. Reward granted.');
            resolve({ earned: true, amount: 1, type: 'hint' });
        }, 1200));
    }
}
