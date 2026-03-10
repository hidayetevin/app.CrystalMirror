/**
 * Capacitor Preferences ile yerel veri saklama.
 */
import { Preferences } from '@capacitor/preferences';
import { IStorageService, LevelProgress, DailyRecord, EconomyData } from '../../domain/ports/IStorageService';

export class CapacitorStorageService implements IStorageService {
    async saveLevelProgress(levelId: string, stars: number, timeSeconds: number): Promise<void> {
        const key = `level_${levelId}`;
        const existing = await this.getLevelProgress(levelId);

        // Daha iyi skor, yani yıldız daha yüksek VEYA yıldız aynı ama süre daha kısa
        const shouldSave = !existing ||
            stars > existing.stars ||
            (stars === existing.stars && timeSeconds < existing.timeSeconds);

        if (shouldSave) {
            const newProgress: LevelProgress = {
                stars,
                timeSeconds,
                solvedAt: new Date().toISOString()
            };
            await this.set(key, newProgress);
        }
    }

    async getLevelProgress(levelId: string): Promise<LevelProgress | null> {
        return this.get<LevelProgress>(`level_${levelId}`);
    }

    async getAllProgress(): Promise<Map<string, LevelProgress>> {
        const { keys } = await Preferences.keys();
        const progressMap = new Map<string, LevelProgress>();

        for (const key of keys) {
            if (key.startsWith('level_')) {
                const value = await this.get<LevelProgress>(key);
                if (value) {
                    const levelId = key.replace('level_', '');
                    progressMap.set(levelId, value);
                }
            }
        }
        return progressMap;
    }

    async getDailyChallenge(dateKey: string): Promise<DailyRecord | null> {
        return this.get<DailyRecord>(`daily_${dateKey}`);
    }

    async saveDailyChallenge(dateKey: string, record: DailyRecord): Promise<void> {
        await this.set(`daily_${dateKey}`, record);
    }

    async getEconomyData(): Promise<EconomyData | null> {
        return this.get<EconomyData>('user_economy');
    }

    async saveEconomyData(data: EconomyData): Promise<void> {
        await this.set('user_economy', data);
    }

    private async get<T>(key: string): Promise<T | null> {
        const { value } = await Preferences.get({ key });
        try {
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    }

    private async set(key: string, value: unknown): Promise<void> {
        await Preferences.set({ key, value: JSON.stringify(value) });
    }
}
