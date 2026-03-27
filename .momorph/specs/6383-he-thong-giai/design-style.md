# Design Style: Hệ thống giải thưởng SAA 2025

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `313:8436`
**Extracted At**: 2026-03-26

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | #101417 | 80% | Header background |
| --color-text-white | #FFFFFF | 100% | Body text, headings |
| --color-text-gold | #FFEA9E | 100% | Title "Hệ thống giải thưởng", active sidebar, prize values |
| --color-border-subtle | #2E3940 | 100% | Divider line dưới subtitle |
| --color-card-border | #998C5F | 100% | Award image border glow |
| --color-section-bg | #00070C | 100% | Award card background |
| --color-kudos-bg | #0A1A24 | 100% | Sun* Kudos section background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-subtitle | Montserrat | 24px | 700 | 32px | 0 | "Sun* Annual Awards 2025" |
| --text-page-title | Montserrat | 57px | 400 | 64px | -0.25px | "Hệ thống giải thưởng SAA 2025" (gold) |
| --text-sidebar-item | Montserrat | 16px | 400 | 24px | 0 | Sidebar navigation items |
| --text-award-title | Montserrat | 24px | 500 | 32px | 0 | Award card title (e.g. "Top Talent"), gold #FFEA9E |
| --text-award-desc | Montserrat | 14px | 400 | 22px | 0 | Award description paragraph |
| --text-award-label | Montserrat | 14px | 400 | 20px | 0 | "Số lượng giải thưởng:" label |
| --text-award-value | Montserrat | 36px | 700 | 44px | 0 | Prize value (e.g. "7.000.000 VNĐ") |
| --text-award-quantity | Montserrat | 40px | 700 | auto | 0 | Quantity number (e.g. "10") |
| --text-award-unit | Montserrat | 14px | 400 | 20px | 0 | Unit text (e.g. "Cá nhân") |
| --text-award-note | Montserrat | 14px | 400 | 20px | 0 | "cho mỗi giải thưởng" |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding | 96px 144px | Page content padding (top/bottom left/right) |
| --spacing-section-gap | 120px | Gap between major sections |
| --spacing-sidebar-gap | 24px | Gap between sidebar items |
| --spacing-award-list-gap | 80px | Gap between award cards |
| --spacing-sidebar-content-gap | 80px | Gap between sidebar and content area |
| --spacing-card-internal-gap | 40px | Gap within award card (image to content) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card | 12px | Award card corners |
| --border-divider | 1px solid #2E3940 | Horizontal divider |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│ Page (1440 x 6410, bg: #00101A)                              │
│                                                              │
│ ┌── Header (1440x80, fixed, bg: #101417/80%) ──────────────┐│
│ │ [Logo] [About SAA | Award Info (active) | Kudos] [🔔 VN 👤]││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ ┌── Hero Banner (1440x547) ────────────────────────────────┐│
│ │ Background artwork + gradient overlay                     ││
│ │ "ROOT FURTHER" title                                      ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ ┌── Content (px: 144px, py: 96px) ─────────────────────────┐│
│ │                                                           ││
│ │  "Sun* Annual Awards 2025" (24px white)                   ││
│ │  ────────── divider (#2E3940) ──────────                  ││
│ │  "Hệ thống giải thưởng SAA 2025" (57px gold)             ││
│ │                        gap: 120px                          ││
│ │  ┌── Awards Section (flex row, gap: 80px) ──────────────┐││
│ │  │                                                       │││
│ │  │  ┌─ Sidebar ──┐  ┌── Award Cards ─────────────────┐  │││
│ │  │  │ (200px,     │  │ (flex: 1)                       │  │││
│ │  │  │  sticky     │  │                                 │  │││
│ │  │  │  top:120px) │  │                                 │  │││
│ │  │  │             │  │  ┌── Card: Top Talent ────────┐ │  │││
│ │  │  │ • Top Talent│  │  │ [Image 336x336] [Content]  │ │  │││
│ │  │  │ • Top Proj  │  │  │ Title + Desc + Qty + Prize │ │  │││
│ │  │  │ • Leader    │  │  └────────────────────────────┘ │  │││
│ │  │  │ • Manager   │  │           gap: 80px             │  │││
│ │  │  │ • Sig 2025  │  │  ┌── Card: Top Project ──────┐ │  │││
│ │  │  │ • MVP       │  │  │ ...                        │ │  │││
│ │  │  │             │  │  └────────────────────────────┘ │  │││
│ │  │  └─────────────┘  │  ... (6 cards total)            │  │││
│ │  │                    └────────────────────────────────┘  │││
│ │  └───────────────────────────────────────────────────────┘││
│ │                        gap: 120px                          ││
│ │  ┌── Sun* Kudos Promo (1152px, bg: #0A1A24) ───────────┐││
│ │  │ [Text left] [Logo right] + "Chi tiết" button         │││
│ │  └──────────────────────────────────────────────────────┘││
│ │                                                           ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ ┌── Footer (1440px, border-top: #2E3940) ──────────────────┐│
│ │ [Logo] [Nav links] [Copyright]                            ││
│ └──────────────────────────────────────────────────────────┘│
│                                                              │
│ [FAB] ← Widget Button (fixed, bottom-right)                 │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Hero Banner / Keyvisual

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8437` | - |
| width | 100% (1440px) | `width: 100%` |
| height | 547px | `height: 547px` |
| background | artwork image + gradient overlay | `object-fit: cover` |
| gradient | `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)` | Bottom fade |

---

### Section Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8453` | - |
| layout | flex column, gap 16px | `display: flex; flex-direction: column; gap: 16px` |
| subtitle | "Sun* Annual Awards 2025" — Montserrat 24px/700, white | border-bottom after |
| divider | 1px solid #2E3940 | `border-bottom: 1px solid #2E3940` |
| title | "Hệ thống giải thưởng SAA 2025" — Montserrat 57px/400, gold #FFEA9E | `color: var(--color-text-gold)` |

---

### Sidebar Navigation

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8459` | - |
| width | 200px | `width: 200px` |
| layout | flex column, gap 24px | `gap: 24px` |
| position | sticky, ngay dưới header | `position: sticky; top: 120px` |
| visibility | ẩn dưới xl | `hidden xl:block` — chỉ hiển thị từ xl (≥1280px) trở lên |

**Sidebar Item States:**

| State | Style |
|-------|-------|
| Normal | Montserrat 14px/400, white, no decoration |
| Hover | text #FFEA9E |
| Active | text #FFEA9E, left border or underline indicator, icon visible |

---

### Award Detail Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | `313:8467` (Top Talent), `313:8468`-`313:8510` | - |
| layout | flex row, xen kẽ trái/phải (index chẵn: image trái, index lẻ: `flex-row-reverse`) | `display: flex; gap: 40px` |
| width | fills remaining space | `flex: 1` |
| divider (từ giải 2+) | hr 1px #2E3940, margin-bottom 80px (desktop) / 40px (mobile) | `mb-20 max-md:mb-10` |

**Card Image:**

| Property | Value |
|----------|-------|
| size | 336x336px |
| shape | square, rounded corners (12px) |
| border | golden glow effect (1px solid #998C5F) |

**Card Content:**

| Element | Style |
|---------|-------|
| Title | Montserrat 24px/500 (medium), gold #FFEA9E |
| Description | Montserrat 14px/400, white, line-height 22px |
| "Số lượng giải thưởng:" label | Montserrat 14px/400, white |
| Quantity number | Montserrat 40px/700, gold #FFEA9E |
| Unit text | Montserrat 14px/400, white |
| "Giá trị giải thưởng:" label | Montserrat 14px/400, white |
| Prize value | Montserrat 36px/700, gold #FFEA9E |
| Prize note | Montserrat 14px/400, white/70% |

---

### Sun* Kudos Promo

| Property | Value |
|----------|-------|
| **Node ID** | `335:12023` |
| Reuse | Component `<KudosPromo>` từ Homepage |
| width | 1152px (full content width) |
| height | 500px |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### < xl (< 1280px) — Mobile, Tablet, Desktop nhỏ

| Component | Changes |
|-----------|---------|
| Sidebar | **Ẩn hoàn toàn** (`hidden xl:block`) |
| Award card (mobile <768px) | Stack vertical (image trên, content dưới), full width |
| Award card (tablet 768-1279px) | Giữ flex row, image nhỏ hơn (240px) |
| Award image (mobile) | max-width: 280px, centered |
| Page title (mobile) | font-size: 36px |
| Page padding (mobile) | 48px 16px |
| Page padding (tablet) | 72px 48px |
| Award card gap (mobile) | 40px |

#### ≥ xl (≥ 1280px) — Desktop lớn

| Component | Changes |
|-----------|---------|
| All | Theo đúng Figma design (1440px) |
| Sidebar | **Visible, sticky** ngay dưới header (top: 96px) |

---

## Implementation Mapping

| Design Element | Figma Node ID | React Component |
|----------------|---------------|-----------------|
| Page container | `313:8436` | `<AwardsPage />` |
| Hero banner | `313:8437` | `<HeroBanner />` (variant hoặc reuse) |
| Section title | `313:8453` | `<AwardsSectionTitle />` |
| Sidebar nav | `313:8459` | `<AwardsSidebar />` (Client Component) |
| Award card | `313:8467` template | `<AwardDetailCard />` |
| Sun* Kudos | `335:12023` | `<KudosPromo />` (reuse 100% từ Homepage, cùng component, cùng props) |
| Header | `313:8440` | `<Header variant="full">` (reuse) |
| Footer | `354:4323` | `<Footer variant="full">` (reuse) |

---

## Notes

- Frame width 1440px (khác Homepage 1512px) — content width 1152px (1440 - 2*144px)
- Sidebar 200px + gap 80px + cards (flex:1)
- Award card images cần từ Figma — 6 ảnh 336x336px cho mỗi giải
- Sidebar sticky cần xử lý: dừng trước footer, bắt đầu sau hero
- Signature 2025 card có 2 mức giá trị → layout khác các card khác
- Ảnh giải thưởng đã có sẵn trong `public/images/awards/`
- Gradient overlay hero: `linear-gradient(0deg, #00101A, transparent)` — đơn giản hơn Homepage
