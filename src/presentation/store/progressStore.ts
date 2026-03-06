import { create } from 'zustand';
import { LevelProgress } from '../../domain/ports/IStorageService';
import { storageService, allLevels } from '../../container';

export interface ProgressState {
    levelProgress: Record<string, LevelProgress>;
    unlockedWorlds: string[];

    loadAllProgress: () => Promise<void>;
    saveLevel: (levelId: string, stars: number, timeSeconds: number) => Promise<void>;
    isLevelUnlocked: (worldId: string, levelNumber: number) => boolean;
    getWorldProgress: (worldId: string) => { completed: number; total: number };
}

export const useProgressStore = create<ProgressState>((set, get) => ({
    levelProgress: {},
    unlockedWorlds: ['forest'], // İlk dünya her zaman açık

    loadAllProgress: async () => {
        const map = await storageService.getAllProgress();
        const records: Record<string, LevelProgress> = {};
        map.forEach((value, key) => {
            records[key] = value;
        });

        // Kilit Açma Kuralları (Örn: Forest 5/5 olunca Glacier açık)
        const forestProgress = [...map.keys()].filter(k => k.startsWith('w1_')).length;
        let worlds = ['forest'];
        if (forestProgress >= 5) { // Forest bitince Glacier aç
            worlds.push('glacier');
        }

        set({ levelProgress: records, unlockedWorlds: worlds });
    },

    saveLevel: async (levelId, stars, timeSeconds) => {
        await storageService.saveLevelProgress(levelId, stars, timeSeconds);
        await get().loadAllProgress(); // Kaydettikten sonra yeniden load et (tüm kurallar işlesin)
    },

    isLevelUnlocked: (worldId, levelNumber) => {
        const { unlockedWorlds, levelProgress } = get();
        if (!unlockedWorlds.includes(worldId)) return false;

        if (levelNumber === 1) return true;

        // Önceki bölüm çözüldü mü?
        // Dünya ID'sine göre prefix: forest->w1, glacier->w2 vb.
        const prefix = worldId === 'forest' ? 'w1' : worldId === 'glacier' ? 'w2' : 'w3';
        const prevId = `${prefix}_l${levelNumber - 1}`;

        return levelProgress[prevId] !== undefined;
    },

    getWorldProgress: (worldId) => {
        const prefix = worldId === 'forest' ? 'w1' : worldId === 'glacier' ? 'w2' : 'w3';
        const total = allLevels.filter(p => p.worldId === worldId).length || 5;

        const { levelProgress } = get();
        const completed = Object.keys(levelProgress).filter(k => k.startsWith(prefix)).length;

        return { completed, total };
    }
}));
