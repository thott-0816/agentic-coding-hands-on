# Implementation Plan: Homepage SAA

**Frame**: `6382-homepage-saa`
**Date**: 2026-03-25
**Spec**: `specs/6382-homepage-saa/spec.md`

---

## Summary

Implement trang chủ Homepage SAA 2025 — landing page chính sau đăng nhập. Trang dài (scrollable) gồm: hero banner "ROOT FURTHER" với countdown, content section, grid 6 giải thưởng, Sun* Kudos promo. Header đầy đủ (nav links, bell, language, avatar + profile dropdown với logout). Footer đầy đủ (nav links + copyright). FAB widget cố định.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr (đã có)
**Testing**: Vitest (unit) + Playwright (e2e) (đã setup)
**State Management**: React useState/useEffect (countdown, dropdowns) + Cookie (locale, session)
**API Style**: Không cần API — static content, logout via Server Action

---

## Constitution Compliance Check

- [x] **I. Clean Code**: TypeScript strict, PascalCase, kebab-case files, `@/*` imports
- [x] **II. TDD**: Vitest unit tests trước implement
- [x] **III. Responsive**: Mobile-first, 3 breakpoints, award grid 2→3 cột
- [x] **IV. Security**: Logout qua Supabase `signOut()` server-side, no localStorage
- [x] **V. i18n**: 19 new translation keys (VI+EN), cookie-based locale
- [x] **VI. Simplicity**: Server Components mặc định, `"use client"` chỉ cho CountdownTimer, ProfileDropdown, WidgetButton

**Violations**: Không có

---

## Architecture Decisions

### Component Strategy

Header và Footer cần **2 variants** (Login simple vs Homepage full). Approach: **Props-based variant** trên shared components, không tạo files riêng.

- `<Header variant="simple" />` → Logo + Language (Login)
- `<Header variant="full" />` → Logo + NavLinks + Bell + Language + Avatar (Homepage+)
- `<Footer variant="simple" />` → Copyright only (Login)
- `<Footer variant="full" />` → Logo + NavLinks + Copyright (Homepage+)

### Countdown Logic

- **Client Component** với `useEffect` + `setInterval(60000)` — update mỗi phút
- Target date từ `process.env.NEXT_PUBLIC_EVENT_DATE` (ISO-8601)
- Khi `now >= target`: set `isEventStarted = true`, ẩn "Coming soon", hiển thị 00/00/00

### Logout Flow

- Server Action `signOut()` gọi `supabase.auth.signOut()` → redirect `/login`
- Không cần API endpoint riêng — Next.js Server Action đủ

### Award Data

- Static data array trong `src/data/awards.ts` — name, slug, description, image path
- Không cần API/database — hardcode cho MVP

### Reuse from Login

