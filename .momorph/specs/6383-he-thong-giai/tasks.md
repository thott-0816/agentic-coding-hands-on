# Tasks: Hệ thống giải thưởng SAA 2025

**Frame**: `6383-he-thong-giai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Phase 1: Foundation (Data + i18n + Route)

**Purpose**: Mở rộng award data, thêm i18n keys, tạo route

- [x] T001 Mở rộng `AwardCategory` interface: thêm `fullDescription`, `quantity`, `unit`, `prizeValue`, `prizeNote?`, `prizeValueTeam?`, `prizeNoteTeam?`. Cập nhật 6 award entries với data đầy đủ từ spec (quantity, unit, prize values) | `src/data/awards.ts`
- [x] T002 [P] Thêm 10 `TranslationKey` mới: `awards.page.subtitle`, `awards.page.title`, `awards.quantity.label`, `awards.prize.label`, `awards.unit.individual`, `awards.unit.team`, `awards.unit.unit`, `awards.prize.perAward`, `awards.prize.individual`, `awards.prize.team` | `src/types/i18n.ts`
- [x] T003 [P] Thêm 10 i18n keys VI (xem bảng i18n trong spec.md) | `src/libs/i18n/locales/vi.json`
- [x] T004 [P] Thêm 10 i18n keys EN (xem bảng i18n trong spec.md) | `src/libs/i18n/locales/en.json`
- [x] T005 Tạo server component page shell: load cookies → getLocale → getDictionary, render placeholder | `src/app/(main)/awards/page.tsx`
- [x] T006 Fix `activeLink` hardcode: đổi từ `activeLink="/"` sang dynamic dựa trên pathname (dùng `usePathname` wrapper hoặc prop từ page) | `src/app/(main)/layout.tsx`

**Checkpoint**: Route `/awards` accessible, award data mở rộng, i18n keys sẵn sàng

---

## Phase 2: User Story 1 — Award Detail Cards (Priority: P1)

**Goal**: Hiển thị 6 card giải thưởng với đầy đủ thông tin (ảnh, tiêu đề, mô tả, số lượng, giá trị)

**Independent Test**: Truy cập `/awards`, xác nhận 6 cards render đúng thứ tự và đầy đủ data

- [x] T007 [US1] Tạo `AwardsSectionTitle`: subtitle "Sun* Annual Awards 2025" (Montserrat 24px/700, white) + divider 1px #2E3940 + title (Montserrat 57px/400, gold #FFEA9E). i18n keys `awards.page.subtitle` + `awards.page.title` | `src/components/awards/awards-section-title.tsx`
- [x] T008 [US1] Tạo `AwardDetailCard`: flex row (image 336x336px left, content right), gap 40px. Image: `next/image` rounded 12px, border 1px #998C5F. Content: title (24px/700 white), description (14px/400 white lh 22px), "Số lượng giải thưởng:" label (14px white) + quantity (40px/700 gold) + unit (14px white), "Giá trị giải thưởng:" label + value (36px/700 gold) + note (14px white/70%). Signature 2025: conditional render 2 rows giá trị | `src/components/awards/award-detail-card.tsx`
- [x] T009 [US1] Wire components vào page: render `<AwardsSectionTitle>` + 6x `<AwardDetailCard>` từ awards data array, mỗi card wrapper có `id={award.slug}` cho scroll target. Cards gap 80px | `src/app/(main)/awards/page.tsx`

**Checkpoint**: 6 award cards hiển thị đầy đủ, đúng thứ tự

---

## Phase 3: User Story 2 — Sidebar Navigation (Priority: P1)

**Goal**: Sidebar sticky bên trái với 6 mục, click scroll-to, active state theo scroll

**Independent Test**: Click sidebar item → smooth scroll đến card tương ứng, scroll → sidebar highlight cập nhật

- [x] T010 [US2] Tạo `AwardsSidebar` Client Component (`"use client"`):
  - Layout: `hidden xl:block`, width 178px, `position: sticky; top: 96px`
  - 6 items từ awards data (name + slug)
  - Click handler: `document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`
  - Scroll tracking: `useEffect` + `IntersectionObserver` theo dõi 6 elements `id={slug}`, update `activeSlug` state
  - Item styles: normal (Montserrat 14px/400 white), active (gold #FFEA9E + left indicator)
  - Hover: text gold
  | `src/components/awards/awards-sidebar.tsx`
- [x] T011 [US2] Wire sidebar vào page layout: flex row container (`hidden xl:flex` → sidebar + cards, gap 80px). Dưới xl: cards full-width | `src/app/(main)/awards/page.tsx`

**Checkpoint**: Sidebar click scroll hoạt động, active state tracking đúng

---

## Phase 4: User Story 3+4 — Hero Banner + Kudos (Priority: P2)

**Goal**: Hero banner artwork + Sun* Kudos promo cuối trang

**Independent Test**: Trang có hero banner đầu, Kudos block cuối với "Chi tiết" link

- [x] T012 [P] [US3] Tạo `AwardsHeroBanner`: background artwork `homepage-bg.png` (hoặc ảnh awards riêng), `next/image` fill + object-cover. Gradient overlay `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)`. Height 547px desktop, responsive thu nhỏ | `src/components/awards/awards-hero-banner.tsx`
- [x] T013 [US4] Import `<KudosPromo>` từ `@/components/homepage/kudos-promo`, thêm vào cuối page với padding wrapper | `src/app/(main)/awards/page.tsx`
- [x] T014 [US3] Wire hero banner vào đầu page | `src/app/(main)/awards/page.tsx`

**Checkpoint**: Hero banner hiển thị, Kudos promo cuối trang hoạt động

---

## Phase 5: User Story 5 — Responsive (Priority: P2)

**Goal**: Trang hiển thị tốt trên mobile/tablet/desktop

**Independent Test**: Resize 3 breakpoints, sidebar ẩn dưới xl, cards responsive

- [x] T015 [US5] Responsive cho `AwardDetailCard`:
  - Mobile (<768px / `max-md`): flex-col, image max-w-280px mx-auto, title 20px, card gap 40px
  - Tablet (768-1279px / `md:max-xl`): flex-row, image 240px
  - Desktop xl+ (≥1280px): flex-row, image 336px
  | `src/components/awards/award-detail-card.tsx`
- [x] T016 [US5] Responsive cho `AwardsSectionTitle`:
  - Mobile: title 36px, padding 48px 16px
  - Tablet: padding 72px 48px
  | `src/components/awards/awards-section-title.tsx`
- [x] T017 [US5] Responsive cho `AwardsHeroBanner`:
  - Mobile: height 300px
  - Tablet: height 400px
  | `src/components/awards/awards-hero-banner.tsx`
- [x] T018 [US5] Responsive cho page layout:
  - Dưới xl: padding `max-md:px-4 md:max-xl:px-12`
  - xl+: padding `px-[var(--spacing-page-x)]`
  | `src/app/(main)/awards/page.tsx`

**Checkpoint**: Responsive 3 breakpoints đẹp, sidebar ẩn dưới xl

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: Accessibility, tests, build verification

- [x] T019 [P] Accessibility: thêm `role="navigation"` cho sidebar, `aria-current` cho active item, `role="main"` cho content area | `src/components/awards/awards-sidebar.tsx`
- [ ] T020 [P] Unit tests: AwardDetailCard render (single prize + dual prize), sidebar active state logic | `src/components/awards/__tests__/`
- [x] T021 Build verification: `yarn build` pass, TypeScript clean | CI
- [ ] T022 Manual test: scroll tracking, sidebar click, responsive, i18n VI/EN, Kudos link, header activeLink

**Checkpoint**: All tests pass, build clean, no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: Không dependency — bắt đầu ngay
- **Phase 2 (US1)**: Depends on Phase 1 (cần data + i18n + route)
- **Phase 3 (US2)**: Depends on Phase 2 (cần cards có `id={slug}` để scroll-to)
- **Phase 4 (US3+4)**: Depends on Phase 1 (cần route). Có thể song song với Phase 2
- **Phase 5 (US5)**: Depends on Phase 2-4 (cần components để thêm responsive)
- **Phase 6 (Polish)**: Depends on tất cả phases trước

### Parallel Opportunities

- T002, T003, T004 song song (khác file, cùng i18n)
- T012 (hero banner) song song với Phase 2 (award cards)
- T015, T016, T017 song song (khác components)
- T019, T020 song song

---

## Implementation Strategy

### MVP First

1. Phase 1 + Phase 2 → 6 award cards hiển thị
2. **STOP & VALIDATE**
3. Phase 3 → Sidebar navigation
4. Phase 4 → Hero + Kudos
5. Phase 5 + 6 → Responsive + Polish

### Summary

| Metric | Value |
|--------|-------|
| Total tasks | 22 |
| Phase 1 (Foundation) | 6 tasks |
| Phase 2 (US1 - Cards) | 3 tasks |
| Phase 3 (US2 - Sidebar) | 2 tasks |
| Phase 4 (US3+4 - Hero+Kudos) | 3 tasks |
| Phase 5 (US5 - Responsive) | 4 tasks |
| Phase 6 (Polish) | 4 tasks |
| Parallel opportunities | T002-T004, T012//Phase2, T015-T017, T019-T020 |
| MVP scope | Phase 1 + Phase 2 (9 tasks) |

---

## Notes

- T001 là task quan trọng nhất — mở rộng data model backward compatible
- T006 (activeLink fix) ảnh hưởng Homepage — cần test regression
- T010 (sidebar) là task phức tạp nhất — Intersection Observer + scroll-to + sticky
- Signature 2025 card có 2 mức giá → T008 cần conditional rendering
- KudosPromo reuse 100% → T013 chỉ import + wrap
