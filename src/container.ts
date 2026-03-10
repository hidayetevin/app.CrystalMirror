/// <reference types="vite/client" />
/**
 * Dependency Injection Container
 */
import { RaycastEngine } from './domain/physics/RaycastEngine';
import { CoordinateSystem } from './domain/value-objects/CoordinateSystem';
import { WinConditionChecker } from './domain/rules/WinConditionChecker';
import { StarRatingCalculator } from './domain/rules/StarRatingCalculator';
import { DailySeedGenerator } from './domain/rules/DailySeedGenerator';
import { MagneticSnapService } from './domain/rules/MagneticSnapService';
import { HintCalculator } from './domain/rules/HintCalculator';

import { StartPuzzleUseCase } from './application/use-cases/StartPuzzleUseCase';
import { RotateMirrorUseCase } from './application/use-cases/RotateMirrorUseCase';
import { SlideMirrorUseCase } from './application/use-cases/SlideMirrorUseCase';
import { CheckWinConditionUseCase } from './application/use-cases/CheckWinConditionUseCase';
import { UseHintUseCase } from './application/use-cases/UseHintUseCase';
import { LoadDailyChallengeUseCase } from './application/use-cases/LoadDailyChallengeUseCase';
import { SaveProgressUseCase } from './application/use-cases/SaveProgressUseCase';
import { ShareResultUseCase } from './application/use-cases/ShareResultUseCase';

import { HowlerSoundService } from './infrastructure/sound/HowlerSoundService';
import { AdMobService } from './infrastructure/ads/AdMobService';
import { MockAdService } from './infrastructure/ads/MockAdService';
import { HapticService } from './infrastructure/haptics/HapticService';
import { MockHapticService } from './infrastructure/haptics/MockHapticService';
import { CapacitorStorageService } from './infrastructure/storage/CapacitorStorageService';
import { CapacitorShareService } from './infrastructure/share/CapacitorShareService';

import { WORLD_ONE_LEVELS, WORLD_TWO_LEVELS, WORLD_THREE_LEVELS } from './infrastructure/levels';

const isDev = import.meta.env.DEV;

// 1. Infrastructure Services
export const adService = isDev ? new MockAdService() : new AdMobService();
export const hapticService = isDev ? new MockHapticService() : new HapticService();
export const storageService = new CapacitorStorageService();
export const shareService = new CapacitorShareService();
export const soundService = new HowlerSoundService();

// Default Coordinates
export const defaultCoords = new CoordinateSystem(400, 600, 6, 8);

// 2. Domain Services & Engines
export const raycastEngine = new RaycastEngine(); // State is calculated locally using canvas coordinations
export const winChecker = new WinConditionChecker();
export const starRatingCalculator = new StarRatingCalculator();
export const dailySeedGenerator = new DailySeedGenerator();
export const magneticSnapService = new MagneticSnapService(raycastEngine);
export const hintCalculator = new HintCalculator();

export const allLevels = [...WORLD_ONE_LEVELS, ...WORLD_TWO_LEVELS, ...WORLD_THREE_LEVELS];

// 3. Application Use Cases
export const startPuzzleCase = new StartPuzzleUseCase(raycastEngine, winChecker);
export const rotateMirrorCase = new RotateMirrorUseCase(raycastEngine, winChecker, magneticSnapService, soundService);
export const slideMirrorCase = new SlideMirrorUseCase(raycastEngine, winChecker, soundService);
export const checkWinConditionCase = new CheckWinConditionUseCase(raycastEngine, winChecker);
export const useHintCase = new UseHintUseCase(hintCalculator, soundService, raycastEngine);
export const loadDailyChallengeCase = new LoadDailyChallengeUseCase(dailySeedGenerator, storageService, allLevels);
export const saveProgressCase = new SaveProgressUseCase(storageService);
export const shareResultCase = new ShareResultUseCase(shareService);
