/**
 * Bölümü başlatır, ilk raycast sonucunu hesaplar.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';
import { PuzzleStateDTO } from '../dto';
import { RaycastEngine } from '../../domain/physics/RaycastEngine';
import { WinConditionChecker } from '../../domain/rules/WinConditionChecker';

export class StartPuzzleUseCase {
    constructor(
        private readonly raycastEngine: RaycastEngine,
        private readonly winChecker: WinConditionChecker
    ) { }

    execute(puzzle: Puzzle, coords: CoordinateSystem): PuzzleStateDTO {
        const traceResult = this.raycastEngine.trace(puzzle, coords);
        const isWon = this.winChecker.check(puzzle, traceResult.crystalFills);

        return {
            puzzle,
            raySegments: traceResult.segments,
            crystalFills: traceResult.crystalFills,
            status: isWon ? 'SOLVED' : 'PLAYING'
        };
    }
}
