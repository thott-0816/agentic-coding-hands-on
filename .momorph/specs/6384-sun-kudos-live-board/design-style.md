# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `2940:13431`
**Extracted At**: 2026-03-27

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-header-bg | #101417 | 80% | Header background (backdrop blur) |
| --color-text-white | #FFFFFF | 100% | Primary text, headings |
| --color-text-gold | #FFEA9E | 100% | Accent text, highlights, active states |
| --color-text-gray | #6B7280 | 100% | Secondary text, timestamps |
| --color-border-subtle | #2E3940 | 100% | Dividers, card borders |
| --color-card-border | #998C5F | 100% | Golden borders (dropdown, panel) |
| --color-section-bg | #00070C | 100% | Card/panel dark backgrounds |
| --color-kudos-bg | #0A1A24 | 100% | Kudos section background |
| --color-heart-active | #EF4444 | 100% | Heart active (liked) state |
| --color-heart-inactive | #6B7280 | 100% | Heart inactive state |
| --color-hashtag-bg | #FFEA9E | 20% | Hashtag tag background |
| --color-card-cream | #FFF8E1 | 100% | Highlight card background variant |
| --color-card-amber | #FFF3CD | 100% | Highlight card background variant |
| --color-card-tan | #DEC8A0 | 100% | Highlight card background variant |
| --color-card-pink | #FFCDB2 | 100% | Highlight card background variant |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-display | SVN-Gotham | 139.78px | 700 | auto | -13% | KUDOS logo text |
| --text-page-title | Montserrat | 57px | 400 | 64px | -0.25px | Section main titles |
| --text-section-title | Montserrat | 36px | 700 | 44px | 0 | "HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS" |
| --text-subtitle | Montserrat | 24px | 700 | 32px | 0 | "Sun* Annual Awards 2025" subtitle |
| --text-body-lg | Montserrat | 16px | 400 | 24px | 0.5px | Body text, input text |
| --text-body | Montserrat | 14px | 400 | 22px | 0 | Kudos content, descriptions |
| --text-body-sm | Montserrat | 12px | 400 | 16px | 0 | Timestamps, meta info |
| --text-label | Montserrat | 14px | 700 | 20px | 0 | Labels, buttons, hashtags |
| --text-stat-value | Montserrat | 24px | 700 | 32px | 0 | Sidebar stat numbers (25) |
| --text-stat-label | Montserrat | 14px | 400 | 20px | 0 | Sidebar stat labels |
| --text-kudos-count | Montserrat | 40px | 700 | auto | 0 | "388 KUDOS" spotlight title |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-section-gap | 120px | Gap between major sections (KV → Highlight → Spotlight → All Kudos) |
| --spacing-inner-gap-lg | 64px | Gap within sections (header → content) |
| --spacing-inner-gap-md | 40px | Gap between All Kudos cards, between feed and sidebar |
| --spacing-inner-gap-sm | 24px | Gap within cards, between elements |
| --spacing-card-gap | 16px | Gap between small elements |
| --spacing-micro | 8px | Tight element spacing |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-none | 0px | Sharp edges |
| --radius-sm | 4px | Subtle rounding (tags) |
| --radius-md | 8px | Cards, panels |
| --radius-lg | 24px | Kudos post cards |
| --radius-full | 100px | Pills, avatars, buttons |
| --border-divider | 1px solid #2E3940 | Horizontal dividers |

---

## Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│ Page (1440 x 5862, bg: #00101A)                                   │
│                                                                    │
│ ┌── Header (1440x80, fixed, bg: #101417/80%, blur) ──────────────┐│
│ │ [Logo] [About SAA | Award Info | Sun* Kudos (active)] [🔔 VN 👤]││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ ┌── A: KV Banner (1440x512) ────────────────────────────────────┐│
│ │ Background artwork                                              ││
│ │ "Hệ thống ghi nhận và cảm ơn"                                  ││
│ │ [KUDOS logo - SVN-Gotham 139px]                                 ││
│ │ [🖊 Ô nhập pill] [🔍 Tìm kiếm profile Sunner]                  ││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ ┌── Content (px: 144px, py: 96px, gap: 120px) ──────────────────┐│
│ │                                                                 ││
│ │ ┌── B: Highlight (gap: 64px) ────────────────────────────────┐ ││
│ │ │ "Sun* Annual Awards 2025"                                   │ ││
│ │ │ "HIGHLIGHT KUDOS" (36px bold)     [Hashtag ▾] [Phòng ban ▾]│ ││
│ │ │                                                              │ ││
│ │ │ ┌── Carousel (5 cards) ────────────────────────────────────┐│ ││
│ │ │ │ [◀] [Card1] [Card2 (center)] [Card3] [▶]                ││ ││
│ │ │ │ Each card: sender → recipient, time, content,            ││ ││
│ │ │ │   hashtags, hearts, "Xem chi tiết" / "Copy Link"        ││ ││
│ │ │ └──────────────────────────────────────────────────────────┘│ ││
│ │ │                                                              │ ││
│ │ │ [◀] 2/5 [▶]  pagination                                    │ ││
│ │ └──────────────────────────────────────────────────────────────┘ ││
│ │                        gap: 120px                                ││
│ │ ┌── B.6+B.7: Spotlight (full width) ─────────────────────────┐ ││
│ │ │ "Sun* Annual Awards 2025"                                   │ ││
│ │ │ "SPOTLIGHT BOARD" (36px bold)                               │ ││
│ │ │ ┌──────────────────────────────────────────────────────┐    │ ││
│ │ │ │ [🔍 Search] [Pan/Zoom toggle]                        │    │ ││
│ │ │ │                                                      │    │ ││
│ │ │ │      "388 KUDOS"                                     │    │ ││
│ │ │ │  [word cloud / diagram of recipient names]           │    │ ││
│ │ │ │                                                      │    │ ││
│ │ │ └──────────────────────────────────────────────────────┘    │ ││
│ │ └──────────────────────────────────────────────────────────────┘ ││
│ │                        gap: 120px                                ││
│ │ ┌── C+D: All Kudos (flex row, gap: 40px) ────────────────────┐ ││
│ │ │ "Sun* Annual Awards 2025"                                   │ ││
│ │ │ "ALL KUDOS" (36px bold)                                     │ ││
│ │ │                                                              │ ││
│ │ │ ┌── C: Feed (flex-1) ──┐  ┌── D: Sidebar (~280px) ───────┐│ ││
│ │ │ │                       │  │ Số Kudos nhận:      25        ││ ││
│ │ │ │ ┌── Kudos Card ────┐ │  │ Số Kudos gửi:       25        ││ ││
│ │ │ │ │ sender → recip   │ │  │ Số tim nhận:         25        ││ ││
│ │ │ │ │ time             │ │  │ ──────────────────             ││ ││
│ │ │ │ │ content (5 lines)│ │  │ Secret Box mở:       25        ││ ││
│ │ │ │ │ [images]         │ │  │ Secret Box chưa mở:  25        ││ ││
│ │ │ │ │ #hashtags        │ │  │ [Mở Secret Box 🎁]             ││ ││
│ │ │ │ │ ❤️ 1000 Copy Link│ │  │                                ││ ││
│ │ │ │ └─────────────────┘ │  │ 10 SUNNER NHẬN QUÀ MỚI NHẤT   ││ ││
│ │ │ │ gap: 40px           │  │ ┌ Avatar + Name + Info ┐        ││ ││
│ │ │ │ ┌── Kudos Card ──┐ │  │ │ ... (10 items)       │        ││ ││
│ │ │ │ │ ...             │ │  │ └─────────────────────┘        ││ ││
│ │ │ │ └────────────────┘ │  └──────────────────────────────────┘│ ││
│ │ │ └───────────────────┘                                        │ ││
│ │ └──────────────────────────────────────────────────────────────┘ ││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ ┌── Footer (1440px, border-top: #2E3940) ────────────────────────┐│
│ │ [Logo] [About SAA | Award Info | Sun* Kudos | Tiêu chuẩn] [©] ││
│ └────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A: KV Banner

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13437` | - |
| width | 100% (1440px) | `width: 100%` |
| height | 512px | `height: 512px` |
| background | artwork image + gradient overlay | `object-fit: cover` |

### A.1: Ô nhập ghi nhận (Pill Input)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2940:13449` | - |
| width | ~480px (hug content) | `width: auto; min-width: 480px` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | rgba(255,255,255,0.1) | `background: rgba(255,255,255,0.1)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-card-border)` |
| border-radius | 100px (pill) | `border-radius: 100px` |
| font | Montserrat 16px/400, white/60% | `font-size: 16px; color: rgba(255,255,255,0.6)` |
| icon | pencil icon left, 20x20 | - |
| interaction | click → open modal (read-only input) | `cursor: pointer` |

### B: Highlight Section

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13451` |
| layout | flex column, gap 64px |
| width | 1152px (content width) |

### B.1: Highlight Header

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13452` |
| subtitle | "Sun* Annual Awards 2025" — 24px/700, white, border-bottom |
| title | "HIGHLIGHT KUDOS" — 36px/700, gold #FFEA9E |
| filters | flex row, right-aligned: Hashtag button + Phòng ban button |

### B.2: Highlight Carousel (Center-Focus)

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13461` |
| layout | horizontal carousel, **center-focus**: 1 card center nổi bật, 2 card hai bên mờ |
| center card | full opacity (1), scale(1), z-index cao |
| side cards | opacity thấp (~0.5), scale nhỏ hơn (~0.85), z-index thấp |
| card | Highlight Kudos card with colored backgrounds |
| navigation | prev/next arrow buttons (circular) |
| pagination | "2/5" text + prev/next arrows |
| transition | slide + opacity + scale, ~300ms ease-out |

### B.1.1: Dropdown Hashtag Filter

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `563:8026` (Figma `721:5580`) |  |
| **MoMorph Frame ID** | `6390` |  |
| container | flex column, padding 6px | `display: flex; flex-direction: column; padding: 6px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border-radius | 8px | `border-radius: 8px` |
| max-height | scrollable when overflow | `max-height: 400px; overflow-y: auto` |

**Dropdown Item:**

| Property | Value |
|----------|-------|
| size | ~135x56px (hug content) |
| padding | 16px |
| border-radius | 4px |
| font | Montserrat 16px/700, line-height 24px, letter-spacing 0.5px |
| text-align | center |

**States:**

| State | Style |
|-------|-------|
| Default | bg: transparent, color: white |
| Hover | bg: rgba(255,234,158,0.1), cursor: pointer |
| Selected | bg: rgba(255,234,158,0.1), color: white, text-shadow: `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` (glow) |

**Data — 13 hashtag:**
Toàn diện, Giỏi chuyên môn, Hiệu suất cao, Truyền cảm hứng, Cống hiến, Aim High, Be Agile, Wasshoi, Hướng mục tiêu, Hướng khách hàng, Chuẩn quy trình, Giải pháp sáng tạo, Quản lý xuất sắc

### B.1.2: Dropdown Phòng ban Filter

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `563:8027` (Figma `721:5684`) |  |
| **MoMorph Frame ID** | `6391` |  |
| container | flex column, padding 6px | `display: flex; flex-direction: column; padding: 6px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border-radius | 8px | `border-radius: 8px` |
| max-height | scrollable | `max-height: 400px; overflow-y: auto` |

**Dropdown Item:** (same style as Hashtag dropdown)

| Property | Value |
|----------|-------|
| size | ~90x56px (hug content) |
| padding | 16px |
| border-radius | 4px |
| font | Montserrat 16px/700, line-height 24px, letter-spacing 0.5px |
| text-align | center |

**States:** (same as Hashtag dropdown)

**Data — ~50 phòng ban (partial list):**
CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO

### B.3: Highlight Kudos Card (KUDO - Highlight)

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13465` |
| width | ~480px (varies by carousel slot) |
| padding | 24px |
| border-radius | 24px |
| background | varies per card: cream #FFF8E1, amber #FFF3CD, tan #DEC8A0, pink #FFCDB2 |
| layout | flex column, gap 16px |
| sender/recipient | avatar (circle 40px) + name (14px/700 dark) + dept (12px dark) + arrow between |
| time | "10:00 - 10/30/2025" — 12px, gray |
| content | max 3 lines + "..." truncate, 14px/400, dark text |
| hashtags | colored tags row (bg: gold/20%, text: dark, radius: 4px, padding: 4px 8px) |
| actions | flex row, justify-between: heart count (left) + "Xem chi tiết" + "Copy Link" (right) |

### B.2 Carousel Arrow Buttons

| Property | Value |
|----------|-------|
| **Node IDs** | `2940:13468` (prev), `2940:13470` (next) |
| size | 48x48px |
| shape | circle |
| background | rgba(255,255,255,0.1) |
| icon | chevron left/right, 24x24, white |
| border | 1px solid rgba(255,255,255,0.2) |
| hover | background: rgba(255,255,255,0.2) |
| disabled | opacity: 0.3, cursor: not-allowed |

### B.7: Spotlight Board

| Property | Value |
|----------|-------|
| **Node ID** | `2940:14174` |
| layout | canvas/interactive area |
| title | "388 KUDOS" — 40px/700 |
| search | `2940:14833` — input, max 100 chars, placeholder "Tìm kiếm" |
| controls | pan/zoom toggle `3007:17479` |

### C: All Kudos Feed

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13475` |
| layout | flex column, gap 40px |
| width | flex-1 (remaining space after sidebar) |

### C.3: Kudos Post Card

| Property | Value |
|----------|-------|
| **Node ID** | `3127:21871` |
| layout | flex column, radius 24px |
| background | #00070C (section-bg) |
| border | 1px solid #2E3940 |
| padding | 24px |
| sender | `I3127:21871;256:4858` — avatar + name + dept |
| recipient | `I3127:21871;256:4860` — avatar + name + dept |
| arrow | sent icon between sender/recipient |
| time | `I3127:21871;256:5229` — "HH:mm - MM/DD/YYYY" |
| content | `I3127:21871;256:5155` — max 5 lines + truncate |
| images | `I3127:21871;256:5176` — horizontal thumbnails |
| hashtags | `I3127:21871;256:5158` — tag pills, gold color |
| heart | `I3127:21871;256:5175` — toggle button, count |
| copy link | `I3127:21871;256:5216` — copy URL to clipboard |

### C.4.1: Heart Button

| Property | Value |
|----------|-------|
| **Node ID** | `I3127:21871;256:5175` |
| layout | flex row, gap 4px, align center |
| icon | heart SVG, 20x20 |
| count | Montserrat 14px/700, white |

**States:**

| State | Style |
|-------|-------|
| Default (not liked) | heart icon: #6B7280 (gray) |
| Liked | heart icon: #EF4444 (red), filled |
| Hover | scale(1.1) |
| Click | scale animation: 1 → 1.3 → 1, 200ms |

### C.4.2: Copy Link Button

| Property | Value |
|----------|-------|
| **Node ID** | `I3127:21871;256:5216` |
| layout | flex row, gap 4px, align center |
| icon | link/copy SVG, 16x16 |
| text | "Copy Link" — Montserrat 14px/400, white |
| hover | text color: #FFEA9E (gold) |

---

### D: Sidebar

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13488` |
| layout | flex column, gap 40px |
| position | sticky (desktop), top: 120px (below header 80px + 40px gap) |
| width | ~280px |
| visibility | hidden below xl (< 1280px), visible + sticky on xl+ |

### D.1: Stats Block

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13489` |
| layout | flex column, gap 16px |
| metrics | 5 rows, each: flex row, justify-between |
| metric label | Montserrat 14px/400, white — left-aligned |
| metric value | Montserrat 24px/700, white — right-aligned |
| divider | `2940:13494` — 1px solid #2E3940, separating kudos/box stats |
| button | `2940:13497` — "Mở Secret Box" |

**"Mở Secret Box" Button:**

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13497` |
| width | 100% |
| height | 48px |
| padding | 12px 24px |
| background | #FFEA9E (gold) |
| color | #00101A (dark) |
| font | Montserrat 16px/700 |
| border-radius | 8px |
| icon | gift box emoji/icon, right side |
| hover | brightness 110% |

### D.3: 10 Sunner nhận quà

| Property | Value |
|----------|-------|
| **Node ID** | `2940:13510` |
| title | "10 SUNNER NHẬN QUÀ MỚI NHẤT" — 14px bold gold |
| list | 10 items: avatar (small circle) + name + "Nhận được 1 sổ phong SAA" |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1279px |
| Desktop | 1280px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Page padding | 16px |
| Sidebar | Ẩn hoặc collapse dưới feed |
| Carousel | 1 card visible, swipe |
| Spotlight | Simplified / hidden |
| Kudos card | Full width |
| Section titles | Smaller font (24px) |

#### Tablet (768px - 1279px)

| Component | Changes |
|-----------|---------|
| Page padding | 48px |
| Sidebar | Collapse dưới feed |
| Carousel | 3 cards visible |

#### Desktop (≥ 1280px)

| Component | Changes |
|-----------|---------|
| All | Theo đúng Figma (1440px) |
| Layout | 2 cột: feed + sidebar |
| Sidebar | Visible, sticky |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel | transform (translateX), opacity, scale | 300ms | ease-out | Prev/Next click — center card: opacity 1 + scale(1), side cards: opacity 0.5 + scale(0.85) |
| Heart | color, scale | 200ms | ease-in-out | Click toggle |
| Copy Link toast | opacity | 150ms | ease-out | After copy |
| Spotlight | transform (pan/zoom) | 200ms | ease-out | Drag/scroll |
| Dropdown | opacity, transform | 150ms | ease-out | Toggle |

---

## Implementation Mapping

| Design Element | Figma Node ID | React Component |
|----------------|---------------|-----------------|
| Page container | `2940:13431` | `<KudosPage />` |
| KV Banner | `2940:13437` | `<KudosBanner />` |
| Input pill | `2940:13449` | `<KudosInputTrigger />` |
| Highlight section | `2940:13451` | `<HighlightKudos />` |
| Filter buttons | `2940:13459`, `2940:13460` | `<FilterButton />` |
| Dropdown Hashtag | `563:8026` | `<HashtagDropdown />` (Client) |
| Dropdown Phòng ban | `563:8027` | `<DepartmentDropdown />` (Client) |
| Carousel | `2940:13461` | `<KudosCarousel />` (Client, center-focus) |
| Highlight card | `2940:13465` | `<HighlightKudoCard />` |
| Spotlight | `2940:14174` | `<SpotlightBoard />` (Client) |
| All Kudos header | `2940:14221` | `<SectionHeader />` |
| Kudos feed | `2940:13482` | `<KudosFeed />` |
| Kudos post card | `3127:21871` | `<KudosPostCard />` |
| Heart button | hearts node | `<HeartButton />` (Client) |
| Copy link | copy node | `<CopyLinkButton />` (Client) |
| Sidebar | `2940:13488` | `<KudosSidebar />` |
| Stats block | `2940:13489` | `<KudosStats />` |
| Secret Box btn | `2940:13497` | `<SecretBoxButton />` (Client) |
| 10 Sunner list | `2940:13510` | `<TopRecipientsList />` |

---

## Notes

- Page 1440px wide, content 1152px (1440 - 2*144px padding)
- Section gap 120px giữa các phần lớn (KV → Highlight → Spotlight → All Kudos)
- Carousel cards có background colors khác nhau (cream, amber, tan, pink)
- Spotlight Board cần thư viện canvas/SVG (d3.js hoặc custom)
- Font SVN-Gotham chỉ dùng cho logo "KUDOS" (139.78px) — cần check font availability
- Thời gian format: "HH:mm - MM/DD/YYYY"
- Heart: 2 states (gray inactive, red active)
- Reuse Header/Footer từ layout `(main)`
