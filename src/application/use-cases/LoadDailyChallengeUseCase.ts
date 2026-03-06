/**
 * Günlük deterministik puzzle yükler.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { DailyChallengeDTO } from '../dto';
import { DailySeedGenerator } from '../../domain/rules/DailySeedGenerator';
import { IStorageService } from '../../domain/ports/IStorageService';

export class LoadDailyChallengeUseCase {
    constructor(
        private readonly seedGenerator: DailySeedGenerator,
        private readonly storageService: IStorageService,
        private readonly allPuzzles: Puzzle[]
    ) { }

    async execute(): Promise<DailyChallengeDTO> {
        const today = new Date();
        // UTC date key as standard (YYYY-MM-DD)
        const dateKey = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;

        const existing = await this.storageService.getDailyChallenge(dateKey);

        const index = this.seedGenerator.getPuzzleIndex(today, this.allPuzzles.length);
        const puzzle = this.allPuzzles[index];

        return {
            puzzle,
            dateKey,
            alreadyPlayed: existing !== null,
            previousResult: existing ?? null
        };
    }
}
