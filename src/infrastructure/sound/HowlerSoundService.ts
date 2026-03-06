/**
 * Ses yönetimi: Howler.js implementasyonu.
 */
import { Howl } from 'howler';
import { ISoundService } from '../../domain/ports/ISoundService';

export class HowlerSoundService implements ISoundService {
    private bgMusic: Howl;
    private crystalHit: Howl;
    private mirrorSlide: Howl;
    private victorySound: Howl;
    private hintSound: Howl;
    private crystalFillSound: Howl;
    private nudgeSound: Howl;

    constructor() {
        this.bgMusic = new Howl({
            src: ['/assets/sounds/ambient.mp3', '/assets/sounds/ambient.ogg'],
            loop: true,
            volume: 0.35
        });

        this.crystalHit = new Howl({
            src: ['/assets/sounds/crystal-hit.mp3', '/assets/sounds/crystal-hit.ogg'],
            volume: 0.8
        });

        this.mirrorSlide = new Howl({
            src: ['/assets/sounds/mirror-slide.mp3', '/assets/sounds/mirror-slide.ogg'],
            volume: 0.6
        });

        this.victorySound = new Howl({
            src: ['/assets/sounds/victory.mp3', '/assets/sounds/victory.ogg'],
            volume: 0.9
        });

        this.hintSound = new Howl({
            src: ['/assets/sounds/hint.mp3', '/assets/sounds/hint.ogg'],
            volume: 0.7
        });

        this.crystalFillSound = new Howl({
            src: ['/assets/sounds/crystal-fill.mp3', '/assets/sounds/crystal-fill.ogg'],
            volume: 0.75
        });

        this.nudgeSound = new Howl({
            src: ['/assets/sounds/hint.mp3'], // Geliştirici tercihine göre hafif ses (örnekleme)
            volume: 0.3,
            rate: 1.5
        });
    }

    playBgMusic(): void { if (!this.bgMusic.playing()) this.bgMusic.play(); }
    stopBgMusic(): void { this.bgMusic.pause(); }
    playCrystalHit(): void { this.crystalHit.play(); }
    playMirrorSlide(): void { this.mirrorSlide.play(); }
    playVictory(): void { this.victorySound.play(); }
    playHint(): void { this.hintSound.play(); }
    playCrystalFill(): void { this.crystalFillSound.play(); }
    playNudge(): void { this.nudgeSound.play(); }

    setMuted(muted: boolean): void {
        Howler.mute(muted);
    }
}
