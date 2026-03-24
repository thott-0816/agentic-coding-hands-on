# Design Style: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, frame `662:14387`
**Extracted At**: 2026-03-24

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, gradient base |
| --color-header-bg | #0B0F12 | 80% | Header background (semi-transparent) |
| --color-btn-login | #FFEA9E | 100% | Login button background |
| --color-btn-login-text | #00101A | 100% | Login button text |
| --color-text-white | #FFFFFF | 100% | Body text, description, language label |
| --color-footer-border | #2E3940 | 100% | Footer top border |
| --color-gradient-left | #00101A → transparent | 100% | Left-to-right gradient overlay |
| --color-gradient-bottom | #00101A → transparent | 100% | Bottom-to-top gradient overlay |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-description | Montserrat | 20px | 400 | 40px | 0.5px |
| --text-btn-login | Montserrat | 22px | 400 | 28px | 0px |
| --text-lang-label | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-page-y | 96px | Page vertical padding (hero section) |
| --spacing-header-x | 144px | Header horizontal padding |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-hero-gap | 80px | Gap between key visual and content |
| --spacing-content-gap | 24px | Gap between description and login button |
| --spacing-btn-x | 24px | Button horizontal padding |
| --spacing-btn-y | 16px | Button vertical padding |
| --spacing-btn-icon-gap | 8px | Gap between button text and icon |
| --spacing-footer-x | 90px | Footer horizontal padding |
| --spacing-footer-y | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn | 8px | Login button border radius |
| --radius-lang-btn | 4px | Language selector button radius |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-btn-hover | (predicted) 0 4px 12px rgba(255,234,158,0.3) | Login button hover effect |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 1024px | Desktop design height |
| background | #00101A | Dark navy background |
| overflow | hidden | Clip background image |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│  Page (1440 x 1024, bg: #00101A)                                │
│                                                                  │
│  ┌──────── C_Keyvisual (1441 x 1022, absolute, z:1) ──────────┐│
│  │  Background artwork image (full cover)                       ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌── Rectangle 57 (gradient left→right, z:1) ─────────────────┐│
│  │  linear-gradient(90deg, #00101A 0%, #00101A 25.41%,         ││
│  │                         transparent 100%)                    ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌── Cover (gradient bottom→top, z:1) ────────────────────────┐│
│  │  linear-gradient(0deg, #00101A 22.48%,                      ││
│  │                        transparent 51.74%)                   ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌── A_Header (1440 x 80, top:0, z:1) ───────────────────────┐│
│  │  bg: rgba(11,15,18,0.8), padding: 12px 144px               ││
│  │  flex, justify-between, align-center                         ││
│  │  ┌─────────────┐                        ┌──────────────┐    ││
│  │  │ A.1_Logo    │                        │ A.2_Language  │    ││
│  │  │ 52x56px     │                        │ 108x56px     │    ││
│  │  └─────────────┘                        └──────────────┘    ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌── B_Bìa (1440 x 845, top:88, padding: 96px 144px) ───────┐│
│  │  flex, column, gap: 120px                                    ││
│  │                                                              ││
│  │  ┌── Frame 487 (1152 x 653, flex column, gap: 80px) ──────┐││
│  │  │                                                          │││
│  │  │  ┌── B.1_Key Visual (1152 x 200) ──────────────────┐   │││
│  │  │  │  "ROOT FURTHER" image (451 x 200)                │   │││
│  │  │  └──────────────────────────────────────────────────┘   │││
│  │  │                                                          │││
│  │  │  ┌── Frame 550 (496 x 164, padding-left: 16px) ───┐   │││
│  │  │  │                                                  │   │││
│  │  │  │  B.2_content (480 x 80)                          │   │││
│  │  │  │  "Bắt đầu hành trình của bạn..."               │   │││
│  │  │  │  font: 20px/40px Montserrat Normal                 │   │││
│  │  │  │  gap: 24px ↓                                     │   │││
│  │  │  │                                                  │   │││
│  │  │  │  ┌── B.3_Login (305 x 60) ──────────────────┐   │   │││
│  │  │  │  │  bg: #FFEA9E, radius: 8px                 │   │   │││
│  │  │  │  │  padding: 16px 24px, flex, gap: 8px       │   │   │││
│  │  │  │  │  "LOGIN With Google" + Google icon         │   │   │││
│  │  │  │  │  font: 22px/28px Montserrat Bold #00101A  │   │   │││
│  │  │  │  └──────────────────────────────────────────┘   │   │││
│  │  │  └──────────────────────────────────────────────────┘   │││
│  │  └──────────────────────────────────────────────────────────┘││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌── D_Footer (1440 x 91, bottom:0) ─────────────────────────┐│
│  │  border-top: 1px solid #2E3940                              ││
│  │  padding: 40px 90px, flex, center, justify-center            ││
│  │  "Bản quyền thuộc về Sun* © 2025"                          ││
│  │  font: 16px/24px Montserrat Alternates Bold, white          ││
│  └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header — Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14391` | - |
| width | 1440px (full) | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11, 15, 18, 0.8) | `background-color: rgba(11, 15, 18, 0.8)` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | fixed | `position: fixed; top: 0; z-index: 50` |

---

### A.1_Logo — SAA 2025 Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I662:14391;186:2166` | - |
| width | 52px | `width: 52px` |
| height | 56px | `height: 56px` |
| content | Image (media file) | `<Image>` component |
| interaction | None | `pointer-events: none` |

---

### A.2_Language — Language Selector Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I662:14391;186:1601` | - |
| width | 108px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 2px → 4px | `gap: 4px` |

**Content:**
- Flag icon: 24x24px (VN: cờ Việt Nam, EN: cờ UK Union Jack — theo locale hiện tại)
- Label: "VN" or "EN" — Montserrat 16px/24px Bold #FFFFFF, letter-spacing 0.15px
- Chevron down icon: 24x24px

**States:**

| State | Changes |
|-------|---------|
| Default | No background, cursor: pointer |
| Hover | background: rgba(255,255,255,0.1), cursor: pointer |
| Focus | outline: 2px solid rgba(255,255,255,0.5), outline-offset: 2px (keyboard focus ring) |
| Active (dropdown open) | background: rgba(255,255,255,0.1), Chevron rotates 180deg |

---

### B.1_Key Visual — "ROOT FURTHER" Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2939:9548` | - |
| width | 451px | `width: 451px` |
| height | 200px | `height: auto` |
| aspect-ratio | 115/51 | `aspect-ratio: 115/51` |
| content | Image (media file) | `<Image>` component |
| position | x: 144, y: 288 | Within hero flex layout |

---

### B.2_content — Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14753` | - |
| width | 480px | `max-width: 480px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 400 (normal), **bold** cho "SAA 2025" | `font-weight: 400` + `<strong>` cho highlight |
| font-style | normal | `font-style: normal` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | left | `text-align: left` |

**Content (VI):**
```
Bắt đầu hành trình của bạn cùng **SAA 2025**.
Đăng nhập để khám phá!
```

**Content (EN):**
```
Start your journey with **SAA 2025**.
Login to explore!
```

> "SAA 2025" được tô đậm (bold) trong cả 2 ngôn ngữ. Sử dụng 3 i18n keys: `line1.before` + `line1.highlight` (bold) + `line1.after`

---

### B.3_Login — "LOGIN With Google" Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14426` | - |
| width | fit-content | `width: fit-content; min-width: 300px` |
| height | auto | `height: auto` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Text:**

| Property | Value | CSS |
|----------|-------|-----|
| content | "ĐĂNG NHẬP với Google" (VI) / "LOGIN With Google" (EN) | i18n key: `login.button.loginWithGoogle` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

**Icon:**
- Google icon: 24x24px, positioned after text (Node: `I662:14426;186:1766`)

**States:**

| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover | bg: #fff8e1, transform: translateY(-2px), box-shadow: 0 4px 12px rgba(255,234,158,0.3) |
| Active | bg: #FFD54F, transform: translateY(0) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 3px (keyboard focus ring) |
| Loading | bg: #FFEA9E opacity 0.7, cursor: not-allowed, spinner + i18n text "Đang tải..."/"Loading...", content centered |
| Disabled | bg: #FFEA9E opacity 0.5, cursor: not-allowed |

---

### D_Footer — Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14447` | - |
| width | 1440px (full) | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Text:**

| Property | Value | CSS |
|----------|-------|-----|
| content | "Bản quyền thuộc về Sun* © 2025" | i18n key: `common.footer.copyright` |
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

---

### Background Layers (z-order)

| Layer | Node ID | Type | Z-Index | Description |
|-------|---------|------|---------|-------------|
| C_Keyvisual | `662:14388` | Image | 1 | Background artwork, full cover |
| Rectangle 57 | `662:14392` | Gradient | 1 | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)` |
| Cover | `662:14390` | Gradient | 1 | `linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 100%, h: 100vh, relative, overflow: hidden)
├── C_Keyvisual (absolute, inset: 0, z-index: 0)
│   └── image (object-fit: cover, w: 100%, h: 100%)
├── Rectangle 57 (absolute, inset: 0, z-index: 1)
│   └── gradient left-to-right
├── Cover (absolute, inset: 0, z-index: 2)
│   └── gradient bottom-to-top
├── A_Header (fixed, top: 0, w: 100%, h: 80px, z-index: 50)
│   │  bg: rgba(11,15,18,0.8), px: 144px, py: 12px
│   │  flex, justify-between, items-center
│   ├── A.1_Logo (52x56px, image)
│   └── A.2_Language (108x56px, flex, items-center, gap: 4px)
│       ├── Flag Icon (24x24px)
│       ├── Label "VN" (16px Bold, white)
│       └── Chevron Down (24x24px)
├── B_Bìa (relative, z-index: 10, px: 144px, py: 96px, mt: 88px)
│   └── Frame 487 (flex, column, gap: 80px)
│       ├── B.1_Key Visual (451x200px, image)
│       └── Frame 550 (flex, column, gap: 24px, pl: 16px)
│           ├── B.2_content (480px, 20px/40px Normal, white, "SAA 2025" bold)
│           └── B.3_Login (305x60px, bg: #FFEA9E, radius: 8px)
│               ├── Text "LOGIN With Google" (22px Bold, #00101A)
│               └── Google Icon (24x24px)
└── D_Footer (absolute, bottom: 0, w: 100%, z-index: 10)
    │  border-top: 1px solid #2E3940, px: 90px, py: 40px
    └── Copyright text (16px Bold, Montserrat Alternates, white, center)
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
| A_Header | padding: 12px 16px; height: 64px |
| A.1_Logo | Giữ nguyên 52px (không thu nhỏ) |
| A.2_Language | Giữ nguyên kích thước |
| B_Bìa | Content centered dọc (flex justify-center) |
| B.1_Key Visual | height: 120px, width: auto |
| Frame 487 | gap: 40px |
| Frame 550 | padding-left: 0 |
| B.2_content | font-size: 20px (giữ nguyên), max-width: 100% |
| B.3_Login | width: fit-content, min-width: 300px |
| D_Footer | padding: 24px 16px |
| --text-footer | font-size: 14px |
| Gradients | Giữ nguyên proportions |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| A_Header | padding: 12px 48px |
| B_Bìa | Content centered dọc (flex justify-center) |
| B.1_Key Visual | height: 160px, width: auto |
| Frame 487 | gap: 60px |
| B.2_content | font-size: 20px (giữ nguyên) |
| B.3_Login | width: fit-content, min-width: 300px |
| D_Footer | padding: 32px 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | Theo đúng Figma design (1440px) |
| Container | max-width: 1440px, margin: 0 auto |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| Logo SAA 2025 | `I662:14391;178:1033;178:1030` | 52x48px | Image | Header logo |
| VN Flag | `I662:14391;186:1696;186:1821;186:1709` | 24x24px | Image | Language selector (VI) |
| UK Flag | N/A (cần asset mới) | 24x24px | Image | Language selector (EN) |
| Chevron Down | `I662:14391;186:1696;186:1821;186:1441` | 24x24px | #FFFFFF | Language dropdown toggle |
| Google Icon | `I662:14426;186:1766` | 24x24px | Original colors | Login button |
| ROOT FURTHER | `2939:9548` | 451x200px | Image | Key visual |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| B.3_Login button | background-color, transform, box-shadow | 150ms | ease-in-out | Hover |
| B.3_Login button | opacity | 200ms | ease-in-out | Loading state |
| A.2_Language chevron | transform (rotate) | 150ms | ease-out | Dropdown toggle |
| Language dropdown | opacity, transform | 150ms | ease-out | Open/Close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page container | `662:14387` | `relative w-full h-screen bg-[#00101A] overflow-hidden` | `<LoginPage />` |
| Background image | `662:14388` | `absolute inset-0 z-0 object-cover` | `<Image>` (next/image) |
| Gradient left | `662:14392` | `absolute inset-0 z-[1] bg-gradient-to-r from-[#00101A] via-[#00101A] to-transparent` | `<div>` |
| Gradient bottom | `662:14390` | `absolute inset-0 z-[2] bg-gradient-to-t from-[#00101A] to-transparent` | `<div>` |
| Header | `662:14391` | `fixed top-0 w-full h-20 z-50 flex items-center justify-between px-36 py-3 bg-[#0B0F12]/80` | `<Header />` |
| Logo | `I662:14391;186:2166` | `w-[52px] h-[56px]` | `<Image>` |
| Language selector | `I662:14391;186:1601` | `flex items-center gap-1 px-4 py-4 rounded cursor-pointer` | `<LanguageSelector />` |
| Hero section | `662:14393` | `relative z-10 px-36 py-24 mt-[88px]` | `<HeroSection />` |
| Key visual | `2939:9548` | `w-[451px] h-auto` | `<Image>` |
| Description | `662:14753` | `max-w-[480px] text-[20px] font-normal leading-[40px] tracking-[0.5px] text-white` + `<strong>` cho "SAA 2025" | `<p>` |
| Login button | `662:14426` | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg hover:bg-[#FFE07A] transition-all` | `<LoginButton />` |
| Login button text | `I662:14426;186:1568` | `text-[22px] font-bold leading-7 text-[#00101A]` | `<span>` |
| Footer | `662:14447` | `absolute bottom-0 w-full z-10 flex items-center justify-center px-[90px] py-10 border-t border-[#2E3940]` | `<Footer />` |
| Footer text | `I662:14447;342:1413` | `text-base font-bold leading-6 text-white font-['Montserrat_Alternates']` | `<p>` |

---

## Notes

- Tất cả colors sử dụng CSS custom properties qua Tailwind config để hỗ trợ theming
- Font Montserrat và Montserrat Alternates load qua Google Fonts (next/font/google)
- Icons PHẢI là SVG components (Google icon, chevron) — không dùng img tags
- Flag icons có thể là SVG hoặc small PNG, wrapped trong Icon component
- Background image cần optimization qua next/image với priority loading (LCP element)
- Color contrast: #FFFFFF on #00101A = 18.4:1 (đạt WCAG AAA); #00101A on #FFEA9E = 13.8:1 (đạt WCAG AAA)
- Gradient stops cần chính xác theo Figma: left gradient stops tại 25.41%, bottom gradient stops tại 22.48% và 51.74%
