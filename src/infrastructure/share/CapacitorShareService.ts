/**
 * native paylama (iOS share sheet / Android intent).
 */
import { Share } from '@capacitor/share';
import { IShareService, ShareOptions } from '../../domain/ports/IShareService';
import { i18n } from '../i18n/i18n.config';

export class CapacitorShareService implements IShareService {
    async share(options: ShareOptions): Promise<void> {
        try {
            await Share.share({
                title: options.title,
                text: options.text,
                dialogTitle: i18n.t('share.dialog_title')
            });
        } catch (e) {
            console.warn('Share is not supported or was cancelled', e);
            if (this.isWeb()) {
                try {
                    await navigator.clipboard.writeText(`${options.title}\n\n${options.text}`);
                    alert(i18n.t('share.copied'));
                } catch (e) { }
            }
        }
    }

    async canShare(): Promise<boolean> {
        if (this.isWeb()) return true; // Web'de clipboard desteği üzerinden çalışabilir

        try {
            const result = await Share.canShare();
            return result.value;
        } catch {
            return false;
        }
    }

    private isWeb(): boolean {
        return typeof navigator !== 'undefined';
    }
}
