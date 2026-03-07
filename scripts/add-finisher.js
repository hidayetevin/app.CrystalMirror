/**
 * add-finisher.js
 * Her level dosyasındaki her bölümün mirrors dizisindeki
 * son aynaya `isFinisher: true` ekler.
 * Zaten `isFinisher` olan satırları tekrar eklemez.
 */
const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '../src/infrastructure/levels/WorldOneLevels.ts'),
    path.join(__dirname, '../src/infrastructure/levels/WorldTwoLevels.ts'),
    path.join(__dirname, '../src/infrastructure/levels/WorldThreeLevels.ts'),
];

/**
 * isFinisher zaten varsa atla
 * Her mirror bloğunu bul, son olanın `"isMovable": true` satırından sonra
 * `"isFinisher": true` ekle.
 *
 * Strateji: `"mirrors": [` ... `]` blokları arasındaki her `"isMovable": true`
 * satırını işaretle, son olanı finisher say.
 */
function processFile(filePath) {
    let src = fs.readFileSync(filePath, 'utf8');

    // Zaten işlenmiş mi?
    if (src.includes('"isFinisher": true') || src.includes('isFinisher: true')) {
        console.log(`SKIP (already processed): ${path.basename(filePath)}`);
        return;
    }

    // "mirrors": [ ... ] bloklarını bul ve içlerindeki son isMovable'a isFinisher ekle
    // Regex: mirrors dizisi açılır, içinde birden fazla mirror objesi olabilir
    // Her mirror objesi { ... "isMovable": true } ile biter
    // Son mirror objesinin isMovable'ına ekle

    // Yaklaşım: Her bölümü `"mirrors": [` ile bir sonraki `"crystals":` arasındaki
    // metni al, o metin içindeki en son `"isMovable": true` satırını bul, oraya ekle.

    const levelSections = [];
    let searchFrom = 0;

    while (true) {
        const mirrorsStart = src.indexOf('"mirrors": [', searchFrom);
        if (mirrorsStart === -1) break;

        // Bu mirrors bloğunun kapanma parentezini bul - crystals'a kadar olan kısmı al
        const crystalsIdx = src.indexOf('"crystals":', mirrorsStart);
        if (crystalsIdx === -1) break;

        const mirrorsBlock = src.substring(mirrorsStart, crystalsIdx);

        // Bu blok içindeki tüm "isMovable" konumlarını bul
        const isMovablePositions = [];
        let imSearch = 0;
        while (true) {
            const imIdx = mirrorsBlock.indexOf('"isMovable": true', imSearch);
            if (imIdx === -1) break;
            isMovablePositions.push(mirrorsStart + imIdx);
            imSearch = imIdx + 1;
        }

        if (isMovablePositions.length > 0) {
            // Son isMovable'ın global pozisyonu
            const lastIsMovableGlobal = isMovablePositions[isMovablePositions.length - 1];
            levelSections.push(lastIsMovableGlobal);
        }

        searchFrom = crystalsIdx + 1;
    }

    // Sonda olan pozisyondan başa giderek ekle (pozisyonlar kaymasın)
    // Her son isMovable satırının sonuna \n + indent + isFinisher ekle
    levelSections.sort((a, b) => b - a); // Büyükten küçüğe, sondan başa

    for (const pos of levelSections) {
        // isMovable satırının sonunu bul (satır sonu)
        const lineEnd = src.indexOf('\n', pos);
        if (lineEnd === -1) continue;

        // Aynı indent'i bul
        let indentStart = pos;
        while (indentStart > 0 && src[indentStart - 1] !== '\n') {
            indentStart--;
        }
        const indent = src.substring(indentStart, pos).match(/^(\s*)/)?.[1] || '                ';

        // isMovable satırına virgül ekle (yoksa) ve isFinisher satırını ekle
        const isMovableLine = src.substring(pos, lineEnd);

        // isMovable satırında virgül var mı? (Sonraki satır } ise virgül yok olabilir)
        const afterLine = src.substring(lineEnd + 1).trimStart();
        const currentLineHasComma = isMovableLine.endsWith(',');

        let insertion;
        if (currentLineHasComma) {
            insertion = `\n${indent}"isFinisher": true`;
        } else {
            // isMovable satırına virgül ekle
            insertion = `,\n${indent}"isFinisher": true`;
        }

        src = src.substring(0, lineEnd) + insertion + src.substring(lineEnd);
    }

    fs.writeFileSync(filePath, src, 'utf8');
    console.log(`DONE: ${path.basename(filePath)} — ${levelSections.length} finisher(s) marked`);
}

files.forEach(processFile);
console.log('\nAll done!');
