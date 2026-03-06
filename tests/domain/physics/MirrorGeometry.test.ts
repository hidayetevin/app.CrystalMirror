import { describe, it, expect } from 'vitest';
import { getMirrorSegment, getMirrorNormal } from '../../../src/domain/physics/MirrorGeometry';
import { CoordinateSystem } from '../../../src/domain/value-objects/CoordinateSystem';
import { Mirror } from '../../../src/domain/entities/Mirror';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

describe('MirrorGeometry', () => {
    const coords = new CoordinateSystem(500, 500, 5, 5); // Hücre boyu 100

    it('getMirrorSegment is horizontal when 0 degree', () => {
        const mirror: Mirror = { id: 'm1', position: { col: 1, row: 1 }, angleDegrees: 0, type: 'ROTATE', isMovable: true };
        const segment = getMirrorSegment(mirror, coords);

        // Y ekseni aynı kalmalı
        expect(segment.start.y).toBeCloseTo(segment.end.y);
        // Uzunluk hücrenin %90'ı olmalı
        const dx = segment.end.x - segment.start.x;
        const expectedLength = 100 * 0.90;
        expect(Math.abs(dx)).toBeCloseTo(expectedLength);
    });

    it('getMirrorSegment is vertical when 90 degree', () => {
        const mirror: Mirror = { id: 'm1', position: { col: 1, row: 1 }, angleDegrees: 90, type: 'ROTATE', isMovable: true };
        const segment = getMirrorSegment(mirror, coords);

        // X ekseni ayni kalmali
        expect(segment.start.x).toBeCloseTo(segment.end.x);
    });

    it('getMirrorNormal chooses normal looking opposite to ray direction', () => {
        const mirror: Mirror = { id: 'm1', position: { col: 1, row: 1 }, angleDegrees: 0, type: 'ROTATE', isMovable: true };
        const rayDir = new Vector2D(0, 1); // Yukarıdan Aşağıya doğru inen ışın

        const normal = getMirrorNormal(mirror, rayDir);
        // Normal, ışına ZIT yönlü, yani YUKARI doğru (y=-1) olmalı
        expect(normal.y).toBeLessThan(0);
    });
});
