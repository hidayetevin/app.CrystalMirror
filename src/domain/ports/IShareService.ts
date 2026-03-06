/**
 * Sosyal paylaşım port arayüzü.
 * Domain-layer — zero 3rd-party imports.
 */
export interface ShareOptions {
    title: string;
    text: string;
}

export interface IShareService {
    share(options: ShareOptions): Promise<void>;
    canShare(): Promise<boolean>;
}
