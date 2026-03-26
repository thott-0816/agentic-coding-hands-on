# Implementation Plan: Countdown Prelaunch Page

**Frame**: `6380-countdown-prelaunch`
**Date**: 2026-03-26
**Spec**: `specs/6380-countdown-prelaunch/spec.md`

---

## Summary

Trang Countdown Prelaunch fullscreen hiển thị bộ đếm ngược cố định 20:20:20 (Days/Hours/Minutes) với font kiểu LED, background artwork và gradient overlay. Trang nằm ngoài layout `(main)`, không có header/footer, không yêu cầu auth. Reuse countdown logic từ Homepage nhưng với visual style khác (glassmorphism tiles lớn hơn, font Digital Numbers).

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4
**Database**: N/A (không cần)
**Testing**: Vitest
**State Management**: Local state (useState + useEffect)
**API Style**: N/A (trang static)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components)
- [x] Uses approved libraries and patterns (Next.js, Tailwind, next/font)
- [x] Adheres to folder structure guidelines (`src/app/countdown/`, `src/components/countdown/`)
- [x] Meets security requirements (no sensitive data, public page)
- [x] Follows testing standards (Vitest unit tests)
- [x] i18n: VI + EN support mandatory

**Violations**: Không có

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — tách riêng `src/components/countdown/` cho visual khác Homepage
- **Styling Strategy**: Tailwind utilities + inline styles cho glassmorphism effect
- **Data Fetching**: Không cần — countdown logic hoàn toàn client-side

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Reuse CountdownTimer? | **Không** — tạo mới | Visual quá khác: glassmorphism 77x123px vs flat 42x72px, font khác (Digital Numbers vs Orbitron), layout khác. Reuse logic nhưng tạo component mới |
| Font Digital Numbers | **Dùng Orbitron thay thế** | Project đã load Orbitron (kiểu digital). "Digital Numbers" không có sẵn và cần download font file riêng. Orbitron cho visual tương tự và đã có trong `next/font/google`. Nếu cần chính xác, có thể đổi sau khi có font file |
| Route structure | `src/app/countdown/page.tsx` | Nằm ngoài `(main)` group → không có header/footer |
| Background image | Reuse `homepage-bg.png` | Figma design dùng cùng artwork |

### Integration Points

- **Reuse**: i18n system (`getLocale`, `getDictionary`), CSS variables từ `globals.css`
- **Modify**: Header logo link — đổi href từ `/` sang `/countdown`
- **New**: Route `/countdown`, component `PrelaunchCountdown`

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/app/countdown/page.tsx` | Server Component — page shell, load dictionary |
| `src/components/countdown/prelaunch-countdown.tsx` | Client Component — countdown logic + glassmorphism UI |
| `src/components/countdown/__tests__/prelaunch-countdown.test.tsx` | Unit tests — render, countdown logic, i18n |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/common/header.tsx` | Đổi logo `<Link href>` từ `/` sang `/countdown` |
| `src/libs/i18n/locales/vi.json` | Thêm key `countdown.title` = "Sự kiện sẽ bắt đầu sau" |
| `src/libs/i18n/locales/en.json` | Thêm key `countdown.title` = "Event starts in" |
| `src/types/i18n.ts` | Thêm `TranslationKey`: `"countdown.title"` |

**i18n note**: Labels DAYS/HOURS/MINUTES reuse keys `homepage.countdown.days/hours/minutes` đã có → không cần thêm key mới cho labels.

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Không cần thêm | - | Tất cả đã có sẵn |

---

## Implementation Strategy

### Phase 1: Foundation (i18n + Route)

1. Thêm translation key `countdown.title` vào `vi.json`, `en.json`, `i18n.ts`
2. Tạo `src/app/countdown/page.tsx` — server component shell
3. Verify route `/countdown` hoạt động

### Phase 2: Core UI (US1 — Countdown Display)

