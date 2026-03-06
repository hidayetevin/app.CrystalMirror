import { describe, it, expect } from 'vitest';
import { raySegmentIntersection, rayCrystalIntersection } from '../../../src/domain/physics/CollisionDetector';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';
import { CoordinateSystem } from '../../../src/domain/value-objects/CoordinateSystem';
import { Crystal } from '../../../src/domain/entities/Crystal';
import { LineSegment } from '../../../src/domain/physics/MirrorGeometry';

describe('CollisionDetector', () => {

    it('raySegmentIntersection finds correct intercept', () => {
        // 0 derece bir ayna (yatay), y=50 hizasında
        const segment: LineSegment = { start: new Vector2D(0, 50), end: new Vector2D(100, 50) };

        // Işın yukarıdan aşağı doğru x=50 den (0,0 dan)
        const origin = new Vector2D(50, 0);
        const direction = new Vector2D(0, 1).normalize();

        const intersection = raySegmentIntersection(origin, direction, segment);

        expect(intersection).not.toBeNull();
        if (intersection) { // TypeScript narrowing
            expect(intersection.point.y).toBeCloseTo(50);
            expect(intersection.t).toBeCloseTo(50); // origin to point is 50px
        }
    });

    it('raySegmentIntersection fails for parallel line', () => {
        // Iki cizgi yuzeyleri paralel 
        const segment: LineSegment = { start: new Vector2D(0, 50), end: new Vector2D(100, 50) };
        const origin = new Vector2D(-10, 50);
        const direction = new Vector2D(1, 0); // Yatay ışın

        const intersection = raySegmentIntersection(origin, direction, segment);
        expect(intersection).toBeNull();
    });

    it('raySegmentIntersection prevents self hit within minDist', () => {
        const segment: LineSegment = { start: new Vector2D(0, 50), end: new Vector2D(100, 50) };
        const origin = new Vector2D(50, 50); // origin is precisely on the line
        const direction = new Vector2D(0, 1);

        // Ayni koordinatlardayken minimum distance kurali onu gormezden gelmeli 
        // (Bounces esnasinda olan bir durum)
        const intersection = raySegmentIntersection(origin, direction, segment, 0.001);
        expect(intersection).toBeNull();
    });

    it('rayCrystalIntersection finds hit within radius limit', () => {
        const coords = new CoordinateSystem(500, 500, 5, 5);
        const crystal: Crystal = {
            id: 'c1', color: 'WHITE', fillLevel: 0, isTarget: true, position: { col: 1, row: 1 }
        };

        // Crystal center lies at -> gridToPixel(1,1) -> 100*1 + 50 = (150, 150) (offset + half cell)
        // Radius = 100 * 0.35 = 35.

        // Işın (150, 0) koordinatindan yukaridan asagi gonderiliyor
        const origin = new Vector2D(150, 0);
        const direction = new Vector2D(0, 1);

        const hit = rayCrystalIntersection(origin, direction, crystal, coords);
        expect(hit).not.toBeNull();

        if (hit) {
            expect(hit.point.y).toBeCloseTo(150 - 35); // It should hit the top edge of circle
        }
    });

});
