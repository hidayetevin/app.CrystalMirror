/**
 * Işın renk tipleri ve kristal renk tipleri.
 * Renk sistemi gerçek ışık fiziği değil, oyun kuralı olarak tanımlanır.
 * Domain-layer — zero 3rd-party imports.
 */
import { Vector2D } from './Vector2D';

export type RayColor = 'WHITE' | 'RED' | 'BLUE' | 'YELLOW';
export type CrystalColor = 'WHITE' | 'RED' | 'BLUE' | 'YELLOW' | 'PRISM';

/**
 * Renk Geçirgenlik Kuralları:
 * - WHITE kristal: her renk ışını geçirir
 * - PRISM kristal: her renk ışını geçirir (bölme ayrıca işlenir)
 * - WHITE ışın: renkli filtreden geçemez
 * - Diğer: rayColor === crystalColor eşleşmesi gerekir
 */
export function colorPassesFilter(
    rayColor: RayColor,
    crystalColor: CrystalColor
): boolean {
    if (crystalColor === 'WHITE') return true;
    if (crystalColor === 'PRISM') return true;
    if (rayColor === 'WHITE') return false;
    return rayColor === crystalColor;
}

/**
 * Prizma bölme kuralları:
 * - Sadece WHITE ışın bölünür
 * - WHITE → RED (0°), BLUE (+15°), YELLOW (-15°)
 * - Renkli ışın değişmez
 */
export function splitByPrism(
    direction: Vector2D,
    color: RayColor
): Array<{ direction: Vector2D; color: RayColor }> {
    if (color !== 'WHITE') {
        return [{ direction, color }];
    }
    return [
        { direction: rotateVector(direction, 0), color: 'RED' },
        { direction: rotateVector(direction, 15), color: 'BLUE' },
        { direction: rotateVector(direction, -15), color: 'YELLOW' },
    ];
}

/** Vektörü belirtilen derece kadar döndürür */
export function rotateVector(
    v: Vector2D,
    degrees: number
): Vector2D {
    const rad = (degrees * Math.PI) / 180;
    return new Vector2D(
        v.x * Math.cos(rad) - v.y * Math.sin(rad),
        v.x * Math.sin(rad) + v.y * Math.cos(rad)
    );
}
