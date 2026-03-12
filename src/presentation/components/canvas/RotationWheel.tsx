import React, { useRef, useState, useEffect } from 'react';
import './RotationWheel.css'; // Stil dosyasını bağlayacağız.

interface Props {
    x: number;
    y: number;
    currentAngle: number;
    isFreeMode: boolean;
    onRotate: (angle: number) => void;
    onMouseUp: () => void;
    onToggleSnap: () => void;
}

/** 
 * Konva DOM'u dışında tamamen CSS ve HTML eventleri.
 * Mobil dokunmatik hassasiyeti ve Wheel çevrimi için optimum çözüm.
 */
export const RotationWheel: React.FC<Props> = ({
    x, y, currentAngle, isFreeMode, onRotate, onMouseUp, onToggleSnap
}) => {
    const wheelRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // Spawn animasyonu tetikleme
    useEffect(() => {
        setIsActive(true);
        return () => setIsActive(false);
    }, []);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!wheelRef.current) return;
        const rect = wheelRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Açı hesabı (-180 / 180) -> (0 - 360)
        let degrees = (Math.atan2(dy, dx) * 180) / Math.PI;
        degrees = ((degrees % 360) + 360) % 360;

        // Snap moduna göre zımparala
        if (!isFreeMode) {
            degrees = Math.round(degrees / 5) * 5;
        } else {
            degrees = Math.round(degrees);
        }

        // Uygulama motoruna bildir -> o da ephemerala aktarıp Raycast'i tetikler
        onRotate(degrees);
    };

    return (
        <>
            {/* Görünmez, tüm ekranı kaplayan dokunmatik algılama alanı */}
            <div
                className="rotation-drag-area"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999, // Arkaplandan üstte, butonlardan altta
                    touchAction: 'none'
                }}
                onPointerMove={handlePointerMove}
                onPointerUp={onMouseUp}
                onPointerCancel={onMouseUp}
                onPointerLeave={onMouseUp}
            />

            {/* Sadece Görsel Tekerlek (pointerEvents kapalı ki alttaki drag alanı çalışsın) */}
            <div
                ref={wheelRef}
                className={`rotation-wheel ${isActive ? 'active' : 'closing'}`}
                style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
                    pointerEvents: 'none'
                }}
            >
                <div className="wheel-center">
                    <span className="wheel-angle-label" style={{ transform: `rotate(${-currentAngle}deg)` }}>
                        {currentAngle}°
                    </span>
                </div>
                <div className="wheel-arrow"></div>
            </div>

            {/* Kilit Butonu (wheel dışına alındı ve tam koordinatta) */}
            <button
                className={`snap-toggle-btn ${isActive ? 'active' : 'closing'}`}
                style={{
                    left: x,
                    top: y + 90, // Aynanın hemen altı
                    transform: 'translate(-50%, 0)', // Merkeze hizala, 
                    pointerEvents: 'auto',
                    zIndex: 1001
                }}
                onPointerDown={(e) => { e.stopPropagation(); onToggleSnap(); }}
            >
                {isFreeMode ? '🔓' : '🔒'}
            </button>
        </>
    );
};
