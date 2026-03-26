# Design Style: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `2167:9026`
**Extracted At**: 2026-03-25

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | #101417 | 80% | Header background (semi-transparent) |
| --color-text-white | #FFFFFF | 100% | Primary text, headings |
| --color-text-gold | #FFEA9E | 100% | CTA button fill, highlights, selected nav |
| --color-btn-outline | #FFEA9E | 100% | CTA outline button border |
| --color-footer-border | #2E3940 | 100% | Footer top border |
| --color-card-border | #998C5F | 100% | Award card border accent |
| --color-kudos-bg | #0A1A24 | 100% | Sun* Kudos section background |
| --color-countdown-bg | #0D1B24 | 100% | Countdown tile background |
| --color-section-bg | #00070C | 100% | Content section background (Root Further description) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-title | Montserrat | 96px | 700 | auto | 0 | "ROOT FURTHER" hero |
| --text-countdown-number | Montserrat | 40px | 700 | auto | 0 | Countdown digits |
| --text-countdown-label | Montserrat | 12px | 600 | auto | 2px | "DAYS"/"HOURS"/"MINUTES" |
| --text-coming-soon | Montserrat | 16px | 400 | 24px | 0 | "Coming soon" subtitle |
| --text-event-info | Montserrat | 14px | 400 | 20px | 0 | Event date/venue |
| --text-cta-button | Montserrat | 16px | 700 | 24px | 0 | CTA buttons |
| --text-section-caption | Montserrat | 14px | 400 | 20px | 0 | "Sun* annual awards 2025" |
| --text-section-title | Montserrat | 36px | 700 | 44px | 0 | "Hệ thống giải thưởng" |
| --text-body | Montserrat | 14px | 400 | 22px | 0 | Body paragraphs |
| --text-card-title | Montserrat | 16px | 700 | 24px | 0 | Award card title |
| --text-card-desc | Montserrat | 13px | 400 | 20px | 0 | Award card description |
| --text-card-link | Montserrat | 14px | 600 | 20px | 0 | "Chi tiết" link |
| --text-kudos-title | Montserrat | 32px | 700 | 40px | 0 | "Sun* Kudos" |
| --text-kudos-label | Montserrat | 14px | 400 | 20px | 0 | "Phong trào ghi nhận" |
| --text-nav-link | Montserrat | 16px | 700 | 24px | 0.15px | Header nav links |
| --text-footer | Montserrat Alternates | 16px | 400 | 24px | 0 | Footer copyright |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | max(180px, 15vw) | Page horizontal padding (desktop) |
| --spacing-page-y | 96px | Page vertical padding |
| --spacing-header-x | max(180px, 15vw) | Header horizontal padding |
| --spacing-section-gap | 120px | Gap between major sections |
| --spacing-hero-gap | 40px | Gap within hero section |
| --spacing-award-grid-gap | 80px | Gap between award header and grid |
| --spacing-card-gap | 24px | Gap between award cards |
| --spacing-content-padding | 120px 104px | Root Further content section padding |
| --spacing-footer-x | 90px | Footer horizontal padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card | 12px | Award card corners |
| --radius-btn | 8px | CTA button corners |
| --radius-countdown | 8px | Countdown tile corners |
| --radius-fab | 32px | Widget button (pill shape) |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│ Page (1512 x 4480, bg: #00101A)                               │
│                                                                │
│ ┌── A1_Header (fixed, 1512x80, bg: #101417/80%) ────────────┐│
│ │ px: 144px, flex, justify-between, items-center              ││
│ │ [Logo] [About SAA | Awards Info | Sun* Kudos] [🔔 VN 👤]  ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌── 3.5_Keyvisual (1512x1392) ──────────────────────────────┐│
│ │ Background artwork image (full cover)                       ││
│ │                                                             ││
│ │  "ROOT FURTHER" (96px Bold)                                 ││
│ │                                                             ││
│ │  ┌── B1_Countdown ────────────────────────┐                ││
│ │  │ "Coming soon" (16px)                    │                ││
│ │  │ [20] [20] [20] (Days/Hours/Minutes)     │                ││
│ │  └────────────────────────────────────────┘                ││
│ │                                                             ││
│ │  B2: Thời gian: 26/12/2025  Địa điểm: Âu Cơ Art Center    ││
│ │                                                             ││
│ │  ┌── B3_CTA ──────────────────┐                            ││
│ │  │ [ABOUT AWARDS] [ABOUT KUDOS] │                           ││
│ │  └────────────────────────────┘                            ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌── B4_Content (bg: #00070C, px: 104px, py: 120px) ─────────┐│
│ │ "ROOT FURTHER" logo + paragraph text                        ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌── Hệ thống giải thưởng (gap: 80px) ───────────────────────┐│
│ │ C1: "Sun* annual awards 2025" / "Hệ thống giải thưởng"     ││
│ │                                                             ││
│ │ C2: Award Grid (3 cols desktop)                             ││
│ │ ┌──────┐ ┌──────┐ ┌──────┐                                ││
│ │ │Talent│ │Project│ │Leader│                                 ││
│ │ └──────┘ └──────┘ └──────┘                                ││
│ │ ┌──────┐ ┌──────┐ ┌──────┐                                ││
│ │ │Manager│ │Sig25 │ │ MVP  │                                ││
│ │ └──────┘ └──────┘ └──────┘                                ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌── D1_Sunkudos (bg: #0A1A24) ──────────────────────────────┐│
│ │ [Text content left] [KUDOS image right]                     ││
│ │ "Phong trào ghi nhận" / "Sun* Kudos"                        ││
│ │ Description + [Chi tiết] button                             ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌── 7_Footer (border-top: #2E3940, px: 90px, py: 40px) ─────┐│
│ │ [Logo] [About SAA | Awards | Kudos | Tiêu chuẩn] [©2025]  ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ [FAB] ← Widget Button (fixed, bottom-right, 105x64px, gold)  │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A1_Header — Full Navigation

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9091` | - |
| width | 100% | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px var(--spacing-header-x)` |
| background | rgba(16, 20, 23, 0.8) | `background: rgba(16,20,23,0.8)` |
| position | fixed top | `position: fixed; top: 0; z-index: 50` |
| layout | flex, space-between, center | `display: flex; justify-content: space-between; align-items: center` |

**Nav Link States:**

| State | Style |
|-------|-------|
| Normal | text white, no decoration |
| Hover | text #FFEA9E, background rgba(255,234,158,0.1) |
| Selected | text #FFEA9E, underline 2px |

---

### A1.8_Profile Dropdown — Avatar Menu

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `666:9601` | - |
| **Figma Frame** | `721:5223` (Dropdown-profile) | - |
| container border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| container bg | #00070C | `background: #00070C` |
| container padding | 6px | `padding: 6px` |
| container radius | 8px | `border-radius: 8px` |
| layout | flex column | `flex-direction: column` |
| position | absolute, right-0, top-full | Below avatar button |
| animation | fadeIn 150ms ease-out | `animate-[fadeIn_150ms_ease-out]` (same as language dropdown) |

**Profile Item (A.1):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844` | - |
| size | 119x56px | `width: auto; height: 56px` |
| padding | 16px | `padding: 16px` |
| radius | 4px | `border-radius: 4px` |
| layout | flex row, gap 4px | `display: flex; gap: 4px; align-items: center` |
| text | "Profile" — Montserrat 16px 700, #FFF, text-shadow glow | `font-size: 16px; font-weight: 700; color: #FFF` |
| text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Golden glow effect |
| icon | User icon (24x24px), right of text | Person silhouette |

**Logout Item (A.2):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868` | - |
| size | 121x56px | `width: auto; height: 56px` |
| padding | 16px | `padding: 16px` |
| radius | 4px | `border-radius: 4px` |
| layout | flex row, gap 4px | `display: flex; gap: 4px; align-items: center` |
| text | "Logout" — Montserrat 16px 700, #FFF | `font-size: 16px; font-weight: 700; color: #FFF` |
| icon | Chevron right (24x24px), right of text | Arrow `>` |

**Item States:**

| State | Profile | Logout |
|-------|---------|--------|
| Default | bg: rgba(255,234,158,0.1), text glow | bg: transparent |
| Hover | bg: rgba(255,234,158,0.2), text glow | bg: rgba(255,234,158,0.1) |

---

### B1_Countdown — Timer Section

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9035` |
| layout | flex column, gap 12px |

**Countdown Tile:**

| Property | Value | CSS |
|----------|-------|-----|
| width | ~80px per digit pair | `width: auto` |
| height | ~72px | `height: 72px` |
| background | #0D1B24 | `background: #0D1B24` |
| border-radius | 8px | `border-radius: 8px` |
| digit font | Montserrat 40px Bold white | `font-size: 40px; font-weight: 700` |
| label font | Montserrat 12px 600 white | `font-size: 12px; font-weight: 600; letter-spacing: 2px` |

---

### B3_CTA — Action Buttons

**"ABOUT AWARDS" (filled/hover):**

| Property | Value |
|----------|-------|
| background | #FFEA9E |
| text | #00101A, 16px Bold |
| padding | 16px 24px |
| border-radius | 8px |
| icon | arrow right (→) |

**"ABOUT KUDOS" (outline/normal):**

| Property | Value |
|----------|-------|
| background | transparent |
| border | 1px solid #FFEA9E |
| text | #FFEA9E, 16px Bold |
| padding | 16px 24px |
| border-radius | 8px |
| icon | arrow right (→) |

**States (cả 2 nút):**

| State | Changes |
|-------|---------|
| Normal | Outline style (border #FFEA9E, text #FFEA9E, bg transparent) |
| Hover | Filled style (bg #FFEA9E, text #00101A) |
| Focus-visible | outline: 2px solid #FFEA9E, outline-offset: 3px |
| Active | Filled style, translateY(0) |

---

### C2_Award Card

| Property | Value | CSS |
|----------|-------|-----|
| width | ~380px (1/3 grid) | `flex: 1` in 3-col grid |
| layout | flex column |
| gap | 12px between image and text |

**Card Image:**
- Square, rounded corners (12px), golden border effect (1px solid #998C5F with glow)
- Hover: transform translateY(-4px), box-shadow: 0 8px 24px rgba(255,234,158,0.15)

**Card Text:**

| Element | Style |
|---------|-------|
| Title | 16px Bold white |
| Description | 13px Regular white, max 2 lines, ellipsis |
| "Chi tiết" link | 14px 600 white, arrow icon, hover: #FFEA9E |

---

### D1_Sunkudos — Kudos Promo Block

| Property | Value |
|----------|-------|
| **Node ID** | `3390:10349` |
| background | #0A1A24 |
| layout | flex row (text left, image right) |
| padding | 40px |
| border-radius | 12px |

---

### 6_Widget Button (FAB)

| Property | Value |
|----------|-------|
| **Node ID** | `5022:15169` |
| size | 105x64px |
| background | #FFEA9E |
| border-radius | 32px (pill) |
| position | fixed, bottom-right |
| content | pencil icon + "/" + SAA icon |

---

### 7_Footer

| Property | Value |
|----------|-------|
| **Node ID** | `5001:14800` |
| height | 74px |
| padding | 40px 90px |
| border-top | 1px solid #2E3940 |
| layout | flex, space-between, center |
| font | Montserrat Alternates 16px 400 white |

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
| Header | hamburger menu, px: 16px, h: 64px |
| Hero title | font-size: 48px |
| Countdown tiles | smaller (60px height) |
| CTA buttons | stack vertical, full width |
| Award grid | 2 columns |
| Kudos section | stack vertical (image below text) |
| Footer | stack vertical, center-aligned |
| FAB | giữ nguyên kích thước |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | px: 48px |
| Hero title | font-size: 72px |
| Award grid | 2 columns |
| Kudos section | flex row (giữ nguyên) |
| Footer | px: 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | Theo đúng Figma design (1512px) |
| Award grid | 3 columns |

---

## Implementation Mapping

| Design Element | Figma Node ID | React Component |
|----------------|---------------|-----------------|
| Page container | `2167:9026` | `<HomepageSAA />` |
| Header (full nav) | `2167:9091` | `<HeaderFull />` (extends shared Header) |
| Profile dropdown | `666:9601` | `<ProfileDropdown />` (Client Component) |
| Hero banner | `2167:9027` | `<HeroBanner />` |
| Countdown | `2167:9035` | `<CountdownTimer />` |
| Event info | `2167:9053` | `<EventInfo />` |
| CTA buttons | `2167:9062` | `<CTAButtons />` |
| Root Further content | `5001:14827` | `<RootFurtherContent />` |
| Award section header | `2167:9069` | `<AwardSectionHeader />` |
| Award grid | `5005:14974` | `<AwardGrid />` |
| Award card | `2167:9075` (template) | `<AwardCard />` |
| Kudos promo | `3390:10349` | `<KudosPromo />` |
| Widget FAB | `5022:15169` | `<WidgetButton />` |
| Footer (full nav) | `5001:14800` | `<FooterFull />` (extends shared Footer) |

---

## Notes

- Tất cả colors sử dụng CSS custom properties qua Tailwind config
- Font Montserrat load qua `next/font/google` (đã setup trong Login)
- Award card images cần media files từ Figma (6 thumbnails)
- Hero background artwork cần media file lớn (optimize WebP)
- Countdown target date: `process.env.NEXT_PUBLIC_EVENT_DATE`
- Header ở Homepage khác Login — có nav links, bell, avatar (cần tách thành HeaderFull)
- Footer ở Homepage khác Login — có nav links, "Tiêu chuẩn chung"
- Color contrast đã đạt WCAG AA (text trắng trên nền tối)
