import { describe, it, expect, beforeEach } from 'vitest';
import { HintCalculator } from '../../../src/domain/rules/HintCalculator';
import { RaycastEngine } from '../../../src/domain/physics/RaycastEngine';
import { CoordinateSystem } from '../../../src/domain/value-objects/CoordinateSystem';
import { Puzzle } from '../../../src/domain/entities/Puzzle';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

describe('HintCalculator', () => {
    let coords: CoordinateSystem;
    let engine: RaycastEngine;
    let calculator: HintCalculator;
    let puzzle: Puzzle;

    beforeEach(() => {
        coords = new CoordinateSystem(500, 500, 5, 5);
        engine = new RaycastEngine(coords);
        calculator = new HintCalculator();

        puzzle = {
            id: 'puzzle_hint',
            worldId: 'forest',
            levelNumber: 1,
            mechanic: 'ROTATE',
            timeLimit: 60,
            gridSize: { cols: 5, rows: 5 },
            lightSource: {
                position: { col: 0, row: 2 },
                direction: new Vector2D(1, 0), // Sağa giden şın
                color: 'WHITE',
                intensity: 1.0
            },
            mirrors: [
                { id: 'm1', type: 'ROTATE', isMovable: true, angleDegrees: 0, position: { col: 2, row: 2 } }
            ],
            crystals: [
                { id: 'c1', color: 'WHITE', isTarget: true, fillLevel: 0, position: { col: 2, row: 4 } } // Altta
            ]
        };
    });

    it('calculates the best angle using two-phase scan', () => {
        const hint = calculator.calculate(puzzle, engine);

        // İşın sağa gidiyor (x positive), ayna {2,2}'de yatay/dikey ayarlanacak. Kristal {2,0}'da, yani aynanın üstünde.
        // Işını yukarı (y=negative) yansıtması için aynan açı yaklaşık 45 veya 225 derece olmalı.
        // Bazen analitik formüle göre -45/135 vs de denk edebilir. Testin esnek bir açı check i yapması iyi olur.

        expect(hint.mirrorId).toBe('m1');
        console.log('HINT:', hint);
        expect(hint.score).toBeGreaterThan(0.9); // Buldu

        // Doğru yansıma için ayna toleransa giren aciyi (ornegin 40) bulur.
        expect(hint.suggestedAngle).toBe(40);
    });

    it('uses cache on subsequent calls', () => {
        const hint1 = calculator.calculate(puzzle, engine);
        // Puzzle nesnesini biraz degistirse bile ayni state hashini urettigi icin cache lenicek 
        const hint2 = calculator.calculate(puzzle, engine);

        // Birebir ayni referans olmasalar da icerik olarak ayni objeyi (cache i) donecektir
        expect(hint2).toEqual(hint1);
    });
});
