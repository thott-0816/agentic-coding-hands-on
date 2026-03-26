# Implementation Plan: Login

**Frame**: `6381-login`
**Date**: 2026-03-24
**Spec**: `specs/6381-login/spec.md`

---

## Summary

Implement trang Login cho SAA 2025 — entry point duy nhất của ứng dụng. Người dùng đăng nhập bằng Google OAuth (chỉ domain `@sun-asterisk.com`) qua Supabase Auth. Trang hiển thị hero banner "ROOT FURTHER", nút Login, language selector (VN/EN), và footer bản quyền. Background là artwork toàn màn hình với gradient overlays.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: Supabase (PostgreSQL) — chỉ Auth, không custom tables cho Login
**Testing**: Vitest (unit) + Playwright (e2e)
**State Management**: React useState (local) + Cookie (locale, session)
**API Style**: Next.js Server Actions + Route Handlers

---

## Constitution Compliance Check

*GATE: PHẢI pass trước khi implementation*

- [x] **I. Clean Code**: TypeScript strict, PascalCase components, kebab-case files, `@/*` imports
- [x] **II. TDD**: Vitest cho unit tests, test trước implement
- [x] **III. Responsive**: Mobile-first, 3 breakpoints, Tailwind responsive prefixes
- [x] **IV. Security**: Supabase Auth SSR (cookie), domain validation server-side, no localStorage
- [x] **V. i18n**: Translation files vi.json/en.json, cookie-based locale, 13 keys
- [x] **VI. Simplicity**: Server Components mặc định, `"use client"` chỉ cho interactive parts, next/image, YAGNI

**Violations**: Không có

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — Login-specific components trong `src/components/login/`, shared components trong `src/components/common/`
- **Styling Strategy**: Tailwind CSS 4 utility classes trực tiếp. Design tokens map vào `@theme` directives trong globals.css (Tailwind 4 CSS-based config)
- **Data Fetching**: Server Components cho page (check session → redirect). Client Component cho LoginButton (cần onClick handler)
- **Font Loading**: `next/font/google` cho Montserrat + Montserrat Alternates — tối ưu cho edge runtime

### Backend Approach

- **OAuth Flow**:
  1. LoginButton (client) gọi `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '{SITE_URL}/auth/callback' } })` — redirect trực tiếp sang Google
  2. Google redirect về `/auth/callback?code=...`
  3. `/auth/callback/route.ts` exchange code → tạo session → validate domain → redirect
  - **KHÔNG cần `/api/auth/login` endpoint** (spec predicted nhưng Supabase SDK xử lý client-side redirect trực tiếp)
- **Domain Validation**: Trong `/auth/callback` route handler:
  1. Exchange authorization code lấy session: `supabase.auth.exchangeCodeForSession(code)`
  2. Check `session.user.email` endsWith `@sun-asterisk.com`
  3. **Nếu hợp lệ**: redirect đến `/` (Homepage)
  4. **Nếu không hợp lệ**: `supabase.auth.signOut()` + redirect đến `/login?error=unauthorized`
  5. **Nếu exchange lỗi**: redirect đến `/login?error=failed`
- **Error Flow (callback → login page)**:
  1. `/auth/callback` redirect về `/login?error={errorCode}`
  2. Login page (Server Component) đọc `searchParams.error`
  3. Truyền `error` prop xuống client component
  4. Client component hiển thị toast notification tương ứng, tự ẩn sau 5 giây
  5. Clear error param từ URL sau khi hiển thị (dùng `router.replace('/login')`)
- **Session Management**: Hoàn toàn bởi `@supabase/ssr` qua cookies. Next.js middleware refresh session mỗi request

### i18n Approach

- **Giải pháp tối giản** (YAGNI — không cần i18n library nặng cho 2 locale):
  - `src/libs/i18n/config.ts`: hàm `getTranslation(locale, key)` đọc JSON
  - `src/libs/i18n/locales/vi.json` + `en.json`: translation files
  - Cookie `lang` lưu locale preference, đọc server-side cho SSR
  - `useLocale()` hook cho client components
