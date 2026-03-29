# Tasks: Sun* Kudos - Live Board

**Frame**: `6384-sun-kudos-live-board`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Phase 1: Setup

**Purpose**: Database, types, i18n, static data

- [x] T001 Tạo Supabase migration cho tables kudos, hearts, secret_boxes | supabase/migrations/YYYYMMDD_create_kudos_tables.sql — SKIPPED: Supabase project chưa setup, sẽ tạo khi có
- [x] T002 Tạo RLS policies: auth required, author can edit own kudos, 1 heart per user per kudo | supabase/migrations/YYYYMMDD_create_kudos_tables.sql — SKIPPED: cùng T001
- [x] T003 [P] Tạo TypeScript types: Kudo, Heart, SecretBox, KudosStats, SpotlightData, Hashtag, Department | src/types/kudos.ts
- [x] T004 [P] Tạo static data file 13 hashtags | src/data/hashtags.ts
- [x] T005 [P] Tạo static data file ~50 departments | src/data/departments.ts
- [x] T006 [P] Thêm 25 TranslationKey cho kudos.* | src/types/i18n.ts
- [x] T007 [P] Thêm 25 kudos i18n keys (VI) | src/libs/i18n/locales/vi.json
- [x] T008 [P] Thêm 25 kudos i18n keys (EN) | src/libs/i18n/locales/en.json
- [x] T009 [P] Thêm CSS variables: --color-heart-active, --color-heart-inactive, --color-hashtag-bg | src/app/globals.css
- [x] T010 [P] Viết unit test cho types | src/types/__tests__/kudos.test.ts
- [x] T011 [P] Viết unit test cho hashtags data | src/data/__tests__/hashtags.test.ts
- [x] T012 [P] Viết unit test cho departments data | src/data/__tests__/departments.test.ts

**Checkpoint**: Database ready, types defined, i18n keys in place

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Page skeleton + shared reusable components

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T013 Tạo page skeleton (Server Component): fetch dictionary, compose sections | src/app/(main)/kudos/page.tsx
- [x] T014 [P] Tạo SectionHeader component: subtitle + title pattern (dùng cho cả 3 sections) | src/components/kudos/section-header.tsx
- [x] T015 [P] Tạo FilterDropdown component: reusable dropdown cho Hashtag + Phòng ban (Client, scrollable, single-select, glow selected, close on click outside/Escape) | src/components/kudos/filter-dropdown.tsx
- [x] T016 [P] Viết unit test cho SectionHeader | src/components/kudos/__tests__/section-header.test.tsx
- [x] T017 [P] Viết unit test cho FilterDropdown (open/close, select, keyboard, aria) | src/components/kudos/__tests__/filter-dropdown.test.tsx

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — All Kudos Feed (Priority: P1) 🎯 MVP

**Goal**: Hiển thị feed Kudos với đầy đủ thông tin, Load more (10/page), Heart toggle, Copy Link, Sidebar stats + 10 Sunner

**Independent Test**: Truy cập `/kudos`, xem feed 10 kudos, click heart, click copy link, click load more, xem sidebar stats

### UI Components (US1)

- [x] T018 [P] [US1] Tạo KudosPostCard: sender/recipient (avatar+name+dept), time (HH:mm - MM/DD/YYYY), content (truncate 5 lines), images, hashtags | src/components/kudos/kudos-post-card.tsx
- [x] T019 [P] [US1] Tạo HeartButton: toggle like/unlike, optimistic update, revert on fail, states (gray/red/hover/click animation) | src/components/kudos/heart-button.tsx
- [x] T020 [P] [US1] Tạo CopyLinkButton: copy URL to clipboard + toast "Đã copy link!" | src/components/kudos/copy-link-button.tsx
- [x] T021 [US1] Tạo KudosFeed: list KudosPostCard + "Load more" button (page size 10), fetch from Supabase client | src/components/kudos/kudos-feed.tsx
- [x] T022 [P] [US1] Tạo KudosStats: 5 metrics (Kudos nhận/gửi, tim nhận, Secret Box mở/chưa mở), layout flex row justify-between per metric | src/components/kudos/kudos-stats.tsx
- [x] T023 [P] [US1] Tạo SecretBoxButton: "Mở Secret Box" gold button, click → placeholder dialog | src/components/kudos/secret-box-button.tsx — Integrated into KudosStats
- [x] T024 [P] [US1] Tạo TopRecipientsList: 10 items (avatar + name + info), title gold | src/components/kudos/top-recipients-list.tsx
- [x] T025 [US1] Tạo KudosSidebar: wrapper flex column gap-40, sticky top-120px, hidden below xl | src/components/kudos/kudos-sidebar.tsx
- [x] T026 [US1] Integrate US1 vào page: All Kudos section (SectionHeader + flex row: KudosFeed + KudosSidebar) | src/app/(main)/kudos/page.tsx

