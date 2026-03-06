import { describe, it, expect } from 'vitest';
import { ChromaticAberration } from '../../../../src/presentation/components/canvas/ChromaticAberration';
import { RaySegment } from '../../../../src/domain/physics/RaycastEngine';
import { Vector2D } from '../../../../src/domain/value-objects/Vector2D';

describe('ChromaticAberration', () => {
    it('generates red and blue channel offset lines correctly', () => {
        const segment: RaySegment = {
            start: new Vector2D(0, 0),
            end: new Vector2D(100, 0), // Sağa doğru düz bir çizgi
            color: 'WHITE',
            hitObjectId: null
        };

        const result = ChromaticAberration.buildAberrationLines(segment, { offset: 2, opacity: 0.5, onlyAfterBounce: true });

        expect(result).toHaveLength(2);

        const redLine = result.find(c => c.color === '#FF0000');
        const blueLine = result.find(c => c.color === '#00FFFF');

        expect(redLine).toBeDefined();
        expect(blueLine).toBeDefined();

        // Çizgi yatay (y=0). Normal vektörü dikey (+1 veya -1).
        // Kırmızı çizginin x koordinatları (1., 3. eleman) aynı, y koordinatları offset almış olmalı.
        expect(redLine?.points[0]).toBeCloseTo(0);
        expect(Math.abs(redLine?.points[1] as number)).toBeCloseTo(2); // Y ekseninde offset 2 piksel shift etti
    });
});
