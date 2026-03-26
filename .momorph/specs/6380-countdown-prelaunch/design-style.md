# Design Style: Countdown Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `2268:35127`
**Extracted At**: 2026-03-26

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-text-white | #FFFFFF | 100% | Title text, countdown digits, labels |
| --color-text-gold | #FFEA9E | 100% | Countdown tile border |
| --color-tile-bg-start | #FFFFFF | 100% | Tile gradient start |
| --color-tile-bg-end | #FFFFFF | 10% | Tile gradient end |
| --color-gradient-dark | #00101A | 100% | Overlay gradient start |
| --color-gradient-mid | rgba(0, 18, 29, 0.46) | 46% | Overlay gradient mid |
| --color-gradient-transparent | rgba(0, 19, 32, 0) | 0% | Overlay gradient end |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-countdown-title | Montserrat | 36px | 700 | 48px | 0 | "Sự kiện sẽ bắt đầu sau" |
| --text-countdown-digit | Digital Numbers | 73.7px | 400 | auto | 0 | Countdown digits (0-9) |
| --text-countdown-label | Montserrat | 36px | 700 | 48px | 0 | DAYS / HOURS / MINUTES |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding | 96px 144px | Page content padding |
| --spacing-section-gap | 120px | Gap between major sections |
| --spacing-countdown-group-gap | 60px | Gap between Days/Hours/Minutes groups |
| --spacing-digit-gap | 21px | Gap between two digit tiles |
| --spacing-tile-label-gap | 21px | Gap between digit tiles and label text |
| --spacing-title-countdown-gap | 24px | Gap between title and countdown |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-tile | 12px | Countdown digit tile corners |
| --border-tile | 0.75px solid #FFEA9E | Countdown tile border (gold) |

### Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| --tile-opacity | 0.5 | Countdown tile opacity |
| --tile-backdrop-blur | blur(25px) | Glassmorphism backdrop blur |
| --tile-gradient | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.1) 100%) | Tile background gradient |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│ Page (1512 x 1077, bg: #00101A)                              │
│                                                              │
│ ┌── Background Image (1512x1077, absolute) ────────────────┐│
│ │ Artwork image (full cover)                                ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ ┌── Gradient Overlay (1512x1077, absolute) ────────────────┐│
│ │ linear-gradient(18deg, #00101A 15.48%,                    ││
│ │   rgba(0,18,29,0.46) 52.13%,                              ││
│ │   rgba(0,19,32,0) 63.41%)                                 ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ ┌── Content (centered, py: 96px, px: 144px) ───────────────┐│
│ │                                                           ││
│ │  "Sự kiện sẽ bắt đầu sau"                                ││
│ │  (Montserrat 36px Bold, white, centered)                  ││
│ │                          gap: 24px                         ││
│ │  ┌── Countdown Timer (flex row, gap: 60px) ─────────────┐││
│ │  │                                                       │││
│ │  │  ┌─ Days ──┐     ┌─ Hours ─┐     ┌─ Minutes ┐       │││
│ │  │  │ [0] [0] │     │ [0] [5] │     │ [2] [0]  │       │││
│ │  │  │  DAYS   │     │  HOURS  │     │ MINUTES   │       │││
│ │  │  └─────────┘     └─────────┘     └──────────┘        │││
│ │  │                                                       │││
│ │  │  Each tile: 77x123px, radius 12px                     │││
│ │  │  Digit gap: 21px, Tile-Label gap: 21px                │││
│ │  └───────────────────────────────────────────────────────┘││
│ │                                                           ││
│ └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Background Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35129` | - |
| width | 100% | `width: 100%` |
| height | 100% | `height: 100%` |
| position | absolute, cover | `position: absolute; object-fit: cover` |

---

### Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35130` | - |
| width | 100% | `width: 100%` |
| height | 100% | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| background | gradient | `background: linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)` |

---

### Title Text — "Sự kiện sẽ bắt đầu sau"

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35137` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

### Countdown Digit Tile

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `186:2619` (component) | - |
| width | 77px | `width: 77px` |
| height | 123px | `height: 123px` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid var(--color-text-gold)` |
| border-radius | 12px | `border-radius: 12px` |
| opacity | 0.5 | `opacity: 0.5` |
| background | gradient | `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.1) 100%)` |
| backdrop-filter | blur(25px) | `backdrop-filter: blur(25px)` |
| digit font | Digital Numbers 74px | `font-family: 'Digital Numbers'; font-size: 73.7px` |
| digit color | #FFFFFF | `color: white` |

---

### Countdown Label (DAYS / HOURS / MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `2268:35143`, `2268:35148`, `2268:35153` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |

---

### Countdown Group (Days / Hours / Minutes)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `2268:35139`, `2268:35144`, `2268:35149` | - |
| layout | flex column | `display: flex; flex-direction: column` |
| width | 175px | `width: 175px` |
| height | 192px | `height: 192px` |
| gap (digits row) | 21px | `gap: 21px` |
| gap (tile to label) | 21px | vertical gap between tiles and label |

---

### Countdown Timer Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2268:35138` | - |
| layout | flex row | `display: flex; flex-direction: row` |
| gap | 60px | `gap: 60px` |
| width | 644px | `width: auto` |
| align-items | center | `align-items: center` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 100%, h: 100vh, position: relative)
├── BackgroundImage (absolute, inset: 0, object-fit: cover, z: 0)
├── GradientOverlay (absolute, inset: 0, z: 1)
│   └── gradient: linear-gradient(18deg, #00101A 15.48%, ...)
├── Content (relative, z: 10, flex, flex-col, items-center, justify-center, h: 100vh)
│   ├── Title (Montserrat 36px/700, white, text-center, mb: 24px)
│   │   └── "Sự kiện sẽ bắt đầu sau"
│   └── CountdownTimer (flex, flex-row, gap: 60px)
│       ├── DaysGroup (flex, flex-col, gap: 21px)
│       │   ├── DigitsRow (flex, flex-row, gap: 21px)
│       │   │   ├── DigitTile (77x123px, glassmorphism, Digital Numbers 74px)
│       │   │   └── DigitTile
│       │   └── Label "DAYS" (Montserrat 36px/700, white)
│       ├── HoursGroup (same structure)
│       │   └── Label "HOURS"
│       └── MinutesGroup (same structure)
│           └── Label "MINUTES"
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Title | font-size: 24px, line-height: 32px |
| Countdown gap | gap: 24px (instead of 60px) |
| Digit tile | width: 48px, height: 77px |
| Digit font | font-size: 46px |
| Label font | font-size: 20px, line-height: 28px |
| Content padding | padding: 48px 16px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Title | font-size: 30px |
| Countdown gap | gap: 40px |
| Digit tile | width: 60px, height: 96px |
| Digit font | font-size: 58px |
| Label font | font-size: 28px |
| Content padding | padding: 72px 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | Theo đúng Figma design (1512px) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Digit change | opacity | 300ms | ease-in-out | Every minute update |

---

## Implementation Mapping

| Design Element | Figma Node ID | React Component |
|----------------|---------------|-----------------|
| Page container | `2268:35127` | `<CountdownPrelaunchPage />` |
| Background image | `2268:35129` | `<Image>` (next/image) |
| Gradient overlay | `2268:35130` | `<div>` with CSS gradient |
| Title | `2268:35137` | `<h1>` or `<p>` |
| Countdown timer | `2268:35138` | `<CountdownTimer />` (reuse/extend from homepage) |
| Days group | `2268:35139` | Part of CountdownTimer |
| Hours group | `2268:35144` | Part of CountdownTimer |
| Minutes group | `2268:35149` | Part of CountdownTimer |
| Digit tile | `186:2619` (component) | `<DigitTile />` |

---

## Font Requirements

### Digital Numbers (Custom Font)

| Property | Value |
|----------|-------|
| Font Family | Digital Numbers |
| Type | Custom local font (NOT Google Font) |
| Loading | `next/font/local` from `public/fonts/digital-numbers.woff2` |
| Usage | Countdown digit display only |
| Fallback | `monospace` |

**Cần download file font `.woff2` hoặc `.ttf` và đặt vào `public/fonts/`.**

---

## Background Image

| Property | Value |
|----------|-------|
| Source | Reuse `public/images/homepage-bg.png` |
| Position | `object-position: -142px -790px` (Figma offset) hoặc `object-position: right center` (adjusted) |
| Cover | `object-fit: cover` |

---

## Notes

- Font "Digital Numbers" PHẢI được load qua `next/font/local` — file font cần có sẵn trong `public/fonts/`
- Glassmorphism effect: **opacity 0.5 chỉ áp dụng cho tile background** (gradient + border), KHÔNG áp dụng cho digit text bên trong (digit text luôn `opacity: 1`, đặt relative z-index cao hơn)
- Background image reuse `homepage-bg.png` đã có trong project
- Gradient overlay góc 18deg — khác với Homepage (dùng gradient theo trục 0deg/90deg)
- Digit tiles lớn hơn nhiều so với Homepage (77x123px vs 42x72px) — đây là trang chuyên countdown nên cần nổi bật hơn
- Trang KHÔNG có header/footer — fullscreen countdown only
- Responsive values cho mobile/tablet là ước lượng dựa trên tỷ lệ desktop, không có frame Figma riêng
