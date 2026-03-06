// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRaycastLoop } from '../../../src/presentation/hooks/useRaycastLoop';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

// Mock store module
vi.mock('../../../src/presentation/store', () => {
    return {
        usePuzzleStore: vi.fn((selector) => {
            // Mock the returned values based on simple rules
            const mockStore = {
                activePuzzle: {
                    id: 'p1', gridSize: { cols: 5, rows: 5 }, mirrors: [], crystals: [],
                    lightSource: { position: { col: 0, row: 2 }, direction: new Vector2D(1, 0), color: 'WHITE' }
                },
                status: 'PLAYING',
                committedAngles: { 'm1': 45 }
            };
            return selector(mockStore);
        })
    };
});

describe('useRaycastLoop', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('updates ephemeral angles without triggering store updates', () => {
        const isDirtyRef = { current: false };
        const onDrawUpdate = vi.fn();
        const onWin = vi.fn();
        const onSnapChange = vi.fn();

        const { result } = renderHook(() => useRaycastLoop({
            isDirtyRef,
            onDrawUpdate,
            onWin,
            onSnapChange
        }));

        // Set yeni angle -> Ref i update eder, react reconciler a girmez
        act(() => {
            result.current.setEphemeralAngle('m1', 90);
        });

        expect(result.current.ephemeralAngles['m1']).toBe(90);
        expect(isDirtyRef.current).toBe(true);
    });

    it('starts requestAnimationFrame loop and respects isDirty flag', () => {
        const isDirtyRef = { current: true };
        const onDrawUpdate = vi.fn();
        const onWin = vi.fn();
        const onSnapChange = vi.fn();

        renderHook(() => useRaycastLoop({
            isDirtyRef,
            onDrawUpdate,
            onWin,
            onSnapChange
        }));

        // isDirty = true iken ilk dongude drawUpdate cagrilir
        act(() => {
            vi.runOnlyPendingTimers();
        });

        expect(onDrawUpdate).toHaveBeenCalled();
        expect(isDirtyRef.current).toBe(false); // Bayrak dusers

        // Dirty degilken trace uretmez
        onDrawUpdate.mockClear();
        act(() => {
            vi.runOnlyPendingTimers();
        });

        expect(onDrawUpdate).not.toHaveBeenCalled();
    });
});
