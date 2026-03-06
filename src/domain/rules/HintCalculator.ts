/**
 * Hint hesaplayıcı — Brute-force + cache + iki aşamalı tarama.
 * Domain-layer — zero 3rd-party imports.
 */
import { Puzzle } from '../entities/Puzzle';
import { RaycastEngine } from '../physics/RaycastEngine';

export interface HintCandidate {
    mirrorId: string;
    suggestedAngle: number;
    score: number; // 0–1 arası toplam kristal dolumu
}

function applyMirrorAngle(puzzle: Puzzle, mirrorId: string, angle: number): Puzzle {
    return {
        ...puzzle,
        mirrors: puzzle.mirrors.map(m =>
            m.id === mirrorId ? { ...m, angleDegrees: ((angle % 360) + 360) % 360 } : m
        ),
    };
}

/**
 * İki aşamalı tarama stratejisi:
 * 1. Kaba tarama (5° adım) — en iyi adayı bul
 * 2. En iyi aday etrafında ince tarama (1° adım, ±10°)
 * 3. Sonucu cache'le (puzzle state hash'ine göre)
 */
export class HintCalculator {
    private cache = new Map<string, HintCandidate>();

    calculate(puzzle: Puzzle, engine: RaycastEngine): HintCandidate {
        const cacheKey = this.puzzleStateHash(puzzle);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let best: HintCandidate = { mirrorId: '', suggestedAngle: 0, score: -1 };

        // Aşama 1: Kaba tarama (5° adım)
        const movableMirrors = puzzle.mirrors.filter((m) => m.isMovable && m.type === 'ROTATE');
        for (const mirror of movableMirrors) {
            for (let angle = 0; angle < 360; angle += 5) {
                const testPuzzle = applyMirrorAngle(puzzle, mirror.id, angle);
                const result = engine.trace(testPuzzle);
                const score = this.totalFillScore(result.crystalFills, puzzle);

                if (score > best.score) {
                    best = { mirrorId: mirror.id, suggestedAngle: angle, score };
                }
            }
        }

        if (!best.mirrorId) {
            this.cache.set(cacheKey, best);
            return best;
        }

        // Aşama 2: İnce tarama
        for (let delta = -10; delta <= 10; delta++) {
            const angle = (best.suggestedAngle + delta + 360) % 360;
            const testPuzzle = applyMirrorAngle(puzzle, best.mirrorId, angle);
            const result = engine.trace(testPuzzle);
            const score = this.totalFillScore(result.crystalFills, puzzle);

            if (score > best.score) {
                best = { ...best, suggestedAngle: angle, score };
            }
        }

        this.cache.set(cacheKey, best);
        return best;
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