| Component | Status | Changes Needed |
|-----------|--------|----------------|
| Header | Reuse | Thêm `variant="full"` với nav links, bell, avatar |
| Footer | Reuse | Thêm `variant="full"` với nav links |
| LanguageSelector | Reuse as-is | Không thay đổi |
| i18n config | Extend | Thêm 19 keys + new TranslationKey types |
| useLocale hook | Reuse as-is | Không thay đổi |
| Toast | Reuse as-is | Có thể dùng cho error notifications |
| Middleware | Reuse as-is | Auth redirect đã hoạt động |

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/app/(main)/page.tsx` | Homepage SAA (Server Component) — moved from `src/app/page.tsx` |
| `src/app/(main)/layout.tsx` | Main layout — HeaderFull + FooterFull wrapper |
| `src/components/homepage/hero-banner.tsx` | Hero section: background + ROOT FURTHER title |
| `src/components/homepage/countdown-timer.tsx` | Countdown client component (Days/Hours/Minutes) |
| `src/components/homepage/event-info.tsx` | Event date/venue/livestream info |
| `src/components/homepage/cta-buttons.tsx` | "ABOUT AWARDS" + "ABOUT KUDOS" buttons |
| `src/components/homepage/root-further-content.tsx` | Long description text section |
| `src/components/homepage/award-section.tsx` | Awards header + grid wrapper |
| `src/components/homepage/award-card.tsx` | Individual award card (image + title + desc + link) |
| `src/components/homepage/kudos-promo.tsx` | Sun* Kudos promotional block |
| `src/components/common/profile-dropdown.tsx` | Avatar dropdown: Profile + Logout (Client Component) |
| `src/components/common/widget-button.tsx` | FAB widget (Client Component) |
| `src/components/common/icons/bell-icon.tsx` | Bell notification SVG icon |
| `src/components/common/icons/user-icon.tsx` | User/person SVG icon |
| `src/components/common/icons/arrow-right-icon.tsx` | Arrow right SVG icon |
| `src/components/common/icons/pencil-icon.tsx` | Pencil SVG icon (for FAB) |
| `src/data/awards.ts` | Static award categories data (name, slug, desc, image) |
| `src/actions/auth.ts` | Server Action: logout (signOut + redirect) |
| `src/libs/i18n/locales/vi.json` | +19 homepage keys (extend existing) |
| `src/libs/i18n/locales/en.json` | +19 homepage keys (extend existing) |
| `public/images/homepage-bg.jpg` | Hero background artwork |
| `public/images/awards/top-talent.png` | Award thumbnail (6 files) |
| `public/images/awards/top-project.png` | |
| `public/images/awards/top-project-leader.png` | |
| `public/images/awards/best-manager.png` | |
| `public/images/awards/signature-2025-creator.png` | |
| `public/images/awards/mvp.png` | |
| `public/images/kudos-illustration.png` | Kudos section illustration |
| `.env.example` | Thêm `NEXT_PUBLIC_EVENT_DATE` template |
| `src/components/homepage/__tests__/countdown-timer.test.tsx` | Unit tests cho CountdownTimer logic |
| `src/components/common/__tests__/profile-dropdown.test.tsx` | Unit tests cho ProfileDropdown (open/close/logout) |
| `src/components/homepage/__tests__/award-card.test.tsx` | Unit tests cho AwardCard render + link |
| `src/actions/__tests__/auth.test.ts` | Unit tests cho logout Server Action |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/common/header.tsx` | Add `variant` prop ("simple"/"full"), nav links, bell, avatar |
| `src/components/common/footer.tsx` | Add `variant` prop ("simple"/"full"), nav links, logo |
| `src/types/i18n.ts` | Add 19 new TranslationKey entries |
| `src/app/login/page.tsx` | Pass `variant="simple"` to Header/Footer |
| `src/app/page.tsx` | **DELETE** — thay bởi `(main)/page.tsx`. Route group `(main)` xử lý `/` route. Middleware đã redirect unauth → `/login` |
| `src/app/globals.css` | Add new design tokens (countdown-bg, section-bg, etc.) |

### Dependencies

| Package | Version | Purpose | Type |
|---------|---------|---------|------|
| (không cần thêm) | - | Tất cả đã có sẵn | - |

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download hero background artwork từ Figma
- Download 6 award thumbnail images
- Download Kudos illustration
- Optimize: convert JPG/WebP, compress
- Đặt vào `public/images/` và `public/images/awards/`

### Phase 1: Foundation (Blocking)

1. **Design tokens**: Thêm Homepage colors vào globals.css (`--color-countdown-bg`, `--color-section-bg`, `--color-kudos-bg`)
2. **i18n extension**: Thêm 19 keys vào vi.json/en.json, cập nhật TranslationKey type
3. **Award data**: Tạo `src/data/awards.ts` với static array
4. **Auth action**: Tạo Server Action `logout` trong `src/actions/auth.ts`
5. **Icon components**: Bell, User, ArrowRight, Pencil SVG icons
6. **Route restructure**: Xóa `src/app/page.tsx`, tạo route group `(main)` với layout riêng. Middleware đã xử lý auth redirect nên không cần redirect logic trong page
7. **Env setup**: Thêm `NEXT_PUBLIC_EVENT_DATE` vào `.env` và tạo `.env.example`

### Phase 2: Core — US1 (P1) — Tổng quan sự kiện

1. **HeroBanner**: Background artwork + ROOT FURTHER title
2. **CountdownTimer**: Client Component, `useEffect`/`setInterval`, env var target date
3. **EventInfo**: Static text — time, venue, livestream
4. **CTAButtons**: 2 buttons (filled/outline), `next/link` to `/awards` and `/kudos` (placeholder routes — may 404 until those pages are built)
5. **RootFurtherContent**: Long paragraph section
6. **AwardSection**: Header + Grid (6 cards, 3-col desktop/2-col mobile)
7. **AwardCard**: Image + title + description (2-line clamp) + "Chi tiết" link
8. **KudosPromo**: 2-column layout (text left, image right)
9. **Homepage page**: Server Component assembling all sections

