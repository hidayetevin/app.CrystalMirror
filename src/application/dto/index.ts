/**
 * DTOs for application use cases.
 */
import { Puzzle } from '../../domain/entities/Puzzle';
import { RaySegment } from '../../domain/physics/RaycastEngine';
import { SnapResult } from '../../domain/rules/MagneticSnapService';
import { PuzzleStatus } from '../../domain/value-objects/PuzzleStatus';
import { DailyRecord } from '../../domain/ports/IStorageService';
import { StarRating } from '../../domain/value-objects/StarRating';

export interface PuzzleStateDTO {
    puzzle: Puzzle;
    raySegments: RaySegment[];
    crystalFills: Map<string, number>;
    status: PuzzleStatus;
    snapResult?: SnapResult; // Eğer MagneticSnap çalıştıysa
    stars?: StarRating; // Eğer oyun bittiyse (SOLVED)
}

export interface HintDTO {
    mirrorId: string;          // Birincil ipucu aynası (geriye dönük uyumluluk)
    suggestedAngle: number;    // Birincil ayna açısı
    score: number;             // 0-1 arası çözüm kalitesi
    mirrorAngles: Record<string, number>; // Tüm aynalar için çözüm açıları
}

export interface DailyChallengeDTO {
    puzzle: Puzzle;
    dateKey: string;
    alreadyPlayed: boolean;
    previousResult: DailyRecord | null;
}

export interface PuzzleResult {
    puzzleId: string;
    levelNumber: number;
    stars: StarRating;
    timeSeconds: number;
    totalMoves: number;
    hintsUsed: number;
    moves: Array<{ wasHint: boolean }>; // Emoji grid için
}
