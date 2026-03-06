import { describe, it, expect } from 'vitest';
import { CoordinateSystem } from '../../../src/domain/value-objects/CoordinateSystem';

describe('CoordinateSystem', () => {
    const coords = new CoordinateSystem(250, 290, 5, 5); // 50px cell size

    it('should return properties correctly', () => {
        expect(coords.cols).toBe(5);
        expect(coords.rows).toBe(5);
        expect(coords.cellSize).toBe(50);
        expect(coords.offsetX).toBe(0);
        expect(coords.offsetY).toBe(20);
    });

    it('gridToPixel -> pixelToGrid round-trip should return same cell', () => {
        const originalCell = { col: 2, row: 3 };
        const pixel = coords.gridToPixel(originalCell);
        const backCell = coords.pixelToGrid(pixel);
        expect(backCell.col).toBe(originalCell.col);
        expect(backCell.row).toBe(originalCell.row);
    });

    it('should calculate static fromWindow factory correctly', () => {
        const cols = 5;
        const rows = 10;
        const winWidth = 400;
        const winHeight = 800;
        // cell size is min(400/5, 800/10) = min(80, 80) = 80
        const windowCoords = new CoordinateSystem(winWidth, winHeight, cols, rows);
        expect(windowCoords.cellSize).toBe(80);
        // Offset should be zero if it perfectly fits
        expect(windowCoords.offsetX).toBe(0);
        expect(windowCoords.offsetY).toBe(0);
    });

    it('isValidCell handles boundaries', () => {
        expect(coords.isValidCell({ col: 0, row: 0 })).toBe(true);
        expect(coords.isValidCell({ col: 4, row: 4 })).toBe(true);

        expect(coords.isValidCell({ col: -1, row: 0 })).toBe(false); // negative
        expect(coords.isValidCell({ col: 5, row: 5 })).toBe(false);  // out of bounds
    });
});
