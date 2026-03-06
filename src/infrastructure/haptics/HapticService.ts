/**
 * Native titreşim (haptics) entegrasyonu.
 */
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type HapticEvent =
    | 'CRYSTAL_HIT'
    | 'MIRROR_SNAP'
    | 'SNAP_NUDGE'
    | 'SNAP_LOCK'
    | 'LEVEL_COMPLETE'
    | 'INVALID_MOVE';

export interface IHapticService {
    trigger(event: HapticEvent): Promise<void>;
    setEnabled(enabled: boolean): void;
}

export class HapticService implements IHapticService {
    private enabled = true;
    private lastTrigger = new Map<HapticEvent, number>();
    private readonly THROTTLE_MS = 100;

    async trigger(event: HapticEvent): Promise<void> {
        if (!this.enabled) return;

        // Throttle guard
        const now = Date.now();
        const last = this.lastTrigger.get(event) ?? 0;
        if (now - last < this.THROTTLE_MS) return;
        this.lastTrigger.set(event, now);

        try {
            await this.dispatch(event);
        } catch {
            this.webFallback(event);
        }
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    private async dispatch(event: HapticEvent): Promise<void> {
        switch (event) {
            case 'CRYSTAL_HIT':
                await Haptics.impact({ style: ImpactStyle.Medium });
                break;
            case 'MIRROR_SNAP':
            case 'SNAP_NUDGE':
                await Haptics.impact({ style: ImpactStyle.Light });
                break;
            case 'SNAP_LOCK':
                await Haptics.impact({ style: ImpactStyle.Medium });
                break;
            case 'LEVEL_COMPLETE':
                await Haptics.impact({ style: ImpactStyle.Heavy });
                await new Promise(r => setTimeout(r, 120));
                await Haptics.impact({ style: ImpactStyle.Medium });
                break;
            case 'INVALID_MOVE':
                await Haptics.impact({ style: ImpactStyle.Light });
                await new Promise(r => setTimeout(r, 80));
                await Haptics.impact({ style: ImpactStyle.Light });
                break;
        }
    }

    private webFallback(event: HapticEvent): void {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            const patterns: Record<HapticEvent, number | number[]> = {
                CRYSTAL_HIT: 40,
                MIRROR_SNAP: 20,
                SNAP_NUDGE: 15,
                SNAP_LOCK: 35,
                LEVEL_COMPLETE: [50, 100, 80],
                INVALID_MOVE: [20, 60, 20],
            };
            navigator.vibrate(patterns[event]);
        }
    }
}
