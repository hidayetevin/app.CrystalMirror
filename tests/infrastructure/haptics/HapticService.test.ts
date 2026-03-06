import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HapticService } from '../../../src/infrastructure/haptics/HapticService';
import { Haptics } from '@capacitor/haptics';

// Mock the Haptics native calls
vi.mock('@capacitor/haptics', () => {
    return {
        Haptics: {
            impact: vi.fn().mockResolvedValue(undefined)
        },
        ImpactStyle: {
            Light: 'LIGHT',
            Medium: 'MEDIUM',
            Heavy: 'HEAVY'
        }
    };
});

describe('HapticService', () => {
    let service: HapticService;

    beforeEach(() => {
        service = new HapticService();
        vi.clearAllMocks();
    });

    it('calls Medium impact for CRYSTAL_HIT', async () => {
        await service.trigger('CRYSTAL_HIT');
        expect(Haptics.impact).toHaveBeenCalledWith({ style: 'MEDIUM' });
    });

    it('throttles rapid calls (preventing native crash/spasm)', async () => {
        await service.trigger('MIRROR_SNAP');
        await service.trigger('MIRROR_SNAP'); // Should be throttled (< 100ms)

        // Only called once due to throttling mechanism
        expect(Haptics.impact).toHaveBeenCalledTimes(1);
    });

    it('bypasses triggers when disabled', async () => {
        service.setEnabled(false);
        await service.trigger('LEVEL_COMPLETE');
        expect(Haptics.impact).not.toHaveBeenCalled();
    });
});
