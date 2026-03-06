/**
 * Işın entity — Başlangıç noktası + yön vektörü.
 * Domain-layer — zero 3rd-party imports.
 */
import { Vector2D } from '../value-objects/Vector2D';
import { RayColor } from '../value-objects/Color';

export interface Ray {
    readonly origin: Vector2D;
    readonly direction: Vector2D; // Normalize edilmiş birim vektör
    readonly color: RayColor;
}
