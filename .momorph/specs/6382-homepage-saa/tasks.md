# Tasks: Homepage SAA

**Frame**: `6382-homepage-saa`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download assets, prepare media files

- [ ] T001 Download hero background artwork from Figma, optimize to JPG/WebP | public/images/homepage-bg.jpg
- [ ] T002 [P] Download 6 award thumbnail images from Figma, optimize | public/images/awards/*.png
- [ ] T003 [P] Download Kudos section illustration from Figma, optimize | public/images/kudos-illustration.png

**Checkpoint**: All media assets ready in public/images/

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Infrastructure, data, tokens, route restructure — blocks all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Design Tokens & i18n

- [ ] T004 Add Homepage design tokens to globals.css: --color-countdown-bg (#0D1B24), --color-section-bg (#00070C), --color-kudos-bg (#0A1A24), --color-card-border (#998C5F), --color-text-gold (#FFEA9E) | src/app/globals.css
- [ ] T005 Add 19 Homepage TranslationKey entries to i18n types | src/types/i18n.ts
- [ ] T006 [P] Add 19 Homepage keys to Vietnamese translation file (homepage.hero.*, homepage.countdown.*, homepage.event.*, homepage.cta.*, homepage.awards.*, homepage.kudos.*, common.header.profile/logout/notifications/quickActions) | src/libs/i18n/locales/vi.json
- [ ] T007 [P] Add 19 Homepage keys to English translation file (matching vi.json structure) | src/libs/i18n/locales/en.json

### Data & Actions

- [ ] T008 Create static award categories data: array of 6 objects with name, slug, description, imagePath fields. Slugs: top-talent, top-project, top-project-leader, best-manager, signature-2025-creator, mvp | src/data/awards.ts
- [ ] T009 Create logout Server Action: call supabase.auth.signOut() via server client, redirect to /login | src/actions/auth.ts
- [ ] T010 Write unit tests for logout Server Action: test signOut called, redirect to /login | src/actions/__tests__/auth.test.ts

### Icons

- [ ] T011 [P] Create BellIcon SVG component: 24x24px, white, aria-hidden | src/components/common/icons/bell-icon.tsx
- [ ] T012 [P] Create UserIcon SVG component: 24x24px, person silhouette, white | src/components/common/icons/user-icon.tsx
- [ ] T013 [P] Create ArrowRightIcon SVG component: 24x24px, white, for CTA buttons and "Chi tiết" links | src/components/common/icons/arrow-right-icon.tsx
- [ ] T014 [P] Create PencilIcon SVG component: 24x24px, for FAB widget | src/components/common/icons/pencil-icon.tsx

### Route & Env

- [ ] T015 Delete src/app/page.tsx, create route group (main) with layout.tsx placeholder, create (main)/page.tsx placeholder. Verify Login page still works at /login | src/app/(main)/layout.tsx, src/app/(main)/page.tsx
- [ ] T016 [P] Add NEXT_PUBLIC_EVENT_DATE to .env (ISO-8601 format) and create .env.example with template | .env, .env.example

**Checkpoint**: Foundation ready — tokens, i18n, data, icons, route structure, env. User story work can begin.

---

## Phase 3: User Story 1 — Xem tổng quan sự kiện (Priority: P1) 🎯 MVP

**Goal**: Trang chủ hiển thị đầy đủ: hero banner, countdown, event info, CTA, content, 6 giải thưởng, Kudos promo

**Independent Test**: Đăng nhập → redirect đến Homepage → tất cả sections hiển thị đúng, countdown chạy real-time

### Tests First (TDD)

- [ ] T017 [P] [US1] Write unit tests for CountdownTimer: calculate correct days/hours/minutes from target date, update every interval, show 00/00/00 when past, hide "Coming soon" when event started | src/components/homepage/__tests__/countdown-timer.test.tsx
- [ ] T018 [P] [US1] Write unit tests for AwardCard: render title + description (2-line clamp) + image + "Chi tiết" link with correct href including slug | src/components/homepage/__tests__/award-card.test.tsx

### Hero Section (US1)

- [ ] T019 [US1] Create HeroBanner: full-width background image (next/image priority, object-cover, aria-hidden), gradient overlays (left-to-right + bottom-to-top same as Login), "ROOT FURTHER" title 96px Bold white, overlay z-index layering | src/components/homepage/hero-banner.tsx
- [ ] T020 [US1] Create CountdownTimer: Client Component "use client", reads NEXT_PUBLIC_EVENT_DATE env var, useEffect + setInterval(60000), calculates days/hours/minutes remaining, 3 tiles (bg #0D1B24, rounded-lg, digit 40px Bold, label 12px 600 uppercase tracking-widest), shows "Coming soon" when > 0, hides when = 0 | src/components/homepage/countdown-timer.tsx
- [ ] T021 [US1] Create EventInfo: static display — "Thời gian: 26/12/2025", "Địa điểm: Âu Cơ Art Center", "Tường thuật trực tiếp qua sóng Livestream". All text from i18n keys | src/components/homepage/event-info.tsx
- [ ] T022 [US1] Create CTAButtons: 2 buttons side-by-side — "ABOUT AWARDS" (filled #FFEA9E, text #00101A) and "ABOUT KUDOS" (outline, border #FFEA9E, text #FFEA9E). Both have ArrowRightIcon. Both states swap on hover (normal=outline, hover=filled). next/link to /awards and /kudos | src/components/homepage/cta-buttons.tsx

### Content Sections (US1)

- [ ] T023 [US1] Create RootFurtherContent: dark section (bg #00070C, padding 120px 104px), "ROOT FURTHER" logo image + long paragraph text (14px/22px white), all text from i18n or hardcoded static content | src/components/homepage/root-further-content.tsx
- [ ] T024 [US1] Create AwardCard: image (square, rounded-lg, lazy load, golden border #998C5F), title (16px Bold white), description (13px Regular white, line-clamp-2), "Chi tiết" link (14px 600 white, ArrowRightIcon, hover: #FFEA9E). Click navigates to /awards#{slug} | src/components/homepage/award-card.tsx
- [ ] T025 [US1] Create AwardSection: section header ("Sun* annual awards 2025" caption 14px + "Hệ thống giải thưởng" title 36px Bold), award grid (CSS grid 3 cols desktop, 2 cols mobile/tablet, gap 24px), renders 6 AwardCard from awards data | src/components/homepage/award-section.tsx
- [ ] T026 [US1] Create KudosPromo: dark block (bg #0A1A24, rounded-xl, padding 40px), 2-column layout — left: "Phong trào ghi nhận" label + "Sun* Kudos" title 32px Bold + description + "Chi tiết" button (outline style with ArrowRightIcon), right: Kudos illustration image. Mobile: stack vertical | src/components/homepage/kudos-promo.tsx

### Page Assembly (US1)

- [ ] T027 [US1] Create Homepage page: Server Component, reads locale from cookie, gets dictionary, assembles all sections in order — HeroBanner (with CountdownTimer + EventInfo + CTAButtons inside) → RootFurtherContent → AwardSection → KudosPromo. Full-page scrollable layout | src/app/(main)/page.tsx

**Checkpoint**: US1 complete — Homepage renders all content sections, countdown works, award grid displays 6 cards

---

## Phase 4: User Story 2+3 — Navigation + Header Full (Priority: P1+P2)

**Goal**: Header full navigation (nav links, bell, avatar, profile dropdown with logout), Footer full (nav links), FAB widget, Login page updated

**Independent Test**: Click nav links → navigate. Click avatar → dropdown. Click Logout → redirect /login. FAB visible.

### Tests First (TDD)

- [ ] T028 [P] [US3] Write unit tests for ProfileDropdown: renders Profile + Logout items, click Profile navigates, click Logout calls signOut action, click-outside closes, Escape closes and returns focus to avatar button, ARIA attributes correct (role menu, menuitem) | src/components/common/__tests__/profile-dropdown.test.tsx

### Header Full (US2+US3)

- [ ] T029 [US2] Refactor Header to accept variant prop: variant="simple" (current Login behavior: logo + language only), variant="full" (logo + nav links + bell + language + avatar). Nav links: "About SAA 2025", "Awards Information", "Sun* Kudos" — states: normal (white), hover (#FFEA9E + bg rgba(255,234,158,0.1)), selected (#FFEA9E + underline 2px). Accept activeLink prop. Bell: BellIcon 40x40 with badge placeholder. Avatar: UserIcon 40x40 button | src/components/common/header.tsx
- [ ] T030 [US3] Create ProfileDropdown: Client Component "use client", container (bg #00070C, border 1px solid #998C5F, padding 6px, rounded-lg, fadeIn animation), Profile item (bg rgba(255,234,158,0.1), text "Profile" 16px Bold + UserIcon, text-shadow glow 0 0 6px #FAE287, click navigates to /profile), Logout item (text "Logout" 16px Bold + ChevronDownIcon rotated, click calls logout Server Action). Click-outside-to-close, Escape to close, ARIA role="menu" + role="menuitem" | src/components/common/profile-dropdown.tsx
- [ ] T031 [US2] Update Login page: pass variant="simple" to Header and Footer | src/app/login/page.tsx

### Footer Full (US2)

- [ ] T032 [US2] Refactor Footer to accept variant prop: variant="simple" (current Login: copyright only), variant="full" (logo left + nav links center: "About SAA 2025", "Awards Information", "Sun* Kudos", "Tiêu chuẩn chung" + copyright right). Height 74px, border-top #2E3940, Montserrat Alternates 16px 400 | src/components/common/footer.tsx

### Layout & Widget (US2)

- [ ] T033 [US2] Create main layout: Server Component wrapping Header variant="full" + children + Footer variant="full", pass locale and dictionary, activeLink derived from pathname | src/app/(main)/layout.tsx
- [ ] T034 [US2] Create WidgetButton: Client Component "use client", fixed bottom-right (bottom: 24px, right: 24px), pill shape 105x64px, bg #FFEA9E, rounded-full (32px), contains PencilIcon + "/" + SAA icon. Click: placeholder (log or noop for now). aria-label from i18n key | src/components/common/widget-button.tsx

**Checkpoint**: US2+US3 complete — Full header/footer navigation, profile dropdown with logout, FAB widget visible

---

## Phase 5: User Story 4 — Responsive + Accessibility (Priority: P2)

**Goal**: Homepage hiển thị đúng trên mobile/tablet/desktop, đạt WCAG AA, keyboard accessible

**Independent Test**: Mở 3 breakpoints → layout đúng. Tab qua phần tử → focus đúng. Screen reader mô tả đúng.

### Responsive (US4)

- [ ] T035 [P] [US4] Add responsive classes to HeroBanner: mobile title 48px, tablet 72px, desktop 96px. Padding mobile 16px, tablet 48px, desktop var(--spacing-page-x) | src/components/homepage/hero-banner.tsx
- [ ] T036 [P] [US4] Add responsive classes to CountdownTimer: mobile tile height 60px + digit 28px, tablet/desktop 72px + 40px | src/components/homepage/countdown-timer.tsx
- [ ] T037 [P] [US4] Add responsive classes to CTAButtons: mobile stack vertical + full width, desktop horizontal side-by-side | src/components/homepage/cta-buttons.tsx
- [ ] T038 [P] [US4] Add responsive classes to AwardSection: grid cols — mobile 2, tablet 2, desktop 3. Card gap responsive | src/components/homepage/award-section.tsx
- [ ] T039 [P] [US4] Add responsive classes to KudosPromo: mobile stack vertical (image below text), desktop flex row | src/components/homepage/kudos-promo.tsx
- [ ] T040 [P] [US4] Add responsive classes to Header variant="full": mobile hamburger menu (or simplified layout), tablet px-48, desktop px-var | src/components/common/header.tsx
- [ ] T041 [P] [US4] Add responsive classes to Footer variant="full": mobile stack vertical center, tablet/desktop flex row | src/components/common/footer.tsx

### Accessibility (US4)

- [ ] T042 [US4] Add ARIA attributes: Header role="navigation", active nav aria-current="page", bell aria-label, avatar aria-haspopup="menu" + aria-expanded, countdown aria-live="polite" + aria-label summary, award cards role="article", FAB aria-label | src/components/common/header.tsx, src/components/homepage/countdown-timer.tsx, src/components/homepage/award-card.tsx, src/components/common/widget-button.tsx
- [ ] T043 [US4] Add keyboard navigation: Tab order (header → hero CTA → award cards → kudos → footer), Escape closes dropdowns, focus management for profile dropdown open/close | src/app/(main)/page.tsx, src/components/common/profile-dropdown.tsx
- [ ] T044 [US4] Add screen reader support: aria-hidden on decorative images (hero bg, gradients), alt text on award images and logos, countdown accessible label | src/components/homepage/hero-banner.tsx, src/components/homepage/award-card.tsx

### Animations (US4)

- [ ] T045 [P] [US4] Add hover animations to AwardCard: translateY(-4px), box-shadow 0 8px 24px rgba(255,234,158,0.15), transition 200ms ease | src/components/homepage/award-card.tsx
- [ ] T046 [P] [US4] Add hover animations to CTAButtons: normal→outline swaps to filled on hover (bg #FFEA9E, text #00101A), transition 150ms | src/components/homepage/cta-buttons.tsx

**Checkpoint**: All user stories complete — responsive, accessible, animated

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build verification, performance, cleanup

- [ ] T047 Verify build: run yarn build, confirm no TypeScript errors, confirm all routes compile (/, /login, /auth/callback) | package.json
- [ ] T048 [P] Run ESLint: zero errors zero warnings | src/
- [ ] T049 [P] Verify i18n completeness: all 19+16=35 keys present in both vi.json and en.json | src/libs/i18n/locales/
- [ ] T050 Run all unit tests: vitest run, confirm all pass | vitest.config.ts
- [ ] T051 [P] Verify Login page still works correctly after Header/Footer refactor (variant="simple") | src/app/login/page.tsx
- [ ] T052 Performance: verify award images lazy load, hero bg priority load, check bundle size | src/app/(main)/page.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2
- **US2+3 (Phase 4)**: Depends on Phase 2 (can run parallel with US1 after foundation, but sequential recommended since Header refactor affects Login)
- **US4 (Phase 5)**: Depends on Phase 3+4 (needs components to exist)
- **Polish (Phase 6)**: Depends on all user stories

### Within Each User Story

- Tests MUST be written before implementation (TDD)
- Icon/leaf components before parent components
- Individual components before page assembly
- Story complete before next priority

### Parallel Opportunities

- **Phase 1**: T001 + T002 + T003 all parallel (independent downloads)
- **Phase 2**: T006 + T007 parallel (translation files). T011-T014 all parallel (icons). T016 parallel
- **Phase 3**: T017 + T018 parallel (tests). T019-T022 partially parallel (hero sub-components). T024 before T025 (card before grid)
- **Phase 4**: T028 parallel with T029. T035-T041 all parallel (responsive). T045 + T046 parallel (animations)
- **Phase 6**: T048 + T049 + T051 parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1 — all content sections)
3. **STOP and VALIDATE**: Verify homepage renders all sections
4. Deploy MVP if ready

### Incremental Delivery

1. Phase 1 + 2 → Foundation
2. Phase 3 (US1) → Content sections → Test → Deploy
3. Phase 4 (US2+3) → Full navigation + logout → Test → Deploy
4. Phase 5 (US4) → Responsive + A11y → Test → Deploy
5. Phase 6 → Polish → Final deploy

---

## Notes

- Commit after each task or logical group
- Run `yarn lint` before each commit
- Run `vitest` after each test + implementation pair
- CTA buttons link to /awards and /kudos which may 404 — acceptable for MVP
- Bell icon is UI-only (no notification panel implementation)
- FAB widget click is placeholder (noop/log for now)
- Award card descriptions use line-clamp-2 for consistent height
- Test Login page after Header/Footer refactor — critical regression risk
