/**
 * Aynayı döndürür ve sonucunu (ışınlar + snap durumu) döner.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';
import { SnapMode, MagneticSnapService } from '../../domain/rules/MagneticSnapService';
import { PuzzleStateDTO } from '../dto';
import { RaycastEngine } from '../../domain/physics/RaycastEngine';
import { WinConditionChecker } from '../../domain/rules/WinConditionChecker';
import { ISoundService } from '../../domain/ports/ISoundService';

function applyMirrorAngle(puzzle: Puzzle, mirrorId: string, angle: number): Puzzle {
    return {
        ...puzzle,
        mirrors: puzzle.mirrors.map(m =>
            m.id === mirrorId ? { ...m, angleDegrees: ((angle % 360) + 360) % 360 } : m
        ),
    };
}

export class RotateMirrorUseCase {
    constructor(
        private readonly raycastEngine: RaycastEngine,
        private readonly winChecker: WinConditionChecker,
        private readonly snapService: MagneticSnapService,
        private readonly soundService: ISoundService
    ) { }

    execute(
        puzzle: Puzzle,
        mirrorId: string,
        newAngle: number,
        coords: CoordinateSystem,
        snapMode: SnapMode
    ): PuzzleStateDTO {
        // 1. Snap Değerlendir
        const snap = this.snapService.evaluate(puzzle, mirrorId, newAngle, coords, snapMode);

        if (snap.snapStrength > 0.85 && !snap.snapped) {
            this.soundService.playNudge();
        }
        if (snap.snapped) {
            this.soundService.playCrystalFill();
        }

        // 2. Gerçek açıyla güncelle (immutable)
        const finalPuzzle = applyMirrorAngle(puzzle, mirrorId, snap.finalAngle);
        const traceResult = this.raycastEngine.trace(finalPuzzle, coords);

        // 3. Kazanma kontrolü
        const isWon = this.winChecker.check(finalPuzzle, traceResult.crystalFills);
        if (isWon) {
            this.soundService.playVictory();
        }

        return {
            puzzle: finalPuzzle,
            raySegments: traceResult.segments,
            crystalFills: traceResult.crystalFills,
            status: isWon ? 'SOLVED' : 'PLAYING',
            snapResult: snap
        };
    }
}
