/**
 * Magnetic Snap servisi — Açı değerlendirme ve ince snap bulma.
 * Domain-layer — zero 3rd-party imports.
 */
import { Puzzle } from '../entities/Puzzle';
import { RaycastEngine } from '../physics/RaycastEngine';
import { CoordinateSystem } from '../value-objects/CoordinateSystem';

export type SnapMode = 'GUIDED' | 'FREE';

export interface SnapResult {
    snapped: boolean;
    finalAngle: number;   // Snap olduysa kilitli açı, olmadıysa girdi açısı
    snapStrength: number;   // 0.0–1.0: ne kadar yakın? (haptic yoğunluğu için)
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
 * Mevcut ayna açısında ışın hedefe ne kadar yakın?
 * %85 eşiğinde titreşim uyarısı, %95'te açı kilitlenir.
 */
export class MagneticSnapService {
    private readonly NUDGE_THRESHOLD = 0.85;
    private readonly SNAP_THRESHOLD = 0.95;
    private readonly FINE_STEP_DEG = 1;

    constructor(private readonly engine: RaycastEngine) { }

    evaluate(
        puzzle: Puzzle,
        mirrorId: string,
        angle: number,
        coords: CoordinateSystem,
        mode: SnapMode = 'GUIDED'
    ): SnapResult {
        if (mode === 'FREE') {
            return { snapped: false, finalAngle: angle, snapStrength: 0 };
        }

        const testPuzzle = applyMirrorAngle(puzzle, mirrorId, angle);
        const traceResult = this.engine.trace(testPuzzle, coords);
        const fillScore = this.totalFillScore(traceResult.crystalFills, puzzle);

        if (fillScore < this.NUDGE_THRESHOLD) {
            return { snapped: false, finalAngle: angle, snapStrength: fillScore };
        }

        if (fillScore >= this.SNAP_THRESHOLD) {
            const bestAngle = this.findExactSnapAngle(puzzle, mirrorId, angle, coords);
            return { snapped: true, finalAngle: bestAngle, snapStrength: 1.0 };
        }

        return { snapped: false, finalAngle: angle, snapStrength: fillScore };
    }

    private findExactSnapAngle(puzzle: Puzzle, mirrorId: string, baseAngle: number, coords: CoordinateSystem): number {
        let bestAngle = baseAngle;
        let bestScore = -1;

        for (let delta = -10; delta <= 10; delta += this.FINE_STEP_DEG) {
            const candidate = (baseAngle + delta + 360) % 360;
            const test = applyMirrorAngle(puzzle, mirrorId, candidate);
            const score = this.totalFillScore(this.engine.trace(test, coords).crystalFills, puzzle);
            if (score > bestScore) {
                bestScore = score;
                bestAngle = candidate;
            }
        }

        return bestAngle;
    }

    private totalFillScore(fills: Map<string, number>, puzzle: Puzzle): number {
        const targets = puzzle.crystals.filter(c => c.isTarget);
        if (targets.length === 0) return 0;
        return targets.reduce((sum, c) => sum + (fills.get(c.id) ?? 0), 0) / targets.length;
    }
}
