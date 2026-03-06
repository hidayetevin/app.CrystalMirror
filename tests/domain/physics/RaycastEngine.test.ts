import { describe, it, expect } from 'vitest';
import { RaycastEngine } from '../../../src/domain/physics/RaycastEngine';
import { CoordinateSystem } from '../../../src/domain/value-objects/CoordinateSystem';
import { Puzzle, PuzzleMechanic } from '../../../src/domain/entities/Puzzle';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

const createFakePuzzle = (): Puzzle => ({
    id: 'test_puzzle',
    worldId: 'forest',
    levelNumber: 1,
    mechanic: 'ROTATE' as PuzzleMechanic,
    timeLimit: null,
    gridSize: { cols: 5, rows: 5 },
    lightSource: {
        position: { col: 0, row: 2 },
        direction: new Vector2D(1, 0), // Sağa giden şın
        color: 'WHITE',
        intensity: 1.0
    },
    mirrors: [],
    crystals: []
});

describe('RaycastEngine', () => {
    const coords = new CoordinateSystem(500, 500, 5, 5);
    const engine = new RaycastEngine();

    it('bounces ray off a 45 degree mirror at 90 degree angle', () => {
        const puzzle = createFakePuzzle();
        // 45 derece yatık ayna, sağa giden isin ustunden asagi (y=positive) dönmeli (-90 degrees logic)
        // Ya da duruma gore yukari donmeli.
        puzzle.mirrors.push({
            id: 'm1', type: 'ROTATE', isMovable: true, angleDegrees: 45,
            position: { col: 2, row: 2 }
        });

        const result = engine.trace(puzzle, coords);

        expect(result.segments.length).toBeGreaterThan(1); // origin->mirror, mirror->bounds

        // Son segmentin yoenue
        const lastSeg = result.segments[result.segments.length - 1];
        const dir = new Vector2D(lastSeg.end.x - lastSeg.start.x, lastSeg.end.y - lastSeg.start.y).normalize();

        // Y ekseninde (asagi veya yukari) gitmeli, x ekseni sifir olmali.
        expect(dir.x).toBeCloseTo(0, 1);
    });

    it('does not fill crystal if color mismatches', () => {
        let puzzle = createFakePuzzle();
        puzzle = { ...puzzle, lightSource: { ...puzzle.lightSource, color: 'RED' } };

        // Kırmızı isik Mavi kristale carpacak
        puzzle.crystals.push({
            id: 'c1', color: 'BLUE', isTarget: true, fillLevel: 0,
            position: { col: 3, row: 2 } // Ayni hizada
        });

        const result = engine.trace(puzzle, coords);
        const fill = result.crystalFills.get('c1');

        // Beklenen: Carpismayi dedekte eder ama filter yuzunden "fill" yapmaz 
        // (Yada target olsa bile false olurdu)
        expect(fill).toBeUndefined(); // Map e eklenmemisti filter check i fail olunca
    });

    it('fills crystal successfully if colors match', () => {
        const puzzle = createFakePuzzle();
        // Beyaz ışık
        puzzle.crystals.push({
            id: 'c1', color: 'WHITE', isTarget: true, fillLevel: 0,
            position: { col: 3, row: 2 }
        });

        const result = engine.trace(puzzle, coords);
        const fill = result.crystalFills.get('c1');

        expect(fill).toBe(1.0);
    });

});
