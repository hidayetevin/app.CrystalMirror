/**
 * World 3: Waterfall — Bölüm verileri.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_THREE_LEVELS: Puzzle[] = [
    {
        id: 'w3_l1',
        worldId: 'waterfall',
        levelNumber: 1,
        gridSize: { cols: 5, rows: 7 },
        mechanic: 'ROTATE',
        timeLimit: null,
        lightSource: {
            position: { col: 0, row: 1 },
            direction: new Vector2D(1, 0), // Sağa giden ışın
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 3, row: 1 }, angleDegrees: 135, type: 'ROTATE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 3, row: 5 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w3_l2',
        worldId: 'waterfall',
        levelNumber: 2,
        gridSize: { cols: 6, rows: 8 },
        mechanic: 'SLIDE',
        timeLimit: null,
        lightSource: {
            position: { col: 1, row: 1 },
            direction: new Vector2D(1, 0), // Sağa giden ışın
            color: 'YELLOW',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 4, row: 4 }, angleDegrees: 135, type: 'SLIDE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 1, row: 4 }, color: 'YELLOW', isTarget: true, fillLevel: 0 },
        ],
    }
];
