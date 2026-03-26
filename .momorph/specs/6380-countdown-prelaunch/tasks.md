# Tasks: Countdown Prelaunch Page

**Frame**: `6380-countdown-prelaunch`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Phase 1: Foundation (i18n + Route)

**Purpose**: Thêm translation keys và tạo route `/countdown`

- [x] T001 [P] Thêm `TranslationKey` mới `"countdown.title"` | `src/types/i18n.ts`
- [x] T002 [P] Thêm key `"countdown.title": "Sự kiện sẽ bắt đầu sau"` | `src/libs/i18n/locales/vi.json`
- [x] T003 [P] Thêm key `"countdown.title": "Event starts in"` | `src/libs/i18n/locales/en.json`
- [x] T004 Tạo server component page shell: load cookies → getLocale → getDictionary, render `<PrelaunchCountdown dictionary={dictionary} />` | `src/app/countdown/page.tsx`

**Checkpoint**: Route `/countdown` accessible, trả về blank page (chưa có component)

---

## Phase 2: User Story 1 — Countdown Display (Priority: P1)

**Goal**: Hiển thị bộ đếm ngược fullscreen 20:20:20 với glassmorphism tiles

**Independent Test**: Truy cập `/countdown`, xác nhận hiển thị 20 Days, 20 Hours, 20 Minutes, đếm ngược mỗi phút

- [x] T005 [US1] Tạo `PrelaunchCountdown` Client Component với toàn bộ UI và logic:
  - Background image fullscreen: `next/image`, src `homepage-bg.png`, `fill`, `priority`, `object-cover`
  - Gradient overlay: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`
  - Title: i18n key `countdown.title`, Montserrat 36px/700, white, centered
  - Countdown tiles: 77x123px, border `0.75px solid #FFEA9E`, radius 12px, opacity 0.5, `backdrop-filter: blur(25px)`, `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.1) 100%)`
  - Digit text: Orbitron ~74px/400, white, opacity 1 (above tile background)
  - Labels: reuse keys `homepage.countdown.days/hours/minutes`, Montserrat 36px/700, white
  - Layout: groups gap 60px, digits gap 21px, tile-label gap 21px, title-countdown gap 24px
  - Countdown logic: INITIAL_TOTAL_MINUTES = 29300, state `null` → set in `useEffect`, interval 60s, stop at 0
  - `aria-live="polite"`, `aria-label` with current countdown values
  | `src/components/countdown/prelaunch-countdown.tsx`

**Checkpoint**: Trang `/countdown` hiển thị countdown fullscreen, đếm ngược từ 20:20:20

---

## Phase 3: User Story 2 — Navigation + i18n (Priority: P2)

**Goal**: Logo SAA trên header navigate đến `/countdown`, i18n VI/EN hoạt động

**Independent Test**: Click logo SAA → navigate `/countdown`, đổi ngôn ngữ → tiêu đề + labels đổi theo

- [x] T006 [US2] Đổi logo SAA `<Link href>` từ `/` sang `/countdown` | `src/components/common/header.tsx`
- [ ] T007 [US2] Verify i18n: tiêu đề hiển thị đúng khi VI/EN, labels DAYS/HOURS/MINUTES reuse đúng keys | Manual test

**Checkpoint**: Navigation từ header → countdown hoạt động, i18n đúng

---

## Phase 4: User Story 3 — Responsive (Priority: P2)

**Goal**: Trang hiển thị tốt trên mobile, tablet, desktop

**Independent Test**: Resize 3 breakpoints, countdown vẫn đọc rõ

- [x] T008 [US3] Thêm responsive classes cho `PrelaunchCountdown`:
  - Mobile (<768px / `max-md`): tiles 48x77px, digit font 46px, label 20px, group gap 24px, title 24px, padding 48px 16px
  - Tablet (768-1023px / `md:max-lg`): tiles 60x96px, digit font 58px, label 28px, group gap 40px, title 30px, padding 72px 48px
  - Desktop (≥1024px): giữ nguyên design Figma
  | `src/components/countdown/prelaunch-countdown.tsx`

**Checkpoint**: Responsive 3 breakpoints đẹp

---

## Phase 5: Polish & Cross-Cutting

**Purpose**: Tests, accessibility, build verification

- [x] T009 [P] Tạo unit tests cho PrelaunchCountdown: render 20:20:20, countdown logic (minutesToDisplay), stop at 0 | `src/components/countdown/__tests__/prelaunch-countdown.test.tsx`
- [ ] T010 [P] Verify không có hydration mismatch (state null pattern) | Manual test
- [x] T011 Build verification: `yarn build` pass, no TypeScript errors | CI
- [ ] T012 Test regression: Homepage navigation vẫn hoạt động sau khi đổi logo link | Manual test

**Checkpoint**: All tests pass, build clean, no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: Không dependency — bắt đầu ngay
- **Phase 2 (US1)**: Depends on Phase 1 (cần route + i18n keys)
- **Phase 3 (US2)**: Depends on Phase 2 (cần component đã render)
- **Phase 4 (US3)**: Depends on Phase 2 (cần component để thêm responsive)
- **Phase 5 (Polish)**: Depends on Phase 2-4 hoàn thành

### Parallel Opportunities

- T001, T002, T003 có thể chạy song song (khác file)
- Phase 3 (US2) và Phase 4 (US3) có thể chạy song song (khác concern)
- T009, T010 có thể chạy song song

---

## Implementation Strategy

### MVP First

1. Phase 1 + Phase 2 → Countdown fullscreen hoạt động
2. **STOP & VALIDATE**: Test `/countdown` hiển thị đúng
3. Phase 3 + Phase 4 → Navigation + Responsive
4. Phase 5 → Tests + Polish

### Summary

| Metric | Value |
|--------|-------|
| Total tasks | 12 |
| Phase 1 (Foundation) | 4 tasks |
| Phase 2 (US1 - Countdown) | 1 task (complex) |
| Phase 3 (US2 - Navigation) | 2 tasks |
| Phase 4 (US3 - Responsive) | 1 task |
| Phase 5 (Polish) | 4 tasks |
| Parallel opportunities | T001-T003, Phase 3//Phase 4, T009//T010 |
| MVP scope | Phase 1 + Phase 2 (5 tasks) |

---

## Notes

- T005 là task lớn nhất — có thể chia nhỏ hơn nếu cần, nhưng vì chỉ có 1 component nên giữ nguyên
- Labels reuse `homepage.countdown.days/hours/minutes` → không cần thêm i18n keys cho labels
- Font Orbitron thay thế Digital Numbers — đã load sẵn trong root layout
- Đổi header logo link (T006) ảnh hưởng toàn bộ trang `(main)` → test regression quan trọng (T012)
