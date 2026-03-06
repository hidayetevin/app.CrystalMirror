/**
 * Ayna entity — Pozisyon + açı + tip (döner/kayar).
 * Domain-layer — zero 3rd-party imports.
 */
import { GridCell } from '../value-objects/CoordinateSystem';

export type MirrorType = 'ROTATE' | 'SLIDE';

export interface Mirror {
    readonly id: string;
    position: GridCell;       // Izgara koordinatı (mutable: kaydırılabilir)
    angleDegrees: number;     // 0-360 (mutable: döndürülebilir)
    readonly type: MirrorType;
    readonly isMovable: boolean;
}
