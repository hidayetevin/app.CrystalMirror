/**
 * Yıldız derecelendirme hesaplayıcı.
 * Süre ve hint kullanımına göre 1-3 yıldız hesaplar.
 * Domain-layer — zero 3rd-party imports.
 */
import { StarRating } from '../value-objects/StarRating';

export class StarRatingCalculator {
    /**
     * @param timeSeconds  Bölümü tamamlama süresi (saniye)
     * @param hintsUsed    Kullanılan hint sayısı
     * @param timeLimit    Zaman sınırı (null = sınırsız)
     * @returns 1 | 2 | 3
     */
    calculate(
        timeSeconds: number,
        hintsUsed: number,
        timeLimit: number | null
    ): StarRating {
        let rating: StarRating = 1;

        // Time limit yoksa, sanal bir referans eşiği belirle (örn: 60 saniye)
        const activeLimit = timeLimit ?? 60;

        if (timeSeconds < activeLimit * 0.5) {
            rating = 3;
        } else if (timeSeconds < activeLimit * 1.0) {
            rating = 2;
        } else {
            rating = 1;
        }

        // Hint kullanılmışsa oyunu maksimum 2 yıldız ile sınırla
        if (hintsUsed > 0 && rating === 3) {
            rating = 2;
        }

        return rating;
    }
}