4. Tạo `src/components/countdown/prelaunch-countdown.tsx`:
   - **Background**: `homepage-bg.png` fullscreen (`next/image`, `fill`, `priority`, `object-cover`)
   - **Gradient overlay**: `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`
   - **Title**: i18n key `countdown.title`, Montserrat 36px/700, white, centered
   - **Countdown tiles**: 77x123px, border `0.75px solid #FFEA9E`, radius 12px, opacity 0.5, `backdrop-filter: blur(25px)`, `background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.1) 100%)`
   - **Digit font**: Orbitron ~74px/400, white (opacity 1, above tile)
   - **Labels**: Montserrat 36px/700, white
   - **Layout**: Groups gap 60px, digits gap 21px, tile-to-label gap 21px, title-to-countdown gap 24px
   - **Countdown logic**: bắt đầu 20:20:20 (INITIAL_TOTAL_MINUTES = 29300), giảm 1 phút mỗi 60s, dừng ở 0
   - **Hydration safe**: state `null` → set `29300` trong `useEffect`
5. Wire component vào page.tsx

### Phase 3: Navigation + i18n (US1 + US2)

6. Đổi logo SAA `<Link>` trong `header.tsx` trỏ đến `/countdown`
7. Reuse `homepage.countdown.days/hours/minutes` keys cho labels (hoặc thêm keys riêng nếu cần khác)
8. Test i18n VI/EN hoạt động đúng

### Phase 4: Responsive (US3)

9. Thêm responsive classes cho `prelaunch-countdown.tsx`:
   - **Mobile (<768px)**: tiles 48x77px, digit font 46px, label 20px, group gap 24px, padding 48px 16px
   - **Tablet (768-1023px)**: tiles 60x96px, digit font 58px, label 28px, group gap 40px, padding 72px 48px
   - **Desktop (≥1024px)**: tiles 77x123px, digit font 74px, label 36px, group gap 60px — theo design Figma

### Phase 5: Polish

10. Accessibility: `aria-live`, `aria-label`
11. Test hydration mismatch
12. Build verification

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | Countdown logic (minutesToDisplay) | High |
| Unit | PrelaunchCountdown render | Medium |
| Visual | Responsive 3 breakpoints | Manual |
| Build | No TypeScript errors, no hydration mismatch | CI |

### Test Scenarios

1. **Happy Path**
   - [x] Trang load hiển thị 20:20:20
   - [x] Sau 1 phút, Minutes giảm 1
   - [x] Reload → reset về 20:20:20

2. **Edge Cases**
   - [x] Countdown đạt 0 → hiển thị 00:00:00, dừng interval
   - [x] i18n VI → hiển thị tiếng Việt
   - [x] i18n EN → hiển thị tiếng Anh

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Font Digital Numbers không có | High | Medium | Dùng Orbitron (đã load) thay thế, visual tương tự |
| Hydration mismatch | Medium | High | State null ban đầu, set trong useEffect |
| Background image nặng | Low | Medium | `next/image` với `priority`, đã optimize |
| Header logo link ảnh hưởng Homepage | Low | Medium | Test kỹ navigation Homepage sau khi đổi |

---

## Estimated Complexity

- **Frontend**: **Low-Medium** — Trang đơn giản, 1 component chính, logic reuse từ Homepage
- **Backend**: **None**
- **Testing**: **Low** — Chủ yếu unit test countdown logic

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (Status: Reviewed)
- [x] `design-style.md` complete
- [x] Background image available (`homepage-bg.png`)
- [x] i18n system working
- [x] Orbitron font loaded (thay thế Digital Numbers)

### External Dependencies

- Không có

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order

---

## Notes

- Trang rất nhẹ — chỉ 1 server component + 1 client component
- Không cần API, database, hay auth
- Countdown logic giống Homepage → có thể extract thành shared utility sau nếu cần (YAGNI: chưa cần bây giờ)
- Font Orbitron cho visual "digital" tương tự, nếu cần chính xác font "Digital Numbers" thì cần bạn cung cấp file font `.woff2`
- Đổi header logo link sẽ ảnh hưởng toàn bộ trang dùng layout `(main)` — cần test kỹ
