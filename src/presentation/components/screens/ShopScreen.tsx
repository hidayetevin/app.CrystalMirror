import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEconomyStore } from '../../store';
import { adService } from '../../../container';
import { Header } from '../ui/Header';

interface Props {
    onBack: () => void;
}

const MIRROR_SKINS = [
    { id: 'default_mirror', label: 'Classic Glass', cost: 0, icon: '💎' },
    { id: 'neon_mirror', label: 'Neon Edge', cost: 200, icon: '🌸' },
    { id: 'dark_mirror', label: 'Dark Matter', cost: 500, icon: '☄️' },
];

const LASER_SKINS = [
    { id: 'default_laser', label: 'Classic Core', cost: 0, color: '#00FFFF' },
    { id: 'power_beam', label: 'Power Beam', cost: 150, color: '#FFD700' },
    { id: 'pulse_ray', label: 'Pulse Ray', cost: 300, color: '#FF0055' },
];

export const ShopScreen: React.FC<Props> = ({ onBack }) => {
    const { t } = useTranslation();
    const { coins, ownedItems, equippedItems, buyItem, equipItem, addCoins } = useEconomyStore();

    const handleWatchAd = async () => {
        try {
            await adService.showRewarded();
            // Reklam izlenirse 50 coin ver
            addCoins(50);
        } catch (e) {
            console.error('Ad failed', e);
            // Fallback: toast message can be added here
        }
    };

    const handlePurchaseOrEquipMirror = (id: string, cost: number) => {
        if (ownedItems.includes(id)) {
            equipItem('mirrorSkin', id);
        } else {
            buyItem(id, cost); // buyItem checks if we have enough coins
        }
    };

    const handlePurchaseOrEquipLaser = (id: string, cost: number) => {
        if (ownedItems.includes(id)) {
            equipItem('laserColor', id);
        } else {
            buyItem(id, cost);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-[#0D0D12] text-white font-[Rajdhani] select-none">
            <Header onBack={onBack} title={t('shop.title')} />

            <div className="flex-1 overflow-y-auto p-6 pb-20">
                {/* Coin Display & Ad Button */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl drop-shadow-[0_0_10px_#FFD700]">💎</span>
                        <div>
                            <div className="text-xs text-white/50 tracking-widest uppercase">{t('economy.balance')}</div>
                            <div className="text-3xl font-bold font-mono text-[#FFD700]">{coins}</div>
                        </div>
                    </div>

                    <button
                        onClick={handleWatchAd}
                        className="px-4 py-3 bg-[#4CAF50]/20 hover:bg-[#4CAF50]/40 border border-[#4CAF50]/50 text-[#4CAF50] rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span>📺</span>
                        <span>+50 {t('economy.coins').toUpperCase()}</span>
                    </button>
                </div>

                {/* Mirror Skins */}
                <h2 className="text-xl font-[Cinzel_Decorative] text-[var(--crystal-glow)] mb-4">{t('shop.mirror_skins')}</h2>
                <div className="space-y-3 mb-8">
                    {MIRROR_SKINS.map(skin => {
                        const isOwned = ownedItems.includes(skin.id);
                        const isEquipped = equippedItems.mirrorSkin === skin.id;
                        const canAfford = coins >= skin.cost;

                        return (
                            <div key={skin.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isEquipped ? 'bg-white/10 border-white/40' : 'bg-black/50 border-white/5'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">{skin.icon}</div>
                                    <div className="text-lg font-bold tracking-wide">{t(`shop.skins.${skin.id}`)}</div>
                                </div>
                                <button
                                    onClick={() => handlePurchaseOrEquipMirror(skin.id, skin.cost)}
                                    disabled={!isOwned && !canAfford}
                                    className={`px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-all ${isEquipped ? 'bg-white text-black' :
                                        isOwned ? 'bg-white/20 hover:bg-white/30 text-white' :
                                            canAfford ? 'bg-[#FFD700]/20 hover:bg-[#FFD700]/40 text-[#FFD700] border border-[#FFD700]/50' :
                                                'bg-white/5 text-white/30 cursor-not-allowed'
                                        }`}
                                >
                                    {isEquipped ? t('shop.equipped') : isOwned ? t('shop.equip') : `💎 ${skin.cost}`}
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* Laser Skins */}
                <h2 className="text-xl font-[Cinzel_Decorative] text-[var(--crystal-glow)] mb-4">{t('shop.laser_skins')}</h2>
                <div className="space-y-3">
                    {LASER_SKINS.map(laser => {
                        const isOwned = ownedItems.includes(laser.id);
                        const isEquipped = equippedItems.laserColor === laser.id;
                        const canAfford = coins >= laser.cost;

                        return (
                            <div key={laser.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isEquipped ? 'bg-white/10 border-white/40' : 'bg-black/50 border-white/5'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: laser.color, color: laser.color }}></div>
                                    <div className="text-lg font-bold tracking-wide">{t(`shop.skins.${laser.id}`)}</div>
                                </div>
                                <button
                                    onClick={() => handlePurchaseOrEquipLaser(laser.id, laser.cost)}
                                    disabled={!isOwned && !canAfford}
                                    className={`px-6 py-2 rounded-lg font-bold tracking-widest uppercase transition-all ${isEquipped ? 'bg-white text-black' :
                                        isOwned ? 'bg-white/20 hover:bg-white/30 text-white' :
                                            canAfford ? 'bg-[#FFD700]/20 hover:bg-[#FFD700]/40 text-[#FFD700] border border-[#FFD700]/50' :
                                                'bg-white/5 text-white/30 cursor-not-allowed'
                                        }`}
                                >
                                    {isEquipped ? t('shop.equipped') : isOwned ? t('shop.equip') : `💎 ${laser.cost}`}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
