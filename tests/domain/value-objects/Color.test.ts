import { describe, it, expect } from 'vitest';
import { colorPassesFilter, splitByPrism } from '../../../src/domain/value-objects/Color';
import { Vector2D } from '../../../src/domain/value-objects/Vector2D';

describe('Color Logic', () => {

    describe('colorPassesFilter', () => {
        it('WHITE light passes WHITE crystal', () => {
            expect(colorPassesFilter('WHITE', 'WHITE')).toBe(true);
        });

        it('WHITE light blocked by RED crystal', () => {
            expect(colorPassesFilter('WHITE', 'RED')).toBe(false);
        });

        it('RED light passes RED crystal', () => {
            expect(colorPassesFilter('RED', 'RED')).toBe(true);
        });

        it('RED light blocked by BLUE crystal', () => {
            expect(colorPassesFilter('RED', 'BLUE')).toBe(false);
        });

        it('Any light passes PRISM crystal', () => {
            expect(colorPassesFilter('RED', 'PRISM')).toBe(true);
            expect(colorPassesFilter('WHITE', 'PRISM')).toBe(true);
        });
    });

    describe('splitByPrism', () => {
        it('Splits WHITE ray into 3 separate colored rays', () => {
            const dir = new Vector2D(1, 0); // Sağa giden ışın
            const result = splitByPrism(dir, 'WHITE');

            expect(result).toHaveLength(3);
            // İlk renk RED, açısı değişmez
            expect(result[0].color).toBe('RED');
            expect(result[0].direction.y).toBeCloseTo(0);

            // İkinci renk BLUE
            expect(result[1].color).toBe('BLUE');
            expect(result[1].direction.y).not.toBe(0); // 15 derece sapmış

            // Üçüncü renk YELLOW
            expect(result[2].color).toBe('YELLOW');
            expect(result[2].direction.y).not.toBe(0); // -15 derece sapmış
        });

        it('Returns exactly the same ray for non-white color', () => {
            const dir = new Vector2D(1, 0);
            const result = splitByPrism(dir, 'RED');

            expect(result).toHaveLength(1);
            expect(result[0].color).toBe('RED');
            expect(result[0].direction.x).toBe(1);
        });
    });

});
