# Tasks: Login

**Frame**: `6381-login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, prepare assets, configure test tooling

- [x] T001 Install test dependencies: vitest, @testing-library/react, @testing-library/jest-dom, jsdom, msw, @playwright/test | package.json
- [x] T002 [P] Create Vitest configuration with jsdom environment and path aliases | vitest.config.ts
- [x] T003 [P] Create Playwright configuration for e2e tests | playwright.config.ts
- [x] T004 Download and optimize Figma media assets (background artwork, ROOT FURTHER logo, SAA logo) to WebP format, create flag SVG icons (VN, UK) | public/images/

**Checkpoint**: Test tooling ready, assets prepared

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Fonts & Design Tokens

- [x] T005 Update root layout: replace Geist fonts with Montserrat + Montserrat Alternates via `next/font/google`, update metadata title to "SAA 2025", set html lang from cookie | src/app/layout.tsx
- [x] T006 Add design tokens as CSS custom properties + Tailwind 4 `@theme` directives: colors (#00101A, #0B0F12, #FFEA9E, #2E3940, #FFFFFF), spacing (144px, 96px, 80px, 24px, 16px), gradients (exact stops: 25.41%, 22.48%, 51.74%), border-radius (8px, 4px) | src/app/globals.css

### i18n Infrastructure

- [x] T007 Create i18n TypeScript types: Locale type (`"vi" | "en"`), TranslationKeys type, Dictionary type | src/types/i18n.ts
- [x] T008 [P] Create Vietnamese translation file with all 13 keys from spec (login.hero.*, login.button.*, login.error.*, common.header.*, common.footer.*) | src/libs/i18n/locales/vi.json
- [x] T009 [P] Create English translation file with all 13 keys from spec (matching vi.json structure exactly) | src/libs/i18n/locales/en.json
- [x] T010 Create i18n config: `getLocale(cookieStore)` to read `lang` cookie (default: `"vi"`), `getTranslation(locale, key)` to lookup translation, `getDictionary(locale)` to get full dictionary | src/libs/i18n/config.ts
- [x] T011 Write unit tests for i18n config: getLocale returns default when no cookie, getTranslation returns correct value for both locales, missing key returns key itself | src/libs/i18n/__tests__/config.test.ts
- [x] T012 Create useLocale client hook: read locale from cookie, provide `setLocale(locale)` that sets cookie + triggers page reload | src/hooks/use-locale.ts
- [x] T013 Write unit tests for useLocale hook: default locale is "vi", setLocale updates cookie, returns current locale | src/hooks/__tests__/use-locale.test.ts

### Auth Infrastructure

- [x] T014 Create root middleware: use existing `src/libs/supabase/middleware.ts` to refresh session, redirect authenticated users from `/login` → `/`, redirect unauthenticated from protected routes → `/login`. Matcher config excludes `/auth/callback`, static files | src/middleware.ts
- [x] T015 Create OAuth callback route handler: extract `code` from searchParams, call `supabase.auth.exchangeCodeForSession(code)`, validate email domain `@sun-asterisk.com`, if valid redirect to `/`, if invalid call `signOut()` and redirect to `/login?error=unauthorized`, if no code redirect to `/login?error=failed` | src/app/auth/callback/route.ts
- [x] T016 Write unit tests for OAuth callback: test valid domain → redirect to `/`, invalid domain → signOut + redirect with error, missing code → redirect with error, exchange failure → redirect with error | src/app/auth/callback/__tests__/route.test.ts

### Root Page

- [x] T017 Update root page.tsx: Server Component that checks auth session, if authenticated redirect to homepage, if not redirect to `/login` | src/app/page.tsx

**Checkpoint**: Foundation ready — fonts loaded, i18n working, auth middleware active, OAuth callback handling domain validation. User story implementation can now begin.

---

## Phase 3: User Story 1 — Đăng nhập bằng Google (Priority: P1) 🎯 MVP

**Goal**: Người dùng có thể đăng nhập bằng Google OAuth, chỉ chấp nhận email `@sun-asterisk.com`, hiển thị loading state và error toast

**Independent Test**: Mở `/login`, click "LOGIN With Google", hoàn thành OAuth flow với account `@sun-asterisk.com`, xác nhận redirect thành công đến homepage

### Tests First (TDD)

- [ ] T018 [P] [US1] Write unit tests for LoginButton: renders button text, click triggers signInWithOAuth, shows loading spinner when isLoading=true, disabled during loading, double-click prevention | src/components/login/__tests__/login-button.test.tsx

### Components (US1)

- [x] T019 [P] [US1] Create GoogleIcon SVG component: 24x24px, original Google colors, aria-hidden="true" | src/components/common/icons/google-icon.tsx
- [x] T020 [P] [US1] Create Toast notification component: Client Component with `"use client"`, accepts `message` + `type` props, auto-dismiss after 5s, dismiss button, role="alert" aria-live="assertive", semi-transparent dark bg, white text, warning icon left | src/components/common/toast.tsx
- [x] T021 [US1] Create LoginButton: Client Component with `"use client"`, calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })`, manages `isLoading` state (disabled + spinner after click), accepts `error` prop to show Toast, clears error URL param via `router.replace('/login')`. Styles: bg #FFEA9E, text 22px Bold #00101A, 305x60px, padding 16px 24px, gap 8px, rounded-lg, Google icon after text | src/components/login/login-button.tsx
- [x] T022 [US1] Create HeroSection component: displays ROOT FURTHER key visual (next/image, 451x200px, priority, alt="ROOT FURTHER - Sun Annual Awards 2025"), description text (20px Bold Italic white, 2 lines from i18n keys), and LoginButton. Flex column layout, gap 80px between visual and content, gap 24px between description and button, padding-left 16px on content | src/components/login/hero-section.tsx
- [x] T023 [US1] Create Login page: Server Component, reads `searchParams.error`, reads locale from cookie, gets translations, renders full-screen layout with background image (next/image, priority, object-cover, aria-hidden), 2 gradient overlays (left-to-right exact stops 25.41%, bottom-to-top exact stops 22.48%/51.74%), HeroSection with error prop, z-index layering per design-style.md | src/app/login/page.tsx

