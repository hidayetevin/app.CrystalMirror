/**
 * Günlük bölüm seed algoritması.
 * Aynı tarihi her cihazda aynı seed'e dönüştürür — backend gerektirmez.
 * Domain-layer — zero 3rd-party imports.
 */
export class DailySeedGenerator {
    /**
     * Tarihten deterministik hash üretir.
     */
    generate(date: Date): number {
        const dateStr = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}`;
        let hash = 0;
        for (let i = 0; i < dateStr.length; i++) {
            const char = dateStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // 32-bit integer kısıtlaması
        }
        return Math.abs(hash);
    }

    /**
     * @param date         Bugünün tarihi
     * @param totalPuzzles Toplam bulmaca sayısı
     * @returns Bugünkü bulmaca indeksi (0-based)
     */
    getPuzzleIndex(date: Date, totalPuzzles: number): number {
        if (totalPuzzles === 0) return 0;
        return this.generate(date) % totalPuzzles;
    }
}
