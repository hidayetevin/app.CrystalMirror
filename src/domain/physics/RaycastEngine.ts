/**
 * Ana ışın izleme motoru — yansıma/kırılma zinciri.
 * Domain-layer — zero 3rd-party imports.
 */
import { CoordinateSystem } from '../value-objects/CoordinateSystem';
import { RayColor, colorPassesFilter, splitByPrism } from '../value-objects/Color';
import { Vector2D } from '../value-objects/Vector2D';
import { Puzzle } from '../entities/Puzzle';
import { getMirrorSegment, getMirrorNormal } from './MirrorGeometry';
import { raySegmentIntersection, rayCrystalIntersection } from './CollisionDetector';

export interface RaySegment {
    start: Vector2D;
    end: Vector2D;
    color: RayColor;
    hitObjectId: string | null; // Son çarptığı nesne ID'si
}

export interface TraceResult {
    segments: RaySegment[];
    crystalFills: Map<string, number>; // crystalId → fillLevel (0–1)
}

/**
 * Işık kaynağından başlayarak tüm yansımaları hesaplar.
 * Render katmanına RaySegment[] döner — Canvas API bilmez.
 */
export class RaycastEngine {
    private readonly MAX_BOUNCES = 20;
    private readonly MAX_TOTAL_DISTANCE = 4000;
    private readonly MAX_SPLIT_DEPTH = 5;

    constructor(private readonly coords: CoordinateSystem) { }

    trace(puzzle: Puzzle): TraceResult {
        const segments: RaySegment[] = [];
        const crystalFills = new Map<string, number>();

        const startOrigin = this.coords.gridToPixel(puzzle.lightSource.position);
        const startDir = puzzle.lightSource.direction.normalize();

        this.traceRecursive(
            puzzle,
            startOrigin,
            startDir,
            puzzle.lightSource.color,
            segments,
            crystalFills,
            0,
            0,
            0
        );

        return { segments, crystalFills };
    }

    private traceRecursive(
        puzzle: Puzzle,
        origin: Vector2D,
        direction: Vector2D,
        color: RayColor,
        segments: RaySegment[],
        crystalFills: Map<string, number>,
        bounces: number,
        totalDistance: number,
        splitDepth: number
    ): void {
        if (bounces >= this.MAX_BOUNCES || totalDistance >= this.MAX_TOTAL_DISTANCE) {
            return;
        }

        const hit = this.findNearestHit(origin, direction, puzzle);

        if (!hit) {
            // Çarpışma yoksa canvas sınırlarına kadar uzat
            const endPoint = this.extendToCanvasBound(origin, direction);
            segments.push({
                start: origin,
                end: endPoint,
                color,
                hitObjectId: null,
            });
            return;
        }

        const dist = origin.distanceTo(hit.point);
        const newTotalDist = totalDistance + dist;

        // Segmenti ekle
        segments.push({
            start: origin,
            end: hit.point,
            color,
            hitObjectId: hit.objectId,
        });

        if (hit.type === 'CRYSTAL') {
            const crystal = puzzle.crystals.find((c) => c.id === hit.objectId);
            if (!crystal) return;

            if (colorPassesFilter(color, crystal.color)) {
                if (crystal.isTarget) {
                    // Kristal dolumu, % oranına göre değil, ulaşma = tam dolum.
                    crystalFills.set(crystal.id, 1.0);
                }

                // PRISM mekaniği
                if (crystal.color === 'PRISM' && splitDepth < this.MAX_SPLIT_DEPTH) {
                    const splits = splitByPrism(direction, color);
                    for (const split of splits) {
                        this.traceRecursive(
                            puzzle,
                            hit.point,
                            split.direction,
                            split.color,
                            segments,
                            crystalFills,
                            bounces + 1,
                            newTotalDist,
                            splitDepth + 1
                        );
                    }
                }
            }
            return; // Filtreden geçse de geçmese de kristalde ışın durur (hedefse). Yansıma mekaniği kristalde yok.
        }

        if (hit.type === 'MIRROR') {
            const mirror = puzzle.mirrors.find((m) => m.id === hit.objectId);
            if (!mirror) return;

            const normal = getMirrorNormal(mirror, direction);
            const reflectedDir = direction.reflect(normal).normalize();

            this.traceRecursive(
                puzzle,
                hit.point,
                reflectedDir,
                color,
                segments,
                crystalFills,
                bounces + 1,
                newTotalDist,
                splitDepth
            );
        }
    }

    private findNearestHit(
        origin: Vector2D,
        direction: Vector2D,
        puzzle: Puzzle
    ): { point: Vector2D; objectId: string; type: 'MIRROR' | 'CRYSTAL'; t: number } | null {
        let nearest: { point: Vector2D; t: number; objectId: string; type: 'MIRROR' | 'CRYSTAL' } | null = null;

        for (const mirror of puzzle.mirrors) {
            const segment = getMirrorSegment(mirror, this.coords);
            const hit = raySegmentIntersection(origin, direction, segment);
            if (hit && (!nearest || hit.t < nearest.t)) {
                nearest = { ...hit, objectId: mirror.id, type: 'MIRROR' };
            }
        }

        for (const crystal of puzzle.crystals) {
            const hit = rayCrystalIntersection(origin, direction, crystal, this.coords);
            if (hit && (!nearest || hit.t < nearest.t)) {
                nearest = { ...hit, objectId: crystal.id, type: 'CRYSTAL' };
            }
        }

        return nearest;
    }

    /** Işını canvas/grid sınırına kadar uzatır */
    private extendToCanvasBound(origin: Vector2D, dir: Vector2D): Vector2D {
        // Koordinatlar grid hücreleri için geçerli olduğundan maksimum genişlik map boyutları olmalı
        const bounds = {
            minX: this.coords.offsetX,
            maxX: this.coords.offsetX + this.coords.cellSize * this.coords.cols,
            minY: this.coords.offsetY,
            maxY: this.coords.offsetY + this.coords.cellSize * this.coords.rows,
        };

        const ts = [
            dir.x > 0 ? (bounds.maxX - origin.x) / dir.x : Infinity,
            dir.x < 0 ? (bounds.minX - origin.x) / dir.x : Infinity,
            dir.y > 0 ? (bounds.maxY - origin.y) / dir.y : Infinity,
            dir.y < 0 ? (bounds.minY - origin.y) / dir.y : Infinity,
        ];

        const t = Math.min(...ts.filter((v) => v > 0 && Number.isFinite(v)));

        if (t === Infinity || t <= 0) {
            // Floating point istisnası durumunda uzun bir çizgi çiz
            return new Vector2D(origin.x + dir.x * 2000, origin.y + dir.y * 2000);
        }

        return new Vector2D(origin.x + dir.x * t, origin.y + dir.y * t);
    }
}
