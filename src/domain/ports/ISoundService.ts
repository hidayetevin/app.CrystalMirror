/**
 * Ses servisi port arayüzü.
 * Domain-layer — zero 3rd-party imports.
 */
export interface ISoundService {
    playBgMusic(): void;
    stopBgMusic(): void;
    playCrystalHit(): void;
    playMirrorSlide(): void;
    playVictory(): void;
    playHint(): void;
    playCrystalFill(): void;
    playNudge(): void;
    setMuted(muted: boolean): void;
}
