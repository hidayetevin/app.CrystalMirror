import { create } from 'zustand';
import { storageService } from '../../container';
import { EconomyData } from '../../domain/ports/IStorageService';

export interface EconomyState extends EconomyData {
    loadEconomy: () => Promise<void>;
    addCoins: (amount: number) => Promise<void>;
    deductCoins: (amount: number) => Promise<boolean>;
    buyItem: (itemId: string, cost: number) => Promise<boolean>;
    equipItem: (type: 'mirrorSkin' | 'laserColor', itemId: string) => Promise<void>;
}

const defaultEconomy: EconomyData = {
    coins: 0,
    ownedItems: ['default_mirror', 'default_laser'], // Başlangıç eşyaları
    equippedItems: {
        mirrorSkin: 'default_mirror',
        laserColor: 'default_laser'
    }
};

export const useEconomyStore = create<EconomyState>((set, get) => ({
    ...defaultEconomy,

    loadEconomy: async () => {
        const data = await storageService.getEconomyData();
        if (data) {
            set(data);
        } else {
            // Eğer ilk defa giriyorsa default verileri kaydet
            await storageService.saveEconomyData(defaultEconomy);
            set(defaultEconomy);
        }
    },

    addCoins: async (amount: number) => {
        const state = get();
        const newCoins = state.coins + amount;

        const newData: EconomyData = {
            coins: newCoins,
            ownedItems: state.ownedItems,
            equippedItems: state.equippedItems
        };

        await storageService.saveEconomyData(newData);
        set({ coins: newCoins });
    },

    deductCoins: async (amount: number) => {
        const state = get();
        if (state.coins < amount) return false;

        const newCoins = state.coins - amount;
        const newData: EconomyData = {
            coins: newCoins,
            ownedItems: state.ownedItems,
            equippedItems: state.equippedItems
        };

        await storageService.saveEconomyData(newData);
        set({ coins: newCoins });
        return true;
    },

    buyItem: async (itemId: string, cost: number) => {
        const state = get();

        if (state.ownedItems.includes(itemId)) return true; // Zaten sahip
        if (state.coins < cost) return false;

        const newData: EconomyData = {
            coins: state.coins - cost,
            ownedItems: [...state.ownedItems, itemId],
            equippedItems: state.equippedItems
        };

        await storageService.saveEconomyData(newData);
        set(newData);
        return true;
    },

    equipItem: async (type: 'mirrorSkin' | 'laserColor', itemId: string) => {
        const state = get();

        // Eşyaya sahip değilse vazgeç
        if (!state.ownedItems.includes(itemId)) return;

        const newEquippedItems = {
            ...state.equippedItems,
            [type]: itemId
        };

        const newData: EconomyData = {
            coins: state.coins,
            ownedItems: state.ownedItems,
            equippedItems: newEquippedItems
        };

        await storageService.saveEconomyData(newData);
        set({ equippedItems: newEquippedItems });
    }
}));
