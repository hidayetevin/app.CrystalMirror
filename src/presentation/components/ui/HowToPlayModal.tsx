import React, { useState } from 'react';
import { usePuzzleStore } from '../../store';

interface Slide {
    title: string;
    icon: string;
    color: string;
    content: React.ReactNode;
}

const slides: Slide[] = [
    {
        title: 'Işık Kaynağı & Kristal',
        icon: '🌟',
        color: '#FFCC00',
        content: (
            <div className="space-y-4 text-center">
                <p>Oyunun amacı, <b>Işık Kaynağından</b> çıkan ışığı <b>Kristale</b> ulaştırmaktır.</p>
                <div className="flex justify-center items-center gap-8 py-4">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_#FFCC00] flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                        </div>
                        <span className="text-xs mt-2 text-gray-400">Işık Kaynağı</span>
                    </div>
                    <div className="text-2xl text-gray-500">→</div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                            <span className="text-gray-600 font-bold">💎</span>
                        </div>
                        <span className="text-xs mt-2 text-gray-400">Hedef Kristal</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: 'Aynaları Kontrol Et',
        icon: '🌀',
        color: '#80DEEA',
        content: (
            <div className="space-y-4 text-center">
                <p>Aynaların üzerine tıklayıp etrafındaki <b>kontrol tekerleğini</b> sürükleyerek açılarını değiştirebilirsin.</p>
                <div className="flex justify-center my-6">
                    <div className="relative w-20 h-20 rounded-full border border-gray-600/50 flex items-center justify-center">
                        {/* Ayna Çizgisi */}
                        <div className="w-16 h-1 bg-[#80DEEA] rotate-45 rounded-full"></div>
                        {/* Drag Handle */}
                        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white shadow-[0_0_5px_#fff]"></div>
                    </div>
                </div>
                <p className="text-sm text-gray-400">Not: Ortasında kutu deseni olan aynaları basılı tutarak boş alanlara taşıyabilirsin.</p>
            </div>
        )
    },
    {
        title: 'Kırmızı Engel & Yeşil Ayna',
        icon: '🟩',
        color: '#39FF14',
        content: (
            <div className="space-y-4 text-center">
                <p>Mavi aynaların kristale bakan kısmında <b>kırmızı bir engel</b> vardır. Yalnızca <b>Neon Yeşil</b> ayna kristale ışık verebilir!</p>
                <div className="flex justify-center items-center gap-6 py-4">
                    <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="w-12 h-1 bg-[#80DEEA] rotate-45 absolute rounded-full"></div>
                            <div className="w-12 h-1 bg-[#FF4444] rotate-45 absolute rounded-full translate-x-1 translate-y-1 shadow-[0_0_8px_#FF4444]"></div>
                        </div>
                        <span className="text-xs mt-2 text-[#FF4444] font-bold">Tıkanık (Mavi)</span>
                    </div>
                    <div className="text-xl text-gray-500">→</div>
                    <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="w-12 h-1.5 bg-[#39FF14] -rotate-45 absolute rounded-full shadow-[0_0_15px_#39FF14]"></div>
                        </div>
                        <span className="text-xs mt-2 text-[#39FF14] font-bold">Bitirici (Yeşil)</span>
                    </div>
                </div>
                <p className="text-sm text-gray-300">Işığı daima yeşil aynaya ulaştırmaya çalış.</p>
            </div>
        )
    }
];

export const HowToPlayModal: React.FC = () => {
    const showTutorial = usePuzzleStore(s => s.showTutorial);
    const setShowTutorial = usePuzzleStore(s => s.setShowTutorial);
    const markTutorialAsSeen = usePuzzleStore(s => s.markTutorialAsSeen);

    const [currentSlide, setCurrentSlide] = useState(0);

    if (!showTutorial) return null;

    const slide = slides[currentSlide];
    const isLast = currentSlide === slides.length - 1;

    const handleNext = () => {
        if (isLast) {
            setShowTutorial(false);
            markTutorialAsSeen();
            setCurrentSlide(0); // Reset for next time
        } else {
            setCurrentSlide(p => p + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl">

                {/* Header */}
                <div className="h-1.5 w-full flex bg-gray-800">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className="h-full flex-1 transition-colors duration-300"
                            style={{ backgroundColor: i <= currentSlide ? slide.color : 'transparent' }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center">
                    <span className="text-4xl mb-4" style={{ filter: `drop-shadow(0 0 10px ${slide.color})` }}>
                        {slide.icon}
                    </span>
                    <h2 className="text-xl font-bold mb-6 text-white text-center" style={{ color: slide.color }}>
                        {slide.title}
                    </h2>

                    <div className="min-h-[160px] flex flex-col justify-center w-full">
                        {slide.content}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-[#111] border-t border-[#333] flex justify-between items-center">
                    <button
                        onClick={() => { setShowTutorial(false); markTutorialAsSeen(); }}
                        className="px-4 py-2 text-gray-400 text-sm hover:text-white"
                    >
                        {isLast ? '' : 'Geç'}
                    </button>

                    <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded-lg font-bold text-black"
                        style={{ backgroundColor: slide.color, boxShadow: `0 0 15px ${slide.color}60` }}
                    >
                        {isLast ? 'Hadi Başlayalım!' : 'İleri'}
                    </button>
                </div>

            </div>
        </div>
    );
};
