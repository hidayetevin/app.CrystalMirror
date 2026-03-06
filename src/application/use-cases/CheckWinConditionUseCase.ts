/**
 * Sadece kazanma durumunu tekrar kontrol eder (Zustand için utility use case)
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { PuzzleStateDTO } from '../dto';
import { WinConditionChecker } from '../../domain/rules/WinConditionChecker';
import { RaycastEngine, RaySegment } from '../../domain/physics/RaycastEngine';

export class CheckWinConditionUseCase {
    constructor(
        private readonly raycastEngine: RaycastEngine,
        private readonly winChecker: WinConditionChecker
    ) { }

    execute(puzzle: Puzzle, fills?: Map<string, number>): PuzzleStateDTO {
        let currentFills = fills;
        let segments: RaySegment[] = [];

        // Fills verilmediyse yeni raycast yap
        if (!currentFills) {
            const traceResult = this.raycastEngine.trace(puzzle);
            currentFills = traceResult.crystalFills;
            segments = traceResult.segments;
        }

        const isWon = this.winChecker.check(puzzle, currentFills);

        return {
            puzzle,
            raySegments: segments,
            crystalFills: currentFills,
            status: isWon ? 'SOLVED' : 'PLAYING'
        };
    }
}
