/**
 * Kullanıcı bölümü bitirdiğinde skorları ve ilerlemeyi kaydeder.
 */
import { PuzzleResult } from '../dto';
import { IStorageService } from '../../domain/ports/IStorageService';

export class SaveProgressUseCase {
    constructor(private readonly storageService: IStorageService) { }

    async execute(result: PuzzleResult): Promise<void> {
        const { puzzleId, stars, timeSeconds } = result;

        // Yalnızca normal progress kaydediliyor. (Daha iyi skor storage servisinde kontrol altındadır)
        await this.storageService.saveLevelProgress(puzzleId, stars, timeSeconds);
    }
}
