/**
 * Ayna geometrisi yardımcıları — Piksel uzayında çizgi segment hesaplama.
 * Domain-layer — zero 3rd-party imports.
 */
import { Vector2D } from '../value-objects/Vector2D';
import { CoordinateSystem } from '../value-objects/CoordinateSystem';
import { Mirror } from '../entities/Mirror';

export interface LineSegment {
    start: Vector2D;
    end: Vector2D;
}

/**
 * Aynayı piksel uzayında bir çizgi segmentine dönüştürür.
 * Açı 0° = yatay, 90° = dikey, 45° = köşegen (/)
 */
export function getMirrorSegment(
    mirror: Mirror,
    coords: CoordinateSystem
): LineSegment {
    const center = coords.gridToPixel(mirror.position);
    const halfLen = coords.cellSize * 0.45; // Hücrenin %90'ı
    const rad = (mirror.angleDegrees * Math.PI) / 180;

    return {
        start: new Vector2D(
            center.x - Math.cos(rad) * halfLen,
            center.y - Math.sin(rad) * halfLen
        ),
        end: new Vector2D(
            center.x + Math.cos(rad) * halfLen,
            center.y + Math.sin(rad) * halfLen
        ),
    };
}

/**
 * Ayna yüzeyine dik olan birim normal vektörünü döner.
 * Işın hangi taraftan gelirse gelsin doğru yansıma için
 * normalin ışına "bakan" taraf seçilir.
 */
export function getMirrorNormal(
    mirror: Mirror,
    rayDirection: Vector2D
): Vector2D {
    const rad = (mirror.angleDegrees * Math.PI) / 180;
    // Aynaya dik iki olası normal vektör
    const n1 = new Vector2D(-Math.sin(rad), Math.cos(rad));
    const n2 = new Vector2D(Math.sin(rad), -Math.cos(rad));

    // Işın yönüne zıt bakan (dot product < 0) normali dön
    return rayDirection.dot(n1) < 0 ? n1 : n2;
}
