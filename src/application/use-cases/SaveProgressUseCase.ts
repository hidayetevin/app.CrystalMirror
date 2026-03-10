/**
 * Kullanıcı bölümü bitirdiğinde skorları ve ilerlemeyi kaydeder.
 */
import { PuzzleResult } from '../dto';
import { IStorageService } from '../../domain/ports/IStorageService';

export class SaveProgressUseCase {
    constructor(private readonly storageService: IStorageService) { }

    async execute(result: PuzzleResult): Promise<{ isFirstClear: boolean, coinsEarned: number }> {
        const { puzzleId, stars, timeSeconds } = result;

        // Check if level was previously cleared
        const existingProgress = await this.storageService.getLevelProgress(puzzleId);
        const isFirstClear = !existingProgress;

        // Base economy logic (can be expanded later if needed)
        const coinsEarned = isFirstClear ? 20 : 5;

        // Yalnızca normal progress kaydediliyor. (Daha iyi skor storage servisinde kontrol altındadır)
        await this.storageService.saveLevelProgress(puzzleId, stars, timeSeconds);

        return { isFirstClear, coinsEarned };
    }
}