### Phase 3: Extended — US2+US3 (P1+P2) — Navigation + Header

1. **Header variant="full"**: Add nav links (selected/hover/normal), bell icon (UI-only — notification panel out of scope, chỉ hiển thị icon + badge placeholder), avatar button
2. **ProfileDropdown**: Client Component — Profile + Logout items, click-outside, Escape
3. **Logout integration**: Click Logout → Server Action → signOut → redirect `/login`
4. **Footer variant="full"**: Logo + nav links + "Tiêu chuẩn chung" + copyright
5. **Main layout**: `(main)/layout.tsx` wrapping HeaderFull + content + FooterFull
6. **WidgetButton**: FAB fixed bottom-right, pill shape
7. **Login page update**: Pass `variant="simple"` to Header/Footer

### Phase 4: Polish — US4 (P2) — Responsive + Accessibility

1. **Responsive**: All components responsive (grid cols, font sizes, spacing, stacked layouts)
2. **Accessibility**: ARIA attributes, keyboard nav, focus management, screen reader
3. **Animations**: Card hover lift, CTA hover fill, dropdown fadeIn
4. **Performance**: Lighthouse audit, lazy load award images, optimize bg image

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Award images nặng (6 files) | Trung bình | Trung bình | Lazy load, WebP format, `sizes` attribute |
| Countdown timezone issues | Thấp | Trung bình | Dùng UTC trong env var, convert client-side |
| Header variant complexity | Thấp | Thấp | Props-based approach giữ 1 file, tránh duplication |
| Route restructure ảnh hưởng Login | Thấp | Cao | Test Login redirect sau restructure |

### Estimated Complexity

- **Frontend**: Cao (nhiều components, countdown logic, header variants)
- **Backend**: Thấp (chỉ logout Server Action)
- **Testing**: Trung bình (countdown timing, responsive grids)

---

## Integration Testing Strategy

### Test Scenarios

1. **Happy Path**
   - Homepage renders all sections after login
   - Countdown shows correct time remaining
   - Click award card → navigate to `/awards#slug`
   - Click Logout → redirect to `/login`

2. **Error Handling**
   - No event date env var → show 00/00/00
   - Unauthenticated access → redirect `/login`

3. **Edge Cases**
   - Countdown reaches 0 → hide "Coming soon"
   - Award description > 2 lines → ellipsis

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| CountdownTimer logic | 90%+ | Cao |
| ProfileDropdown (logout) | 90%+ | Cao |
| AwardCard render | 80%+ | Trung bình |
| Responsive grid | E2E only | Trung bình |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `spec.md` reviewed (status: Reviewed)
- [x] `design-style.md` complete
- [x] Login page implemented (auth redirect works)
- [x] Supabase Auth configured
- [ ] Figma media files exported (hero bg, 6 awards, kudos illustration)
- [ ] `NEXT_PUBLIC_EVENT_DATE` env var defined

### External Dependencies

- Awards Information page (navigation target — can use placeholder URL for now)
- Sun* Kudos page (navigation target — can use placeholder URL)

---

## Next Steps

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Export** Figma assets (hero bg, award images, kudos illustration)
3. **Set** `NEXT_PUBLIC_EVENT_DATE` env var
4. **Begin** implementation following task order

---

## Notes

- **Route group `(main)`**: Homepage và các trang authenticated dùng chung layout (HeaderFull + FooterFull). Login nằm ngoài group này
- **Header/Footer variant**: Dùng props thay vì tạo component mới — tránh duplicate code, Login truyền `variant="simple"`, Homepage truyền `variant="full"`
- **Static award data**: Hardcode trong `src/data/awards.ts` cho MVP. Nếu cần CMS, refactor thành API call sau (YAGNI)
- **Countdown env var**: `NEXT_PUBLIC_EVENT_DATE=2025-12-26T18:30:00+07:00` (ISO-8601 with timezone)
- **Profile dropdown reuses** cùng pattern với Language dropdown (click-outside, Escape, fadeIn animation)
- **FAB widget** chỉ hiển thị UI trong MVP — quick actions menu sẽ implement ở sprint sau