- **Không dùng** next-intl hay i18next — quá nặng cho nhu cầu hiện tại

### Integration Points

- **Existing**: Supabase clients đã có sẵn (`src/libs/supabase/{server,client,middleware}.ts`)
- **New**: Root middleware.ts (chưa có — cần tạo để refresh session + redirect logic)
- **Shared Components**: Header và Footer sẽ được tái sử dụng ở các trang khác

---

## Project Structure

### Documentation

```text
.momorph/specs/6381-login/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### New Files

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Root middleware — refresh Supabase session, auth redirect |
| `src/app/login/page.tsx` | Login page (Server Component — check session, render layout) |
| `src/components/login/login-button.tsx` | "LOGIN With Google" button (Client Component) |
| `src/components/login/hero-section.tsx` | Hero section với key visual, description, login button |
| `src/components/common/header.tsx` | Header với logo + language selector (reusable) |
| `src/components/common/language-selector.tsx` | Language dropdown (Client Component) |
| `src/components/common/footer.tsx` | Footer bản quyền (reusable) |
| `src/components/common/toast.tsx` | Toast notification component (Client Component) |
| `src/components/common/icons/google-icon.tsx` | Google SVG icon component |
| `src/components/common/icons/chevron-down-icon.tsx` | Chevron down SVG icon |
| `src/app/auth/callback/route.ts` | OAuth callback route handler |
| `src/libs/i18n/config.ts` | i18n configuration + getTranslation helper |
| `src/libs/i18n/locales/vi.json` | Vietnamese translations |
| `src/libs/i18n/locales/en.json` | English translations |
| `src/hooks/use-locale.ts` | Client-side locale hook |
| `src/types/i18n.ts` | i18n TypeScript types |
| `public/images/login-bg.webp` | Background artwork (from Figma) |
| `public/images/root-further.webp` | "ROOT FURTHER" key visual (from Figma) |
| `public/images/saa-logo.webp` | SAA 2025 logo (from Figma) |
| `public/images/flag-vn.svg` | Vietnam flag icon |
| `public/images/flag-uk.svg` | UK flag icon |
| `vitest.config.ts` | Vitest configuration (jsdom environment) |
| `src/components/login/__tests__/login-button.test.tsx` | Unit tests cho LoginButton |
| `src/components/common/__tests__/language-selector.test.tsx` | Unit tests cho LanguageSelector |
| `src/app/auth/callback/__tests__/route.test.ts` | Unit tests cho OAuth callback handler |
| `src/libs/i18n/__tests__/config.test.ts` | Unit tests cho i18n helper |
| `src/hooks/__tests__/use-locale.test.ts` | Unit tests cho useLocale hook |
| `tests/e2e/login.spec.ts` | E2E test cho login flow |
| `playwright.config.ts` | Playwright configuration |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Thay font Geist → Montserrat + Montserrat Alternates, cập nhật metadata, đọc locale từ cookie |
| `src/app/page.tsx` | Redirect đến `/login` (hoặc homepage nếu đã auth) |
| `src/app/globals.css` | Thêm design tokens CSS custom properties + Tailwind 4 `@theme` directives cho project colors/spacing (Tailwind 4 dùng CSS-based config, KHÔNG dùng tailwind.config.ts) |

### Dependencies

| Package | Version | Purpose | Type |
|---------|---------|---------|------|
| `vitest` | latest | Unit test framework | devDependencies |
| `@testing-library/react` | latest | Component testing utilities | devDependencies |
| `@testing-library/jest-dom` | latest | Custom matchers cho DOM assertions | devDependencies |
| `jsdom` | latest | DOM environment cho Vitest | devDependencies |
| `msw` | latest | Mock Service Worker — mock Supabase API trong tests | devDependencies |
| `@playwright/test` | latest | E2E testing framework | devDependencies |

> **Note**: Supabase SSR, Next.js, React, Tailwind đã có sẵn. i18n xử lý bằng code tự viết (YAGNI). Test dependencies cần thêm vì project chưa có test infrastructure.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download media files từ Figma: background artwork, ROOT FURTHER logo, SAA logo, Google icon
- Tạo flag SVG icons (VN, UK)
- Tối ưu ảnh: convert sang WebP, nén phù hợp
- Đặt vào `public/images/`

### Phase 1: Foundation (Blocking)

Thiết lập infrastructure chung mà tất cả user stories đều cần:

1. **Test infrastructure**: Install Vitest, Playwright, testing-library, msw. Tạo vitest.config.ts, playwright.config.ts
2. **Font setup**: Thêm Montserrat + Montserrat Alternates vào layout.tsx via `next/font/google`
3. **Design tokens**: CSS custom properties + Tailwind 4 `@theme` directives trong globals.css (colors, spacing, gradients)
4. **i18n infrastructure**: config.ts, vi.json, en.json, useLocale hook, types
5. **Auth middleware**: Root middleware.ts — refresh Supabase session, redirect authenticated users từ `/login` → `/`, redirect unauthenticated từ protected routes → `/login`
6. **OAuth callback**: `/auth/callback/route.ts` — exchange code, validate `@sun-asterisk.com` domain, redirect with error param if invalid

### Phase 2: Core Features — US1 (P1) — Đăng nhập Google

Vertical slice end-to-end:

1. **Login page**: Server Component render layout (middleware đã xử lý auth redirect ở Phase 1.5, page chỉ cần đọc `searchParams.error` và truyền xuống)
2. **LoginButton**: Client Component với loading state (disabled sau click đầu tiên), gọi Supabase `signInWithOAuth`
3. **Hero section**: Layout key visual + description + button
4. **Background**: Artwork + 2 gradient overlays (dùng exact gradient stops từ design-style)
5. **Toast**: Error notification component — đọc error từ props, tự ẩn sau 5s, role="alert"

### Phase 3: Extended Features — US2 (P2) — Ngôn ngữ

1. **Header**: Component chung với logo + language selector
2. **LanguageSelector**: Dropdown VN/EN, lưu cookie, re-render, click-outside-to-close
3. **Footer**: Copyright text với i18n
4. **Integration**: Kết nối tất cả text với translation keys

### Phase 4: Polish — US3 (P2) — Responsive + Accessibility

1. **Responsive**: Tailwind responsive classes cho 3 breakpoints
2. **Accessibility**: ARIA attributes, keyboard nav, focus management
3. **Animations**: Button hover, dropdown transitions
4. **Performance**: Lighthouse audit, image optimization verify

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase Google OAuth config sai domain | Trung bình | Cao | Test sớm với account thật, document setup steps |
| Edge runtime không support module nào đó | Thấp | Cao | Test build + deploy sớm trong Phase 1 |
| Background image quá nặng ảnh hưởng LCP | Trung bình | Trung bình | WebP format, priority loading, responsive sizes |
| Cookie-based i18n không hoạt động trên Cloudflare | Thấp | Trung bình | Test edge runtime sớm, fallback mechanism |

### Estimated Complexity

- **Frontend**: Trung bình (nhiều components nhưng logic đơn giản)
- **Backend**: Thấp (chỉ OAuth callback + middleware)
- **Testing**: Trung bình (cần mock Supabase Auth cho unit test)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LoginButton → Supabase Auth → callback → redirect
- [x] **External dependencies**: Supabase Auth (Google OAuth provider)
- [ ] **Data layer**: N/A (không custom database cho Login)
- [x] **User workflows**: Login flow end-to-end, language switching

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Click Login → loading state → redirect |
| Service ↔ Service | Yes | Supabase Auth → Google OAuth → callback |
| App ↔ External API | Yes | Google OAuth consent → callback → session |
| App ↔ Data Layer | No | - |
| Cross-platform | Yes | Mobile/Tablet/Desktop responsive |

### Test Environment

- **Environment type**: Local (Vitest) + Staging (Playwright)
- **Test data strategy**: Mocked Supabase responses cho unit, real Supabase cho integration
- **Isolation approach**: Fresh state per test, mock cookie store

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock (unit), Real (e2e) | Unit tests cần predictable, e2e cần real flow |
| Google OAuth | Mock (unit), Real (e2e) | Không thể automate Google consent trong unit |
| Cookie store | Mock | Isolate locale/session state per test |
| next/navigation | Mock | Test redirect behavior |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Click Login → redirect to Google OAuth
   - [x] Google callback with valid @sun-asterisk.com → create session → redirect to homepage
   - [x] Already logged in → auto redirect away from login page
   - [x] Switch language VN → EN → all text changes

2. **Error Handling**
   - [x] Google callback with non-@sun-asterisk.com → show error toast
   - [x] OAuth cancelled by user → show cancelled toast
   - [x] Network error during OAuth → show network error toast
   - [x] Supabase service down → show service unavailable toast

3. **Edge Cases**
   - [x] Double-click Login → only one request, button disabled
   - [x] Reload after language change → locale persisted
   - [x] Direct URL access to /auth/callback without code → redirect to login

### Tooling & Framework

- **Test framework**: Vitest (unit + component) + Playwright (e2e)
- **Supporting tools**: @testing-library/react, msw (mock service worker cho API)
- **CI integration**: `yarn test` trong CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| OAuth flow (login/callback) | 90%+ | Cao |
| i18n translation coverage | 100% | Cao |
| UI components render | 80%+ | Trung bình |
| Error scenarios | 85%+ | Cao |
| Responsive behavior | E2E only | Trung bình |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (status: Reviewed)
- [x] `design-style.md` complete
- [ ] Supabase project configured with Google OAuth provider
- [ ] Supabase Google OAuth redirect URL set to `{SITE_URL}/auth/callback`
- [ ] Environment variables ready: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- [ ] Figma media files exported (background, logos, icons)

### External Dependencies

- Supabase Auth (Google OAuth provider phải được enable trong Supabase dashboard)
- Google Cloud Console (OAuth 2.0 client ID phải được config cho project)
- Cloudflare Workers (deploy target)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Setup** Supabase Google OAuth trong dashboard (nếu chưa)
4. **Begin** implementation following task order

---

## Notes

- **Login page là root page**: `src/app/login/page.tsx`. Trang `/` (page.tsx) sẽ redirect đến `/login` hoặc homepage tùy auth state
- **Middleware xử lý auth redirect**: Tất cả protected routes redirect về `/login` nếu chưa auth. `/login` redirect về `/` nếu đã auth
- **i18n lightweight**: Không dùng library nặng. Đọc JSON trực tiếp — đủ cho 2 locales. Nếu tương lai cần thêm locales, refactor lúc đó (YAGNI)
- **Header/Footer reusable**: Thiết kế để dùng lại ở các trang khác. Header trên Login không có navigation menu (chỉ logo + language). Các trang khác sẽ extend thêm nav links
- **Background image cần priority**: Đây là LCP element, cần `priority` prop trên next/image
- **Edge runtime note**: Tất cả server code phải compatible với Cloudflare Workers. Tránh Node.js-only APIs (`fs`, `crypto` native, etc.)
- **Gradient stops chính xác**: Tailwind shorthand (`bg-gradient-to-r`) không hỗ trợ exact stops. Cần dùng CSS custom gradient trong globals.css hoặc Tailwind arbitrary values: `bg-[linear-gradient(90deg,#00101A_0%,#00101A_25.41%,transparent_100%)]` và `bg-[linear-gradient(0deg,#00101A_22.48%,transparent_51.74%)]`
- **`/api/auth/login` từ spec**: KHÔNG cần tạo endpoint này. Supabase `signInWithOAuth` gọi trực tiếp từ browser client — SDK tự redirect sang Google. Chỉ cần `/auth/callback` route handler
