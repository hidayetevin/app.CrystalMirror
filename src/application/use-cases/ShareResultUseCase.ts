/**
 * Başarıyı native share API veya clipboard üzerinden Wordle emojisi ile paylaşır.
 */
import { PuzzleResult } from '../dto';
import { IShareService } from '../../domain/ports/IShareService';

export class ShareResultUseCase {
    constructor(private readonly shareService: IShareService) { }

    async execute(result: PuzzleResult): Promise<void> {
        const emojiGrid = this.buildEmojiGrid(result);
        // Mimari metnindeki Wordle tarzı tasarıma sadık format
        const text = [
            `💎 Crystal Mirror — Bölüm ${result.levelNumber}`,
            `${'⭐'.repeat(result.stars)}${'☆'.repeat(3 - result.stars)}`,
            `⏱️ ${result.timeSeconds}s`,
            emojiGrid,
            '#CrystalMirror #Puzzle'
        ].join('\n');

        await this.shareService.share({ title: 'Crystal Mirror Oyunu', text });
    }

    private buildEmojiGrid(result: PuzzleResult): string {
        if (!result.moves || result.moves.length === 0) return '✨';
        // ✨ kendi hamlesi, 💡 ipucu kullanılan adım (Hint)
        return result.moves.map(m => m.wasHint ? '💡' : '✨').join('');
    }
}
