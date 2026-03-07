import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    onStartClick: () => void;
    onDailyClick: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStartClick, onDailyClick }) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('appLang', newLang);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-white relative" data-world="forest">
            {/* Dil Seçici (Sağ Üst Köşe) */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    <span className="text-sm font-bold opacity-75">{i18n.language.toUpperCase()}</span>
                    <span className="text-lg">🌍</span>
                </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-50 pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center animate-fade-in-up">
                <div className="relative mb-8">
                    {/* Logo animasyonu - Basit parıltılı kristal şekli */}
                    <div className="w-32 h-32 transform rotate-45 border-4 border-white flex items-center justify-center bg-white/10 backdrop-blur-md shadow-[0_0_40px_var(--crystal-glow)]">
                        <div className="w-16 h-16 border-2 border-[var(--ui-accent)] transform -rotate-45 flex items-center justify-center">
                            <span className="text-4xl">💎</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-5xl font-bold mb-2 font-[Cinzel_Decorative] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--crystal-glow)] drop-shadow-md">
                    CRYSTAL
                </h1>
                <h2 className="text-3xl font-light mb-12 font-[Cinzel_Decorative] tracking-[0.3em] text-gray-300">
                    MIRROR
                </h2>

                <div className="flex flex-col gap-4 w-64 mt-4 font-[Rajdhani]">
                    <button
                        onClick={onStartClick}
                        className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-xl uppercase tracking-widest backdrop-blur-sm transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:scale-95"
                    >
                        {t('ui.start')}
                    </button>
                    <button
                        onClick={onDailyClick}
                        className="w-full py-4 bg-[var(--ui-accent)]/20 hover:bg-[var(--ui-accent)]/30 border border-[var(--ui-accent)]/50 text-[var(--crystal-glow)] rounded-lg text-xl uppercase tracking-widest backdrop-blur-sm transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:scale-95"
                    >
                        {t('ui.daily_puzzle')}
                    </button>
                </div>
            </div>
        </div>
    );
};
