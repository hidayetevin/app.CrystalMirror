/**
 * Aynayı ızgara üzerinde sağa/sola/yukarı/aşağı kaydırır.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { CoordinateSystem, GridCell } from '../../domain/value-objects/CoordinateSystem';
import { PuzzleStateDTO } from '../dto';
import { RaycastEngine } from '../../domain/physics/RaycastEngine';
import { WinConditionChecker } from '../../domain/rules/WinConditionChecker';
import { ISoundService } from '../../domain/ports/ISoundService';

function applyMirrorPosition(puzzle: Puzzle, mirrorId: string, cell: GridCell): Puzzle {
    return {
        ...puzzle,
        mirrors: puzzle.mirrors.map(m =>
            m.id === mirrorId ? { ...m, position: cell } : m
        ),
    };
}

export class SlideMirrorUseCase {
    constructor(
        private readonly raycastEngine: RaycastEngine,
        private readonly winChecker: WinConditionChecker,
        private readonly soundService: ISoundService
    ) { }

    execute(
        puzzle: Puzzle,
        mirrorId: string,
        newCell: GridCell,
        coords: CoordinateSystem
    ): PuzzleStateDTO {
        // Geçersiz veya sınır dışı grid
        if (!coords.isValidCell(newCell)) {
            const baseTrace = this.raycastEngine.trace(puzzle, coords);
            return { puzzle, raySegments: baseTrace.segments, crystalFills: baseTrace.crystalFills, status: 'PLAYING' };
        }

        // Hücrenin başka bir varlık tarafından bloke edilip edilmediğini kontrol et
        const hasMirror = puzzle.mirrors.some(m => m.id !== mirrorId && m.position.col === newCell.col && m.position.row === newCell.row);
        const hasCrystal = puzzle.crystals.some(c => c.position.col === newCell.col && c.position.row === newCell.row);
        const hasLight = puzzle.lightSource.position.col === newCell.col && puzzle.lightSource.position.row === newCell.row;

        if (hasMirror || hasCrystal || hasLight) {
            const baseTrace = this.raycastEngine.trace(puzzle, coords);
            return { puzzle, raySegments: baseTrace.segments, crystalFills: baseTrace.crystalFills, status: 'PLAYING' };
        }

        this.soundService.playMirrorSlide();

        const updatedPuzzle = applyMirrorPosition(puzzle, mirrorId, newCell);
        const traceResult = this.raycastEngine.trace(updatedPuzzle, coords);

        const isWon = this.winChecker.check(updatedPuzzle, traceResult.crystalFills);
        if (isWon) {
            this.soundService.playVictory();
        }

        return {
            puzzle: updatedPuzzle,
            raySegments: traceResult.segments,
            crystalFills: traceResult.crystalFills,
            status: isWon ? 'SOLVED' : 'PLAYING'
        };
    }
}
