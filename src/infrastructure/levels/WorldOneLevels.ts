/**
 * World 1: Forest — Bölüm verileri (İlk 5 bölüm).
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_ONE_LEVELS: Puzzle[] = [
    {
        id: 'w1_l1',
        worldId: 'forest',
        levelNumber: 1,
        gridSize: { cols: 5, rows: 7 },
        mechanic: 'ROTATE',
        timeLimit: null,
        lightSource: {
            position: { col: 0, row: 3 },
            direction: new Vector2D(1, 0), // Sağa doğru ışın
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 2, row: 3 }, angleDegrees: 45, type: 'ROTATE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 2, row: 0 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w1_l2',
        worldId: 'forest',
        levelNumber: 2,
        gridSize: { cols: 5, rows: 7 },
        mechanic: 'ROTATE',
        timeLimit: null,
        lightSource: {
            position: { col: 0, row: 1 },
            direction: new Vector2D(1, 0),
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 3, row: 1 }, angleDegrees: 135, type: 'ROTATE', isMovable: true },
        ],
        crystals: [
            // Sadece yansıtıcı blok niyetine beyaz kristal (engel değil, target değil)
            { id: 'c_reflect', position: { col: 3, row: 5 }, color: 'WHITE', isTarget: false, fillLevel: 0 },
            // Ana hedef
            { id: 'c_target', position: { col: 1, row: 5 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w1_l3',
        worldId: 'forest',
        levelNumber: 3,
        gridSize: { cols: 6, rows: 8 },
        mechanic: 'ROTATE',
        timeLimit: null,
        lightSource: {
            position: { col: 1, row: 7 },
            direction: new Vector2D(0, -1), // Yukarı giden ışın
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 1, row: 2 }, angleDegrees: 45, type: 'ROTATE', isMovable: true },
            { id: 'm_2', position: { col: 4, row: 2 }, angleDegrees: 135, type: 'ROTATE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 4, row: 6 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w1_l4',
        worldId: 'forest',
        levelNumber: 4,
        gridSize: { cols: 6, rows: 8 },
        mechanic: 'SLIDE',
        timeLimit: null,
        lightSource: {
            position: { col: 0, row: 4 },
            direction: new Vector2D(1, 0),
            color: 'WHITE',
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_1', position: { col: 2, row: 2 }, angleDegrees: 45, type: 'SLIDE', isMovable: true },
        ],
        crystals: [
            { id: 'c_1', position: { col: 3, row: 4 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    },
    {
        id: 'w1_l5',
        worldId: 'forest',
        levelNumber: 5,
        gridSize: { cols: 7, rows: 9 },
        mechanic: 'BOTH',
        timeLimit: null,
        lightSource: {
            position: { col: 1, row: 1 },
            direction: new Vector2D(1, 0),
            color: 'WHITE', // Beyaz ışık
            intensity: 1.0
        },
        mirrors: [
            { id: 'm_rotate', position: { col: 5, row: 1 }, angleDegrees: 0, type: 'ROTATE', isMovable: true },
            { id: 'm_slide', position: { col: 5, row: 5 }, angleDegrees: 135, type: 'SLIDE', isMovable: true },
        ],
        crystals: [
            // Prompt 4 test amaçlı kırmızı istemişti ancak ışık beyaz olduğu için ve
            // prizma bulunmadığı için bölüm bitirilemiyordu. Çözülebilir olması için WHITE yapıldı.
            { id: 'c_target_5', position: { col: 1, row: 5 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
        ],
    }
];
