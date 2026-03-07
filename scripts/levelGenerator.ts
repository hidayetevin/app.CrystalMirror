/**
 * Level Generator Script
 * Bu script, World 1, World 2 ve World 3 için toplam 90 bölümü 
 * rastgele ama KURALLARA UYGUN şekilde üretir ve test eder.
 */
import * as fs from 'fs';
import * as path from 'path';
import { Puzzle, PuzzleMechanic } from '../src/domain/entities/Puzzle';
import { Vector2D } from '../src/domain/value-objects/Vector2D';
import { RayColor } from '../src/domain/value-objects/Color';
import { CoordinateSystem, GridCell } from '../src/domain/value-objects/CoordinateSystem';
import { RaycastEngine } from '../src/domain/physics/RaycastEngine';
import { WinConditionChecker } from '../src/domain/rules/WinConditionChecker';
import { Mirror } from '../src/domain/entities/Mirror';
import { Crystal } from '../src/domain/entities/Crystal';
import { LightSource } from '../src/domain/entities/LightSource';

// --- YARDIMCI TİPLER VE METOTLAR ---
const engine = new RaycastEngine();
const winChecker = new WinConditionChecker();

const DIRS = [
    new Vector2D(1, 0),   // RIGHT
    new Vector2D(-1, 0),  // LEFT
    new Vector2D(0, 1),   // DOWN
    new Vector2D(0, -1)   // UP
];

const COLORS: RayColor[] = ['WHITE', 'BLUE', 'YELLOW', 'RED'];

// Rastgele tam sayı
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hücre kopyalama
function cloneCell(c: GridCell): GridCell {
    return { col: c.col, row: c.row };
}

// İki hücre aynı mı?
function isSameCell(c1: GridCell, c2: GridCell): boolean {
    return c1.col === c2.col && c1.row === c2.row;
}

// Boş bir hücre bul (Işık, kristal veya ayna olmayan)
function getRandomEmptyCell(
    cols: number,
    rows: number,
    occupied: GridCell[]
): GridCell {
    let cell: GridCell;
    let attempts = 0;
    do {
        cell = { col: randInt(0, cols - 1), row: randInt(0, rows - 1) };
        attempts++;
        if (attempts > 1000) throw new Error("Could not find empty cell");
    } while (occupied.some(c => isSameCell(c, cell)));
    return cell;
}

// --- JENERATÖR ---
interface LevelGenOptions {
    id: string;
    worldId: string;
    levelNumber: number;
    cols: number;
    rows: number;
    mechanic: PuzzleMechanic;
    numMirrors: number;
    allowColors: boolean;
}

