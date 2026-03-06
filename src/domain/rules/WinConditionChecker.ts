/**
 * Kazanma koşulu kontrolcüsü.
 * Tüm hedef kristaller doldu mu?
 * Domain-layer — zero 3rd-party imports.
 */
import { Puzzle } from '../entities/Puzzle';

export class WinConditionChecker {
    /**
     * @param puzzle       Güncel bulmaca
     * @param crystalFills RaycastEngine'den gelen dolum haritası
     * @returns Tüm hedef kristaller ≥1.0 ise true
     */
    check(puzzle: Puzzle, crystalFills: Map<string, number>): boolean {
        const targets = puzzle.crystals.filter((c) => c.isTarget);

        // Eğer hedef kristal yoksa (hatalı/test veri seti olabilir), doğrudan false dön.
        if (targets.length === 0) return false;

        return targets.every((c) => {
            const fill = crystalFills.get(c.id) ?? 0;
            return fill >= 1.0;
        });
    }
}
