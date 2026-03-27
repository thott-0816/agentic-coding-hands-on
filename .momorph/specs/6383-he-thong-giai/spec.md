# Feature Specification: Hệ thống giải thưởng SAA 2025

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**MoMorph Frame ID**: `6383`
**Created**: 2026-03-26
**Status**: Reviewed

---

## Overview

Trang "Hệ thống giải thưởng" hiển thị chi tiết toàn bộ 6 hạng mục giải thưởng SAA 2025. Trang bao gồm hero banner "ROOT FURTHER", tiêu đề section, sidebar navigation bên trái (sticky) để nhảy đến từng giải, và 6 card chi tiết giải thưởng xếp dọc bên phải. Cuối trang có phần Sun* Kudos promo. Trang có header full navigation và footer.

---

## User Scenarios & Testing

### User Story 1 - Xem chi tiết hệ thống giải thưởng (Priority: P1)

Người dùng truy cập trang để đọc thông tin chi tiết về từng hạng mục giải thưởng SAA 2025 (tên, mô tả, số lượng, giá trị).

**Why this priority**: Chức năng cốt lõi — hiển thị thông tin giải thưởng.

**Independent Test**: Truy cập trang, xác nhận hiển thị đầy đủ 6 giải thưởng với tên, mô tả, số lượng, giá trị.

**Acceptance Scenarios**:

1. **Given** người dùng truy cập trang, **When** trang load, **Then** hiển thị 6 card giải thưởng với đầy đủ thông tin
2. **Given** trang đã load, **When** scroll xuống, **Then** thấy lần lượt: Top Talent → Top Project → Top Project Leader → Best Manager → Signature 2025 → MVP
3. **Given** mỗi card giải, **When** nhìn vào card, **Then** thấy: hình ảnh, tiêu đề, mô tả, số lượng giải, giá trị (VNĐ)

---

### User Story 2 - Điều hướng sidebar (Priority: P1)

Sidebar bên trái hiển thị danh sách 6 giải thưởng. Click vào mục nào sẽ cuộn (scroll) đến card giải tương ứng.

**Why this priority**: Navigation chính của trang — giúp người dùng nhảy nhanh đến giải quan tâm.

**Independent Test**: Click từng mục sidebar, xác nhận trang cuộn đến card tương ứng.

**Acceptance Scenarios**:

1. **Given** trang đã load, **When** click "Top Project" trên sidebar, **Then** trang smooth-scroll đến card Top Project
2. **Given** đang xem card Top Talent, **When** click "MVP" trên sidebar, **Then** trang smooth-scroll đến card MVP
3. **Given** đang scroll, **When** card nào hiển thị trong viewport, **Then** mục tương ứng trên sidebar được highlight (active state: màu vàng + underline)

---

### User Story 3 - Hero banner + Tiêu đề (Priority: P2)

Phần đầu trang hiển thị hero banner artwork "ROOT FURTHER" và tiêu đề "Hệ thống giải thưởng SAA 2025".

**Why this priority**: Trang trí, branding, không ảnh hưởng chức năng.

**Independent Test**: Truy cập trang, xác nhận hero banner và tiêu đề hiển thị đúng.

**Acceptance Scenarios**:

1. **Given** trang load, **When** nhìn phần đầu, **Then** thấy hero banner artwork và tiêu đề "Sun* Annual Awards 2025" / "Hệ thống giải thưởng SAA 2025"

---

### User Story 4 - Sun* Kudos promo (Priority: P2)

Cuối danh sách giải thưởng có phần quảng bá Sun* Kudos với nút "Chi tiết".

**Why this priority**: Cross-promotion, không phải chức năng chính.

**Independent Test**: Scroll cuối trang, xác nhận thấy Sun* Kudos block với nút "Chi tiết".

**Acceptance Scenarios**:

1. **Given** trang đã load, **When** scroll đến cuối, **Then** thấy phần Sun* Kudos với tiêu đề, mô tả, nút "Chi tiết"
2. **Given** phần Kudos hiển thị, **When** click "Chi tiết", **Then** navigate đến `/kudos`

---

### User Story 5 - i18n + Responsive (Priority: P2)

Trang hỗ trợ VI/EN và responsive trên mobile/tablet/desktop.

**Why this priority**: Constitution bắt buộc.

**Acceptance Scenarios**:

1. **Given** ngôn ngữ EN, **When** trang load, **Then** tiêu đề và nội dung hiển thị bằng EN
2. **Given** màn hình < xl (< 1280px), **When** trang load, **Then** sidebar ẩn, cards full-width
3. **Given** màn hình ≥ xl (≥ 1280px), **When** trang load, **Then** sidebar hiển thị sticky bên trái

---

### Edge Cases

- Sidebar sticky khi scroll — cần dừng khi chạm footer
- Active state sidebar cập nhật khi scroll (Intersection Observer)
- Ảnh giải thưởng nặng → cần lazy loading

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header | Full navigation (reuse từ Homepage) | Nav links, language, avatar |
| Hero Banner | Artwork "ROOT FURTHER" + gradient overlay | Không interaction |
| Section Title | "Sun* Annual Awards 2025" + "Hệ thống giải thưởng SAA 2025" | Không interaction |
| Sidebar Navigation | 6 mục giải thưởng, sticky bên trái | Click → scroll to card, active state theo scroll |
| Award Detail Card (x6) | Hình ảnh + Tiêu đề + Mô tả + Số lượng + Giá trị | Không interaction (read-only) |
| Sun* Kudos Promo | Tiêu đề + Mô tả + Logo + Button "Chi tiết" | Click → navigate `/kudos` |
| Footer | Full navigation (reuse từ Homepage) | Nav links |
| Widget FAB | Nút nổi bottom-right | Click |