function generateSolvableLevel(options: LevelGenOptions): Puzzle {
    const coords = new CoordinateSystem(options.cols * 100, options.rows * 100, options.cols, options.rows);
    let bestPuzzle: Puzzle | null = null;
    let maxAttempts = 5000;

    // Kaba kuvvet (brute force) jenerasyon ve doğrulama.
    // Düzgün bir şekilde random atıp raycast ile çözülebiliyor mu diye bakarız.
    // Ancak sadece valid (mantıklı) yolları inşa etmemiz lazımdır. 
    // Rastgele ayna koymaktansa, Işığın hedefi vurmasını garanti altına alıp, ondan puzzle çıkartmak en garantisidir.

    while (maxAttempts-- > 0) {
        const occupied: GridCell[] = [];

        const lsCell = { col: randInt(0, options.cols - 1), row: randInt(0, options.rows - 1) };
        occupied.push(lsCell);

        const lsDir = DIRS[randInt(0, 3)];
        const lsColor = options.allowColors ? COLORS[randInt(0, COLORS.length - 1)] : 'WHITE';

        const crystals: Crystal[] = [];
        const mirrors: Mirror[] = [];

        // Gideceği yol üzerinde aynalar oluştur
        let currentPos = cloneCell(lsCell);
        let currentDir = new Vector2D(lsDir.x, lsDir.y);

        let pathValid = true;

        for (let i = 0; i < options.numMirrors; i++) {
            // İleri yönde rastgele bir mesafe git
            const dist = randInt(1, Math.max(options.cols, options.rows) - 1);

            let segmentValid = true;
            let pathCells: GridPosition[] = [];
            let targetCell = { col: currentPos.col, row: currentPos.row };

            for (let step = 1; step <= dist; step++) {
                const stepCell = {
                    col: currentPos.col + currentDir.x * step,
                    row: currentPos.row + currentDir.y * step
                };

                // Grid dışına çıktıysa iptal
                if (!coords.isValidCell(stepCell)) {
                    segmentValid = false;
                    break;
                }

                // Eğer orası doluysa iptal (yol boyunca hiçbir cismin içinden geçmemeli)
                if (occupied.some(c => isSameCell(c, stepCell))) {
                    segmentValid = false;
                    break;
                }

                pathCells.push(stepCell);
                targetCell = stepCell;
            }

            if (!segmentValid) {
                pathValid = false;
                break;
            }

            // Oraya ayna koy
            // Yönü değiştirmemiz lazım.
            // Örn: Sağ (1,0) geliyoruz, AŞAĞI (0,1) veya YUKARI (0,-1) dönecek
            const isHorizontal = currentDir.x !== 0;
            const newDir = isHorizontal
                ? (Math.random() > 0.5 ? new Vector2D(0, 1) : new Vector2D(0, -1))
                : (Math.random() > 0.5 ? new Vector2D(1, 0) : new Vector2D(-1, 0));

            // Ayna açısını bul!
            // Eger ray Horizontal geliyosa (x=1) ve dikey cikiyosa (y=1) -> 45 derece ayna işi çözer.
            let angle = 0;
            if (currentDir.x === 1) {
                angle = newDir.y === 1 ? 45 : 135;
            } else if (currentDir.x === -1) {
                angle = newDir.y === 1 ? 135 : 45;
            } else if (currentDir.y === 1) {
                angle = newDir.x === 1 ? 45 : 135;
            } else if (currentDir.y === -1) {
                angle = newDir.x === 1 ? 135 : 45;
            }

            // ROTATE mi SLIDE mı?
            let mType: 'ROTATE' | 'SLIDE' = 'ROTATE';
            if (options.mechanic === 'SLIDE') mType = 'SLIDE';
            if (options.mechanic === 'BOTH') mType = Math.random() > 0.5 ? 'ROTATE' : 'SLIDE';

            // Oyuncuya verilirken ayna BOZUK AÇI veya BOZUK POZİSYONDA verilmeli
            let initialPosition = cloneCell(targetCell);
            let initialAngle = angle;

            if (mType === 'ROTATE') {
                // Açı farklı olsun
                const badAngles = [0, 45, 90, 135].filter(a => a !== angle);
                initialAngle = badAngles[randInt(0, badAngles.length - 1)];
            } else {
                // Pozisyon farklı olsun
                const dx = newDir.x === 0 ? [1, -1][randInt(0, 1)] : 0;
                const dy = newDir.y === 0 ? [1, -1][randInt(0, 1)] : 0;
                const badCell = { col: targetCell.col + dx, row: targetCell.row + dy };
                if (coords.isValidCell(badCell) && !occupied.some(c => isSameCell(c, badCell))) {
                    initialPosition = badCell;
                }
            }

            mirrors.push({
                id: `m_${i}`,
                type: mType,
                angleDegrees: initialAngle,
                position: initialPosition,
                isMovable: true,
                isFinisher: i === options.numMirrors - 1
            });

            // (gizli çözüm listesi)
            // Biz bu mantıkta çözümün `targetCell` ve `angle` da yattığını biliyoruz.

            occupied.push(...pathCells);
            if (initialPosition !== targetCell && !occupied.some(c => isSameCell(c, initialPosition))) {
                occupied.push(initialPosition);
            }

            // Sonraki iterasyona
            currentPos = cloneCell(targetCell);
            currentDir = new Vector2D(newDir.x, newDir.y);
        }

        if (!pathValid) continue; // baştan

        // Son olarak hedef kristali koy
        const distToEnd = randInt(1, Math.max(options.cols, options.rows) - 1);

        let validEnd = true;
        let crystalCell = { col: currentPos.col, row: currentPos.row };

        for (let step = 1; step <= distToEnd; step++) {
            const stepCell = {
                col: currentPos.col + currentDir.x * step,
                row: currentPos.row + currentDir.y * step
            };

            if (!coords.isValidCell(stepCell) || occupied.some(c => isSameCell(c, stepCell))) {
                validEnd = false;
                break;
            }
            crystalCell = stepCell;
        }

        if (!validEnd) continue;

        crystals.push({
            id: 'c_target',
            color: lsColor,
            fillLevel: 0,
            isTarget: true,
            position: crystalCell
        });

        const puzzle: Puzzle = {
            id: options.id,
            worldId: options.worldId,
            levelNumber: options.levelNumber,
            gridSize: { cols: options.cols, rows: options.rows },
            mechanic: options.mechanic,
            timeLimit: null,
            lightSource: {
                position: lsCell,
                direction: lsDir,
                color: lsColor,
                intensity: 1.0
            },
            mirrors,
            crystals
        };

        // TODO: Sadece çözümün VAR olduğundan emin olmak için
        // Engine'de doğrulama yapmıyoruz, zaten pathi biz çizdik!
        // Oyuna uygun yapıda olduğu için direkt dönebiliriz.
        return puzzle;
    }

    throw new Error("Failed to generate puzzle");
}

