import React from 'react';

/**
 * Native ortamda (Capacitor) BannerAdContainer icerisinde gercek rendering yapmaz,
 * Capacitor AdMob plugin kendi Native View'ini webview altina/ustune acar.
 * Fakat bu Container, AdMob reklaminin WebView in altinda ezilmemesi veya
 * bizim UI mizi ezmemesi icin HTML tarafinda "boslugu (placeholder)" temsil eder.
 */
export const BannerAdContainer: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center text-white/30 text-xs tracking-widest bg-black/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-pattern-stripes opacity-10"></div>
            REKLAM ALANI

            <style>{`
         .bg-pattern-stripes {
            background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);
         }
      `}</style>
        </div>
    );
};