### Navigation Flow

- **From**: Header nav "Award Information" từ bất kỳ trang nào, hoặc Homepage award card "Chi tiết" link
- **To**: `/kudos` (via Kudos "Chi tiết" button)
- **Route**: `/awards`

### Visual Requirements

- Responsive: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)
- Sidebar: sticky ngay dưới header trên `xl` trở lên (≥1280px), **ẩn hoàn toàn từ `xl` trở xuống** (<1280px)
- Award cards: 2-column layout xen kẽ trái/phải (alternate) trên desktop, stack trên mobile
- Giữa các giải (từ giải thứ 2 trở đi): có hr divider (#2E3940) với margin-bottom bằng gap (80px desktop / 40px mobile)
- Accessibility: ARIA landmarks, keyboard navigation sidebar

---

## Requirements

### Functional Requirements

- **FR-001**: Trang PHẢI hiển thị 6 hạng mục giải thưởng với đầy đủ thông tin
- **FR-002**: Sidebar PHẢI sticky ngay dưới header (top: 120px) trên `xl` trở lên, **ẩn hoàn toàn từ `xl` trở xuống** (<1280px)
- **FR-003**: Click sidebar PHẢI smooth-scroll đến card tương ứng
- **FR-004**: Sidebar active state PHẢI cập nhật tự động khi scroll (Intersection Observer)
- **FR-005**: Hero banner PHẢI hiển thị artwork "ROOT FURTHER"
- **FR-006**: Phần Sun* Kudos PHẢI reuse 100% component `<KudosPromo>` từ Homepage (cùng props, cùng layout, cùng style)
- **FR-007**: Trang PHẢI hỗ trợ i18n VI/EN
- **FR-008**: Trang PHẢI dùng layout `(main)` với header full + footer full + widget button

### Technical Requirements

- **TR-001**: Sidebar scroll tracking dùng Intersection Observer API (Client Component)
- **TR-002**: Award data static từ `src/data/awards.ts` — mở rộng thêm fields mới (description dài, số lượng, giá trị, đơn vị)
- **TR-003**: Ảnh giải thưởng optimize với `next/image` + lazy loading
- **TR-004**: Route: `/awards` — nằm trong layout `(main)`
- **TR-005**: Sidebar sticky dùng `position: sticky; top: 120px`, ẩn dưới `xl` bằng `hidden xl:block`

### Key Entities

- **Award Category**: name, slug, description (ngắn + dài), imagePath, quantity, unit (Cá nhân/Tập thể/Đơn vị), prizeValue (VNĐ)

---

## i18n Keys (dự kiến)

| Key | VI | EN |
|-----|----|----|
| `awards.page.subtitle` | Sun* Annual Awards 2025 | Sun* Annual Awards 2025 |
| `awards.page.title` | Hệ thống giải thưởng SAA 2025 | SAA 2025 Awards System |
| `awards.quantity.label` | Số lượng giải thưởng | Number of awards |
| `awards.prize.label` | Giá trị giải thưởng | Prize value |
| `awards.unit.individual` | Cá nhân | Individual |
| `awards.unit.team` | Tập thể | Team |
| `awards.unit.unit` | Đơn vị | Unit |
| `awards.prize.perAward` | cho mỗi giải thưởng | per award |
| `awards.prize.individual` | cho giải cá nhân | for individual award |
| `awards.prize.team` | cho giải tập thể | for team award |

---

## Award Data (6 categories)

| # | Name | Slug | Quantity | Unit | Prize Value |
|---|------|------|----------|------|-------------|
| 1 | Top Talent | top-talent | 10 | Đơn vị | 7,000,000 VNĐ / giải |
| 2 | Top Project | top-project | 02 | Tập thể | 15,000,000 VNĐ / giải |
| 3 | Top Project Leader | top-project-leader | 03 | Cá nhân | 7,000,000 VNĐ / giải |
| 4 | Best Manager | best-manager | 01 | Cá nhân | 10,000,000 VNĐ |
| 5 | Signature 2025 - Creator | signature-2025-creator | 01 | Cá nhân + Tập thể | 5,000,000 VNĐ (cá nhân) / 8,000,000 VNĐ (tập thể) |
| 6 | MVP (Most Valuable Person) | mvp | 01 | Cá nhân | 15,000,000 VNĐ |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Không có | - | Dữ liệu static | - |

---

## Success Criteria

- **SC-001**: 6 giải thưởng hiển thị đầy đủ và chính xác
- **SC-002**: Sidebar navigation hoạt động smooth-scroll + active state tracking
- **SC-003**: Responsive 3 breakpoints
- **SC-004**: i18n VI/EN hoàn chỉnh

---

## Out of Scope

- Chỉnh sửa giải thưởng (admin)
- Search/filter giải thưởng
- Dynamic data từ API (dùng static data)

---

## Dependencies

- [x] Constitution document
- [x] Layout `(main)` với Header/Footer (đã có)
- [x] Award images (đã có trong `public/images/awards/`)
- [x] i18n system
- [ ] Mở rộng `src/data/awards.ts` với fields mới

---

## Notes

- Page frame 1440px width (khác Homepage 1512px) — cần verify padding
- Sidebar width 200px, content width fills remaining, gap 80px
- Award cards dùng 2-column layout: image (336x336px) xen kẽ trái/phải (index chẵn: image trái, index lẻ: image phải)
- Signature 2025 có 2 mức giá trị (cá nhân + tập thể) — layout khác các card khác
- Reuse 100% component `<KudosPromo>` từ Homepage — cùng props `dictionary`, cùng layout, cùng style, không cần tạo mới
- Sidebar ẩn từ `xl` trở xuống (<1280px) bằng `hidden xl:block`, KHÔNG phải từ `lg`
