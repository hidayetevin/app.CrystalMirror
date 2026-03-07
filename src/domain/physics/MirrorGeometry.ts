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
 * Bitirici olmayan ayna için engel çubuğu segment döner.
 * Engel: aynanın kristale bakan tarafında, aynaya paralel bir çizgi.
 * isFinisher=true olan aynalarda null döner (engel yok).
 *
 * @param mirror   - Ayna entity
 * @param coords   - Koordinat sistemi
 * @param crystalPixelPos - Kristal merkezi (piksel uzayı)
 * @returns LineSegment veya null
 */
export function getBlockerSegment(
    mirror: Mirror,
    coords: CoordinateSystem,
    crystalPixelPos: Vector2D
): LineSegment | null {
    if (mirror.isFinisher) return null;

    const center = coords.gridToPixel(mirror.position);
    const halfLen = coords.cellSize * 0.45; // Ayna ile aynı boyut

    // Ayna açısı (radyan)
    const rad = (mirror.angleDegrees * Math.PI) / 180;

    // Ayna yüzeyine paralel birim vektör (ayna boyunca)
    const along = new Vector2D(Math.cos(rad), Math.sin(rad));

    // Aynaya dik birim vektör (iki yön: +n ve -n)
    const n1 = new Vector2D(-Math.sin(rad), Math.cos(rad));
    const n2 = new Vector2D(Math.sin(rad), -Math.cos(rad));

    // Kristale bakan taraftaki normal vektörünü seç
    const toTarget = new Vector2D(
        crystalPixelPos.x - center.x,
        crystalPixelPos.y - center.y
    );
    const normal = toTarget.dot(n1) > 0 ? n1 : n2;

    // Engeli aynadan kristal tarafına 4 piksel öteye yerleştir
    const offset = 4;
    const blockerCenter = new Vector2D(
        center.x + normal.x * offset,
        center.y + normal.y * offset
    );

    return {
        start: new Vector2D(
            blockerCenter.x - along.x * halfLen,
            blockerCenter.y - along.y * halfLen
        ),
        end: new Vector2D(
            blockerCenter.x + along.x * halfLen,
            blockerCenter.y + along.y * halfLen
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
