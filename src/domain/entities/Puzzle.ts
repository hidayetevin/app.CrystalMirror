/**
 * Bulmaca (Puzzle) entity — Tüm oyun nesnelerinin koleksiyonu.
 * Domain-layer — zero 3rd-party imports.
 */
import { Mirror } from './Mirror';
import { Crystal } from './Crystal';
import { LightSource } from './LightSource';

export type PuzzleMechanic = 'ROTATE' | 'SLIDE' | 'BOTH';

export interface Puzzle {
    readonly id: string;
    readonly worldId: string;
    readonly levelNumber: number;
    readonly gridSize: { cols: number; rows: number };
    readonly lightSource: LightSource;
    mirrors: Mirror[];           // Immutable pattern: her güncellemede spread ile yeni dizi
    crystals: Crystal[];         // Immutable pattern: aynı
    readonly mechanic: PuzzleMechanic;
    readonly timeLimit: number | null; // null = sınırsız süre
}
