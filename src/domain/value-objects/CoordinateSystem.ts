/**
 * İki koordinat uzayı arası dönüşüm.
 * - Grid Koordinatı (integer cell): bölüm data dosyaları, collision mantığı
 * - Piksel Koordinatı (float px): Canvas render, gesture hesaplama
 *
 * Domain-layer — zero 3rd-party imports.
 * NOT: fromWindow() metodunda window.innerHeight kullanılır — bu metod
 *      presentation tarafından çağrılmalı; domain kendi başına çağırmaz.
 */
import { Vector2D } from './Vector2D';

export interface GridCell {
    col: number; // 0'dan başlar, soldan sağa
    row: number; // 0'dan başlar, yukarıdan aşağı
}

export class CoordinateSystem {
    readonly cellSize: number; // Her hücrenin piksel boyutu (kare)
    readonly offsetX: number;  // Izgara sol kenar boşluğu (px)
    readonly offsetY: number;  // Izgara üst kenar boşluğu (px)

    constructor(
        canvasWidth: number,
        canvasHeight: number,
        private readonly gridCols: number,
        private readonly gridRows: number
    ) {
        const maxCellW = Math.floor(canvasWidth / gridCols);
        const maxCellH = Math.floor(canvasHeight / gridRows);
        this.cellSize = Math.min(maxCellW, maxCellH);

        // Izgara canvas'a ortalar
        this.offsetX = Math.floor((canvasWidth - this.cellSize * gridCols) / 2);
        this.offsetY = Math.floor((canvasHeight - this.cellSize * gridRows) / 2);
    }

    /** Grid hücre merkezini piksel koordinatına çevirir */
    gridToPixel(cell: GridCell): Vector2D {
        return new Vector2D(
            this.offsetX + cell.col * this.cellSize + this.cellSize / 2,
            this.offsetY + cell.row * this.cellSize + this.cellSize / 2
        );
    }

    /** Piksel koordinatını en yakın grid hücresine snap'ler */
    pixelToGrid(px: Vector2D): GridCell {
        return {
            col: Math.floor((px.x - this.offsetX) / this.cellSize),
            row: Math.floor((px.y - this.offsetY) / this.cellSize),
        };
    }

    /** Verilen grid hücresi grid sınırları içinde mi? */
    isValidCell(cell: GridCell): boolean {
        return (
            cell.col >= 0 &&
            cell.col < this.gridCols &&
            cell.row >= 0 &&
            cell.row < this.gridRows
        );
    }

    get cols(): number {
        return this.gridCols;
    }

    get rows(): number {
        return this.gridRows;
    }

    /**
     * window boyutuna göre CoordinateSystem oluşturur.
     * Header (~56px) + Banner ad (~60px) için alan bırakır.
     * UYARI: Bu metod presentation katmanından çağrılmalı.
     */
    static fromWindow(gridCols: number, gridRows: number): CoordinateSystem {
        const usableH = window.innerHeight - 56 - 60;
        return new CoordinateSystem(window.innerWidth, usableH, gridCols, gridRows);
    }
}
