# Implementation Plan: Hệ thống giải thưởng SAA 2025

**Frame**: `6383-he-thong-giai`
**Date**: 2026-03-26
**Spec**: `specs/6383-he-thong-giai/spec.md`

---

## Summary

Trang `/awards` hiển thị chi tiết 6 hạng mục giải thưởng SAA 2025 với sidebar navigation (sticky, ẩn dưới xl), 6 award detail cards (image + content), hero banner và Sun* Kudos promo. Nằm trong layout `(main)` có header/footer. Dữ liệu static, không cần API.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS 4
**Database**: N/A
**Testing**: Vitest
**State Management**: Local state cho sidebar active tracking (Intersection Observer)
**API Style**: N/A (static data)

---

## Constitution Compliance Check

- [x] kebab-case files, PascalCase components
- [x] Next.js App Router, Server Components default, `"use client"` chỉ cho sidebar
- [x] Tailwind utilities, CSS variables
- [x] `next/image` cho ảnh, `next/link` cho navigation
- [x] i18n VI + EN mandatory
- [x] Responsive 3 breakpoints
- [x] Path alias `@/*`

**Violations**: Không có

---

## Architecture Decisions

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Route location | `src/app/(main)/awards/page.tsx` | Nằm trong `(main)` group → tự động có header/footer/widget |
| Award data | Mở rộng `src/data/awards.ts` | Thêm fields: `fullDescription`, `quantity`, `unit`, `prizeValue`, `prizeNote`. Giữ backward compatible với Homepage |
| Sidebar component | Client Component riêng | Cần Intersection Observer cho scroll tracking |
| Hero banner | Tạo mới đơn giản | Hero trang Awards khác Homepage (không có countdown/CTA, chỉ artwork + gradient). Không reuse HeroBanner |
| KudosPromo | **Reuse 100%** | Import trực tiếp `<KudosPromo>` từ `src/components/homepage/` |
| Award Detail Card | Tạo mới | Khác hoàn toàn với AwardCard homepage (layout 2-column, có quantity + prize value) |

### Integration Points

