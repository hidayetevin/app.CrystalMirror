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
        <div
            ref={wheelRef}
            className={`rotation-wheel ${isActive ? 'active' : 'closing'}`}
            style={{
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${currentAngle}deg)`,
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={onMouseUp}
            onPointerCancel={onMouseUp}
            onPointerLeave={onMouseUp}
        >
            <div className="wheel-center">
                <span className="wheel-angle-label" style={{ transform: `rotate(${-currentAngle}deg)` }}>
                    {currentAngle}°
                </span>
            </div>
            <div className="wheel-arrow"></div>

            <button
                className="snap-toggle-btn"
                style={{ transform: `rotate(${-currentAngle}deg)` }}
                onPointerDown={(e) => { e.stopPropagation(); onToggleSnap(); }}
            >
                {isFreeMode ? '🔓' : '🔒'}
            </button>
        </div>
    );
};