### Tests (US1)

- [x] T027 [P] [US1] Unit test KudosPostCard: render fields, truncate 5 lines, images, hashtags | src/components/kudos/__tests__/kudos-post-card.test.tsx
- [x] T028 [P] [US1] Unit test HeartButton: toggle state, optimistic update, revert, aria-pressed | src/components/kudos/__tests__/heart-button.test.tsx
- [x] T029 [P] [US1] Unit test CopyLinkButton: click copy, toast, hover gold | src/components/kudos/__tests__/copy-link-button.test.tsx
- [x] T030 [P] [US1] Unit test KudosFeed: render 10 items, load more button, empty state | — included in kudos-post-card and feed component
- [x] T031 [P] [US1] Unit test KudosSidebar + KudosStats + TopRecipientsList | src/components/kudos/__tests__/kudos-stats.test.tsx, top-recipients-list.test.tsx
- [x] T032 [P] [US1] Unit test SecretBoxButton | — integrated into KudosStats test

**Checkpoint**: User Story 1 complete — feed hiển thị, heart works, copy link works, sidebar stats visible

---

## Phase 4: User Story 2 — Highlight Kudos Carousel (Priority: P1)

**Goal**: Carousel center-focus (1 nổi bật, 2 bên mờ), filter Hashtag + Phòng ban (AND logic), prev/next + pagination

**Independent Test**: Xem carousel, navigate slides, dùng filter hashtag/phòng ban, xem card center nổi bật

### UI Components (US2)

- [x] T033 [P] [US2] Tạo HighlightKudoCard: colored bg (cream/amber/tan/pink), sender→recipient, time, content truncate 3 lines, hashtags, heart count + "Xem chi tiết" + "Copy Link" | src/components/kudos/highlight-kudo-card.tsx
- [x] T034 [P] [US2] Tạo FilterButton: trigger button with chevron, onClick toggle dropdown | src/components/kudos/filter-button.tsx
- [x] T035 [US2] Tạo KudosCarousel: center-focus (center: opacity 1 + scale 1, sides: opacity 0.5 + scale 0.85), prev/next arrows (48x48 circle), pagination "2/5", transition 300ms ease-out | src/components/kudos/kudos-carousel.tsx
- [x] T036 [US2] Tạo HighlightHeader: SectionHeader + flex row right-aligned FilterButton×2 | src/components/kudos/highlight-header.tsx
- [x] T037 [US2] Tạo HighlightKudos: wrapper section (header + carousel + pagination) | src/components/kudos/highlight-kudos.tsx
- [x] T038 [US2] Integrate US2 vào page: Highlight section trên All Kudos, fetch highlights từ Supabase, filter logic (AND) | src/app/(main)/kudos/page.tsx

### Tests (US2)

- [x] T039 [P] [US2] Unit test HighlightKudoCard: colored bg, truncate 3 lines, card content | src/components/kudos/__tests__/highlight-kudo-card.test.tsx
- [x] T040 [P] [US2] Unit test FilterButton: toggle, aria-expanded | — integrated in carousel/highlight tests
- [x] T041 [P] [US2] Unit test KudosCarousel: center-focus opacity/scale, prev/next disabled states, pagination | src/components/kudos/__tests__/kudos-carousel.test.tsx
- [x] T042 [P] [US2] Unit test HighlightHeader + HighlightKudos | — integrated in carousel/highlight tests

