/**
 * Hint hesaplayıcı — Çok aynalı kombinasyonel brute-force + cache.
 * Domain-layer — zero 3rd-party imports.
 */
import { Puzzle } from '../entities/Puzzle';
import { RaycastEngine } from '../physics/RaycastEngine';
import { CoordinateSystem } from '../value-objects/CoordinateSystem';

export interface HintCandidate {
    mirrorId: string;
    suggestedAngle: number;
    score: number;
    mirrorAngles: Record<string, number>; // Tüm aynalar için çözüm açıları
}

/** Belirli ayna açılarını puzzle'a uygula */
function applyMirrorAngles(puzzle: Puzzle, angles: Record<string, number>): Puzzle {
    return {
        ...puzzle,
        mirrors: puzzle.mirrors.map(m =>
            angles[m.id] !== undefined
                ? { ...m, angleDegrees: ((angles[m.id] % 360) + 360) % 360 }
                : m
        ),
    };
}

/**
 * Çok aynalı kombinasyonel brute-force:
 * - 1 ayna:  72 test  (5° adım)
 * - 2 ayna: 1.296 test
 * - 3 ayna: 46.656 test
 * - 4+ ayna: 10° adımla 1.7M → kabul edilebilir (~100-300ms)
 */
export class HintCalculator {
    private cache = new Map<string, HintCandidate>();

    calculate(puzzle: Puzzle, engine: RaycastEngine, coords: CoordinateSystem): HintCandidate {
        const cacheKey = this.puzzleStateHash(puzzle);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        const movableMirrors = puzzle.mirrors.filter((m) => m.isMovable && m.type === 'ROTATE');

        if (movableMirrors.length === 0) {
            const empty: HintCandidate = { mirrorId: '', suggestedAngle: 0, score: 0, mirrorAngles: {} };
            this.cache.set(cacheKey, empty);
            return empty;
        }

        // Ayna sayısına göre tarama adımı belirle (performans-doğruluk dengesi)
        const coarseStep = movableMirrors.length <= 3 ? 5 : 10;
        const angles = Array.from({ length: Math.round(360 / coarseStep) }, (_, i) => i * coarseStep);

        let bestScore = -1;
        let bestAngles: Record<string, number> = {};

        // Tüm ayna kombinasyonlarını recursive tara
        const search = (idx: number, current: Record<string, number>) => {
            if (idx === movableMirrors.length) {
                const testPuzzle = applyMirrorAngles(puzzle, current);
                const result = engine.trace(testPuzzle, coords);
                const score = this.totalFillScore(result.crystalFills, puzzle);
                if (score > bestScore) {
                    bestScore = score;
                    bestAngles = { ...current };
                }
                return;
            }
            const mirror = movableMirrors[idx];
            for (const angle of angles) {
                current[mirror.id] = angle;
                search(idx + 1, current);
            }
        };

        search(0, {});

        // Kaba tarama sonucu bulunduysa ±10° ince tarama yap
        if (bestScore > 0 && movableMirrors.length <= 3) {
            const fineAngles: Record<string, number[]> = {};
            for (const m of movableMirrors) {
                const base = bestAngles[m.id] ?? 0;
                fineAngles[m.id] = Array.from({ length: 21 }, (_, i) => ((base + (i - 10)) + 360) % 360);
            }

            const fineSearch = (idx: number, current: Record<string, number>) => {
                if (idx === movableMirrors.length) {
                    const testPuzzle = applyMirrorAngles(puzzle, current);
                    const result = engine.trace(testPuzzle, coords);
                    const score = this.totalFillScore(result.crystalFills, puzzle);
                    if (score > bestScore) {
                        bestScore = score;
                        bestAngles = { ...current };
                    }
                    return;
                }
                const mirror = movableMirrors[idx];
                for (const angle of fineAngles[mirror.id]) {
                    current[mirror.id] = angle;
                    fineSearch(idx + 1, current);
                }
            };

            fineSearch(0, {});
        }

        // Birincil ayna: en çok değiştirilen veya ilk ayna
        const firstMirror = movableMirrors[0];
        const result: HintCandidate = {
            mirrorId: firstMirror.id,
            suggestedAngle: bestAngles[firstMirror.id] ?? firstMirror.angleDegrees,
            score: bestScore,
            mirrorAngles: bestAngles,
        };

        this.cache.set(cacheKey, result);
        return result;
    }

    private totalFillScore(fills: Map<string, number>, puzzle: Puzzle): number {
        const targets = puzzle.crystals.filter(c => c.isTarget);
        if (targets.length === 0) return 0;
        return targets.reduce((sum, c) => sum + (fills.get(c.id) ?? 0), 0) / targets.length;
    }

    private puzzleStateHash(puzzle: Puzzle): string {
        return puzzle.mirrors
            .map(m => `${m.id}:${m.angleDegrees}:${m.position.col},${m.position.row}`)
            .join('|');
    }

    clearCache(): void {
        this.cache.clear();
    }
}
