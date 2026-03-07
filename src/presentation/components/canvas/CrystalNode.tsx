import React, { memo, useEffect, useRef } from 'react';
import { Circle, Group, Line } from 'react-konva';
import Konva from 'konva';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';
import { Crystal } from '../../../domain/entities/Crystal';

interface Props {
    crystal: Crystal;
    coords: CoordinateSystem;
    fillLevel: number; // 0.0 - 1.0
}

/** Elmas (💎) için köşe noktaları üret — `scale` parametresiyle büyür */
function diamondPoints(r: number): number[] {
    return [
        -r * 0.4, -r * 0.5,  // Üst sol köşe (flat top)
        r * 0.4, -r * 0.5,  // Üst sağ köşe
        r * 0.9, -r * 0.1,  // Sağ geniş kısım
        0, r * 0.8,  // Alt uç
        -r * 0.9, -r * 0.1,  // Sol geniş kısım
    ];
}

export const CrystalNode: React.FC<Props> = memo(({ crystal, coords, fillLevel }) => {
    const pixelPos = coords.gridToPixel(crystal.position);
    const radius = coords.cellSize * 0.35;

    const baseColor = crystal.color === 'RED' ? '#FF4444' :
        crystal.color === 'BLUE' ? '#4488FF' :
            crystal.color === 'YELLOW' ? '#FFCC00' :
                crystal.color === 'PRISM' ? '#E1BEE7' : '#FFFFFF';

    const isFilled = fillLevel >= 1.0;

    // Elmas animasyonu refs
    const diamondRef = useRef<Konva.Line | null>(null);
    const glowRef = useRef<Konva.Line | null>(null);
    const animRef = useRef<Konva.Animation | null>(null);

    useEffect(() => {
        if (!isFilled) {
            // Animasyonu durdur ve sıfırla
            animRef.current?.stop();
            animRef.current = null;
            if (diamondRef.current) {
                diamondRef.current.scaleX(0);
                diamondRef.current.scaleY(0);
                diamondRef.current.opacity(0);
            }
            if (glowRef.current) {
                glowRef.current.scaleX(0);
                glowRef.current.scaleY(0);
                glowRef.current.opacity(0);
            }
            return;
        }

        // Kristal dolduğunda elmas animasyonunu başlat
        const startTime = performance.now();
        const DURATION = 2200; // ms

        const anim = new Konva.Animation((frame) => {
            if (!frame) return;
            const elapsed = performance.now() - startTime;
            const t = Math.min(elapsed / DURATION, 1);

            // Ease-out cubic: hızlı büyüyüp yavaşlar
            const ease = 1 - Math.pow(1 - t, 3);

            // Ana elmas: 0 → 1.6× büyür
            const scale = ease * 1.6;
            // Opaklık: 0→0.3'te tam gelir, sonra solar
            const opacity = t < 0.3
                ? t / 0.3
                : 1 - ((t - 0.3) / 0.7) * 0.4;

            if (diamondRef.current) {
                diamondRef.current.scaleX(scale);
                diamondRef.current.scaleY(scale);
                diamondRef.current.opacity(opacity);
            }

            // Glow elmas: ana elmastan daha büyük, daha şeffaf
            if (glowRef.current) {
                glowRef.current.scaleX(scale * 1.3);
                glowRef.current.scaleY(scale * 1.3);
                glowRef.current.opacity(opacity * 0.4);
            }
        }, diamondRef.current?.getLayer() ?? undefined);

        anim.start();
        animRef.current = anim;

        return () => {
            anim.stop();
        };
    }, [isFilled]);

    return (
        <Group x={pixelPos.x} y={pixelPos.y}>
            {/* Temel kristal dairesi */}
            <Circle
                x={0}
                y={0}
                radius={radius}
                stroke={crystal.isTarget ? '#FFD700' : '#333'}
                strokeWidth={crystal.isTarget ? 3 : 1}
                fill={isFilled ? baseColor : 'transparent'}
                shadowColor={isFilled ? baseColor : 'transparent'}
                shadowBlur={isFilled ? 20 : 0}
            />

            {/* Prizma ikonu */}
            {crystal.color === 'PRISM' && (
                <Line
                    points={[0, -radius * 0.6, radius * 0.6, radius * 0.4, -radius * 0.6, radius * 0.4]}
                    closed
                    stroke={isFilled ? '#FFFFFF' : '#E1BEE7'}
                    strokeWidth={2}
                    opacity={0.7}
                />
            )}

            {/* Glow elmas (arka plan katmanı) */}
            <Line
                ref={glowRef}
                points={diamondPoints(radius * 2)}
                closed
                fill={baseColor}
                stroke="transparent"
                strokeWidth={0}
                scaleX={0}
                scaleY={0}
                opacity={0}
                shadowColor={baseColor}
                shadowBlur={30}
            />

            {/* Ana elmas */}
            <Line
                ref={diamondRef}
                points={diamondPoints(radius * 2)}
                closed
                fill={baseColor}
                stroke="#FFFFFF"
                strokeWidth={2}
                scaleX={0}
                scaleY={0}
                opacity={0}
                shadowColor="#FFFFFF"
                shadowBlur={15}
            />
        </Group>
    );
});

CrystalNode.displayName = 'CrystalNode';

CrystalNode.displayName = 'CrystalNode';
