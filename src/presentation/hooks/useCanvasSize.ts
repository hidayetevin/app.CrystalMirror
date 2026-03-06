import { useState, useEffect } from 'react';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';

export function useCanvasSize(cols: number, rows: number) {
    const [coords, setCoords] = useState<CoordinateSystem | null>(null);

    useEffect(() => {
        function calculate() {
            // 56px header + 50px (veya 0) banner
            const usableHeight = window.innerHeight - 56 - 60;
            const c = new CoordinateSystem(window.innerWidth, usableHeight, cols, rows);
            setCoords(c);
        }

        calculate();

        // Resize'da debounce ya da doğrudan çalıştır (şuanlık doğrudan)
        window.addEventListener('resize', calculate);
        return () => window.removeEventListener('resize', calculate);
    }, [cols, rows]);

    return coords;
}
