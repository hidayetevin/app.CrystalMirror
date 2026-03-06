# 💎 CRYSTAL MIRROR — Işık & Kristal Bulmaca Oyunu
**Capacitor + React · AdMob · Doğa/Kristal Tema · Clean Architecture**

| Platform | Tema | Bölüm | Dünya | Kazanç |
|---|---|---|---|---|
| Capacitor + React | Doğa & Kristal | 50+ | 3 | AdMob (Banner + Interstitial + Rewarded) |

---

## İçindekiler
1. [Oyun Konsepti & Mekanikler](#1-oyun-konsepti--mekanikler)
2. [Teknoloji Kararları](#2-teknoloji-kararları)
3. [Clean Architecture Mimarisi](#3-clean-architecture-mimarisi)
4. [Domain Katmanı — Işık Fiziği Motoru](#4-domain-katmanı--ışık-fiziği-motoru)
   - 4.1 Temel Entity'ler
   - 4.2 Koordinat Sistemi & Dönüşümler ⭐ _yeni_
   - 4.3 Ayna Geometrisi & Çarpışma Modeli ⭐ _yeni_
   - 4.4 Işın Fizik Motoru _(güncellendi)_
   - 4.5 Renk Sistemi & Filtre Kuralları ⭐ _yeni_
   - 4.6 Hint Algoritması — Performans Çözümü ⭐ _yeni_
   - 4.7 Magnetic Snap Servisi ⭐ _yeni_
5. [Application Katmanı — Use Case'ler](#5-application-katmanı--use-caseler)
6. [Infrastructure Katmanı](#6-infrastructure-katmanı)
   - 6.4 Render Döngüsü — İki Katmanlı State ⭐ _yeni_
   - 6.5 Haptic Feedback — Merkezi Titreşim Sistemi ⭐ _yeni_
7. [Bölüm & Dünya Sistemi](#7-bölüm--dünya-sistemi)
8. [Günlük Challenge Sistemi](#8-günlük-challenge-sistemi)
9. [Sosyal Paylaşım Sistemi](#9-sosyal-paylaşım-sistemi)
10. [Hints Sistemi](#10-hints-sistemi)
11. [AdMob Entegrasyonu](#11-admob-entegrasyonu)
12. [Görsel Tasarım Rehberi](#12-görsel-tasarım-rehberi)
13. [Ortam Değişkenleri & Kurulum](#13-ortam-değişkenleri--kurulum)
14. [Uçtan Uca AI Prompt Zinciri](#14-uçtan-uca-ai-prompt-zinciri)
15. [Ses Dosyaları](#15-ses-dosyaları)
16. [Geliştirme Roadmap](#16-geliştirme-roadmap)

---

## 1. Oyun Konsepti & Mekanikler

### Temel Fikir
Doğadan ilham alan sahnelerde (orman, buzul, şelale) kristal aynalar ışığı kırar. Oyuncu aynayı **döndürerek** veya **kaydırarak** ışık demetini hedef kristale ulaştırır. Sakin ambient müzik, doğa sesleri — "zen ama düşündürücü" his.

### Mekanik Türleri

| Mekanik | Açıklama | İlk Görünüm |
|---|---|---|
| **Döndürme** | Aynaya dokunulunca ayna üstünde/altında **Rotation Wheel** belirir; parmak oraya kayar, ayna açıkta kalır | Bölüm 1 |
| **Kaydırma** | Aynayı ızgara üzerinde sürükle → ışık farklı kristallerden geçer | Bölüm 8 |
| **Çoklu Ayna** | Birden fazla ayna, ışık zincirleme kırılır | Bölüm 15 |
| **Renkli Filtre** | Kırmızı/mavi/sarı kristaller, sadece aynı renk ışık geçirir | Bölüm 25 |
| **Hareketli Hedef** | Hedef kristal yavaş sallanır, zamanlamak gerekir | Bölüm 35 |
| **Bölünmüş Işın** | Prizma ile ışın ikiye bölünür, iki hedef aynı anda doldurulur | Bölüm 45 |

### Kontrol UX Kararları

**Rotation Wheel (Döndürme Tekerleği)**
Parmak aynanın üstünü kapatır — oyuncu ne yaptığını göremez. Çözüm: Aynaya dokunulunca ayna nesnesinin **60-80px altında** (veya üstünde — hangi yanda daha az nesne varsa) dairesel bir wheel ortaya çıkar. Oyuncu parmağını oraya kaydırır; ayna ve ışın tam görünür kalır. Wheel, başka bir nesneye dokunulunca veya parmak kaldırılınca kaybolur.

> **Spawn tarafı kararı:** Wheel, aynanın Y pozisyonuna göre dinamik seçilir. Grid'in alt yarısındaysa yukarı, üst yarısındaysa aşağı çıkar. Böylece hem ayna hem ışın hem wheel aynı anda görünür olur.

**Magnetic Snap (Manyetik Kilitleme)**
5°'lik adımlar küçük ekranlarda "bir türlü tam ortalayamıyorum" sinir bozukluğuna neden olur. Çözüm: İki modlu snap sistemi.

| Mod | Tetikleyici | Davranış |
|---|---|---|
| **Rehberli** (varsayılan) | Işın hedefin %85'ine yaklaşır | Hafif titreşim + yön oku; %95'te açı otomatik kilitlenir |
| **Serbest** | Ayarlardan açılır | Snap yok, tam hassas 1° kontrol |

Rehberli modda snap sırasında kısa bir `haptic feedback` (titreşim) + kristal parıltısı oyuncuya "oldu" hissini verir. Snap, oyuncunun parmağını serbest bırakmasına gerek kalmadan anlık gerçekleşir — kontrol kaybı hissi vermez.

### 3 Dünya

| Dünya | Tema | Bölüm Aralığı | Renk Paleti |
|---|---|---|---|
| 🌲 **Orman Işığı** | Güneş ışığı yaprak aralarından süzülür | 1–18 | Yeşil, altın, sarı |
| 🧊 **Buzul Kristali** | Buz mağarası, mavi ışık yansımaları | 19–36 | Buz mavisi, beyaz, cyan |
| 🌊 **Şelale Sırrı** | Su altı, biolüminesans, derinlik | 37–54 | Mor, turkuaz, pembe |

### Kazanma / Kaybetme Koşulları
- **Kazan:** Işık demeti hedef kristali tam olarak doldurur (dolum animasyonu)
- **Zaman modu (arcade):** Süre dolmadan hedefe ulaş
- **Yıldız sistemi:** 3 yıldız = hızlı çözüm, 2 yıldız = normal, 1 yıldız = hint kullandı

---

## 2. Teknoloji Kararları

| Alan | Seçim | Gerekçe |
|---|---|---|
| **Framework** | Ionic + React + Capacitor | Mayınlı Tarla ile aynı stack, öğrenme eğrisi yok |
| **Dil** | TypeScript strict | Işık fiziği hesaplamaları için tip güvenliği kritik |
| **Render** | HTML5 Canvas (react-konva) | Işın takibi ve animasyonlar için Canvas gerekli; DOM yetersiz |
| **State** | Zustand + `useRef` çift katman | Zustand: kalıcı state (gesture bitti). `useRef` + `rAF`: ephemeral ışın state (her frame). Capacitor WebView'de lag önlenir. |
| **Animasyon** | Framer Motion + Canvas requestAnimationFrame | UI geçişleri Framer, ışın animasyonu Canvas loop |
| **Ses** | Howler.js | Aynı stack, loop + spatial audio desteği |
| **i18n** | i18next + react-i18next | TR/EN, genişletilebilir |
| **Paylaşım** | Capacitor Share API | Native iOS/Android share sheet |
| **Depolama** | Capacitor Preferences | Bölüm ilerlemesi, yıldızlar, günlük challenge |
| **Günlük Bölüm** | Tarih bazlı seed algoritması | Backend gerekmez, her gün aynı bölüm herkese |
| **Build** | Vite | react-konva + Capacitor uyumu |

### Neden react-konva?
Işın hesaplaması her frame'de yeniden yapılır (dinamik ayna açısı). DOM manipülasyonu bu hız için yavaş kalır. react-konva, Canvas'ı React component gibi kullanmana izin verir — hem performans hem okunabilir kod.

### İki Katmanlı State Mimarisi

Capacitor'un Android WebView katmanı, her `onTouchMove`'da Zustand store güncellenirse ciddi lag üretir. Çözüm: render döngüsünü React state'inden tamamen ayırmak.

```
Ephemeral State  →  useRef + requestAnimationFrame  →  Canvas doğrudan güncellenir
Persistent State →  Zustand store                   →  Sadece gesture bitince
```

| Katman | Ne Tutar | Ne Zaman Güncellenir |
|---|---|---|
| **Ephemeral** (`useRef`) | Anlık ayna açısı, ham ışın segmentleri, snap strength | Her `onTouchMove` / `onMouseMove` frame'inde |
| **Persistent** (`Zustand`) | Kesinleşmiş puzzle state, kazanma durumu, puan, hint | `onTouchEnd` / `onDragEnd` — gesture tamamlandığında |

Bu ayrım sayesinde oyun ışın render döngüsü React'in reconciler'ından bağımsız çalışır. Zustand sadece "bölüm bitti", "hint kullanıldı", "puan kaydedildi" gibi düşük frekanslı olaylar için tetiklenir.

---

## 3. Clean Architecture Mimarisi

> **Bağımlılık Yönü:** `Presentation → Application → Domain ← Infrastructure`

### Klasör Yapısı

```
src/
├── domain/                          # 🔴 Saf oyun mantığı — framework bağımsız
│   ├── entities/
│   │   ├── Ray.ts                   # Işın: başlangıç noktası + yön vektörü
│   │   ├── Mirror.ts                # Ayna: pozisyon + açı + tip (döner/kayar)
│   │   ├── Crystal.ts               # Kristal: pozisyon + renk + dolum durumu
│   │   ├── LightSource.ts           # Işık kaynağı: pozisyon + renk + güç
│   │   ├── Puzzle.ts                # Bölüm: tüm nesnelerin koleksiyonu
│   │   └── World.ts                 # Dünya: bölüm listesi + tema
│   ├── value-objects/
│   │   ├── Vector2D.ts              # (x, y) immutable vektör
│   │   ├── Angle.ts                 # Derece/radyan dönüşümleri
│   │   ├── Color.ts                 # RGBA + karıştırma kuralları
│   │   ├── PuzzleStatus.ts          # IDLE / PLAYING / SOLVED / FAILED
│   │   └── StarRating.ts            # ONE / TWO / THREE
│   ├── physics/
│   │   ├── RaycastEngine.ts         # Ana ışın izleme motoru (yansıma/kırılma)
│   │   ├── ReflectionCalculator.ts  # Düzlem aynada yansıma açısı
│   │   ├── RefractionCalculator.ts  # Prizmada kırılma (Snell yasası basit)
│   │   └── CollisionDetector.ts     # Işın-nesne kesişim tespiti
│   ├── rules/
│   │   ├── WinConditionChecker.ts   # Tüm hedef kristaller doldu mu?
│   │   ├── StarRatingCalculator.ts  # Süre ve hint kullanımına göre yıldız
│   │   ├── MagneticSnapService.ts   # Snap değerlendirme & ince açı bulma
│   │   └── DailySeedGenerator.ts    # Tarih → deterministik bölüm seed
│   └── ports/
│       ├── ISoundService.ts
│       ├── IAdService.ts
│       ├── IStorageService.ts       # Yeni: ilerleme kaydetme
│       └── IShareService.ts         # Yeni: sosyal paylaşım
│
├── application/
│   ├── use-cases/
│   │   ├── StartPuzzleUseCase.ts
│   │   ├── RotateMirrorUseCase.ts
│   │   ├── SlideMirrorUseCase.ts
│   │   ├── CheckWinConditionUseCase.ts
│   │   ├── UseHintUseCase.ts
│   │   ├── LoadDailyChallengeUseCase.ts
│   │   ├── SaveProgressUseCase.ts
│   │   └── ShareResultUseCase.ts
│   └── dto/
│       ├── PuzzleStateDTO.ts
│       ├── RayPathDTO.ts            # Render için ışın yolu koordinatları
│       ├── HintDTO.ts
│       └── DailyChallengeDTO.ts
│
├── infrastructure/
│   ├── sound/
│   │   └── HowlerSoundService.ts
│   ├── ads/
│   │   ├── AdMobService.ts
│   │   └── MockAdService.ts
│   ├── haptics/
│   │   ├── HapticService.ts       # Capacitor Haptics — merkezi titreşim
│   │   └── MockHapticService.ts   # Geliştirme ortamı
│   ├── storage/
│   │   └── CapacitorStorageService.ts
│   ├── share/
│   │   └── CapacitorShareService.ts
│   ├── levels/
│   │   ├── WorldOnelevels.ts        # Orman: bölüm 1-18 data
│   │   ├── WorldTwoLevels.ts        # Buzul: bölüm 19-36 data
│   │   └── WorldThreeLevels.ts      # Şelale: bölüm 37-54 data
│   └── i18n/
│       ├── i18n.config.ts
│       └── locales/
│           ├── tr.json
│           └── en.json
│
├── presentation/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── PuzzleCanvas.tsx
│   │   │   ├── MirrorNode.tsx
│   │   │   ├── CrystalNode.tsx
│   │   │   ├── LightRayLayer.tsx
│   │   │   ├── ChromaticAberration.ts  # Renk dağılması efekti (util)
│   │   │   ├── RotationWheel.tsx
│   │   │   └── BackgroundLayer.tsx
│   │   ├── ui/
│   │   │   ├── Header.tsx           # Bölüm no, yıldızlar, süre
│   │   │   ├── HintButton.tsx
│   │   │   ├── MuteButton.tsx
│   │   │   └── ProgressBar.tsx      # Kristal dolum göstergesi
│   │   ├── modals/
│   │   │   ├── VictoryModal.tsx
│   │   │   ├── WorldCompleteModal.tsx
│   │   │   └── DailyCompleteModal.tsx
│   │   ├── screens/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── WorldSelectScreen.tsx
│   │   │   ├── LevelSelectScreen.tsx
│   │   │   ├── GameScreen.tsx
│   │   │   └── DailyChallengeScreen.tsx
│   │   └── ads/
│   │       └── BannerAdContainer.tsx
│   ├── hooks/
│   │   ├── usePuzzleController.ts
│   │   ├── useRaycastLoop.ts        # rAF döngüsü — Zustand bypass, ref tabanlı
│   │   ├── useRaycast.ts            # Her frame ışın hesapla (useRaycastLoop'u sarar)
│   │   ├── useGestureHandler.ts     # Döndürme + kaydırma gesture
│   │   ├── useTimer.ts
│   │   └── useDailyChallenge.ts
│   ├── store/
│   │   ├── puzzleStore.ts           # Aktif bölüm state
│   │   ├── progressStore.ts         # Global ilerleme (tüm bölümler)
│   │   └── dailyStore.ts            # Günlük challenge state
│   └── theme/
│       ├── worlds.css               # Her dünya için CSS değişkenleri
│       └── global.css
│
├── assets/
│   ├── sounds/                      # Ses dosyaları (bkz. Bölüm 15)
│   ├── images/
│   │   ├── worlds/                  # Arka plan görselleri
│   │   └── crystals/                # Kristal sprite'ları
│   └── fonts/
│       └── ...                      # Özel font
│
├── container.ts                     # DI Container
capacitor.config.ts
vite.config.ts
```

---

## 4. Domain Katmanı — Işık Fiziği Motoru

### 4.1 Temel Entity'ler

```typescript
// domain/value-objects/Vector2D.ts
export class Vector2D {
  constructor(readonly x: number, readonly y: number) {}

  add(v: Vector2D): Vector2D { return new Vector2D(this.x + v.x, this.y + v.y); }
  scale(s: number): Vector2D { return new Vector2D(this.x * s, this.y * s); }
  normalize(): Vector2D {
    const len = Math.sqrt(this.x ** 2 + this.y ** 2);
    return new Vector2D(this.x / len, this.y / len);
  }
  dot(v: Vector2D): number { return this.x * v.x + this.y * v.y; }
  reflect(normal: Vector2D): Vector2D {
    const d = 2 * this.dot(normal);
    return new Vector2D(this.x - d * normal.x, this.y - d * normal.y);
  }
}

// domain/entities/Mirror.ts
export type MirrorType = 'ROTATE' | 'SLIDE';

export interface Mirror {
  readonly id: string;
  position: Vector2D;        // Izgara koordinatı
  angleDegrees: number;      // 0-360, kullanıcının döndürdüğü açı
  readonly type: MirrorType;
  readonly isMovable: boolean;
}

// domain/entities/Crystal.ts
export interface Crystal {
  readonly id: string;
  readonly position: Vector2D;
  readonly color: 'WHITE' | 'RED' | 'BLUE' | 'YELLOW';
  readonly isTarget: boolean;  // false = sadece yansıtır, true = hedef
  fillLevel: number;           // 0.0 – 1.0
}

// domain/entities/Puzzle.ts
export interface Puzzle {
  readonly id: string;
  readonly worldId: string;
  readonly levelNumber: number;
  readonly gridSize: { cols: number; rows: number };
  lightSource: LightSource;
  mirrors: Mirror[];
  crystals: Crystal[];
  readonly mechanic: 'ROTATE' | 'SLIDE' | 'BOTH';
  readonly timeLimit: number | null;  // null = sınırsız
}
```

### 4.2 Koordinat Sistemi & Dönüşümler

Bu oyunda **iki ayrı koordinat uzayı** vardır. Karıştırmak en yaygın hata kaynağıdır.

| Uzay | Birim | Kullanım Yeri |
|---|---|---|
| **Grid Koordinatı** | Hücre (integer) | Bölüm data dosyaları, collision mantığı |
| **Piksel Koordinatı** | px (float) | Canvas render, gesture hesaplama |

```typescript
// domain/value-objects/CoordinateSystem.ts

export interface GridCell {
  col: number;   // 0'dan başlar, soldan sağa
  row: number;   // 0'dan başlar, yukarıdan aşağı
}

/**
 * Canvas piksel boyutunu ve grid tanımını alarak iki yönlü dönüşüm sağlar.
 * Bu sınıf domain'de TANIMLANIR ama piksel hesabı presentation'da KULLANILIR.
 * Domain sadece GridCell ile çalışır; piksel dönüşümü presentation hook'larına aittir.
 */
export class CoordinateSystem {
  readonly cellSize: number;           // Her hücrenin piksel boyutu (kare)
  readonly offsetX: number;            // Izgara sol kenar boşluğu (px)
  readonly offsetY: number;            // Izgara üst kenar boşluğu (px)

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    private readonly gridCols: number,
    private readonly gridRows: number,
  ) {
    // Izgara canvas'a ortalanır, en kısıtlayıcı boyuta göre hücre boyutu belirlenir
    const maxCellW = Math.floor(canvasWidth  / gridCols);
    const maxCellH = Math.floor(canvasHeight / gridRows);
    this.cellSize = Math.min(maxCellW, maxCellH);

    // Izgara ortalama boşlukları
    this.offsetX = Math.floor((canvasWidth  - this.cellSize * gridCols) / 2);
    this.offsetY = Math.floor((canvasHeight - this.cellSize * gridRows) / 2);
  }

  /** Grid hücre merkezini piksel koordinatına çevirir */
  gridToPixel(cell: GridCell): Vector2D {
    return new Vector2D(
      this.offsetX + cell.col * this.cellSize + this.cellSize / 2,
      this.offsetY + cell.row * this.cellSize + this.cellSize / 2,
    );
  }

  /** Piksel koordinatını en yakın grid hücresine snap'ler */
  pixelToGrid(px: Vector2D): GridCell {
    return {
      col: Math.floor((px.x - this.offsetX) / this.cellSize),
      row: Math.floor((px.y - this.offsetY) / this.cellSize),
    };
  }

  /** Verilen grid hücresi grid sınırları içinde mi? */
  isValidCell(cell: GridCell): boolean {
    return cell.col >= 0 && cell.col < this.gridCols
        && cell.row >= 0 && cell.row < this.gridRows;
  }

  /** Ekran döndürmede (orientation change) yeniden hesapla */
  static fromWindow(gridCols: number, gridRows: number): CoordinateSystem {
    // Header (~56px) + Banner ad (~60px) için alan bırak
    const usableH = window.innerHeight - 56 - 60;
    return new CoordinateSystem(window.innerWidth, usableH, gridCols, gridRows);
  }
}
```

> **Kural:** Domain katmanındaki tüm fizik hesaplamaları (RaycastEngine, CollisionDetector) **piksel uzayında** çalışır — grid cell'leri önce `gridToPixel()` ile dönüştürülür, sonra motora verilir. Bu sayede domain piksel mantığını bilir ama `window` veya Canvas API'ye bağımlı olmaz.

**Ekran Döndürme (Orientation Change):**
```typescript
// presentation/hooks/useCanvasSize.ts
export function useCanvasSize(puzzle: Puzzle) {
  const [coords, setCoords] = useState(() =>
    CoordinateSystem.fromWindow(puzzle.gridSize.cols, puzzle.gridSize.rows)
  );

  useEffect(() => {
    const handler = () => setCoords(
      CoordinateSystem.fromWindow(puzzle.gridSize.cols, puzzle.gridSize.rows)
    );
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [puzzle.gridSize]);

  return coords;
}
```

---

### 4.3 Ayna Geometrisi & Çarpışma Modeli

Ayna soyut bir çizgi segmentidir. Her ayna **1 grid hücresi genişliğinde** bir çizgi olarak modellenir; merkezi hücre merkezindedir.

```typescript
// domain/physics/MirrorGeometry.ts

export interface LineSegment {
  start: Vector2D;
  end:   Vector2D;
}

/**
 * Aynayı piksel uzayında bir çizgi segmentine dönüştürür.
 * Açı 0° = yatay, 90° = dikey, 45° = köşegen (/)
 */
export function getMirrorSegment(
  mirror: Mirror,
  coords: CoordinateSystem,
): LineSegment {
  const center = coords.gridToPixel(mirror.position);
  const halfLen = coords.cellSize * 0.45;          // Hücrenin %90'ı kadar uzunluk
  const rad = (mirror.angleDegrees * Math.PI) / 180;

  return {
    start: new Vector2D(
      center.x - Math.cos(rad) * halfLen,
      center.y - Math.sin(rad) * halfLen,
    ),
    end: new Vector2D(
      center.x + Math.cos(rad) * halfLen,
      center.y + Math.sin(rad) * halfLen,
    ),
  };
}

/**
 * Ayna yüzeyine dik olan birim normal vektörünü döner.
 * Işın hangi taraftan gelirse gelsin doğru yansıma için
 * normalin ışına "bakan" taraf seçilir.
 */
export function getMirrorNormal(mirror: Mirror, rayDirection: Vector2D): Vector2D {
  const rad = (mirror.angleDegrees * Math.PI) / 180;
  // Ayna yüzeyine dik iki normal vektör (birbirine zıt)
  const n1 = new Vector2D(-Math.sin(rad),  Math.cos(rad));
  const n2 = new Vector2D( Math.sin(rad), -Math.cos(rad));
  // Işın yönüne karşı bakan normalı seç (dot product < 0)
  return rayDirection.dot(n1) < 0 ? n1 : n2;
}
```

**Çarpışma Tespiti — Işın & Çizgi Segmenti Kesişimi:**
```typescript
// domain/physics/CollisionDetector.ts

/**
 * Parametrik ışın-segment kesişimi.
 * Işın: P(t) = origin + t * direction  (t > 0)
 * Segment: Q(s) = segStart + s * (segEnd - segStart)  (0 ≤ s ≤ 1)
 */
export function raySegmentIntersection(
  origin:    Vector2D,
  direction: Vector2D,
  segment:   LineSegment,
  minDist:   number = 0.001,   // Kendi başlangıç noktasına çarpmayı önler
): { point: Vector2D; t: number } | null {
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;

  const denom = direction.x * dy - direction.y * dx;
  if (Math.abs(denom) < 1e-10) return null;   // Paralel

  const tx = segment.start.x - origin.x;
  const ty = segment.start.y - origin.y;

  const t = (tx * dy - ty * dx) / denom;
  const s = (tx * direction.y - ty * direction.x) / denom;

  if (t < minDist || s < 0 || s > 1) return null;

  return {
    point: new Vector2D(origin.x + t * direction.x, origin.y + t * direction.y),
    t,
  };
}

/**
 * Kristal ile kesişim: kristal merkezi etrafında yarıçap kontrolü.
 * Nokta hedef yerine daire kullanmak gesture toleransı sağlar.
 */
export function rayCrystalIntersection(
  origin:    Vector2D,
  direction: Vector2D,
  crystal:   Crystal,
  coords:    CoordinateSystem,
): { point: Vector2D; t: number } | null {
  const center = coords.gridToPixel(crystal.position);
  const radius = coords.cellSize * 0.35;

  // Işın-daire kesişimi (analitik çözüm)
  const oc = new Vector2D(origin.x - center.x, origin.y - center.y);
  const a  = direction.dot(direction);
  const b  = 2 * oc.dot(direction);
  const c  = oc.dot(oc) - radius * radius;
  const disc = b * b - 4 * a * c;

  if (disc < 0) return null;

  const t = (-b - Math.sqrt(disc)) / (2 * a);
  if (t < 0.001) return null;

  return {
    point: new Vector2D(origin.x + t * direction.x, origin.y + t * direction.y),
    t,
  };
}
```

---

### 4.4 Işın Fizik Motoru

```typescript
// domain/physics/RaycastEngine.ts

export interface RaySegment {
  start:       Vector2D;
  end:         Vector2D;
  color:       RayColor;      // 'WHITE' | 'RED' | 'BLUE' | 'YELLOW'
  hitObjectId: string | null; // Son çarptığı nesne (debug + animasyon için)
}

export interface TraceResult {
  segments:      RaySegment[];
  crystalFills:  Map<string, number>;  // crystalId → yeni fillLevel (0–1)
}

export class RaycastEngine {
  private readonly MAX_BOUNCES = 20;

  constructor(private readonly coords: CoordinateSystem) {}

  /**
   * Işık kaynağından başlayarak tüm yansımaları hesaplar.
   * Render katmanına RaySegment[] döner — fizik motoru Canvas API bilmez.
   * crystalFills: bu trace sonucunda hangi kristallerin ne kadar dolduğunu döner.
   */
  trace(puzzle: Puzzle): TraceResult {
    const segments: RaySegment[] = [];
    const crystalFills = new Map<string, number>();

    // Işık kaynağından başla
    let origin    = this.coords.gridToPixel(puzzle.lightSource.position);
    let direction = puzzle.lightSource.direction.normalize();
    let color     = puzzle.lightSource.color;
    let bounces   = 0;

    while (bounces < this.MAX_BOUNCES) {
      const hit = this.findNearestHit(origin, direction, puzzle);

      if (!hit) {
        // Canvas sınırına uzat
        segments.push({
          start: origin,
          end: this.extendToCanvasBound(origin, direction),
          color,
          hitObjectId: null,
        });
        break;
      }

      segments.push({ start: origin, end: hit.point, color, hitObjectId: hit.objectId });

      if (hit.type === 'CRYSTAL') {
        const crystal = puzzle.crystals.find(c => c.id === hit.objectId)!;
        if (this.colorPassesFilter(color, crystal.color)) {
          // Kristal dolum miktarı: segment uzunluğuna değil sabit değere bağlı
          // (her tam temas = 1.0 dolum, kısmi değil)
          if (crystal.isTarget) crystalFills.set(crystal.id, 1.0);
        }
        break;  // Işın kristalde biter
      }

      // Aynaya çarptı — yansıt
      const mirror  = puzzle.mirrors.find(m => m.id === hit.objectId)!;
      const normal  = getMirrorNormal(mirror, direction);
      direction     = direction.reflect(normal).normalize();
      origin        = hit.point;
      bounces++;
    }

    return { segments, crystalFills };
  }

  private findNearestHit(
    origin:    Vector2D,
    direction: Vector2D,
    puzzle:    Puzzle,
  ): { point: Vector2D; objectId: string; type: 'MIRROR' | 'CRYSTAL' } | null {
    let nearest: { point: Vector2D; t: number; objectId: string; type: 'MIRROR' | 'CRYSTAL' } | null = null;

    // Tüm aynalarla test
    for (const mirror of puzzle.mirrors) {
      const segment = getMirrorSegment(mirror, this.coords);
      const hit     = raySegmentIntersection(origin, direction, segment);
      if (hit && (!nearest || hit.t < nearest.t)) {
        nearest = { ...hit, objectId: mirror.id, type: 'MIRROR' };
      }
    }

    // Tüm kristallerle test
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
    const bounds = {
      minX: this.coords.offsetX,
      maxX: this.coords.offsetX + this.coords.cellSize * this.coords['gridCols' as never],
      minY: this.coords.offsetY,
      maxY: this.coords.offsetY + this.coords.cellSize * this.coords['gridRows' as never],
    };
    // En yakın sınır duvarına t değerini hesapla
    const ts = [
      dir.x > 0 ? (bounds.maxX - origin.x) / dir.x : Infinity,
      dir.x < 0 ? (bounds.minX - origin.x) / dir.x : Infinity,
      dir.y > 0 ? (bounds.maxY - origin.y) / dir.y : Infinity,
      dir.y < 0 ? (bounds.minY - origin.y) / dir.y : Infinity,
    ];
    const t = Math.min(...ts.filter(v => v > 0));
    return new Vector2D(origin.x + dir.x * t, origin.y + dir.y * t);
  }
}
// domain/physics/RaycastEngine.ts
export class RaycastEngine {
  private readonly MAX_BOUNCES = 20;
  private readonly MAX_TOTAL_DISTANCE = 4000; // Ekle: Toplam ışın uzunluğu sınırı
  private readonly MAX_SPLIT_DEPTH = 5;      // Ekle: Prizma bölünme derinliği
  // ...
}
```

### 4.3 Günlük Bölüm Seed Algoritması

```typescript
// domain/rules/DailySeedGenerator.ts
/**
 * Aynı tarihi her cihazda aynı seed'e dönüştürür.
 * Backend gerektirmez. Basit deterministik hash.
 */
export class DailySeedGenerator {
  generate(date: Date): number {
    const dateStr = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
    let hash = 0;
    for (const char of dateStr) {
      hash = ((hash << 5) - hash) + char.charCodeAt(0);
      hash |= 0; // 32-bit integer
    }
    return Math.abs(hash);
  }

  getPuzzleIndex(date: Date, totalPuzzles: number): number {
    return this.generate(date) % totalPuzzles;
  }
}
```

---

### 4.5 Renk Sistemi & Filtre Kuralları

Renk sistemi basit tutulmuştur — gerçek ışık fiziği değil, oyun kuralı olarak tanımlanır.

```typescript
// domain/value-objects/Color.ts

export type RayColor = 'WHITE' | 'RED' | 'BLUE' | 'YELLOW';
export type CrystalColor = 'WHITE' | 'RED' | 'BLUE' | 'YELLOW' | 'PRISM';

/**
 * Renk Geçirgenlik Kuralları (oyun tasarımı kararı):
 *
 *  Işın Rengi → Kristal Rengi → Geçer mi?
 *  WHITE      → WHITE         → ✅ (her renk geçer)
 *  WHITE      → RED           → ❌ (filtre tutar)
 *  RED        → RED           → ✅
 *  RED        → WHITE         → ✅ (beyaz her rengi kabul eder)
 *  RED        → BLUE          → ❌
 *  WHITE      → PRISM         → ✅ ama ışın 3'e bölünür (ayrı mekanik)
 */
export function colorPassesFilter(rayColor: RayColor, crystalColor: CrystalColor): boolean {
  if (crystalColor === 'WHITE')  return true;       // Beyaz kristal her rengi alır
  if (crystalColor === 'PRISM')  return true;       // Prizma her rengi böler
  if (rayColor === 'WHITE')      return false;      // Beyaz ışın renkli filtreden geçemez
  return rayColor === crystalColor;                 // Aynı renk eşleşir
}

/**
 * Prizma Bölme Kuralları:
 * Beyaz ışın prizmaya çarparsa 3 renkli ışına bölünür.
 * Her bölünmüş ışın bağımsız olarak izlenir.
 *
 *  Beyaz → Prizma → Kırmızı (orijinal açı + 0°)
 *                 → Mavi    (orijinal açı + 15°)
 *                 → Sarı    (orijinal açı - 15°)
 */
export function splitByPrism(direction: Vector2D, color: RayColor): Array<{ direction: Vector2D; color: RayColor }> {
  if (color !== 'WHITE') {
    return [{ direction, color }];   // Renkli ışın bölünmez, geçer veya durur
  }
  return [
    { direction: rotateVector(direction,  0),  color: 'RED'    },
    { direction: rotateVector(direction,  15), color: 'BLUE'   },
    { direction: rotateVector(direction, -15), color: 'YELLOW' },
  ];
}

function rotateVector(v: Vector2D, degrees: number): Vector2D {
  const rad = (degrees * Math.PI) / 180;
  return new Vector2D(
    v.x * Math.cos(rad) - v.y * Math.sin(rad),
    v.x * Math.sin(rad) + v.y * Math.cos(rad),
  ).normalize();
}
```

**Renk Sistemi Özeti:**

| Işın | Beyaz Kristal | Kırmızı | Mavi | Sarı | Prizma |
|---|---|---|---|---|---|
| **Beyaz** | ✅ | ❌ | ❌ | ❌ | ✅ → 3'e böl |
| **Kırmızı** | ✅ | ✅ | ❌ | ❌ | ✅ → geçer |
| **Mavi** | ✅ | ❌ | ✅ | ❌ | ✅ → geçer |
| **Sarı** | ✅ | ❌ | ❌ | ✅ | ✅ → geçer |

> **Tasarım Notu:** `RaycastEngine.trace()` prizma ile karşılaşınca `splitByPrism()` çağırır ve her alt ışın için recursive trace başlatır. Toplam bounce sayacı tüm dallar arasında paylaşılır — sonsuz döngü önlenir.

---

### 4.6 Hint Algoritması — Performans Çözümü

Brute-force yaklaşım 3+ ayna + 72 açı adımı ile mobilde donmaya neden olabilir. Çözüm: Web Worker + önbellek.

```typescript
// domain/rules/HintCalculator.ts

export interface HintCandidate {
  mirrorId:      string;
  suggestedAngle: number;
  score:         number;   // 0–1 arası toplam kristal dolumu
}

export class HintCalculator {
  private cache = new Map<string, HintCandidate>();

  /**
   * Performans stratejisi:
   * 1. Önce kaba tarama (5° adım) — en iyi adayı bul
   * 2. En iyi adayın etrafında ince tarama (1° adım, ±10° aralık)
   * 3. Sonucu cache'le (puzzle state hash'ine göre)
   *
   * Worst-case: 4 ayna × 72 kaba + 1 × 20 ince = 308 trace
   * Her trace ~0.1ms → toplam ~31ms → kabul edilebilir
   */
  calculate(puzzle: Puzzle, engine: RaycastEngine): HintCandidate {
    const cacheKey = this.puzzleStateHash(puzzle);
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!;

    let best: HintCandidate = { mirrorId: '', suggestedAngle: 0, score: -1 };

    // Aşama 1: Kaba tarama (5° adım)
    for (const mirror of puzzle.mirrors.filter(m => m.isMovable)) {
      for (let angle = 0; angle < 360; angle += 5) {
        const testPuzzle = applyMirrorAngle(puzzle, mirror.id, angle);
        const result     = engine.trace(testPuzzle);
        const score      = this.totalFillScore(result.crystalFills, puzzle);

        if (score > best.score) {
          best = { mirrorId: mirror.id, suggestedAngle: angle, score };
        }
      }
    }

    // Aşama 2: En iyi aday etrafında ince tarama (1° adım)
    for (let delta = -10; delta <= 10; delta++) {
      const angle      = (best.suggestedAngle + delta + 360) % 360;
      const testPuzzle = applyMirrorAngle(puzzle, best.mirrorId, angle);
      const result     = engine.trace(testPuzzle);
      const score      = this.totalFillScore(result.crystalFills, puzzle);

      if (score > best.score) {
        best = { ...best, suggestedAngle: angle, score };
      }
    }

    this.cache.set(cacheKey, best);
    return best;
  }

  private totalFillScore(fills: Map<string, number>, puzzle: Puzzle): number {
    let total = 0;
    for (const crystal of puzzle.crystals.filter(c => c.isTarget)) {
      total += fills.get(crystal.id) ?? 0;
    }
    return total / puzzle.crystals.filter(c => c.isTarget).length;
  }

  private puzzleStateHash(puzzle: Puzzle): string {
    return puzzle.mirrors
      .map(m => `${m.id}:${m.angleDegrees}:${m.position.col},${m.position.row}`)
      .join('|');
  }
}

// Yardımcı: immutable açı güncellemesi
function applyMirrorAngle(puzzle: Puzzle, mirrorId: string, angle: number): Puzzle {
  return {
    ...puzzle,
    mirrors: puzzle.mirrors.map(m =>
      m.id === mirrorId ? { ...m, angleDegrees: angle } : m
    ),
  };
}
```

> **Not:** Hesaplama ~30ms olmasına rağmen UI'ı bloklamak istemiyorsan `UseHintUseCase` içinde `setTimeout(fn, 0)` ile bir tick erteleyebilirsin. Web Worker kurmak bu proje ölçeğinde overkill.

---

### 4.7 Magnetic Snap Servisi

`MagneticSnapService` domain katmanında yaşar — saf hesaplama, UI bağımlılığı yok.

```typescript
// domain/rules/MagneticSnapService.ts

export type SnapMode = 'GUIDED' | 'FREE';

export interface SnapResult {
  snapped:      boolean;
  finalAngle:   number;   // Snap olduysa kilitli açı, olmadıysa girdi açısı
  snapStrength: number;   // 0.0–1.0: ne kadar yakın? (haptic yoğunluğu için)
}

export class MagneticSnapService {
  /** Işın hedefin bu oranına ulaşırsa titreşim başlar */
  private readonly NUDGE_THRESHOLD  = 0.85;
  /** Işın hedefin bu oranına ulaşırsa açı kilitlenir */
  private readonly SNAP_THRESHOLD   = 0.95;
  /** İnce tarama adımı (snap açısını bulmak için) */
  private readonly FINE_STEP_DEG    = 1;

  constructor(private readonly engine: RaycastEngine) {}

  /**
   * Mevcut ayna açısında ışın hedefe ne kadar yakın?
   * Yakınsa snap uygular.
   *
   * @param puzzle   Güncel puzzle state
   * @param mirrorId Döndürülen aynanın ID'si
   * @param angle    Oyuncunun parmağından gelen ham açı
   * @param mode     GUIDED (varsayılan) veya FREE
   */
  evaluate(
    puzzle:   Puzzle,
    mirrorId: string,
    angle:    number,
    mode:     SnapMode = 'GUIDED',
  ): SnapResult {
    if (mode === 'FREE') {
      return { snapped: false, finalAngle: angle, snapStrength: 0 };
    }

    // Mevcut açıda ışın izle
    const testPuzzle  = applyMirrorAngle(puzzle, mirrorId, angle);
    const traceResult = this.engine.trace(testPuzzle);
    const fillScore   = this.totalFillScore(traceResult.crystalFills, puzzle);

    if (fillScore < this.NUDGE_THRESHOLD) {
      return { snapped: false, finalAngle: angle, snapStrength: fillScore };
    }

    if (fillScore >= this.SNAP_THRESHOLD) {
      // Zaten çok yakın — tam snap açısını bul
      const bestAngle = this.findExactSnapAngle(puzzle, mirrorId, angle);
      return { snapped: true, finalAngle: bestAngle, snapStrength: 1.0 };
    }

    // Nudge bölgesi (%85–%95): titreşim ver ama henüz kilitleme
    return { snapped: false, finalAngle: angle, snapStrength: fillScore };
  }

  /**
   * Ham açı etrafında ±10° ince tarama yaparak en yüksek dolumu sağlayan
   * tam açıyı bulur. Snap'in "teleport" hissi vermemesi için
   * sonuç her zaman girdi açısına en yakın geçerli açıdır.
   */
  private findExactSnapAngle(puzzle: Puzzle, mirrorId: string, baseAngle: number): number {
    let bestAngle = baseAngle;
    let bestScore = -1;

    for (let delta = -10; delta <= 10; delta += this.FINE_STEP_DEG) {
      const candidate = (baseAngle + delta + 360) % 360;
      const test      = applyMirrorAngle(puzzle, mirrorId, candidate);
      const score     = this.totalFillScore(this.engine.trace(test).crystalFills, puzzle);
      if (score > bestScore) { bestScore = score; bestAngle = candidate; }
    }

    return bestAngle;
  }

  private totalFillScore(fills: Map<string, number>, puzzle: Puzzle): number {
    const targets = puzzle.crystals.filter(c => c.isTarget);
    if (targets.length === 0) return 0;
    return targets.reduce((sum, c) => sum + (fills.get(c.id) ?? 0), 0) / targets.length;
  }
}
```

**Entegrasyon noktası — `RotateMirrorUseCase`:**
```typescript
execute(puzzle, mirrorId, rawAngle, coords, snapMode): PuzzleStateDTO {
  // 1. Snap değerlendir
  const snap = this.snapService.evaluate(puzzle, mirrorId, rawAngle, snapMode);

  // 2. Snap kuvvetini UI'a ilet (haptic + parıltı için)
  if (snap.snapStrength > 0.85 && !snap.snapped) {
    this.soundService.playNudge();      // hafif tık
  }
  if (snap.snapped) {
    this.soundService.playCrystalFill(); // kristal parıltısı
  }

  // 3. Gerçek açıyla devam et
  const finalPuzzle = applyMirrorAngle(puzzle, mirrorId, snap.finalAngle);
  const traceResult = this.engine.trace(finalPuzzle);
  const isWon       = this.winChecker.check(finalPuzzle, traceResult.crystalFills);

  return { puzzle: finalPuzzle, raySegments: traceResult.segments,
           crystalFills: traceResult.crystalFills,
           status: isWon ? 'SOLVED' : 'PLAYING',
           snapResult: snap };   // ← Presentation haptic için kullanır
}
```

> **Zor bölümlerde snap:** Çoklu hedef veya renkli filtre içeren bölümlerde `totalFillScore` tüm hedeflerin ortalamasını alır. Tek hedef dolsa bile diğerleri eksikse `snapStrength` düşük kalır — snap yanlışlıkla tetiklenmez.

---

## 5. Application Katmanı — Use Case'ler

```typescript
// application/use-cases/RotateMirrorUseCase.ts
export class RotateMirrorUseCase {
  constructor(
    private readonly raycastEngine: RaycastEngine,
    private readonly winChecker: WinConditionChecker,
    private readonly soundService: ISoundService,
  ) {}

  execute(puzzle: Puzzle, mirrorId: string, newAngle: number): PuzzleStateDTO {
    // 1. Aynayı döndür (immutable update)
    const updatedPuzzle = this.updateMirrorAngle(puzzle, mirrorId, newAngle);

    // 2. Işınları yeniden hesapla
    const rayPath = this.raycastEngine.trace(updatedPuzzle);

    // 3. Kazanma kontrolü
    const isWon = this.winChecker.check(updatedPuzzle);
    if (isWon) this.soundService.playVictory();

    return { puzzle: updatedPuzzle, rayPath, status: isWon ? 'SOLVED' : 'PLAYING' };
  }
}

// application/use-cases/UseHintUseCase.ts
export class UseHintUseCase {
  constructor(
    private readonly adService: IAdService,
    private readonly soundService: ISoundService,
  ) {}

  async execute(puzzle: Puzzle): Promise<HintDTO> {
    // Rewarded reklam izle
    const reward = await this.adService.showRewarded();
    if (!reward.earned) throw new Error('AD_NOT_COMPLETED');

    // En iyi hamleli hesapla (brute-force açı tarama)
    const hint = this.calculateBestMove(puzzle);
    this.soundService.playHint();
    return hint;
  }

  private calculateBestMove(puzzle: Puzzle): HintDTO {
    // Her ayna için 360 açı tara, hangisi kristali en çok dolduruyor?
    let bestMirrorId = '';
    let bestAngle = 0;
    let bestFill = -1;

    for (const mirror of puzzle.mirrors) {
      for (let angle = 0; angle < 360; angle += 5) {
        const testPuzzle = this.applyAngle(puzzle, mirror.id, angle);
        const fill = this.totalFill(testPuzzle);
        if (fill > bestFill) {
          bestFill = fill;
          bestMirrorId = mirror.id;
          bestAngle = angle;
        }
      }
    }
    return { mirrorId: bestMirrorId, suggestedAngle: bestAngle };
  }
}

// application/use-cases/ShareResultUseCase.ts
export class ShareResultUseCase {
  constructor(private readonly shareService: IShareService) {}

  async execute(result: PuzzleResult): Promise<void> {
    const emoji = this.buildEmojiGrid(result);
    const text = [
      `💎 Crystal Mirror — Bölüm ${result.levelNumber}`,
      `${'⭐'.repeat(result.stars)}${'☆'.repeat(3 - result.stars)}`,
      `⏱️ ${result.timeSeconds}s`,
      emoji,
      '#CrystalMirror #Puzzle',
    ].join('\n');

    await this.shareService.share({ text, title: 'Crystal Mirror' });
  }

  private buildEmojiGrid(result: PuzzleResult): string {
    // Çözüm yolunu emoji grid'e dönüştür (Wordle tarzı)
    // 💡 = hint kullandığı adım, ✨ = kendi çözdüğü adım
    return result.moves.map(m => m.wasHint ? '💡' : '✨').join('') ;
  }
}
```

---

## 6. Infrastructure Katmanı

### 6.1 Storage Servisi (İlerleme Kaydetme)

```typescript
// infrastructure/storage/CapacitorStorageService.ts
import { Preferences } from '@capacitor/preferences';

export class CapacitorStorageService implements IStorageService {
  async saveLevelProgress(levelId: string, stars: number, timeSeconds: number): Promise<void> {
    const key = `level_${levelId}`;
    const existing = await this.get<LevelProgress>(key);
    // Sadece daha iyi skoru kaydet
    if (!existing || stars > existing.stars || timeSeconds < existing.timeSeconds) {
      await this.set(key, { stars, timeSeconds, solvedAt: new Date().toISOString() });
    }
  }

  async getDailyChallenge(dateKey: string): Promise<DailyRecord | null> {
    return this.get<DailyRecord>(`daily_${dateKey}`);
  }

  async saveDailyChallenge(dateKey: string, record: DailyRecord): Promise<void> {
    await this.set(`daily_${dateKey}`, record);
  }

  private async get<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  private async set(key: string, value: unknown): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }
}
```

### 6.2 Share Servisi

```typescript
// infrastructure/share/CapacitorShareService.ts
import { Share } from '@capacitor/share';

export class CapacitorShareService implements IShareService {
  async share(options: { text: string; title: string }): Promise<void> {
    await Share.share({
      title: options.title,
      text: options.text,
      dialogTitle: 'Crystal Mirror\'ı Paylaş',
    });
  }

  async canShare(): Promise<boolean> {
    const { value } = await Share.canShare();
    return value;
  }
}
```

### 6.3 Ses Servisi

```typescript
// infrastructure/sound/HowlerSoundService.ts
export class HowlerSoundService implements ISoundService {
  constructor() {
    this.bg         = new Howl({ src: ['/assets/sounds/ambient.mp3', '/assets/sounds/ambient.ogg'], loop: true, volume: 0.35 });
    this.crystalHit = new Howl({ src: ['/assets/sounds/crystal-hit.mp3',  '/assets/sounds/crystal-hit.ogg'],  volume: 0.8 });
    this.mirrorSlide= new Howl({ src: ['/assets/sounds/mirror-slide.mp3', '/assets/sounds/mirror-slide.ogg'], volume: 0.6 });
    this.victory    = new Howl({ src: ['/assets/sounds/victory.mp3',      '/assets/sounds/victory.ogg'],      volume: 0.9 });
    this.hint       = new Howl({ src: ['/assets/sounds/hint.mp3',         '/assets/sounds/hint.ogg'],         volume: 0.7 });
    this.fill       = new Howl({ src: ['/assets/sounds/crystal-fill.mp3', '/assets/sounds/crystal-fill.ogg'], volume: 0.75 });
  }
}
```

---

### 6.4 Render Döngüsü — İki Katmanlı State

Konva Katman Hiyerarşisi:
Işınların aynaların altından geçmesi ve görsel derinlik için sıralama şu şekilde olmalıdır (en alttan üste):

BackgroundLayer -> 2. GridLayer -> 3. LightRayLayer -> 4. ObjectLayer (Ayna/Kristal) -> 5. WheelLayer.

Capacitor'un Android WebView katmanında her `onTouchMove`'da Zustand güncellemesi ciddi lag yaratır. `useRaycastLoop` hook'u render döngüsünü React state'inden tamamen ayırır.

```
onTouchMove → useRef güncelle → rAF'ta ışın hesapla → Konva direkt çiz
onTouchEnd  → Zustand güncelle (tek seferlik, kalıcı)
```

```typescript
// presentation/hooks/useRaycastLoop.ts
import { useRef, useEffect, useCallback } from 'react';
import Konva from 'konva';

interface EphemeralState {
  mirrorAngles: Map<string, number>;   // mirrorId → anlık açı
  raySegments:  RaySegment[];
  crystalFills: Map<string, number>;
  snapResult:   SnapResult | null;
}

interface UseRaycastLoopOptions {
  puzzle:        Puzzle;
  coords:        CoordinateSystem;
  engine:        RaycastEngine;
  snapService:   MagneticSnapService;
  snapMode:      SnapMode;
  layerRef:      React.RefObject<Konva.Layer>;  // LightRayLayer ref'i
  onWin:         (fills: Map<string, number>) => void;  // Zustand'a bildir
  onSnapChange:  (result: SnapResult) => void;          // Haptic için
}

export function useRaycastLoop(opts: UseRaycastLoopOptions) {
  // Ephemeral state — React render döngüsünün dışında
  const ephemeral = useRef<EphemeralState>({
    mirrorAngles: new Map(opts.puzzle.mirrors.map(m => [m.id, m.angleDegrees])),
    raySegments:  [],
    crystalFills: new Map(),
    snapResult:   null,
  });

  const rafId   = useRef<number>(0);
  const isDirty = useRef(false);   // Sadece değişiklik varsa çiz

  /** Işın motoru çalıştır ve Konva layer'ı direkt güncelle — Zustand yok */
  const runTrace = useCallback(() => {
    const state = ephemeral.current;

    // Ephemeral açıları puzzle'a uygula (immutable)
    const livePuzzle: Puzzle = {
      ...opts.puzzle,
      mirrors: opts.puzzle.mirrors.map(m => ({
        ...m,
        angleDegrees: state.mirrorAngles.get(m.id) ?? m.angleDegrees,
      })),
    };

    const result = opts.engine.trace(livePuzzle);
    state.raySegments  = result.segments;
    state.crystalFills = result.crystalFills;

    // Konva layer'ı direkt güncelle — React re-render YOK
    if (opts.layerRef.current) {
      drawRaySegments(opts.layerRef.current, result.segments);
      opts.layerRef.current.batchDraw();
    }

    // Kazanma kontrolü — düşük frekanslı, Zustand'a bildir
    const allFilled = opts.puzzle.crystals
      .filter(c => c.isTarget)
      .every(c => (result.crystalFills.get(c.id) ?? 0) >= 1.0);

    if (allFilled) opts.onWin(result.crystalFills);
  }, [opts]);

  /** requestAnimationFrame döngüsü */
  const loop = useCallback(() => {
    if (isDirty.current) {
      runTrace();
      isDirty.current = false;
    }
    rafId.current = requestAnimationFrame(loop);
  }, [runTrace]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [loop]);

  /**
   * onTouchMove / onMouseMove'dan çağrılır.
   * Zustand'a dokunmaz — sadece ref günceller ve dirty flag koyar.
   */
  const updateMirrorAngle = useCallback((
    mirrorId: string,
    rawAngle: number,
  ) => {
    // Snap değerlendir (domain servisi — saf hesaplama)
    const livePuzzle = buildLivePuzzle(opts.puzzle, ephemeral.current.mirrorAngles);
    const snap = opts.snapService.evaluate(livePuzzle, mirrorId, rawAngle, opts.snapMode);

    ephemeral.current.mirrorAngles.set(mirrorId, snap.finalAngle);
    ephemeral.current.snapResult = snap;
    isDirty.current = true;

    // Snap feedback — Haptic ve ses için bildir (düşük frekanslı)
    opts.onSnapChange(snap);
  }, [opts]);

  /**
   * onTouchEnd / onDragEnd'den çağrılır.
   * Ephemeral state'i Zustand'a yazar — kalıcı hale getirir.
   */
  const commitToStore = useCallback((
    mirrorId:  string,
    storeFn:   (id: string, angle: number) => void,
  ) => {
    const finalAngle = ephemeral.current.mirrorAngles.get(mirrorId) ?? 0;
    storeFn(mirrorId, finalAngle);   // Zustand action çağrısı
  }, []);

  return { updateMirrorAngle, commitToStore, ephemeral };
}

/** Konva Layer'ı direkt çizen yardımcı — React render bypass */
function drawRaySegments(layer: Konva.Layer, segments: RaySegment[]): void {
  // Mevcut ışın çizgilerini temizle (sadece 'ray-line' isimli node'lar)
  layer.find('.ray-line').forEach(node => node.destroy());

  const colorHex: Record<RayColor, string> = {
    WHITE:  '#FFFFFF',
    RED:    '#FF4444',
    BLUE:   '#4488FF',
    YELLOW: '#FFCC00',
  };

  for (const seg of segments) {
    const line = new Konva.Line({
      name:         'ray-line',
      points:       [seg.start.x, seg.start.y, seg.end.x, seg.end.y],
      stroke:       colorHex[seg.color],
      strokeWidth:  3,
      lineCap:      'round',
      shadowColor:  colorHex[seg.color],
      shadowBlur:   12,
      shadowOpacity: 0.8,
    });
    layer.add(line);
  }
}

function buildLivePuzzle(base: Puzzle, angles: Map<string, number>): Puzzle {
  return {
    ...base,
    mirrors: base.mirrors.map(m => ({
      ...m,
      angleDegrees: angles.get(m.id) ?? m.angleDegrees,
    })),
  };
}
```

**PuzzleCanvas entegrasyonu:**
```typescript
// presentation/components/canvas/PuzzleCanvas.tsx
const rayLayerRef = useRef<Konva.Layer>(null);

const { updateMirrorAngle, commitToStore } = useRaycastLoop({
  puzzle, coords, engine, snapService, snapMode,
  layerRef: rayLayerRef,
  onWin: (fills) => {
    // Zustand'a bildir — tek seferlik, yüksek maliyetli değil
    puzzleStore.getState().onPuzzleSolved(fills);
  },
  onSnapChange: (snap) => {
    // Haptic — UI thread'inde ama nadir tetiklenir
    if (snap.snapStrength > 0.85) Haptics.impact({ style: ImpactStyle.Light });
    if (snap.snapped)             Haptics.impact({ style: ImpactStyle.Medium });
  },
});

// MirrorNode'dan gelen gesture:
// onTouchMove → updateMirrorAngle(mirrorId, angle)   ← rAF, Zustand yok
// onTouchEnd  → commitToStore(mirrorId, rotateMirror) ← Zustand, kalıcı
```

> **Kritik Kural:** `updateMirrorAngle` içinde **asla** `setState` veya Zustand action çağırma. Sadece `useRef` güncelle. React'in re-render döngüsüne girmek performans kazanımını sıfırlar.

---

### 6.5 Haptic Feedback — Merkezi Titreşim Sistemi

Önceki bölümlerde (6.4, Prompt 6) snap için haptic çağrıları dağınık halde vardı. Tüm titreşim olaylarını tek bir servis üzerinden yönetmek hem test edilebilirlik hem platform uyumu açısından doğru yaklaşım.

**Tetikleyici Olaylar:**

| Olay | Yoğunluk | Açıklama |
|---|---|---|
| Işın kristale oturdu | `Medium` | Hedef kristal `fillLevel` 1.0'a ulaştı |
| Ayna grid'e snap oldu | `Light` | `onDragEnd` — ayna hücreye yerleşti |
| Magnetic snap (nudge) | `Light` | `snapStrength > 0.85`, henüz kilitlenmedi |
| Magnetic snap (kilit) | `Medium` | `snapped === true`, açı kilitlendi |
| Bölüm tamamlandı | `Heavy` | Kazanma anı — tek ve belirgin |
| Geçersiz hamle | `Light` (x2, 80ms ara) | Grid dışı sürükleme girişimi |

```typescript
// infrastructure/haptics/HapticService.ts
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export type HapticEvent =
  | 'CRYSTAL_HIT'      // Işın hedefe oturdu
  | 'MIRROR_SNAP'      // Ayna grid hücresine snap
  | 'SNAP_NUDGE'       // Magnetic snap — yaklaşıyor
  | 'SNAP_LOCK'        // Magnetic snap — kilitlendi
  | 'LEVEL_COMPLETE'   // Bölüm kazanıldı
  | 'INVALID_MOVE';    // Geçersiz hamle

export interface IHapticService {
  trigger(event: HapticEvent): Promise<void>;
  setEnabled(enabled: boolean): void;
}

export class HapticService implements IHapticService {
  private enabled = true;

  /** Son tetiklenme zamanı — aynı olayı throttle eder */
  private lastTrigger = new Map<HapticEvent, number>();
  private readonly THROTTLE_MS = 100;

  async trigger(event: HapticEvent): Promise<void> {
    if (!this.enabled) return;

    // Throttle: aynı olay 100ms içinde tekrar tetiklenmesin
    const now  = Date.now();
    const last = this.lastTrigger.get(event) ?? 0;
    if (now - last < this.THROTTLE_MS) return;
    this.lastTrigger.set(event, now);

    try {
      await this.dispatch(event);
    } catch {
      // Haptics desteklenmeyen ortamda (web) sessizce geç
      this.webFallback(event);
    }
  }

  setEnabled(enabled: boolean): void { this.enabled = enabled; }

  private async dispatch(event: HapticEvent): Promise<void> {
    switch (event) {
      case 'CRYSTAL_HIT':
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;

      case 'MIRROR_SNAP':
        await Haptics.impact({ style: ImpactStyle.Light });
        break;

      case 'SNAP_NUDGE':
        await Haptics.impact({ style: ImpactStyle.Light });
        break;

      case 'SNAP_LOCK':
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;

      case 'LEVEL_COMPLETE':
        // Çift darbe: kısa + uzun → "başarı" hissi
        await Haptics.impact({ style: ImpactStyle.Heavy });
        await new Promise(r => setTimeout(r, 120));
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;

      case 'INVALID_MOVE':
        // Çift kısa darbe: "hayır" hissi
        await Haptics.impact({ style: ImpactStyle.Light });
        await new Promise(r => setTimeout(r, 80));
        await Haptics.impact({ style: ImpactStyle.Light });
        break;
    }
  }

  /** Web tarayıcısı fallback — Vibration API */
  private webFallback(event: HapticEvent): void {
    if (!navigator.vibrate) return;
    const patterns: Record<HapticEvent, number | number[]> = {
      CRYSTAL_HIT:    40,
      MIRROR_SNAP:    20,
      SNAP_NUDGE:     15,
      SNAP_LOCK:      35,
      LEVEL_COMPLETE: [50, 100, 80],
      INVALID_MOVE:   [20, 60, 20],
    };
    navigator.vibrate(patterns[event]);
  }
}

/** Geliştirme ortamı için mock */
export class MockHapticService implements IHapticService {
  async trigger(event: HapticEvent): Promise<void> {
    console.log(`[HAPTIC] ${event}`);
  }
  setEnabled(_: boolean): void {}
}
```

**Port interface'i (domain/ports/IHapticService.ts):**
```typescript
// HapticService domain'den bağımsız çalışır ama
// UseCase'lerin ona bağımlı olmaması için port tanımla.
export type { HapticEvent, IHapticService } from '../../infrastructure/haptics/HapticService';
```

**Entegrasyon noktaları:**

```typescript
// 1. useRaycastLoop — kristal oturma
onWin: (fills) => {
  hapticService.trigger('CRYSTAL_HIT');      // Işın hedefe oturdu
  puzzleStore.getState().onPuzzleSolved(fills);
  // Kısa gecikme sonra LEVEL_COMPLETE — önce hit hissi, sonra kutlama
  setTimeout(() => hapticService.trigger('LEVEL_COMPLETE'), 300);
},

// 2. useGestureHandler — ayna grid snap
onDragEnd: (mirrorId, newCell) => {
  if (coords.isValidCell(newCell)) {
    hapticService.trigger('MIRROR_SNAP');
    commitToStore(mirrorId, slideMirror);
  } else {
    hapticService.trigger('INVALID_MOVE');
    // Aynayı eski pozisyonuna geri döndür
  }
},

// 3. useRaycastLoop — magnetic snap callback
onSnapChange: (snap) => {
  if (snap.snapped)             hapticService.trigger('SNAP_LOCK');
  else if (snap.snapStrength > 0.85) hapticService.trigger('SNAP_NUDGE');
},
```

**DI Container güncellemesi:**
```typescript
// container.ts
const hapticService = import.meta.env.DEV
  ? new MockHapticService()
  : new HapticService();

export { hapticService };
```

**Ayarlar ekranında ses/titreşim toggle:**
```typescript
// Tek toggle ile ikisi birden kontrol edilebilir
// ya da ayrı ayrı — tasarım kararı
hapticService.setEnabled(userPreferences.hapticsEnabled);
soundService.setMuted(!userPreferences.soundEnabled);
```

> **Throttle gerekçesi:** `onSnapChange` her `onTouchMove` frame'inde çağrılabilir. Throttle olmadan aynı event 60fps'te saniyede 60 kez tetiklenip cihaz titreşim motorunu yorar. 100ms eşiği oyuncunun her eylemi hissetmesi için yeterli, spamı önler.

---

## 7. Bölüm & Dünya Sistemi

### Bölüm Veri Formatı

```typescript
// infrastructure/levels/WorldOneLevels.ts
export const WORLD_ONE_LEVELS: Puzzle[] = [
  {
    id: 'w1_l1',
    worldId: 'forest',
    levelNumber: 1,
    gridSize: { cols: 5, rows: 7 },
    mechanic: 'ROTATE',
    timeLimit: null,
    lightSource: {
      position: { x: 0, y: 3 },
      direction: { x: 1, y: 0 },   // Sağa doğru
      color: 'WHITE'
    },
    mirrors: [
      { id: 'm1', position: { x: 2, y: 3 }, angleDegrees: 45, type: 'ROTATE', isMovable: true },
    ],
    crystals: [
      { id: 'c1', position: { x: 2, y: 0 }, color: 'WHITE', isTarget: true, fillLevel: 0 },
    ],
  },
  // ... diğer bölümler
];
```

### Dünya Kilit Sistemi

```
Dünya 1 (Orman):    Her zaman açık
Dünya 2 (Buzul):    Dünya 1'in 12. bölümü tamamlanınca açılır
Dünya 3 (Şelale):   Dünya 2'nin 12. bölümü tamamlanınca açılır
```

---

## 8. Günlük Challenge Sistemi

### Nasıl Çalışır?
- Her gün UTC 00:00'da yeni bölüm aktif olur
- Tarih-bazlı seed ile backend gerektirmez — tüm kullanıcılar aynı bölümü oynar
- Günde 1 kez oynama hakkı (kayıt edilir)
- Sonuç emoji ile paylaşılabilir (Wordle tarzı)

```typescript
// application/use-cases/LoadDailyChallengeUseCase.ts
export class LoadDailyChallengeUseCase {
  constructor(
    private readonly seedGenerator: DailySeedGenerator,
    private readonly storageService: IStorageService,
    private readonly allPuzzles: Puzzle[],
  ) {}

  async execute(): Promise<DailyChallengeDTO> {
    const today = new Date();
    const dateKey = `${today.getUTCFullYear()}-${today.getUTCMonth()}-${today.getUTCDate()}`;

    // Daha önce oynandı mı?
    const existing = await this.storageService.getDailyChallenge(dateKey);

    // Bugünkü bölümü seç (deterministik)
    const index = this.seedGenerator.getPuzzleIndex(today, this.allPuzzles.length);
    const puzzle = this.allPuzzles[index];

    return {
      puzzle,
      dateKey,
      alreadyPlayed: !!existing,
      previousResult: existing ?? null,
    };
  }
}
```

---

## 9. Sosyal Paylaşım Sistemi

### Paylaşım Formatı (Wordle tarzı)

```
💎 Crystal Mirror — Bölüm 14
⭐⭐⭐
⏱️ 47s
✨✨✨💡✨✨
#CrystalMirror #Puzzle
```

- `✨` = oyuncunun kendi adımı
- `💡` = hint kullanılan adım

### Uygulama
- `Capacitor Share API` → iOS share sheet / Android intent
- Web fallback: `navigator.share()` veya panoya kopyala
- Paylaşım butonu sadece bölüm tamamlandıktan sonra aktif

---

## 10. Hints Sistemi

### Akış
1. Oyuncu "💡 İpucu Al" butonuna basar
2. Rewarded Ad gösterilir (30 saniye)
3. Reklam tamamlanırsa: `UseHintUseCase` en iyi hamleyi hesaplar
4. Seçili ayna altın rengi parlar, hedef açı ok ile gösterilir
5. Hint kullanımı `StarRatingCalculator`'a bildirilir (3 yıldız → 2 yıldız)

### Hint Algoritması
Brute-force yeterli (50 bölüm, küçük grid):
- Her hareketli ayna için 0°–360° arası 5°'lik adımlarla tara
- Her konfigürasyonda ışın izle, hedef kristal dolumunu hesapla
- En yüksek dolumu sağlayan açıyı öner

---

## 11. AdMob Entegrasyonu

| Reklam Türü | Ne Zaman | Nerede |
|---|---|---|
| **Banner** | Oyun ekranında sürekli | Alt orta, oyun alanı dışında |
| **Interstitial** | Her 3 bölüm tamamlandıktan sonra | Bölüm geçişinde |
| **Rewarded** | Hint istendiğinde | Hint akışı içinde |

```typescript
// Interstitial — her 3 bölümde bir
async onLevelComplete(levelNumber: number): Promise<void> {
  await this.storageService.saveLevelProgress(...);
  if (levelNumber % 3 === 0) {
    await this.adService.showInterstitial();
  }
  this.navigateToNextLevel();
}
```

**Test ID'leri:**
```
Banner:        ca-app-pub-3940256099942544/6300978111
Interstitial:  ca-app-pub-3940256099942544/1033173712
Rewarded:      ca-app-pub-3940256099942544/5224354917
```

---

## 12. Görsel Tasarım Rehberi

### Renk Paleteri

```css
/* presentation/theme/worlds.css */

/* 🌲 Dünya 1 — Orman */
[data-world="forest"] {
  --bg-primary:    #0D2B1A;
  --bg-secondary:  #1A4A2E;
  --light-color:   #FFD700;   /* Güneş altını */
  --crystal-glow:  #ADFF2F;
  --ui-accent:     #4CAF50;
  --particle:      #FFEB3B;
}

/* 🧊 Dünya 2 — Buzul */
[data-world="glacier"] {
  --bg-primary:    #0A1628;
  --bg-secondary:  #0D2744;
  --light-color:   #00E5FF;   /* Buz mavisi */
  --crystal-glow:  #80DEEA;
  --ui-accent:     #29B6F6;
  --particle:      #E0F7FA;
}

/* 🌊 Dünya 3 — Şelale */
[data-world="waterfall"] {
  --bg-primary:    #1A0A2E;
  --bg-secondary:  #2D1450;
  --light-color:   #FF4FC8;   /* Biolüminesans pembe */
  --crystal-glow:  #CE93D8;
  --ui-accent:     #AB47BC;
  --particle:      #E1BEE7;
}

/* Ortak kristal parıltı animasyonu */
@keyframes crystalPulse {
  0%, 100% { filter: drop-shadow(0 0 8px var(--crystal-glow)); }
  50%       { filter: drop-shadow(0 0 20px var(--crystal-glow)); }
}

/* Işın gradient efekti */
.ray-beam {
  stroke: var(--light-color);
  stroke-width: 3;
  stroke-linecap: round;
  filter: drop-shadow(0 0 6px var(--light-color));
  opacity: 0.9;
}
```

### Font Önerisi
- **Başlık / Logo:** `Cinzel Decorative` (Google Fonts) — antik, kristal hissi
- **UI / Sayılar:** `Rajdhani` — temiz, okunabilir, hafif geometrik
- **Bölüm açıklamaları:** `Lato Light` — yumuşak, rahat

### Işın Görsel Efekti (Canvas)
```typescript
// Işın çizmek için Konva Line + glow filter
<Line
  points={[seg.start.x, seg.start.y, seg.end.x, seg.end.y]}
  stroke={seg.color}
  strokeWidth={4}
  shadowColor={seg.color}
  shadowBlur={12}
  shadowOpacity={0.8}
  lineCap="round"
/>
```

### Chromatic Aberration Efekti

Işın aynaya çarptığı anda çok hafif renk dağılması — gerçek optik camların "kusuru". Oyuncuya premium, fiziksel bir his verir. Canvas API'de gerçek renk ayrışması pahalı olduğundan **üç offset çizgi** tekniğiyle simüle edilir.

**Strateji:** Yansıma anında ana ışın çizgisinin yanına R/G/B kanalları için ±1-2px offset ile ek çizgiler çizilir, düşük opacity ile. Sadece **yansıma segmentine** uygulanır — gelişi gidiş için değil, bu efektin abartılı görünmesini önler.

```typescript
// presentation/components/canvas/ChromaticAberration.ts

export interface AberrationConfig {
  /** Kanal kayması piksel miktarı. Küçük tut: 1–2px yeterli */
  offset:       number;
  /** Ana ışın opaklığı — aberrasyon daha belirgin görünür */
  baseOpacity:  number;
  /** Her renkli kanal opaklığı */
  channelOpacity: number;
  /** Sadece yansıma sonrası segmentlere uygula */
  onlyAfterBounce: boolean;
}

export const DEFAULT_ABERRATION: AberrationConfig = {
  offset:          1.5,
  baseOpacity:     0.92,
  channelOpacity:  0.25,
  onlyAfterBounce: true,
};

/**
 * Tek bir ışın segmenti için chromatic aberration çizgileri üretir.
 * Üç kanal: kırmızı (+offset), yeşil (0), mavi (-offset)
 * Yön: segmentin normali boyunca ofset uygulanır (segment yönüne dik)
 */
export function buildAberrationLines(
  seg:    RaySegment,
  config: AberrationConfig = DEFAULT_ABERRATION,
): AberrationLine[] {
  // Segmentin dik (normal) yönü
  const dx  = seg.end.x - seg.start.x;
  const dy  = seg.end.y - seg.start.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return [];

  // Normalize edilmiş dik vektör
  const nx = -dy / len;
  const ny =  dx / len;
  const o  = config.offset;

  return [
    // Kırmızı kanal — +offset yönünde
    {
      points:  shift(seg, nx * o, ny * o),
      color:   '#FF3333',
      opacity: config.channelOpacity,
      blur:    4,
    },
    // Yeşil kanal — yerinde (ana ışın üstünde hafif)
    {
      points:  [seg.start.x, seg.start.y, seg.end.x, seg.end.y],
      color:   '#33FF99',
      opacity: config.channelOpacity * 0.6,
      blur:    3,
    },
    // Mavi kanal — -offset yönünde
    {
      points:  shift(seg, -nx * o, -ny * o),
      color:   '#3399FF',
      opacity: config.channelOpacity,
      blur:    4,
    },
  ];
}

function shift(seg: RaySegment, ox: number, oy: number): number[] {
  return [
    seg.start.x + ox, seg.start.y + oy,
    seg.end.x   + ox, seg.end.y   + oy,
  ];
}

export interface AberrationLine {
  points:  number[];
  color:   string;
  opacity: number;
  blur:    number;
}
```

**`drawRaySegments` entegrasyonu** (`useRaycastLoop.ts` içinde):

```typescript
function drawRaySegments(
  layer:   Konva.Layer,
  segments: RaySegment[],
  config:  AberrationConfig = DEFAULT_ABERRATION,
): void {
  layer.find('.ray-line').forEach(n => n.destroy());

  const colorHex: Record<RayColor, string> = {
    WHITE: '#FFFFFF', RED: '#FF4444', BLUE: '#4488FF', YELLOW: '#FFCC00',
  };

  segments.forEach((seg, i) => {
    const isAfterBounce = i > 0;  // İlk segment = gelişi, sonrakiler = yansıma

    // Ana ışın çizgisi
    layer.add(new Konva.Line({
      name:          'ray-line',
      points:        [seg.start.x, seg.start.y, seg.end.x, seg.end.y],
      stroke:        colorHex[seg.color],
      strokeWidth:   3,
      lineCap:       'round',
      shadowColor:   colorHex[seg.color],
      shadowBlur:    12,
      shadowOpacity: 0.8,
      opacity:       config.baseOpacity,
    }));

    // Chromatic aberration — sadece yansıma sonrası segmentlere
    if (!config.onlyAfterBounce || isAfterBounce) {
      for (const ab of buildAberrationLines(seg, config)) {
        layer.add(new Konva.Line({
          name:          'ray-line',
          points:        ab.points,
          stroke:        ab.color,
          strokeWidth:   1.5,
          lineCap:       'round',
          shadowColor:   ab.color,
          shadowBlur:    ab.blur,
          shadowOpacity: ab.opacity,
          opacity:       ab.opacity,
        }));
      }
    }
  });
}
```

> **Performans Notu:** Aberrasyon çizgileri rAF döngüsüne eklendiği için maliyet minimumdur — her frame zaten yeniden çiziliyor. Düşük segmentli cihazlarda `channelOpacity: 0` yaparak efekti tamamen kapatmak için ayar olarak sakla.

**CSS — Dünya temasına göre aberrasyon yoğunluğu:**
```css
/* Buzul dünyasında daha belirgin — buz kristali hissi */
[data-world="glacier"]   { --aberration-offset: 2px;   --aberration-opacity: 0.3; }
/* Orman dünyasında hafif — doğal ışık hissi */
[data-world="forest"]    { --aberration-offset: 1px;   --aberration-opacity: 0.2; }
/* Şelale dünyasında orta — su altı kırılması */
[data-world="waterfall"] { --aberration-offset: 1.5px; --aberration-opacity: 0.25; }
```

---

## 13. Ortam Değişkenleri & Kurulum

### .env.local
```bash
# GİT'E ATMA!
VITE_ADMOB_APP_ID_ANDROID=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
VITE_ADMOB_APP_ID_IOS=ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
VITE_ADMOB_BANNER_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
VITE_ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
VITE_ADMOB_REWARDED_ID=ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX
```

### Kurulum Komutları
```bash
# 1. Proje oluştur
npm install -g @ionic/cli
ionic start crystal-mirror blank --type=react --capacitor
cd crystal-mirror

# 2. Bağımlılıklar
npm install zustand i18next react-i18next howler
npm install react-konva konva
npm install framer-motion
npm install @capacitor/preferences @capacitor/share @capacitor/haptics
npm install @capacitor-community/admob
npm install tailwindcss postcss autoprefixer
npm install @types/howler --save-dev
npx tailwindcss init -p

# 3. Platformlar
ionic capacitor add android
ionic capacitor add ios
npx cap sync

# 4. Geliştirme
ionic serve

# 5. Build
ionic build && npx cap sync
npx cap open android
npx cap open ios
```

---

## 14. Uçtan Uca AI Prompt Zinciri

Aşağıdaki promptları **sırayla** ver. Her biri öncekinin çıktısına dayanır.

> 💡 Her prompt sonunda beklenen çıktıyı kontrol et. Hata varsa düzelt, sonra ilerle.

---
### PROMPT 0 - AI Agent Sistem Talimatları (Mimari Anayasa)
Domain Bağımsızlığı: domain/ klasörü içinde asla framework (React, Konva, Ionic) importu yapılamaz.

State Kuralı: Işık hesaplamaları için asla React useState kullanma; sadece useRef ve requestAnimationFrame (rAF) kullan.

Hata Yönetimi: Tüm asset yüklemelerinde (Ses/Resim) safeLoad mekanizması kullanılarak dosya eksikliğinde uygulamanın çökmesi engellenmelidir.

### PROMPT 1 — Proje İskeleti

```
Sen bir senior TypeScript geliştiricisisin. Aşağıdaki spesifikasyona göre
Ionic + React + Capacitor + TypeScript projesi için tam klasör yapısını
ve her dosyanın sadece iskeletini (import'lar + boş export) oluştur.

PROJE: Crystal Mirror — ışık ve kristal bulmaca mobil oyunu

KURALLAR:
- Clean Architecture: domain / application / infrastructure / presentation
- Domain katmanı: sıfır 3rd-party import (sadece TypeScript)
- Her klasörde index.ts barrel export
- TypeScript strict mode
- react-konva Canvas render için kullanılacak (DOM değil)

KATMANLAR:
domain/entities: Ray, Mirror, Crystal, LightSource, Puzzle, World
domain/value-objects: Vector2D, Angle, Color, PuzzleStatus, StarRating
domain/physics: RaycastEngine, ReflectionCalculator, CollisionDetector
domain/rules: WinConditionChecker, StarRatingCalculator, DailySeedGenerator
domain/ports: ISoundService, IAdService, IStorageService, IShareService
application/use-cases: StartPuzzle, RotateMirror, SlideMirror,
  CheckWinCondition, UseHint, LoadDailyChallenge, SaveProgress, ShareResult
infrastructure: HowlerSoundService, AdMobService, MockAdService,
  CapacitorStorageService, CapacitorShareService, WorldOne/Two/ThreeLevels, i18n
presentation: PuzzleCanvas, MirrorNode, CrystalNode, LightRayLayer,
  BackgroundLayer, Header, HintButton, bütün Screen'ler, Store'lar

ÇIKTI: Tüm dosyaları tek artifact'ta göster.
```

---

### PROMPT 2 — Koordinat Sistemi, Ayna Geometrisi & Fizik Altyapısı

```
Prompt 1'deki domain katmanını implement et. Sadece domain/ klasörü.
Dışarıya bağımlılık YOKTUR.

"Yansıma hesaplarken $\vec{R} = \vec{D} - 2(\vec{D} \cdot \vec{N})\vec{N}$ formülünü kullan ve MAX_TOTAL_DISTANCE kontrolünü ekle."

── BÖLÜM A: Koordinat Sistemi ──────────────────────────────────────

CoordinateSystem sınıfı (domain/value-objects/CoordinateSystem.ts):
  constructor(canvasWidth, canvasHeight, gridCols, gridRows)
  - cellSize: Math.min(canvasW/cols, canvasH/rows) — kare hücre
  - offsetX/Y: ızgara canvas'a ortalansın
  - gridToPixel(cell: GridCell): Vector2D — hücre merkezini piksel'e çevir
  - pixelToGrid(px: Vector2D): GridCell — pikseli grid'e snap et
  - isValidCell(cell): boolean
  - static fromWindow(cols, rows): CoordinateSystem
    * usableH = window.innerHeight - 56 - 60 (header + banner payı)

GridCell interface: { col: number; row: number }

KURAL: Domain fizik motoru piksel uzayında çalışır.
       Tüm grid koordinatları önce gridToPixel() ile dönüştürülür.

── BÖLÜM B: Vector2D ────────────────────────────────────────────────

Vector2D (immutable class):
  - add, subtract, scale, normalize, dot, reflect(normal)
  - angleTo(v): iki vektör arası açı (radyan)
  - distanceTo(v): iki nokta arası mesafe

── BÖLÜM C: Ayna Geometrisi ─────────────────────────────────────────

MirrorGeometry (domain/physics/MirrorGeometry.ts):

getMirrorSegment(mirror, coords): LineSegment
  - Ayna uzunluğu: cellSize * 0.45 (her yönde yarısı)
  - Açı 0° = yatay, 90° = dikey, 45° = köşegen (/)
  - Merkez: coords.gridToPixel(mirror.position)
  - start/end: merkezden ±halfLen * [cos(rad), sin(rad)]

getMirrorNormal(mirror, rayDirection): Vector2D
  - İki normal vektör hesapla (aynaya dik)
  - Işın yönüne karşı bakan normalı seç (dot product < 0 olanı)

── BÖLÜM D: Çarpışma Tespiti ────────────────────────────────────────

CollisionDetector (domain/physics/CollisionDetector.ts):

raySegmentIntersection(origin, direction, segment, minDist=0.001)
  - Parametrik ışın-segment kesişimi
  - denom = direction.x*dy - direction.y*dx
  - Paralelse (|denom| < 1e-10) → null
  - t (ışın parametresi) ve s (segment parametresi 0–1) hesapla
  - t < minDist veya s ∉ [0,1] → null
  - { point: Vector2D, t: number } döner

rayCrystalIntersection(origin, direction, crystal, coords)
  - Kristal merkezi: coords.gridToPixel(crystal.position)
  - Yarıçap: coords.cellSize * 0.35
  - Analitik ışın-daire kesişimi (diskriminant kontrolü)
  - { point, t } döner

── BÖLÜM E: Renk Sistemi ────────────────────────────────────────────

Color (domain/value-objects/Color.ts):
  RayColor: 'WHITE' | 'RED' | 'BLUE' | 'YELLOW'
  CrystalColor: 'WHITE' | 'RED' | 'BLUE' | 'YELLOW' | 'PRISM'

colorPassesFilter(rayColor, crystalColor): boolean
  - WHITE kristal → her zaman true
  - PRISM kristal → her zaman true (bölme ayrıca işlenir)
  - WHITE ışın → false (renkli filtreden geçemez)
  - Diğer: rayColor === crystalColor

splitByPrism(direction, color): Array<{direction, color}>
  - Sadece WHITE ışın bölünür
  - WHITE → RED (0°), BLUE (+15°), YELLOW (-15°)
  - Renkli ışın: [{ direction, color }] (değişmez)

rotateVector(v, degrees): Vector2D (yardımcı, export et)

── BÖLÜM F: Işın Motoru ─────────────────────────────────────────────

RaycastEngine (domain/physics/RaycastEngine.ts):
  constructor(coords: CoordinateSystem)

  trace(puzzle): TraceResult
    TraceResult: { segments: RaySegment[], crystalFills: Map<string, number> }
    RaySegment: { start, end, color: RayColor, hitObjectId: string|null }

  Algoritma:
    1. origin = gridToPixel(lightSource.position)
    2. direction = lightSource.direction.normalize()
    3. color = lightSource.color
    4. Döngü (max MAX_BOUNCES=20):
       a. findNearestHit(origin, dir, puzzle) çağır
       b. Hit yoksa → extendToCanvasBound ile uzat, segment ekle, dur
       c. Segment ekle (start→hit.point)
       d. Hit CRYSTAL ise:
          - colorPassesFilter kontrolü
          - Geçerse: isTarget ise crystalFills.set(id, 1.0), dur
          - Geçmezse: dur (ışın söner)
          - PRISM ise: splitByPrism ile alt ışınları ayrı trace et (recursive, MAX_BOUNCES paylaş)
       e. Hit MIRROR ise:
          - getMirrorNormal ile normal al
          - direction = direction.reflect(normal).normalize()
          - origin = hit.point
          - bounces++

  findNearestHit: tüm aynalar + kristaller, en küçük t değerini döner
  extendToCanvasBound: grid sınırlarına göre en yakın duvarı hesapla

── BÖLÜM G: Diğer Domain Bileşenleri ───────────────────────────────

WinConditionChecker.check(puzzle, crystalFills): boolean
  - Tüm isTarget kristaller crystalFills'te 1.0 ise true

StarRatingCalculator.calculate(timeSeconds, hintsUsed, timeLimit): StarRating
  - hintsUsed > 0 → max 2 yıldız
  - timeLimit yoksa süreye göre 3 eşik belirle
  - 3 yıldız: timeSeconds < timeLimit * 0.5
  - 2 yıldız: timeSeconds < timeLimit * 1.0
  - 1 yıldız: diğer

DailySeedGenerator:
  generate(date): deterministik hash (dateStr üzerinden)
  getPuzzleIndex(date, total): hash % total

Her fonksiyon için JSDoc. Pure function ve immutability zorunlu.
```

---

### PROMPT 3 — Application Use Case'leri

```
Prompt 2'nin domain katmanını kullanarak application use case'lerini implement et.

RotateMirrorUseCase:
  execute(puzzle, mirrorId, newAngleDegrees, coords): PuzzleStateDTO
  - Mirror açısını immutable güncelle
  - RaycastEngine.trace(puzzle) → TraceResult al
  - WinConditionChecker.check(puzzle, traceResult.crystalFills)
  - Kazandıysa soundService.playVictory()
  - PuzzleStateDTO: { puzzle, raySegments, crystalFills, status, stars? }

SlideMirrorUseCase:
  execute(puzzle, mirrorId, newCell: GridCell, coords): PuzzleStateDTO
  - coords.isValidCell(newCell) kontrolü
  - Aynı hücrede başka nesne (mirror/crystal/lightSource) var mı?
  - Sonra RotateMirrorUseCase ile aynı trace + win kontrolü

UseHintUseCase:
  execute(puzzle, coords): Promise<HintDTO>
  - adService.showRewarded() → earned değilse hata fırlat
  - HintCalculator.calculate(puzzle, engine) çağır
    * HintCalculator Prompt 2'de tanımlı algoritma ile çalışır
    * Cache: puzzleStateHash ile aynı state için tekrar hesaplama yapma
  - soundService.playHint()
  - HintDTO: { mirrorId, suggestedAngle, score }

LoadDailyChallengeUseCase:
  execute(): Promise<DailyChallengeDTO>
  - UTC tarihten dateKey: YYYY-MM-DD
  - DailySeedGenerator.getPuzzleIndex(today, allPuzzles.length)
  - storageService.getDailyChallenge(dateKey)
  - DailyChallengeDTO: { puzzle, dateKey, alreadyPlayed, previousResult }

ShareResultUseCase:
  execute(result: PuzzleResult): Promise<void>
  - Emoji grid: ✨ = kendi adımı, 💡 = hint adımı
  - Format: başlık + yıldız + süre + emoji + hashtag
  - shareService.share()
```

---

### PROMPT 4 — Infrastructure Adaptörleri

```
Aşağıdaki infrastructure servislerini implement et:
Tüm native pluginler (AdMob, Haptics) için web ortamında hata vermeyen Mock versiyonlarını mutlaka oluştur.
--- HowlerSoundService ---
Howler.js ile ISoundService implement et.
Sesler: ambient (loop, 0.35), crystal-hit (0.8), mirror-slide (0.6),
        victory (0.9), hint (0.7), crystal-fill (0.75)
Yol: /assets/sounds/<isim>.mp3 + .ogg

--- MockAdService ---
showBanner: console.log + resolve
showInterstitial: 800ms delay + resolve
showRewarded: 1200ms delay + { earned: true, amount: 1 }

--- AdMobService ---
@capacitor-community/admob kullan.
Banner: ADAPTIVE_BANNER, BOTTOM_CENTER
Interstitial: prepare + show
Rewarded: prepare + show + listener

--- CapacitorStorageService ---
@capacitor/preferences kullan.
saveLevelProgress(levelId, stars, timeSeconds): daha iyi skoru kaydet
getLevelProgress(levelId): LevelProgress | null
getDailyChallenge(dateKey): DailyRecord | null
saveDailyChallenge(dateKey, record): void
getAllProgress(): Map<string, LevelProgress>

--- CapacitorShareService ---
@capacitor/share kullan.
share({ text, title }): Promise<void>
canShare(): Promise<boolean>

--- Bölüm Data (WorldOneLevels.ts) ---
WORLD_ONE_LEVELS: Puzzle[] — ilk 5 bölümü implement et, geri kalanlar TODO.
Bölüm 1: 5x7 grid, 1 döndürülür ayna, 1 beyaz hedef kristal, basit
Bölüm 2: 5x7 grid, 1 ayna + 1 yansıtıcı kristal, biraz daha zor
Bölüm 3: 6x8 grid, 2 ayna, köşegen çözüm gerekli
Bölüm 4: 6x8 grid, ilk kez SLIDE ayna
Bölüm 5: 7x9 grid, 2 ayna (1 rotate + 1 slide), kırmızı filtre kristal

--- HapticService ---
@capacitor/haptics kullan. IHapticService implement et.
HapticEvent: CRYSTAL_HIT | MIRROR_SNAP | SNAP_NUDGE | SNAP_LOCK | LEVEL_COMPLETE | INVALID_MOVE
Throttle: aynı event 100ms içinde tekrar tetiklenmesin (Map ile son tetiklenme zamanı tut)
dispatch() switch ile her event için doğru ImpactStyle:
  CRYSTAL_HIT → Medium
  MIRROR_SNAP → Light
  SNAP_NUDGE  → Light
  SNAP_LOCK   → Medium
  LEVEL_COMPLETE → Heavy + 120ms bekle + Medium (çift darbe)
  INVALID_MOVE   → Light + 80ms bekle + Light (çift kısa)
Web fallback: navigator.vibrate() ile pattern array
MockHapticService: console.log('[HAPTIC] <event>'), setEnabled no-op

container.ts'e ekle:
const hapticService = import.meta.env.DEV ? new MockHapticService() : new HapticService();

Anahtarlar: app.title, world.forest/glacier/waterfall,
level.complete, level.stars, level.time, level.hint,
hint.watch_ad, hint.loading, hint.arrow,
daily.title, daily.played, daily.share,
share.text_template, ui.new_game, ui.continue,
settings.sound, settings.language
```

---

### PROMPT 5 — Zustand Store'ları ve DI Container

```
3 ayrı Zustand store implement et + DI container.

--- puzzleStore.ts ---
State: (SADECE kalıcı state — ephemeral rAF döngüsünde yaşar)
  activePuzzle:   Puzzle | null        // Kesinleşmiş puzzle
  committedAngles: Record<string, number>  // Son onDragEnd açıları
  status:         PuzzleStatus         // IDLE / PLAYING / SOLVED
  moves:          MoveRecord[]         // Hint takibi
  elapsedSeconds: number
  hintsUsed:      number
  isHintLoading:  boolean
  hintData:       HintDTO | null
  snapMode:       SnapMode             // 'GUIDED' | 'FREE' — wheel toggle

  NOTA: raySegments ve crystalFills artık bu store'da YOKTUR.
  Bunlar useRaycastLoop hook'u içinde useRef ile yönetilir.
  Zustand sadece gesture tamamlandığında (onTouchEnd/onDragEnd) güncellenir.

Actions:
  loadPuzzle(puzzle: Puzzle): void
  commitMirrorAngle(mirrorId: string, angle: number): void  ← onTouchEnd çağırır
  onPuzzleSolved(fills: Map<string, number>): void          ← useRaycastLoop çağırır
  requestHint(): Promise<void>
  tick(): void
  resetPuzzle(): void
  setSnapMode(mode: SnapMode): void

--- progressStore.ts ---
State:
  levelProgress: Record<string, LevelProgress>
  unlockedWorlds: string[]

Actions:
  loadAllProgress(): Promise<void>
  saveLevel(levelId: string, stars: number, time: number): Promise<void>
  isLevelUnlocked(levelNumber: number): boolean
  getWorldProgress(worldId: string): { completed: number; total: number }

--- dailyStore.ts ---
State:
  todayChallenge: DailyChallengeDTO | null
  isLoading: boolean

Actions:
  loadToday(): Promise<void>
  completeToday(result: PuzzleResult): Promise<void>

--- container.ts ---
const isDev = import.meta.env.DEV;
const adService = isDev ? new MockAdService() : new AdMobService();
const storageService = new CapacitorStorageService();
const shareService = new CapacitorShareService();
const soundService = new HowlerSoundService();
const raycastEngine = new RaycastEngine();
// Tüm use case'leri instantiate et ve export et
```

---

### PROMPT 6 — Canvas Render Sistemi (react-konva)

```
react-konva ile oyun alanını implement et.
Ayna açısını dokunmatik koordinatlara göre Math.atan2 ile hesapla ve RotationWheel'in ayna üstünü kapatmadığından emin ol.
--- useCanvasSize.ts hook ---
CoordinateSystem.fromWindow(puzzle.gridSize.cols, puzzle.gridSize.rows) çağır.
window 'resize' event'inde yeniden hesapla (orientation change dahil).
CoordinateSystem'i tüm canvas bileşenlerine prop olarak ilet.

--- PuzzleCanvas.tsx ---
Ana canvas bileşeni. Puzzle store'dan state alır.
Stage boyutu: coords.offsetX*2 + coords.cellSize*cols genişlik,
              coords.offsetY*2 + coords.cellSize*rows yükseklik
Katmanlar (Layer):
  1. BackgroundLayer    — dünyaya göre gradient arka plan
  2. GridLayer          — ızgara çizgileri (ince, şeffaf)
  3. LightRayLayer      — ışın segmentleri (glow efekti)
  4. ObjectLayer        — aynalar + kristaller
  5. WheelLayer         — seçili ayna için RotationWheel
  6. UILayer            — hint oku (eğer hint aktifse)

--- MirrorNode.tsx ---
Konva Group bileşeni.
- Pozisyon: coords.gridToPixel(mirror.position)
- Uzunluk: coords.cellSize * 0.9
- onTouchStart / onMouseDown: seçili aynayı store'a kaydet
  * Wheel spawn pozisyonunu hesapla (aşağıya bak)
- SLIDE: dragBoundFunc ile sadece geçerli grid hücrelerine snap
  * onDragEnd: coords.pixelToGrid(newPos) → SlideMirrorUseCase
- Seçili halde altın border
- Hint aktifse: altın rengi pulsing animasyon + ok işareti
- Snap snapped=true ise: kısa parıltı animasyonu (shadowBlur 8→24→8, 300ms)

--- RotationWheel.tsx ---
Aynaya dokunulunca ortaya çıkan dairesel kontrol bileşeni.
DOM (div/SVG) olarak render et — Konva dışında, absolute pozisyon.

SPAWN POZİSYONU (dinamik):
  const mirrorPixel = coords.gridToPixel(selectedMirror.position);
  const spawnBelow  = mirrorPixel.y < canvasHeight / 2;
  const wheelY      = spawnBelow
    ? mirrorPixel.y + coords.cellSize * 1.8   // Aynanın altı
    : mirrorPixel.y - coords.cellSize * 1.8;  // Aynanın üstü
  const wheelX = mirrorPixel.x;               // Yatayda hizalı

GÖRSEL:
  - Çap: 120px (küçük parmak için yeterli hedef)
  - Dış halka: ince kristal rengi, %40 şeffaf
  - Mevcut açıyı gösteren ok (merkezi + dış halka arasında)
  - Açı etiketi merkezdeki: "45°"
  - Arka plan: frosted glass (backdrop-filter: blur(8px))
  - Giriş animasyonu: scale 0.3→1.0, opacity 0→1, 200ms ease-out

GESTURE:
  onTouchMove / onMouseMove:
    const dx = touch.clientX - wheelCenterX;
    const dy = touch.clientY - wheelCenterY;
    const rawAngle = Math.round(Math.atan2(dy, dx) * 180 / Math.PI);
    const snapped5 = Math.round(rawAngle / 5) * 5;  // 5° snap (FREE modda 1°)

  Her hareket: RotateMirrorUseCase çağır (snapMode store'dan al)
    → SnapResult.snapStrength > 0.85 → wheel titreşimi (CSS shake, 100ms)
    → SnapResult.snapped === true → wheel kısa parlama + Haptic.impact('light')

  onTouchEnd / onMouseUp: wheel kaybolur (scale 1→0, 150ms)

SNAP MOD TOGGLE:
  Wheel'in alt köşesinde küçük bir "🔓 Serbest" butonu.
  Tıklanınca snapMode FREE ↔ GUIDED geçiş yapar.
  FREE modda wheel kenarında kırmızı nokta göster.

--- ChromaticAberration.ts (util, bileşen değil) ---
buildAberrationLines(seg, config): AberrationLine[]
  - Segment yönünün dik (normal) vektörünü hesapla
  - 3 kanal: RED (+offset), GREEN (0), BLUE (-offset)
  - AberrationLine: { points, color, opacity, blur }
  - DEFAULT_ABERRATION: offset=1.5, channelOpacity=0.25, onlyAfterBounce=true

drawRaySegments (useRaycastLoop içinde) güncellenir:
  - Ana ışın çizgisi önce
  - config.onlyAfterBounce && i > 0 ise buildAberrationLines çağır
  - Her AberrationLine için strokeWidth:1.5, opacity:ab.opacity Konva Line ekle
  - Dünya temasına göre offset CSS değişkeninden okunur:
    glacier: offset=2, forest: offset=1, waterfall: offset=1.5

--- Haptic entegrasyon noktaları ---
useRaycastLoop onWin callback:
  hapticService.trigger('CRYSTAL_HIT')
  setTimeout(() => hapticService.trigger('LEVEL_COMPLETE'), 300)

useGestureHandler onDragEnd:
  geçerli hücre → hapticService.trigger('MIRROR_SNAP')
  geçersiz hücre → hapticService.trigger('INVALID_MOVE') + pozisyonu geri al

useRaycastLoop onSnapChange:
  snap.snapped → hapticService.trigger('SNAP_LOCK')
  snap.snapStrength > 0.85 → hapticService.trigger('SNAP_NUDGE')

NOT: Haptic çağrıları useRaycastLoop içinde DEĞİL,
     PuzzleCanvas'taki callback'lerde yapılır. rAF döngüsü temiz kalır.

  onTouchStart: seçili mirror'ı kaydet, Wheel'i spawn et
  onTouchMove:
    const rawAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    updateMirrorAngle(mirrorId, rawAngle);  ← useRaycastLoop ref günceller, Zustand YOK
  onTouchEnd:
    commitToStore(mirrorId, commitMirrorAngle);  ← şimdi Zustand güncellenir

Kaydırma (SLIDE mirror):
  - Konva draggable + dragBoundFunc (grid snap)
  - onDrag: ephemeral pozisyonu ref'te tut (ışın takibi için)
  - onDragEnd: coords.pixelToGrid → SlideMirrorUseCase → Zustand güncelle

KURAL: onTouchMove / onDrag içinde asla Zustand action çağırma.
       Sadece updateMirrorAngle (ref) kullan.

Haptic feedback:
  import { Haptics, ImpactStyle } from '@capacitor/haptics';
  useRaycastLoop'un onSnapChange callback'inden tetiklenir:
  snapStrength > 0.85: Haptics.impact({ style: ImpactStyle.Light })
  snapped === true:    Haptics.impact({ style: ImpactStyle.Medium })
  Web fallback: navigator.vibrate([30]) / navigator.vibrate([10, 30, 10])
```

---

### PROMPT 7 — Ekranlar ve UI Bileşenleri

```
Tüm ekranları ve UI bileşenlerini implement et.
Stil: Tailwind CSS + worlds.css değişkenleri.
Font: Cinzel Decorative (başlık), Rajdhani (UI).
Her ekran data-world attribute'u alır (tema geçişi için).

--- SplashScreen.tsx ---
Logo animasyonu (kristal parıltısı), "Başla" ve "Günlük" butonları

--- WorldSelectScreen.tsx ---
3 dünya kartı. Kilitli dünyalar: kilit ikonu + "X. bölümü tamamla" mesajı.
Tamamlanma yüzdesi progress bar.

--- LevelSelectScreen.tsx ---
Grid halinde bölüm butonları. Her buton: bölüm numarası + yıldız sayısı.
Kilitli bölümler: soluk görünüm.

--- GameScreen.tsx ---
PuzzleCanvas (merkez) + Header (üst) + BannerAdContainer (alt).
Header: ← geri | Bölüm X | ⏱️ 00:00 | 💡 ipucu

--- DailyChallengeScreen.tsx ---
Bugünün tarihi, özel kristal arka plan, oynanmışsa sonuç göster.

--- VictoryModal.tsx ---
Yıldız animasyonu (birer birer belirir), süre, "İlerle" + "Paylaş" buton.
Paylaş: ShareResultUseCase çağırır.

--- HintButton.tsx ---
"💡 İpucu Al (Reklam İzle)" → loading → hint oku canvas'ta görünür.
```

---

### PROMPT 8 — i18n Dil Dosyaları

```
tr.json ve en.json oluştur.

Anahtarlar ve beklenen değerler:

app.title: "Crystal Mirror" (ikisinde aynı)
world.forest: "Orman Işığı" / "Forest Light"
world.glacier: "Buzul Kristali" / "Glacier Crystal"
world.waterfall: "Şelale Sırrı" / "Waterfall Secret"
world.locked: "{{level}}. bölümü tamamla" / "Complete level {{level}}"
level.complete: "Bölüm Tamamlandı!" / "Level Complete!"
level.stars_one: "1 Yıldız" / "1 Star"
level.stars_other: "{{count}} Yıldız" / "{{count}} Stars"
level.time: "Süre: {{seconds}}s" / "Time: {{seconds}}s"
level.next: "Sonraki Bölüm" / "Next Level"
level.retry: "Tekrar Dene" / "Retry"
hint.button: "💡 İpucu Al" / "💡 Get Hint"
hint.watch_ad: "Reklam izleyerek ipucu kazan" / "Watch an ad to earn a hint"
hint.loading: "İpucu hazırlanıyor..." / "Loading hint..."
hint.arrow: "Bu aynayı döndür" / "Rotate this mirror"
daily.title: "Günlük Bölüm" / "Daily Challenge"
daily.played: "Bugün oynadın! Yarın yeni bölüm." / "Already played today! Come back tomorrow."
daily.share: "Sonucu Paylaş" / "Share Result"
ui.continue: "Devam" / "Continue"
ui.back: "Geri" / "Back"
settings.sound: "Ses" / "Sound"
settings.language: "Dil" / "Language"
```

---

### PROMPT 9 — Test Katmanı

```
Vitest ile kritik birimlerin testlerini yaz.

1. Vector2D.test.ts
   - reflect(): 45° normalde yansıma doğru mu?
   - normalize(): birim vektör uzunluğu 1 mi?
   - dot(): dik vektörlerde 0 mı?

2. CoordinateSystem.test.ts
   - gridToPixel → pixelToGrid round-trip aynı hücreyi döner mi?
   - offsetX/Y ızgarayı gerçekten ortalar mı?
   - cellSize her zaman min(W/cols, H/rows) mi?
   - isValidCell: negatif ve sınır dışı hücreler false döner mi?

3. MirrorGeometry.test.ts
   - getMirrorSegment: 0° ayna yatay segment üretir mi?
   - getMirrorSegment: 45° ayna köşegen segment üretir mi?
   - getMirrorNormal: ışın yönüne karşı normal seçiliyor mu?

4. CollisionDetector.test.ts
   - raySegmentIntersection: 45° aynaya dik ışın doğru t değeri döner mi?
   - Paralel ışın null döner mi?
   - minDist ile kendi başlangıç noktasına çarpmaz mı?
   - rayCrystalIntersection: kristal merkezine doğru ışın kesişir mi?

5. colorPassesFilter.test.ts
   - WHITE ışın + WHITE kristal → true
   - WHITE ışın + RED kristal → false
   - RED ışın + RED kristal → true
   - RED ışın + BLUE kristal → false
   - splitByPrism: WHITE → 3 renk, kırmızı ışın → değişmez

6. RaycastEngine.test.ts
   - 45° aynaya çarpan WHITE ışın 90° döner mi?
   - MAX_BOUNCES limitine ulaşınca durur mu?
   - Hedef kristale WHITE ışın ulaşınca crystalFills.get(id) === 1.0 mu?
   - Renkli filtre: RED ışın + BLUE kristal → crystalFills boş mu?

7. HintCalculator.test.ts
   - Tek hareketli ayna + tek hedef: en iyi açıyı buluyor mu?
   - Cache: aynı puzzle state'i ikinci çağrıda trace yapmadan döner mi?
   - hintsUsed > 0 → StarRating max TWO mu?

8. WinConditionChecker.test.ts
   - Tüm hedef kristaller 1.0 → true
   - Bir hedef 0.99 → false (eşik 1.0)
   - Hedef olmayan kristaller sayılmaz

9. MagneticSnapService.test.ts
   - FREE modda hiçbir zaman snap olmaz mı?
   - fillScore < 0.85 → snapped: false, finalAngle değişmez
   - fillScore >= 0.95 → snapped: true, findExactSnapAngle çalışır
   - Çoklu hedef: sadece biri doluysa snapStrength < 0.85 kalır mı?
   - Cache değil, her çağrı hesaplama yapar (MagneticSnapService stateless)

10. useRaycastLoop.test.ts (React Testing Library + fake timers)
   - updateMirrorAngle: Zustand store değişmiyor mu? (spy ile kontrol)
   - commitToStore: store action tam bir kez çağrılıyor mu?
   - isDirty=false iken rAF loop trace çağırmıyor mu?
   - onWin: tüm hedefler dolunca tam bir kez tetikleniyor mu?
   - cleanup: component unmount olunca cancelAnimationFrame çağrılıyor mu?

11. HapticService.test.ts
   - CRYSTAL_HIT → Haptics.impact Medium çağrısı yapılıyor mu? (mock)
   - LEVEL_COMPLETE → Heavy + 120ms + Medium sırasıyla çağrılıyor mu?
   - Throttle: aynı event 50ms arayla iki çağrıda sadece bir kez tetikleniyor mu?
   - setEnabled(false) → hiçbir çağrı geçmiyor mu?
   - Haptics throw ederse webFallback devreye giriyor mu?

12. ChromaticAberration.test.ts
   - buildAberrationLines: 3 kanal dönüyor mu?
   - offset=0 iken tüm çizgiler aynı koordinatta mı?
   - Sıfır uzunluklu segment için boş array dönüyor mu?

AAA paterni. createTestPuzzle(overrides) + createTestCoords() factory yaz.
```

---

### PROMPT 10 — Build Konfigürasyonu

```
Konfigürasyon dosyalarını oluştur:

1. vite.config.ts
   - @vitejs/plugin-react
   - Path alias: @/ → src/
   - manualChunks: { vendor: ['react','react-dom'], canvas: ['konva','react-konva'], motion: ['framer-motion'] }
   - assetsInclude: ['**/*.ogg']

2. capacitor.config.ts
   - appId: "com.yourcompany.crystalmirror"
   - appName: "Crystal Mirror"
   - webDir: "dist"
   - AdMob plugin config (env'den al)
   - SplashScreen: backgroundColor "#0D2B1A", launchShowDuration 2000

3. tailwind.config.ts
   - darkMode: 'class'
   - fontFamily: display: ['Cinzel Decorative'], body: ['Rajdhani', 'Lato']
   - Google Fonts import (index.html'e ekle)

4. package.json scripts:
   "dev": "ionic serve",
   "build": "tsc && vite build",
   "test": "vitest run",
   "test:watch": "vitest",
   "lint": "eslint src --ext ts,tsx",
   "build:android": "ionic build && npx cap sync && npx cap open android",
   "build:ios": "ionic build && npx cap sync && npx cap open ios"

5. .gitignore eklentileri:
   .env.local, .env.*.local, dist/, android/, ios/
```

---

### PROMPT 11 — Entegrasyon ve Son Kontrol

```
Tüm parçaları birleştir. Aşağıdaki checklist'i çalıştır:

✅ KOORDİNAT SİSTEMİ
- gridToPixel → pixelToGrid round-trip tutarlı mı?
- Farklı ekran boyutlarında (375px, 414px, 768px) ızgara doğru ortaplanıyor mu?
- Ekran döndürme (portrait → landscape) canvas yeniden hesaplıyor mu?
- Header + banner payı (56+60px) usableH hesabında düşülüyor mu?

✅ AYNA GEOMETRİSİ & ÇARPIŞMA
- getMirrorSegment: 0°=yatay, 45°=köşegen, 90°=dikey doğru mu?
- getMirrorNormal: ışın aynının arka tarafından geçmiyor mu?
- raySegmentIntersection: minDist ile self-hit önleniyor mu?
- rayCrystalIntersection yarıçapı CrystalNode render yarıçapı ile eşleşiyor mu?

✅ RENK SİSTEMİ
- WHITE ışın renkli filtreden geçmiyor mu?
- Prizma: WHITE → 3 alt ışın oluşuyor mu?
- Alt ışınlar bağımsız olarak izleniyor mu?
- MAX_BOUNCES tüm dallar arasında paylaşılıyor mu?

✅ HİNT ALGORİTMASI
- Kaba tarama (5°) + ince tarama (1°) ikisi de çalışıyor mu?
- Cache: aynı puzzle state ikinci çağrıda trace yapmıyor mu?
- ~30ms altında tamamlanıyor mu? (4 ayna senaryosu)

✅ GÜNLÜK CHALLENGE
- Aynı UTC tarihi → aynı bölüm (2 farklı cihazda test et)
- Oynandıktan sonra "yarın gel" mesajı gösteriyor mu?
- Emoji grid doğru üretiyor mu?

✅ KAYIT SİSTEMİ
- Bölüm bitince puan kaydediliyor mu?
- Daha kötü skor üzerine yazılmıyor mu?
- Dünya kilidi doğru açılıyor mu?

✅ CHROMATİC ABERRATİON
- Efekt sadece yansıma sonrası segmentlere mi uygulanıyor? (i > 0 kontrolü)
- Dünya temasına göre offset doğru değerlerde mi? (glacier:2, forest:1, waterfall:1.5)
- Düşük segmentli cihazda channelOpacity:0 ile kapatılabiliyor mu?
- Ana ışın çizgisi (opacity:0.92) aberrasyon çizgilerinin üstünde mi?

✅ HAPTİC FEEDBACK
- CRYSTAL_HIT → Medium, LEVEL_COMPLETE → Heavy+Medium çift darbe çalışıyor mu?
- MIRROR_SNAP: onDragEnd'de geçerli grid snap sonrası tetikleniyor mu?
- INVALID_MOVE: geçersiz hücreye sürüklemede çift kısa darbe çalışıyor mu?
- Throttle: aynı event 100ms içinde tekrar tetiklenmiyor mu?
- Web fallback: navigator.vibrate() çalışıyor mu? (tarayıcıda test et)
- MockHapticService: DEV ortamında console.log görünüyor mu?
- Ayarlar: setEnabled(false) ile haptic tamamen susturuluyor mu?


- onTouchMove içinde Zustand action çağrısı var mı? (olmamalı!)
- useRaycastLoop: isDirty flag sadece değişiklik olunca true oluyor mu?
- commitToStore sadece onTouchEnd / onDragEnd'de mi çağrılıyor?
- Bölüm yüklenince ephemeral.current sıfırlanıyor mu?
- rafId cleanup (cancelAnimationFrame) useEffect return'ünde var mı?
- drawRaySegments: eski 'ray-line' node'lar temizleniyor mu?


- Aynaya dokunulunca wheel doğru tarafa (üst/alt) spawn oluyor mu?
- Wheel açık iken ayna ve ışın tam görünür mü?
- Parmak kaldırılınca wheel kayboluyor mu (animasyonlu)?
- FREE mod toggle çalışıyor mu? (wheel köşesindeki buton)
- Web'de mouse, mobilde touch ikisi de çalışıyor mu?

✅ MAGNETIC SNAP
- snapStrength > 0.85 → hafif titreşim tetikleniyor mu?
- snapStrength >= 0.95 → açı kilitleniyor mu?
- Çoklu hedef bölümünde yanlış snap oluşmuyor mu? (tüm hedef ortalaması kontrol)
- FREE modda snap hiç tetiklenmiyor mu?
- RotateMirrorUseCase snapResult'u doğru döndürüyor mu?


- Her dünyada doğru CSS değişkenleri yükleniyor mu?
- Işın rengi → hex map doğru mu? (WHITE:#FFF, RED:#FF4444, BLUE:#4488FF, YELLOW:#FFCC00)
- CrystalNode yarıçapı CollisionDetector yarıçapıyla eşleşiyor mu?

✅ GENEL
- npx tsc --noEmit → hata yok
- Tüm port interface'leri implement edildi mi?
- .env.local .gitignore'da mı?
- MockAdService dev ortamında aktif mi?

Bulduğun sorunları listele ve düzelt.
```

---

## 15. Ses Dosyaları

> **Konum:** `src/assets/sounds/` — hem `.mp3` hem `.ogg` gerekli.

| Dosya | Açıklama | Tarz |
|---|---|---|
| `ambient.mp3/.ogg` | Oyun içi loop müzik | Yumuşak, kristal, doğa sesleri karışımı. 60–90s. |
| `crystal-hit.mp3/.ogg` | Işın kristale çarptığında | Cam/kristal çınlaması. <300ms. |
| `crystal-fill.mp3/.ogg` | Kristal doluma başladığında | Yükselen tın, harmonik. <500ms. |
| `mirror-slide.mp3/.ogg` | Ayna kaydırıldığında | Pürüzsüz sürtünme sesi. <200ms. |
| `victory.mp3/.ogg` | Bölüm kazanıldığında | Kristal fanfar, huzurlu. 2–3s. |
| `hint.mp3/.ogg` | Hint aktif olduğunda | Sihirli tın, dikkat çekici. <400ms. |

**Ücretsiz kaynaklar:** freesound.org (crystal, glass, chime aramaları) · opengameart.org · zapsplat.com

---

## 16. Geliştirme Roadmap

| Sprint | Süre | Kapsam |
|---|---|---|
| **Sprint 1** | 4 gün | Domain: CoordinateSystem, Vector2D, ayna geometrisi, CollisionDetector, renk sistemi, RaycastEngine, HintCalculator, testler |
| **Sprint 2** | 3 gün | Application use case'leri + Zustand store'ları |
| **Sprint 3** | 4 gün | react-konva Canvas render: ışın, ayna, kristal + useCanvasSize |
| **Sprint 4** | 3 gün | Tüm ekranlar + UI bileşenleri + kristal tema |
| **Sprint 5** | 2 gün | i18n + ses + günlük challenge + paylaşım |
| **Sprint 6** | 2 gün | Capacitor + AdMob native entegrasyonu |
| **Sprint 7** | 2 gün | 50+ bölüm içeriği tasarımı + dünya kilitleri |
| **Sprint 8** | 2 gün | Son testler, performans optimizasyonu, mağaza hazırlığı |

**Toplom tahmini süre:** ~22 geliştirme günü

---
## 17. AI Agent Kurulum Komutu
Bu dökümanı AI Agent'a (Cursor/Claude Dev) yükledikten sonra şu komutu ver:
"Bu dökümandaki Crystal Mirror oyun mimarisini bir Senior Game Architect olarak incele. Adım adım ilerleyeceğiz. Ben 'Tamam' demeden bir sonraki Prompta (Section 14) geçme. Her adımda mimari anayasaya (Section 0) ve iki katmanlı state kuralına sadık kal. Hazırsan Prompt 1 ile iskeleti kurarak başla."
---
*Crystal Mirror · İyi Kodlamalar! 💎*
