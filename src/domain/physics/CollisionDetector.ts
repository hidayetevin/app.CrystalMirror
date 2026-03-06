/**
 * Işın-nesne çarpışma tespiti.
 * Domain-layer — zero 3rd-party imports.
 */
import { Vector2D } from '../value-objects/Vector2D';
import { CoordinateSystem } from '../value-objects/CoordinateSystem';
import { Crystal } from '../entities/Crystal';
import { LineSegment } from './MirrorGeometry';

export interface IntersectionResult {
    point: Vector2D;
    t: number;    // Işın parametresi — küçük t = yakın
}

/**
 * Parametrik ışın-segment kesişimi.
 * Işın: P(t) = origin + t * direction  (t > 0)
 * Segment: Q(s) = segStart + s * (segEnd - segStart)  (0 ≤ s ≤ 1)
 */
export function raySegmentIntersection(
    origin: Vector2D,
    direction: Vector2D,
    segment: LineSegment,
    minDist: number = 0.001
): IntersectionResult | null {
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;

    const denom = direction.x * dy - direction.y * dx;
    if (Math.abs(denom) < 1e-10) return null; // Paralelse kesişim yok

    const tx = segment.start.x - origin.x;
    const ty = segment.start.y - origin.y;

    const t = (tx * dy - ty * dx) / denom;
    const s = (tx * direction.y - ty * direction.x) / denom;

    if (t < minDist || s < 0 || s > 1) return null;

    return {
        point: new Vector2D(origin.x + t * direction.x, origin.y + t * direction.y),
        t,
    };
}

/**
 * Işın-kristal kesişimi: kristal merkezi etrafında yarıçap kontrolü.
 * Nokta hedef yerine daire kullanmak gesture toleransı sağlar.
 */
export function rayCrystalIntersection(
    origin: Vector2D,
    direction: Vector2D,
    crystal: Crystal,
    coords: CoordinateSystem
): IntersectionResult | null {
    const center = coords.gridToPixel(crystal.position);
    const radius = coords.cellSize * 0.35; // Hücrenin %70'i kadar çap alanında tolerans

    // Analitik ışın-daire kesişimi
    const oc = new Vector2D(origin.x - center.x, origin.y - center.y);
    const a = direction.dot(direction);
    const b = 2 * oc.dot(direction);
    const c = oc.dot(oc) - radius * radius;
    const disc = b * b - 4 * a * c;

    if (disc < 0) return null;

    const t = (-b - Math.sqrt(disc)) / (2 * a);
    if (t < 0.001) return null;

    return {
        point: new Vector2D(origin.x + t * direction.x, origin.y + t * direction.y),
        t,
    };
}
