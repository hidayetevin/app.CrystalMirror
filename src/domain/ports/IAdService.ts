/**
 * Reklam servisi port arayüzü.
 * Domain-layer — zero 3rd-party imports.
 */
export interface RewardResult {
    earned: boolean;
    amount: number;
    type: string;
}

export interface IAdService {
    initialize(): Promise<void>;
    showBanner(): Promise<void>;
    hideBanner(): Promise<void>;
    showInterstitial(): Promise<void>;
    showRewarded(): Promise<RewardResult>;
}
