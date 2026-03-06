/**
 * World 2: Glacier — Bölüm verileri.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_TWO_LEVELS: Puzzle[] = [
    {
        id: 'w2_l1',
        worldId: 'glacier',
        levelNumber: 1,
        gridSize: { cols: 6, rows: 8 },
        mechanic: 'ROTATE',
        timeLimit: null,
        lightSource: {
            position: { col: 1, row: 6 },
            direction: new Vector2D(0, -1), // Yukarı giden ışın
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 1, row: 2 }, angleDegrees: 45, type: 'ROTATE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 4, row: 2 }, color: 'BLUE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w2_l2',
        worldId: 'glacier',
        levelNumber: 2,
        gridSize: { cols: 6, rows: 8 },
        mechanic: 'SLIDE',
        timeLimit: null,
        lightSource: {
            position: { col: 1, row: 1 },
            direction: new Vector2D(1, 0), // Sağa giden ışın
            color: 'BLUE', // Mavi ışık
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 4, row: 4 }, angleDegrees: 135, type: 'SLIDE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 1, row: 4 }, color: 'BLUE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w2_l3',
        worldId: 'glacier',
        levelNumber: 3,
        gridSize: { cols: 7, rows: 9 },
        mechanic: 'BOTH',
        timeLimit: null,
        lightSource: {
            position: { col: 3, row: 7 },
            direction: new Vector2D(0, -1),
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_rotate', position: { col: 3, row: 4 }, angleDegrees: 0, type: 'ROTATE', isMovable: true },
            { id: 'm_slide', position: { col: 5, row: 4 }, angleDegrees: 135, type: 'SLIDE', isMovable: true },
        ],
        crystals: [
            { id: 'c_target', position: { col: 5, row: 2 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    }
];
