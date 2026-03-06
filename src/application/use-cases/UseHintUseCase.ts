/**
 * Reklam izlendikten sonra bölüm için hint hesaplar.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { HintDTO } from '../dto';
import { IAdService } from '../../domain/ports/IAdService';
import { HintCalculator } from '../../domain/rules/HintCalculator';
import { ISoundService } from '../../domain/ports/ISoundService';
import { RaycastEngine } from '../../domain/physics/RaycastEngine';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';

export class UseHintUseCase {
    constructor(
        private readonly adService: IAdService,
        private readonly hintCalculator: HintCalculator,
        private readonly soundService: ISoundService,
        private readonly engine: RaycastEngine
    ) { }

    async execute(puzzle: Puzzle, coords: CoordinateSystem): Promise<HintDTO> {
        const reward = await this.adService.showRewarded();
        if (!reward.earned) {
            throw new Error('AD_NOT_COMPLETED');
        }

        const hint = this.hintCalculator.calculate(puzzle, this.engine, coords);
        this.soundService.playHint();

        return {
            mirrorId: hint.mirrorId,
            suggestedAngle: hint.suggestedAngle,
            score: hint.score
        };
    }
}
