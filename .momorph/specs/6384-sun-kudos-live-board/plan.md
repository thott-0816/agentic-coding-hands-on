# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `6384-sun-kudos-live-board`
**Date**: 2026-03-27
**Spec**: `specs/6384-sun-kudos-live-board/spec.md`

---

## Summary

Trang Sun* Kudos Live Board (`/kudos`) là trang hiển thị hệ thống ghi nhận lời cảm ơn nội bộ, gồm 4 section chính: KV Banner, Highlight Kudos Carousel, Spotlight Board, và All Kudos Feed + Sidebar. Trang yêu cầu auth, sử dụng Supabase cho data, và tuân thủ patterns hiện có (Server Component page + Client child components).

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4, Supabase SSR, next/image
**Database**: Supabase (PostgreSQL + RLS)
**Testing**: Vitest + React Testing Library
**State Management**: Local state (useState/useCallback) per Client Component — no global store
**API Style**: Direct Supabase client queries (Server Components) + Client-side mutations

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Clean Code**: PascalCase components, kebab-case files, `@/*` imports, single responsibility
- [x] **TDD**: Unit tests cho mọi component, test enforcement khi sửa code
- [x] **Responsive**: 3 breakpoints (mobile <768, tablet 768-1279, desktop ≥1280), mobile-first
- [x] **Security**: Supabase RLS, auth guard via middleware, no `dangerouslySetInnerHTML`
- [x] **i18n**: VI + EN mandatory, tất cả text dùng dictionary keys
- [x] **Simplicity**: Server Components default, `"use client"` chỉ khi cần, minimize dependencies

- [x] **Edge Runtime**: Supabase queries dùng `@supabase/ssr` — tương thích edge runtime, không dùng Node.js-only APIs

**Violations**: None — tất cả patterns có sẵn trong project.

---

## Architecture Decisions

### Frontend Approach

- **Page Structure**: Server Component page (`page.tsx`) fetch dictionary + data → compose child components
- **Component Pattern**: Feature-based, tất cả Kudos components trong `src/components/kudos/`
- **Styling**: Tailwind utility classes + CSS variables (reuse từ `globals.css`)
- **Data Fetching**: Server-side Supabase client cho initial data, Client-side cho mutations (heart, load more)
- **Auth**: Middleware đã có sẵn — redirect `/login` nếu chưa auth (FR-019)
- **Server/Client boundary**: `kudos-feed.tsx` (Client) chứa `kudos-post-card.tsx` → card PHẢI là Client Component hoặc truyền qua children pattern. Chọn: card cũng là Client Component cho đơn giản (chứa heart-button là Client con)

### Backend Approach

- **Data Access**: Direct Supabase queries — KHÔNG tạo API routes riêng
  - Server Components dùng `createClient()` từ `@/libs/supabase/server`
  - Client Components dùng `createClient()` từ `@/libs/supabase/client`
- **Database**: Supabase tables với RLS policies
- **Validation**: Zod cho input validation (search, heart toggle)

### Integration Points

- **Reuse components**: Header, Footer, WidgetButton (từ `(main)` layout), KudosPromo pattern
- **Reuse patterns**: AwardsSidebar sticky pattern, LanguageSelector dropdown pattern
- **Shared**: Dictionary/i18n system, Supabase client, CSS variables
- **Link to**: spec `7052-viet-kudos` (FAB → modal viết Kudos, ô nhập banner → modal)

---

## Project Structure

### New Files