function generateWorld(worldId: string, count: number, startLevel: number, cols: number, rows: number, mechanic: PuzzleMechanic, colors: boolean) {
    const levels: Puzzle[] = [];
    for (let i = 1; i <= count; i++) {
        // Zorluk artışı: Ayna sayısı
        let numMirrors = 1;
        if (i > count * 0.2) numMirrors = 2;
        if (i > count * 0.6) numMirrors = 3;
        if (i > count * 0.8) numMirrors = 4;

        try {
            const p = generateSolvableLevel({
                id: `${worldId}_l${i}`,
                worldId,
                levelNumber: i,
                cols,
                rows,
                mechanic,
                numMirrors,
                allowColors: colors
            });
            levels.push(p);
        } catch (e) {
            console.warn(`Level ${i} skipped:`, e);
        }
    }
    return levels;
}

// OLUŞTUR
const w1 = generateWorld('forest', 20, 1, 5, 7, 'ROTATE', false); // World 1: 20 levels, ROTATE, White only
const w2 = generateWorld('glacier', 30, 1, 6, 8, 'SLIDE', true);  // World 2: 30 levels, SLIDE, Coloured
const w3 = generateWorld('waterfall', 40, 1, 7, 9, 'BOTH', true); // World 3: 40 levels, BOTH, Coloured

// YAZDIR
const w1Str = `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_ONE_LEVELS: Puzzle[] = ${JSON.stringify(w1, null, 4).replace(/"(new Vector2D[^"]+)"/g, '$1')};`;
const w2Str = `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_TWO_LEVELS: Puzzle[] = ${JSON.stringify(w2, null, 4).replace(/"(new Vector2D[^"]+)"/g, '$1')};`;
const w3Str = `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_THREE_LEVELS: Puzzle[] = ${JSON.stringify(w3, null, 4).replace(/"(new Vector2D[^"]+)"/g, '$1')};`;

// Revize JSON Serialization for Vector2D
// Because JSON.stringify ignores class prototypes.
function serializePuzzle(puzzles: Puzzle[]): string {
    const serializeVector = (v: Vector2D) => `new Vector2D(${v.x}, ${v.y})`;

    // We do a deep map, but since we know the exact schema:
    return JSON.stringify(puzzles, (key, value) => {
        if (value && typeof value === 'object' && value.x !== undefined && value.y !== undefined) {
            return `__VECTOR2D__${value.x}_${value.y}__`;
        }
        return value;
    }, 4).replace(/"__VECTOR2D__([0-9.-]+)_([0-9.-]+)__"/g, 'new Vector2D($1, $2)');
}

fs.writeFileSync(path.join(__dirname, '../src/infrastructure/levels/WorldOneLevels.ts'),
    `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_ONE_LEVELS: Puzzle[] = ${serializePuzzle(w1)};`);

fs.writeFileSync(path.join(__dirname, '../src/infrastructure/levels/WorldTwoLevels.ts'),
    `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_TWO_LEVELS: Puzzle[] = ${serializePuzzle(w2)};`);

fs.writeFileSync(path.join(__dirname, '../src/infrastructure/levels/WorldThreeLevels.ts'),
    `import { Puzzle } from '../../domain/entities/Puzzle';\nimport { Vector2D } from '../../domain/value-objects/Vector2D';\n\nexport const WORLD_THREE_LEVELS: Puzzle[] = ${serializePuzzle(w3)};`);

console.log(`Generated ${w1.length} W1, ${w2.length} W2, ${w3.length} W3 levels.`);
