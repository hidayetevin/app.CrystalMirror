import { describe, it, expect } from 'vitest';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

describe('Vector2D', () => {
    it('should initialize correctly', () => {
        const v = new Vector2D(3, 4);
        expect(v.x).toBe(3);
        expect(v.y).toBe(4);
    });

    it('should calculate length correctly', () => {
        const v = new Vector2D(3, 4);
        expect(v.length()).toBe(5);
    });

    it('should normalize vector', () => {
        const v = new Vector2D(3, 4);
        const n = v.normalize();
        expect(n.length()).toBeCloseTo(1);
        expect(n.x).toBeCloseTo(0.6);
        expect(n.y).toBeCloseTo(0.8);
    });

    it('should compute dot product correctly', () => {
        const v1 = new Vector2D(1, 0);
        const v2 = new Vector2D(0, 1);
        expect(v1.dot(v2)).toBe(0); // Dict vectors
    });

    it('should reflect vector across normal', () => {
        // Işın (1, 1) yönünde geliyor (köşegen iner)
        const incident = new Vector2D(1, 1).normalize();
        // Ayna yatay (0 derece), normali yukarı (0, -1) bakar. 
        // Ancak fonksiyonlar -vektori yansıttığı için
        const normal = new Vector2D(0, -1);
        const reflected = incident.reflect(normal);

        // Gelen işın (x=pozitif, y=pozitif), sekince (x=pozitif, y=negatif) olmalı
        expect(reflected.x).toBeCloseTo(incident.x);
        expect(reflected.y).toBeCloseTo(-incident.y);
    });
});
