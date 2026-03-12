import React, { useRef, useState, useEffect, useCallback } from 'react';
import './RotationWheel.css';

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
 * Mobil dokunmatik hassasiyeti için:
 * - setPointerCapture: parmak elemandan çıksa da takip devam eder
 * - x/y prop'larından merkez hesaplanır (DOM bağımsız, güvenilir)
 */
export const RotationWheel: React.FC<Props> = ({
    x, y, currentAngle, isFreeMode, onRotate, onMouseUp, onToggleSnap
}) => {
    const dragAreaRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // Spawn animasyonu tetikleme
    useEffect(() => {
        setIsActive(true);
        return () => setIsActive(false);
    }, []);

    // Merkezi x/y prop'larından hesapla (viewport koordinatına çevir)
    // dragArea fixed: inset:0 olduğu için clientX/Y ile doğrudan karşılaştırılabilir
    // Ancak x/y canvas'a göre relative; container offsetini bulmamız lazım
    const containerRef = useRef<HTMLDivElement>(null);

    const computeAngle = useCallback((clientX: number, clientY: number): number => {
        if (!containerRef.current) return 0;
        // Canvas container'ın viewport'a göre konumunu bul
        const rect = containerRef.current.getBoundingClientRect();
        // Ayna merkezinin viewport konumu = container offset + x/y
        const cx = rect.left + x;
        const cy = rect.top + y;

        const dx = clientX - cx;
        const dy = clientY - cy;

        let degrees = (Math.atan2(dy, dx) * 180) / Math.PI;
        degrees = ((degrees % 360) + 360) % 360;

        if (!isFreeMode) {
            degrees = Math.round(degrees / 5) * 5;
        } else {
            degrees = Math.round(degrees);
        }

        return degrees;
    }, [x, y, isFreeMode]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Pointer'ı yakala: parmak her yere giderse gitsin olaylar bu elemana gelsin
        e.currentTarget.setPointerCapture(e.pointerId);
        // İlk dokunuşta da açıyı hesapla (hareketsiz tap için)
        const degrees = computeAngle(e.clientX, e.clientY);
        onRotate(degrees);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        // Sadece capture edilmiş pointer (basılı parmak) hareketi
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        const degrees = computeAngle(e.clientX, e.clientY);
        onRotate(degrees);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        onMouseUp();
    };

    return (
        // containerRef: canvas container'ın konumunu bulmak için gizli bir anchor
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Görünmez, tüm ekranı kaplayan dokunmatik algılama alanı */}
            <div
                ref={dragAreaRef}
                className="rotation-drag-area"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999,
                    touchAction: 'none',
                    pointerEvents: 'auto',
                    cursor: 'crosshair',
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            />

            {/* Sadece Görsel Tekerlek (pointerEvents kapalı ki drag alanı çalışsın) */}
            <div
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

            {/* Kilit Butonu */}
            <button
                className={`snap-toggle-btn ${isActive ? 'active' : 'closing'}`}
                style={{
                    left: x,
                    top: y + 75,
                    transform: 'translate(-50%, 0)',
                    pointerEvents: 'auto',
                    zIndex: 1001
                }}
                onPointerDown={(e) => { e.stopPropagation(); onToggleSnap(); }}
            >
                {isFreeMode ? '🔓' : '🔒'}
            </button>
        </div>
    );
};