**Checkpoint**: US1 complete — Login page renders, button triggers OAuth, callback validates domain, error toast displays. Independently testable end-to-end.

---

## Phase 4: User Story 2 — Chuyển đổi ngôn ngữ (Priority: P2)

**Goal**: Người dùng chuyển đổi giữa tiếng Việt và tiếng Anh, lưu preference, tất cả text trên trang thay đổi tương ứng

**Independent Test**: Click language selector "VN", chọn "EN" từ dropdown, xác nhận tất cả text chuyển sang tiếng Anh, icon cờ chuyển thành UK flag. Reload trang, xác nhận EN vẫn giữ.

### Tests First (TDD)

- [ ] T024 [P] [US2] Write unit tests for LanguageSelector: renders current locale flag + label, click opens dropdown, selecting option calls setLocale, Escape closes dropdown, click-outside closes dropdown, arrow keys navigate options, ARIA attributes correct (aria-haspopup, aria-expanded, role listbox/option) | src/components/common/__tests__/language-selector.test.tsx

### Components (US2)

- [x] T025 [P] [US2] Create ChevronDownIcon SVG component: 24x24px, white (#FFFFFF), rotate 180deg when `open` prop is true, transition 150ms ease-out | src/components/common/icons/chevron-down-icon.tsx
- [x] T026 [US2] Create LanguageSelector: Client Component with `"use client"`, manages `isOpen` state, renders current flag (VN/UK) + label (VN/EN) + ChevronDownIcon, dropdown with 2 options, click-outside-to-close (useEffect with document listener), keyboard nav (Escape, Arrow Up/Down), saves locale to cookie via useLocale hook, triggers page reload. Styles: 108x56px, padding 16px, gap 4px, rounded, hover bg rgba(255,255,255,0.1), focus outline 2px rgba(255,255,255,0.5) | src/components/common/language-selector.tsx
- [x] T027 [US2] Create Header component: Server Component wrapper with Client LanguageSelector child, fixed top-0, w-full, h-80px, z-50, bg rgba(11,15,18,0.8), padding 12px 144px, flex justify-between items-center. Logo: next/image saa-logo.webp 52x56px alt="Sun Annual Awards 2025". Pass locale prop to LanguageSelector | src/components/common/header.tsx
- [x] T028 [US2] Create Footer component: centered copyright text from i18n key `common.footer.copyright`, font Montserrat Alternates 16px Bold white, border-top 1px solid #2E3940, padding 40px 90px | src/components/common/footer.tsx
- [x] T029 [US2] Integrate Header and Footer into Login page: add Header (z-50 above gradients) and Footer (absolute bottom-0 z-10) to login/page.tsx, pass locale and translations to all components | src/app/login/page.tsx
- [x] T030 [US2] Connect all hardcoded text to i18n translation keys: hero description lines, login button text, footer copyright, language labels, aria-labels. Verify both vi.json and en.json have all keys | src/app/login/page.tsx, src/components/login/hero-section.tsx

**Checkpoint**: US1 + US2 complete — Full login page with language switching, all text externalized to i18n

---

## Phase 5: User Story 3 — Responsive + Accessibility (Priority: P2)

**Goal**: Trang Login hiển thị đúng trên mobile/tablet/desktop, đạt WCAG AA, keyboard accessible

**Independent Test**: Mở trang trên mobile (< 768px), tablet (768-1024px), desktop (> 1024px) — layout đúng. Tab qua các phần tử, Enter/Space kích hoạt, Escape đóng dropdown.

### Responsive (US3)

- [x] T031 [P] [US3] Add responsive classes to Header: mobile padding 12px 16px h-64px, tablet padding 12px 48px, desktop padding 12px 144px h-80px. Logo: mobile 40x44px, desktop 52x56px | src/components/common/header.tsx
- [x] T032 [P] [US3] Add responsive classes to HeroSection: mobile padding 48px 16px gap-40px, key visual max-w-280px, description 16px/28px, button w-full h-56px text-18px. Tablet padding 72px 48px gap-60px, key visual 360px, description 18px/36px. Desktop per Figma 1440px | src/components/login/hero-section.tsx, src/components/login/login-button.tsx
- [x] T033 [P] [US3] Add responsive classes to Footer: mobile padding 24px 16px text-14px, tablet padding 32px 48px, desktop padding 40px 90px | src/components/common/footer.tsx
- [x] T034 [US3] Add responsive classes to Login page background and gradient overlays: ensure full coverage on all breakpoints, max-width 1440px center on large screens | src/app/login/page.tsx

### Accessibility (US3)

- [x] T035 [P] [US3] Add ARIA attributes to LoginButton: aria-label from i18n key, aria-busy + aria-disabled when loading | src/components/login/login-button.tsx
- [x] T036 [P] [US3] Add ARIA attributes to LanguageSelector: aria-haspopup="listbox", aria-expanded, aria-label from i18n key, dropdown role="listbox", options role="option" + aria-selected | src/components/common/language-selector.tsx
- [x] T037 [US3] Add keyboard navigation and focus management: Tab order (language → login), Enter/Space activates, Escape closes dropdown, Arrow keys in dropdown, auto-focus login button on page load, focus return after dropdown close and after error | src/app/login/page.tsx, src/components/common/language-selector.tsx
- [x] T038 [US3] Add screen reader support: aria-hidden on background image and gradients, alt text on key visual and logo, aria-hidden on Google icon | src/app/login/page.tsx, src/components/login/hero-section.tsx

### Animations (US3)

- [x] T039 [P] [US3] Add hover/focus transitions to LoginButton: hover bg #FFE07A translateY(-2px) shadow, active bg #FFD54F translateY(0), focus outline 2px solid #FFEA9E offset 3px, transition 150ms ease-in-out | src/components/login/login-button.tsx
- [x] T040 [P] [US3] Add dropdown animation to LanguageSelector: fade-in/out opacity + translateY, 150ms ease-out | src/components/common/language-selector.tsx

**Checkpoint**: All user stories complete — responsive, accessible, animated

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Performance verification, E2E test, final cleanup

- [ ] T041 Run Lighthouse audit on login page: verify Performance ≥ 90, check LCP (background image priority), check CLS | src/app/login/page.tsx
- [x] T042 [P] Verify edge runtime compatibility: run `yarn build` + `yarn preview` via opennextjs-cloudflare, confirm no Node.js-only API errors | package.json
- [x] T043 [P] Verify i18n completeness: ensure all 13 keys present in both vi.json and en.json, no missing translations | src/libs/i18n/locales/
- [ ] T044 Write E2E test for full login flow: navigate to /login, verify page renders, click Login button, mock or test OAuth redirect, verify callback handles domain validation, verify language switching persists | tests/e2e/login.spec.ts
- [x] T045 Code cleanup: remove unused imports, verify ESLint zero errors, verify TypeScript strict compliance, check all `@/*` path aliases | src/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 2 completion (can run parallel with US1 if needed, but sequential recommended)
- **US3 (Phase 5)**: Depends on Phase 3 + 4 completion (needs components to exist before adding responsive/a11y)
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD — Constitution Principle II)
- Icon components before parent components
- Leaf components (Button, Toast) before composite components (HeroSection)
- Components before page integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002 + T003 can run in parallel (after T001)
- **Phase 2**: T008 + T009 in parallel (translation files). T007 independent
- **Phase 3**: T018 + T019 + T020 in parallel (test + icons + toast). T021 after T019
- **Phase 4**: T024 + T025 in parallel (test + chevron icon)
- **Phase 5**: T031 + T032 + T033 in parallel (responsive). T035 + T036 in parallel (ARIA). T039 + T040 in parallel (animations)
- **Phase 6**: T042 + T043 in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1 — Login with Google only)
3. **STOP and VALIDATE**: Test login flow end-to-end with real Supabase
4. Deploy MVP if ready

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 (US1) → Login works → Test → Deploy
3. Phase 4 (US2) → Language switching → Test → Deploy
4. Phase 5 (US3) → Responsive + A11y → Test → Deploy
5. Phase 6 → Polish → Final deploy

---

## Notes

- Commit after each task or logical group
- Run `yarn lint` before each commit
- Run `vitest` after each test + implementation pair
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- TDD flow: T018 (write test) → T019-T023 (implement) → verify tests pass
- All Figma media assets need to be downloaded BEFORE Phase 3 (T004 blocks T022, T023)
