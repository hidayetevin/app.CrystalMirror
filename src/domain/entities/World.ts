/**
 * Dünya entity — Bölüm listesi + tema.
 * Domain-layer — zero 3rd-party imports.
 */
import { Puzzle } from './Puzzle';

export type WorldId = 'forest' | 'glacier' | 'waterfall';

export interface World {
    readonly id: WorldId;
    readonly name: string;        // i18n key veya default isim
    readonly levelRange: { from: number; to: number };
    readonly unlockAfterLevelId: string | null; // null = her zaman açık
    puzzles: Puzzle[];
}
