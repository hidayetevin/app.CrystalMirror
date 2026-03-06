/**
 * İlerleme kaydetme ve günlük görev port arayüzü.
 * Domain-layer — zero 3rd-party imports.
 */
export interface LevelProgress {
    stars: number;
    timeSeconds: number;
    solvedAt: string; // ISO date string
}

export interface DailyRecord {
    puzzleId: string;
    solvedAt: string; // ISO date string
    stars: number;
    timeSeconds: number;
    hintsUsed: number;
}

export interface IStorageService {
    /** Sadece daha iyi skoru kaydeder */
    saveLevelProgress(levelId: string, stars: number, timeSeconds: number): Promise<void>;
    getLevelProgress(levelId: string): Promise<LevelProgress | null>;
    getAllProgress(): Promise<Map<string, LevelProgress>>;

    getDailyChallenge(dateKey: string): Promise<DailyRecord | null>;
    saveDailyChallenge(dateKey: string, record: DailyRecord): Promise<void>;
}