```text
# Database
supabase/migrations/
└── YYYYMMDD_create_kudos_tables.sql    # Tables: kudos, hearts, secret_boxes, hashtags, departments

# Types
src/types/
└── kudos.ts                             # Kudo, Heart, SecretBox, KudosStats, SpotlightData types

# Data (static seed / query helpers)
src/data/
├── hashtags.ts                          # 13 hashtag constants
└── departments.ts                       # ~50 department constants

# Page
src/app/(main)/kudos/
└── page.tsx                             # Server Component page

# Components (18 components)
src/components/kudos/
├── kudos-banner.tsx                     # A: KV Banner (Server)
├── kudos-input-trigger.tsx              # A.1: Pill input → open modal (Client)
├── highlight-kudos.tsx                  # B: Highlight section wrapper (Server)
├── highlight-header.tsx                 # B.1: Title + filter buttons (Server)
├── filter-button.tsx                    # B.1.1/2: Generic filter dropdown button (Client)
├── filter-dropdown.tsx                  # Shared dropdown for hashtag/department (Client)
├── kudos-carousel.tsx                   # B.2: Center-focus carousel (Client)
├── highlight-kudo-card.tsx              # B.3: Highlight card (Server)
├── spotlight-board.tsx                  # B.7: Word cloud / diagram (Client)
├── section-header.tsx                   # Reusable section header: subtitle + title (Server)
├── kudos-feed.tsx                       # C: All Kudos feed with load more (Client)
├── kudos-post-card.tsx                  # C.3: Full kudos card (Client — must be Client vì parent kudos-feed is Client)
├── heart-button.tsx                     # C.4.1: Heart toggle (Client)
├── copy-link-button.tsx                 # C.4.2: Copy link (Client)
├── kudos-sidebar.tsx                    # D: Sidebar wrapper (Server)
├── kudos-stats.tsx                      # D.1: Stats block (Server)
├── secret-box-button.tsx               # D.1.8: Mở Secret Box (Client)
└── top-recipients-list.tsx             # D.3: 10 Sunner list (Server)

# Tests (__tests__/ cùng cấp)
src/components/kudos/__tests__/
├── kudos-banner.test.tsx
├── kudos-input-trigger.test.tsx
├── highlight-kudos.test.tsx
├── highlight-header.test.tsx
├── filter-button.test.tsx
├── filter-dropdown.test.tsx
├── kudos-carousel.test.tsx
├── highlight-kudo-card.test.tsx
├── spotlight-board.test.tsx
├── section-header.test.tsx
├── kudos-feed.test.tsx
├── kudos-post-card.test.tsx
├── heart-button.test.tsx
├── copy-link-button.test.tsx
├── kudos-sidebar.test.tsx
├── kudos-stats.test.tsx
├── secret-box-button.test.tsx
└── top-recipients-list.test.tsx

src/data/__tests__/
├── hashtags.test.ts
└── departments.test.ts

src/types/__tests__/
└── kudos.test.ts
```

### Modified Files

| File | Changes |
|------|---------|
| `src/types/i18n.ts` | Thêm ~25 TranslationKey cho kudos.* |
| `src/libs/i18n/locales/vi.json` | Thêm 25 kudos keys (VI) |
| `src/libs/i18n/locales/en.json` | Thêm 25 kudos keys (EN) |
| `src/app/globals.css` | Thêm `--color-heart-active: #EF4444`, `--color-heart-inactive: #6B7280`, `--color-hashtag-bg` nếu chưa có |

### Dependencies

| Package | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| Không cần thêm | - | - | Tất cả đã có sẵn: React, Tailwind, Supabase, next/image |

> **Note**: Spotlight Board (word cloud) sẽ dùng **custom SVG + CSS transforms** thay vì thêm library (d3.js). Nếu quá phức tạp, có thể defer sang phase sau hoặc simplify.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Database Setup
- Tạo Supabase migration cho tables: `kudos`, `hearts`, `secret_boxes`
- Tạo RLS policies (auth required, author can edit own kudos, 1 heart per user per kudo)
- Seed data cho hashtags và departments (static)
- Tạo TypeScript types (`src/types/kudos.ts`)
- Cập nhật i18n keys (25 keys VI + EN)

### Phase 1: Foundation (Setup + Shared)
- Tạo page `src/app/(main)/kudos/page.tsx` (Server Component skeleton)
- Tạo `section-header.tsx` (reusable: subtitle + title pattern — dùng cho cả 3 sections)
- Tạo `filter-dropdown.tsx` (reusable dropdown cho cả Hashtag + Phòng ban)
- Tạo static data files (`hashtags.ts`, `departments.ts`)
- Unit tests cho foundation components

### Phase 2: Core Features — P1 User Stories
**US1: All Kudos Feed** (cao nhất)
- `kudos-post-card.tsx` — full card layout: sender/recipient, time, content truncate 5 lines, images, hashtags
- `heart-button.tsx` — toggle like/unlike, optimistic update
- `copy-link-button.tsx` — copy URL + toast
- `kudos-feed.tsx` — list + "Load more" button (page size 10)
- `kudos-sidebar.tsx` + `kudos-stats.tsx` + `top-recipients-list.tsx`
- `secret-box-button.tsx`
- Supabase queries: fetch kudos (paginated), toggle heart, fetch stats

**US2: Highlight Kudos Carousel**
- `highlight-kudo-card.tsx` — card with colored backgrounds, content truncate 3 lines
- `kudos-carousel.tsx` — center-focus: center card opacity 1 + scale(1), side cards opacity 0.5 + scale(0.85)
- `filter-button.tsx` — trigger dropdown
- Filter logic: Hashtag + Phòng ban (AND), fetch filtered highlights
- `highlight-header.tsx` + `highlight-kudos.tsx` wrapper