- **Reuse**: `<KudosPromo>`, `<Header>`, `<Footer>`, `<WidgetButton>`, i18n system, CSS variables, `awards` data array
- **Mở rộng**: `src/data/awards.ts` — thêm fields mới (backward compatible)
- **New**: Route `/awards`, `<AwardsSidebar>`, `<AwardDetailCard>`, `<AwardsSectionTitle>`, `<AwardsHeroBanner>`

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/app/(main)/awards/page.tsx` | Server Component — page shell, load dictionary, render sections |
| `src/components/awards/awards-hero-banner.tsx` | Hero banner đơn giản: artwork + gradient overlay |
| `src/components/awards/awards-section-title.tsx` | Subtitle + divider + title (gold) |
| `src/components/awards/awards-sidebar.tsx` | Client Component — sticky sidebar, Intersection Observer, scroll-to |
| `src/components/awards/award-detail-card.tsx` | Award card: image left + content right (title, desc, quantity, prize) |

### Modified Files

| File | Changes |
|------|---------|
| `src/data/awards.ts` | Thêm fields: `fullDescription`, `quantity`, `unit`, `prizeValue`, `prizeNote` vào interface + data |
| `src/types/i18n.ts` | Thêm 10 TranslationKeys mới (`awards.page.*`, `awards.quantity.*`, `awards.prize.*`, `awards.unit.*`) |
| `src/libs/i18n/locales/vi.json` | Thêm 10 i18n keys VI |
| `src/libs/i18n/locales/en.json` | Thêm 10 i18n keys EN |
| `src/app/(main)/layout.tsx` | Xóa hardcode `activeLink="/"` — cần dynamic activeLink dựa trên pathname (hoặc để page tự handle) |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Không cần thêm | - | Intersection Observer là browser API native |

---

## Implementation Strategy

### Phase 1: Foundation (Data + i18n + Route)

1. Mở rộng `AwardCategory` interface trong `src/data/awards.ts`:
   - Thêm `fullDescription: string` (mô tả dài cho trang awards)
   - Thêm `quantity: number` (số lượng giải)
   - Thêm `unit: string` (key i18n: "Cá nhân"/"Tập thể"/"Đơn vị")
   - Thêm `prizeValue: string` (giá trị VNĐ)
   - Thêm `prizeNote?: string` (key i18n: "cho mỗi giải thưởng")
   - Thêm `prizeValueTeam?: string` (cho Signature 2025 có 2 mức giá)
   - Thêm `prizeNoteTeam?: string`
2. Thêm 10 TranslationKeys vào `i18n.ts`, `vi.json`, `en.json`
3. Tạo `src/app/(main)/awards/page.tsx` — server component shell
4. Fix `src/app/(main)/layout.tsx` — đổi `activeLink="/"` sang dynamic (dùng pathname hoặc bỏ hardcode, để mỗi page truyền khác nhau)

### Phase 2: Core UI — Award Cards (US1)

4. Tạo `src/components/awards/award-detail-card.tsx`:
   - Layout: flex row (image 336px left, content right), gap 40px
   - Image: `next/image`, 336x336px, rounded 12px, border gold #998C5F
   - Content: title (24px/700), description (14px/400), quantity (40px/700 gold) + unit, prize value (36px/700 gold) + note
   - Responsive: stack vertical trên mobile (<768px), image nhỏ hơn trên tablet
   - Signature 2025: 2 rows giá trị (cá nhân + tập thể)
5. Tạo `src/components/awards/awards-section-title.tsx`:
   - Subtitle "Sun* Annual Awards 2025" (24px/700 white)
   - Divider line (#2E3940)
   - Title "Hệ thống giải thưởng SAA 2025" (57px/400 gold)
6. Wire cards + title vào page.tsx, verify 6 cards render đúng

### Phase 3: Sidebar Navigation (US2)

7. Tạo `src/components/awards/awards-sidebar.tsx` (Client Component):
   - `hidden xl:block` — ẩn dưới xl
   - `position: sticky; top: 96px` — ngay dưới header
   - 6 items từ awards data
   - Click → `scrollIntoView({ behavior: 'smooth' })` đến card tương ứng (bằng `id={slug}`)
   - Active state: Intersection Observer theo dõi 6 card sections
   - Styles: normal (white 14px), active (gold #FFEA9E + indicator)
8. Thêm `id={award.slug}` vào mỗi AwardDetailCard wrapper cho scroll target
9. Wire sidebar vào page layout: flex row (sidebar + cards), gap 80px

### Phase 4: Hero Banner + Kudos (US3 + US4)

10. Tạo `src/components/awards/awards-hero-banner.tsx`:
    - Background artwork (reuse `homepage-bg.png` hoặc ảnh riêng)
    - Gradient overlay: `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)`
    - Height: 547px (Figma), responsive thu nhỏ
11. Import `<KudosPromo>` từ Homepage, thêm vào cuối page

### Phase 5: Responsive (US5)

12. Responsive cho award-detail-card:
    - Mobile (<768px): flex-col, image max-w-280px centered, title 20px
    - Tablet (768-1279px): flex-row, image 240px
    - Desktop xl+ (≥1280px): flex-row, image 336px, sidebar visible
13. Responsive cho page layout:
    - Dưới xl: cards full-width (không sidebar)
    - xl+: sidebar 178px + gap 80px + cards flex-1
14. Responsive cho hero + section title:
    - Mobile: title 36px, padding 48px 16px
    - Tablet: padding 72px 48px

### Phase 6: Polish

15. Accessibility: ARIA landmarks (`nav`, `main`, `section`), `aria-current` cho sidebar active
16. Unit tests: sidebar logic, award data validation
17. Build verification: TypeScript clean, no errors
18. Manual test: scroll tracking, sidebar click, responsive, i18n

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | Sidebar active tracking logic | Medium |
| Unit | AwardDetailCard render with various data (single/dual prize) | Medium |
| Visual | Responsive 3 breakpoints + sidebar visibility at xl | Manual |
| Build | TypeScript + ESLint clean | CI |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Intersection Observer SSR | Medium | High | `"use client"` + useEffect guard |
| Award data backward compatibility | Low | High | Thêm fields optional, giữ interface compatible |
| Sidebar sticky + footer overlap | Medium | Medium | CSS `sticky` tự dừng khi hết parent container |
| Ảnh 336x336 nặng x6 | Low | Medium | `next/image` lazy loading (không priority) |
| Signature 2025 dual prize layout | Low | Medium | Conditional render trong AwardDetailCard |

---

## Estimated Complexity

- **Frontend**: **Medium** — Sidebar scroll tracking là phần phức tạp nhất
- **Backend**: **None**
- **Testing**: **Low-Medium**

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (Reviewed)
- [x] `design-style.md` complete
- [x] Award images available (`public/images/awards/`)
- [x] i18n system working
- [x] `(main)` layout with Header/Footer

### External Dependencies

- Không có

---

## Next Steps

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md
3. **Begin** implementation

---

## Notes

- Route `src/app/(main)/awards/page.tsx` nằm trong `(main)` group → tự động có Header/Footer/Widget — KHÔNG cần tạo layout riêng
- `<KudosPromo>` import từ `@/components/homepage/kudos-promo` — reuse 100%, không move/copy
- Header nav "Award Information" đã active khi ở trang này — cần pass `activeLink="/awards"` vào layout hoặc page
- Award data mở rộng backward compatible: Homepage vẫn chỉ dùng `name`, `slug`, `description`, `imagePath`
- Signature 2025 card có 2 mức giá → cần conditional rendering trong AwardDetailCard
