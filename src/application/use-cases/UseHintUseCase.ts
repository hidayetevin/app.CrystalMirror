/**
 * Reklam izlendikten sonra bölüm için hint hesaplar.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { HintDTO } from '../dto';
import { HintCalculator } from '../../domain/rules/HintCalculator';
import { ISoundService } from '../../domain/ports/ISoundService';
import { RaycastEngine } from '../../domain/physics/RaycastEngine';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';

export class UseHintUseCase {
    constructor(
        private readonly hintCalculator: HintCalculator,
        private readonly soundService: ISoundService,
        private readonly engine: RaycastEngine
    ) { }

    async execute(puzzle: Puzzle, coords: CoordinateSystem): Promise<HintDTO> {

        const hint = this.hintCalculator.calculate(puzzle, this.engine, coords);
        this.soundService.playHint();

        return {
            mirrorId: hint.mirrorId,
            suggestedAngle: hint.suggestedAngle,
            score: hint.score,
            mirrorAngles: hint.mirrorAngles,
        };
    }
}
