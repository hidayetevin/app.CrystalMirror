import { describe, it, expect } from 'vitest';
import { WinConditionChecker } from '../../../src/domain/rules/WinConditionChecker';
import { Puzzle } from '../../../src/domain/entities/Puzzle';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

describe('WinConditionChecker', () => {
    const checker = new WinConditionChecker();

    const puzzleBase: Puzzle = {
        id: 'test_p', worldId: '1', levelNumber: 1, mechanic: 'ROTATE', timeLimit: null,
        gridSize: { cols: 5, rows: 5 },
        lightSource: { position: { col: 0, row: 0 }, direction: new Vector2D(1, 0), color: 'WHITE', intensity: 1 },
        mirrors: [],
        crystals: [
            { id: 'c_target', color: 'WHITE', isTarget: true, fillLevel: 0, position: { col: 1, row: 1 } },
            { id: 'c_target2', color: 'WHITE', isTarget: true, fillLevel: 0, position: { col: 1, row: 2 } },
            { id: 'c_dummy', color: 'RED', isTarget: false, fillLevel: 0, position: { col: 2, row: 2 } },
        ]
    };

    it('returns false when no targets are filled', () => {
        const fills = new Map<string, number>();
        expect(checker.check(puzzleBase, fills)).toBe(false);
    });

    it('returns false when partially filled', () => {
        const fills = new Map<string, number>();
        fills.set('c_target', 1.0); // sadece biri dolu
        expect(checker.check(puzzleBase, fills)).toBe(false);
    });

    it('returns false if fill level < 1.0 threshold', () => {
        const fills = new Map<string, number>();
        fills.set('c_target', 1.0);
        fills.set('c_target2', 0.99); // eşik alti
        expect(checker.check(puzzleBase, fills)).toBe(false);
    });

    it('returns true when all targets are filled >= 1.0', () => {
        const fills = new Map<string, number>();
        fills.set('c_target', 1.0);
        fills.set('c_target2', 1.0);
        expect(checker.check(puzzleBase, fills)).toBe(true);
    });

    it('ignores non-target crystals', () => {
        const fills = new Map<string, number>();
        fills.set('c_target', 1.0);
        fills.set('c_target2', 1.0);
        // c_dummy bos ama onemi yok true donmeli
        expect(checker.check(puzzleBase, fills)).toBe(true);
    });
});