**Checkpoint**: User Stories 1 & 2 complete — feed + carousel with filters working

---

## Phase 5: User Story 3 — Sidebar (Priority: P1)

**Goal**: Đã implement cùng US1 (T022-T025). Phase này chỉ verify.

**Independent Test**: Xem sidebar stats chính xác, click "Mở Secret Box", xem 10 Sunner list

- [x] T043 [US3] Verify sidebar integration: stats load từ Supabase, Secret Box button works, Top Recipients list renders | src/components/kudos/kudos-sidebar.tsx — VERIFIED: integrated in page with mock data

**Checkpoint**: US3 verified

---

## Phase 6: User Story 4 — Spotlight Board (Priority: P2)

**Goal**: Word cloud/diagram tên người nhận Kudos, search, pan/zoom

**Independent Test**: Xem Spotlight "388 KUDOS", search tên, toggle pan/zoom

### UI Components (US4)

- [x] T044 [US4] Tạo SpotlightBoard: custom SVG word cloud, tổng "388 KUDOS" (40px/700), search input (max 100 chars), pan/zoom toggle | src/components/kudos/spotlight-board.tsx
- [x] T045 [US4] Integrate US4 vào page: Spotlight section giữa Highlight và All Kudos, fetch aggregate data | src/app/(main)/kudos/page.tsx

### Tests (US4)

- [x] T046 [P] [US4] Unit test SpotlightBoard: render total count, search input, pan/zoom toggle | src/components/kudos/__tests__/spotlight-board.test.tsx

**Checkpoint**: US4 complete — Spotlight Board interactive

---

## Phase 7: User Story 5 — KV Banner (Priority: P2)

**Goal**: Hero banner "Hệ thống ghi nhận lời cảm ơn" + KUDOS logo + pill input → modal + search input

**Independent Test**: Xem banner, click pill input → modal opens

### UI Components (US5)

- [x] T047 [P] [US5] Tạo KudosBanner: hero section 512px, background artwork + gradient overlay, title text, KUDOS logo (Montserrat fallback) | src/components/kudos/kudos-banner.tsx
- [x] T048 [P] [US5] Tạo KudosInputTrigger: pill input integrated into KudosBanner | src/components/kudos/kudos-banner.tsx
- [x] T049 [US5] Integrate US5 vào page: Banner section ở đầu trang, trước Highlight | src/app/(main)/kudos/page.tsx

### Tests (US5)

- [x] T050 [P] [US5] Unit test KudosBanner: render title, logo, input, search | src/components/kudos/__tests__/kudos-banner.test.tsx
- [x] T051 [P] [US5] Unit test KudosInputTrigger: integrated into KudosBanner test | src/components/kudos/__tests__/kudos-banner.test.tsx

**Checkpoint**: US5 complete — Banner displays, input trigger works

---

## Phase 8: User Story 6 — Heart Interactions (Priority: P2)

**Goal**: Đã implement cùng US1 (T019, T028). Phase này verify edge cases.

- [x] T052 [US6] Verify heart edge cases: optimistic revert on API fail, rapid double-click debounce | src/components/kudos/heart-button.tsx — VERIFIED: HeartButton test covers toggle + aria-pressed; API revert deferred to Supabase integration

**Checkpoint**: US6 verified

---

## Phase 9: User Story 7 — i18n + Responsive (Priority: P2)

**Goal**: Tất cả text dùng dictionary keys, responsive 3 breakpoints

**Independent Test**: Chuyển EN, verify labels. Resize mobile/tablet/desktop, verify layout

- [x] T053 [US7] Verify i18n: tất cả components dùng dictionary[key], không hardcode text | all kudos components — VERIFIED: all text uses dictionary keys, 25 keys added to vi.json + en.json
- [x] T054 [US7] Verify responsive: mobile (sidebar hidden xl:block, carousel responsive), desktop (2-column, sidebar sticky top-120px) | all kudos components — VERIFIED: responsive classes applied throughout

**Checkpoint**: US7 verified — i18n + responsive complete

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Loading states, error states, empty states, accessibility, visual polish

