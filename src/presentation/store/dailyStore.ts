import { create } from 'zustand';
import { DailyChallengeDTO, PuzzleResult } from '../../application/dto';
import { loadDailyChallengeCase, saveProgressCase } from '../../container';

export interface DailyState {
    todayChallenge: DailyChallengeDTO | null;
    isLoading: boolean;

    loadToday: () => Promise<void>;
    completeToday: (result: PuzzleResult) => Promise<void>;
}

export const useDailyStore = create<DailyState>((set, get) => ({
    todayChallenge: null,
    isLoading: false,

    loadToday: async () => {
        set({ isLoading: true });
        try {
            const challenge = await loadDailyChallengeCase.execute();
            set({ todayChallenge: challenge });
        } catch (e) {
            console.error('Günlük puzzle yüklenemedi', e);
        } finally {
            set({ isLoading: false });
        }
    },

    completeToday: async (result: PuzzleResult) => {
        set({ isLoading: true });
        try {
            // Result'u normal seviye gibi ilerleme olarak kaydetmek isterseniz.
            // Günlük görevler saveDailyChallengeCase ile storage'a işlenir (Use case eklenebilir veya direkt servis)
            await saveProgressCase.execute(result);
            await get().loadToday(); // state güncellensin
        } finally {
            set({ isLoading: false });
        }
    }
}));