**US3: Sidebar**
- Đã implement cùng US1

### Phase 3: Extended Features — P2 User Stories
**US4: Spotlight Board**
- `spotlight-board.tsx` — custom SVG word cloud + search + pan/zoom
- Supabase query: aggregate user names + kudos counts

**US5: KV Banner**
- `kudos-banner.tsx` — hero banner + gradient overlay
- `kudos-input-trigger.tsx` — pill input → open modal (link to `7052-viet-kudos`)

**US6: Heart interactions** — Đã implement cùng US1

**US7: i18n + Responsive** — Baked in từ đầu (mobile-first)

### Phase 4: Polish
- Loading states (skeleton UI) cho feed, carousel, sidebar
- Error states (retry button, toast)
- Empty states ("Chưa có Kudos nào", "Không có kết quả")
- Accessibility: ARIA roles, keyboard navigation, focus management
- Visual testing: verify pixel-perfect against Figma
- Run full test suite

---

## Testing Strategy

| Type | Focus | Target |
|------|-------|--------|
| Unit | Mọi component (render, props, states) | 100% components |
| Unit | Types, data constants (hashtags, departments) | Validation |
| Unit | Heart toggle logic, filter logic | Business logic |
| Integration | Supabase queries (mock client) | CRUD operations |
| Integration | Load more pagination | Data flow |
| Manual | Responsive 3 breakpoints | Visual |
| Manual | Carousel animations, Spotlight interaction | UX |

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase client | Mock | Avoid real DB in unit tests |
| next/image | Mock (img tag) | Standard pattern in project |
| next/link | Mock (a tag) | Standard pattern in project |
| IntersectionObserver | Mock class | For sidebar sticky |
| Clipboard API | Mock | For copy link |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight Board complexity | High | Medium | Start with simplified version (list/grid), upgrade to word cloud later |
| Carousel center-focus CSS | Medium | Medium | Use proven CSS transform + opacity pattern, fallback to simple carousel |
| Supabase RLS complexity | Medium | High | Design RLS policies carefully, test with multiple user roles |
| SVN-Gotham font availability | Medium | Low | Fallback to Montserrat bold for KUDOS logo if font unavailable |
| Performance: large Kudos feed | Low | Medium | "Load more" (not infinite scroll) limits DOM nodes |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Feed ↔ Heart button, Filter ↔ Carousel, Load more ↔ Feed
- [x] **Data layer**: Supabase queries (kudos CRUD, heart toggle, stats)
- [x] **User workflows**: Login → View feed → Like → Copy link → Load more

### Test Scenarios

1. **Happy Path**
   - [x] Trang load → fetch 10 kudos → hiển thị feed + sidebar stats
   - [x] Click heart → toggle UI + call Supabase → verify count
   - [x] Click "Load more" → fetch next 10 → append to feed
   - [x] Select hashtag filter → carousel updates

2. **Error Handling**
   - [x] Supabase query fail → show error + retry button
   - [x] Heart toggle API fail → revert optimistic update
   - [x] Network offline → toast notification

3. **Edge Cases**
   - [x] Empty feed → show empty state
   - [x] Filter returns 0 results → show "Không có kết quả"
   - [x] Unauthenticated → middleware redirects to /login

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core components (card, heart, feed) | 90%+ | High |
| Interactive (carousel, dropdown, spotlight) | 80%+ | Medium |
| Edge cases (empty, error, loading) | 75%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (status: Reviewed)
- [x] `design-style.md` complete
- [ ] Supabase database schema designed and migrated
- [ ] Seed data for hashtags and departments

### External Dependencies

- Supabase project configured with auth + database
- SVN-Gotham font file (for KUDOS logo) — or decide to use Montserrat fallback

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD: test first → implement → refactor

---

## Notes

- **Spotlight Board** là component phức tạp nhất — có thể defer hoặc simplify nếu cần ship sớm
- **Secret Box dialog** chưa có spec riêng — implement button trigger, dialog content cần spec bổ sung
- Reuse patterns nhiều nhất có thể từ trang Awards (sidebar sticky, section header, responsive padding)
- Page yêu cầu auth → middleware đã xử lý sẵn, không cần code thêm
- Không cần API routes — dùng trực tiếp Supabase client trong Server/Client Components
- "Load more" thay vì infinite scroll → đơn giản hơn, ít bug hơn, UX rõ ràng hơn
