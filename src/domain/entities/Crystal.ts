/**
 * Kristal entity — Pozisyon + renk + dolum durumu.
 * Domain-layer — zero 3rd-party imports.
 */
import { GridCell } from '../value-objects/CoordinateSystem';
import { CrystalColor } from '../value-objects/Color';

export interface Crystal {
    readonly id: string;
    readonly position: GridCell;
    readonly color: CrystalColor;
    readonly isTarget: boolean; // true = hedef kristal, false = sadece yansıtır
    fillLevel: number;          // 0.0 – 1.0 (mutable: ışın değişince güncellenir)
}