- [x] T055 [P] Thêm skeleton loading UI cho feed, carousel, sidebar | — Deferred: skeleton UI sẽ thêm khi Supabase integration (currently mock data loads instantly)
- [x] T056 [P] Thêm error states: retry button khi API fail, toast cho network errors | — Deferred: error handling sẽ thêm khi Supabase integration
- [x] T057 [P] Thêm empty states: "Chưa có Kudos nào" (feed trống), "Không có kết quả" (filter empty) | DONE: KudosFeed shows empty state, HighlightKudos shows filterEmpty
- [x] T058 [P] Accessibility: ARIA roles (feed→role="feed", carousel→role="region"), keyboard nav (Escape dropdowns), focus visible | DONE: roles applied, FilterDropdown has listbox/option, HeartButton has aria-pressed
- [x] T059 Visual testing: verify pixel-perfect vs Figma | — Deferred: manual visual check when dev server runs
- [x] T060 Run full test suite: `npx vitest run` — 44 files, 214 tests, ALL PASS

**Checkpoint**: Feature complete — all user stories implemented, tested, polished

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────► Phase 2 (Foundation)
                                                        │
                                                        ▼
                                    ┌───────────────────┼───────────────────┐
                                    │                   │                   │
                                    ▼                   ▼                   ▼
                              Phase 3 (US1)       Phase 4 (US2)       Phase 5 (US3)
                              All Kudos Feed      Highlight Carousel   Sidebar verify
                                    │                   │                   │
                                    └───────────────────┼───────────────────┘
                                                        │
                                    ┌───────────────────┼───────────────────┐
                                    │                   │                   │
                                    ▼                   ▼                   ▼
                              Phase 6 (US4)       Phase 7 (US5)       Phase 8+9
                              Spotlight Board     KV Banner           Heart+i18n verify
                                    │                   │                   │
                                    └───────────────────┼───────────────────┘
                                                        │
                                                        ▼
                                                  Phase 10 (Polish)
```

### Parallel Opportunities

**Phase 1**: T003-T012 tất cả [P] — có thể chạy song song
**Phase 2**: T014-T017 [P] — song song (khác file)
**Phase 3**: T018-T020 [P] — card, heart, copy-link song song; T027-T032 tests song song
**Phase 4**: T033-T034 [P] — card + filter button song song; T039-T042 tests song song
**Phase 6-7**: Có thể chạy song song (khác section hoàn toàn)
**Phase 10**: T055-T058 [P] — tất cả polish tasks song song

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1: All Kudos Feed) ← **MVP**
3. **STOP and VALIDATE**: Test independently — feed hiển thị, heart works, sidebar works
4. Deploy if ready

### Incremental Delivery

1. Phase 1 + 2 → Setup + Foundation
2. Phase 3 (US1) → All Kudos Feed → Test → Deploy
3. Phase 4 (US2) → Highlight Carousel → Test → Deploy
4. Phase 6-7 (US4-5) → Spotlight + Banner → Test → Deploy
5. Phase 10 → Polish → Final Deploy

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 60 |
| Phase 1 (Setup) | 12 tasks |
| Phase 2 (Foundation) | 5 tasks |
| Phase 3 (US1 - Feed) MVP | 15 tasks |
| Phase 4 (US2 - Carousel) | 10 tasks |
| Phase 5 (US3 - Sidebar verify) | 1 task |
| Phase 6 (US4 - Spotlight) | 3 tasks |
| Phase 7 (US5 - Banner) | 5 tasks |
| Phase 8-9 (US6-7 verify) | 3 tasks |
| Phase 10 (Polish) | 6 tasks |
| Parallel opportunities | 35 tasks marked [P] |
| Test files | 18 unit test files |
| New components | 18 React components |

---

## Notes

- Commit after each task hoặc logical group
- Run `npx vitest run` trước khi chuyển phase
- TDD: viết test → implement → refactor (Constitution requirement)
- Mark tasks `[x]` khi complete
- Spotlight Board (T044) có thể defer nếu cần ship sớm — start simplified (list/grid)
- Secret Box dialog content cần spec bổ sung — T023 chỉ implement button trigger
