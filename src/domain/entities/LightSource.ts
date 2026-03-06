/**
 * Işık kaynağı entity — Pozisyon + yön + renk + güç.
 * Domain-layer — zero 3rd-party imports.
 */
import { GridCell } from '../value-objects/CoordinateSystem';
import { Vector2D } from '../value-objects/Vector2D';
import { RayColor } from '../value-objects/Color';

export interface LightSource {
    readonly position: GridCell;
    readonly direction: Vector2D; // Normalize edilmiş yön vektörü
    readonly color: RayColor;
    readonly intensity: number;   // 0.0 – 1.0, varsayılan 1.0
}
