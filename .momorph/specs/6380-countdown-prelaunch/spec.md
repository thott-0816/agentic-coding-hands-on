# Feature Specification: Countdown Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**MoMorph Frame ID**: `6380`
**Created**: 2026-03-26
**Status**: Reviewed

---

## Overview

Trang Countdown Prelaunch là trang fullscreen hiển thị bộ đếm ngược trước sự kiện SAA 2025. Người dùng được redirect đến trang này khi click vào logo SAA trên header. Trang bao gồm background artwork toàn màn hình với gradient overlay, tiêu đề "Sự kiện sẽ bắt đầu sau" và bộ đếm ngược 3 đơn vị (Days/Hours/Minutes) với font kiểu LED số.

**Countdown behavior**: Bộ đếm ngược **luôn bắt đầu từ 20 ngày, 20 giờ, 20 phút** mỗi khi load trang và đếm ngược mỗi phút — tương tự logic countdown trên trang Homepage. Không đọc từ env var.

**Lưu ý**: Trang này **KHÔNG có header và footer** — chỉ hiển thị countdown fullscreen. Trang **KHÔNG yêu cầu authentication** — ai cũng có thể truy cập.

---

## User Scenarios & Testing

### User Story 1 - Xem đếm ngược sự kiện (Priority: P1)

Người dùng click vào logo SAA trên header và được redirect đến trang Countdown Prelaunch, nơi hiển thị bộ đếm ngược cố định bắt đầu từ 20:20:20.

**Why this priority**: Đây là chức năng chính và duy nhất của trang — hiển thị countdown.

**Independent Test**: Truy cập URL `/countdown`, xác nhận hiển thị 20 Days, 20 Hours, 20 Minutes và đếm ngược mỗi phút.

**Acceptance Scenarios**:

1. **Given** người dùng ở bất kỳ trang nào, **When** click vào logo SAA trên header, **Then** được navigate đến `/countdown`
2. **Given** trang `/countdown` được load lần đầu, **When** render xong, **Then** hiển thị 20 Days, 20 Hours, 20 Minutes
3. **Given** bộ đếm ngược đang chạy, **When** mỗi phút trôi qua, **Then** giá trị Minutes giảm 1 (và Hours/Days cập nhật khi cần)
4. **Given** countdown đã về 0, **When** trang vẫn mở, **Then** hiển thị 00 Days, 00 Hours, 00 Minutes
5. **Given** người dùng reload trang, **When** trang load lại, **Then** countdown reset về 20:20:20

---

### User Story 2 - Đa ngôn ngữ (Priority: P2)

Tiêu đề và nhãn đơn vị hỗ trợ i18n VI/EN.

**Why this priority**: Yêu cầu constitution bắt buộc hỗ trợ VI + EN.

**Independent Test**: Chuyển ngôn ngữ sang EN, xác nhận tiêu đề và nhãn hiển thị bằng tiếng Anh.

**Acceptance Scenarios**:

1. **Given** ngôn ngữ là VI, **When** trang load, **Then** hiển thị "Sự kiện sẽ bắt đầu sau" và nhãn NGÀY/GIỜ/PHÚT
2. **Given** ngôn ngữ là EN, **When** trang load, **Then** hiển thị "Event starts in" và nhãn DAYS/HOURS/MINUTES

---

### User Story 3 - Responsive hiển thị (Priority: P2)

Trang hiển thị tốt trên mobile, tablet và desktop với font size và layout được điều chỉnh phù hợp.

**Why this priority**: Đảm bảo trải nghiệm trên mọi thiết bị.

**Independent Test**: Resize trình duyệt qua 3 breakpoint, xác nhận countdown vẫn hiển thị đẹp và đọc được.

**Acceptance Scenarios**:

1. **Given** màn hình desktop (≥1024px), **When** trang load, **Then** countdown tiles hiển thị 77x123px, font ~74px
2. **Given** màn hình tablet (768-1023px), **When** trang load, **Then** countdown tiles thu nhỏ vừa phải, vẫn đọc rõ
3. **Given** màn hình mobile (<768px), **When** trang load, **Then** countdown tiles thu nhỏ phù hợp, gap giảm, vẫn đọc rõ

---

### Edge Cases

- Countdown đạt 0 → hiển thị 00 cho tất cả đơn vị, ngừng interval
- Reload trang → countdown reset về 20:20:20
- Người dùng mở trang trong nhiều tab → mỗi tab đếm ngược độc lập

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Background Image | Artwork toàn màn hình (reuse `homepage-bg.png`) | Không có interaction |
| Gradient Overlay | Gradient 18deg che phần dưới để text đọc được | Không có interaction |
| Title Text | "Sự kiện sẽ bắt đầu sau" — centered, i18n | Không có interaction |
| Countdown Timer | 3 cụm (Days, Hours, Minutes), mỗi cụm gồm 2 glassmorphism digit tiles + label | Tự động cập nhật mỗi phút |

**Không có trên trang này**: Header, Footer, WidgetButton, Navigation links

### Navigation Flow

- **From**: Click logo SAA trên header (từ Homepage hoặc bất kỳ trang `(main)`)
- **To**: Trang này là fullscreen endpoint — không có navigation ra ngoài (người dùng dùng browser back)
- **Route**: `/countdown`
- **Triggers**: Click logo SAA trên header

### Visual Requirements

- Responsive breakpoints: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)
- Animations/Transitions: Không có animation đặc biệt
- Accessibility:
  - `aria-live="polite"` cho countdown container
  - `aria-label` mô tả giá trị countdown hiện tại
  - Contrast: text trắng trên nền tối đạt WCAG AA (>4.5:1)

---

## i18n Keys

Các translation keys cần thêm vào `vi.json` và `en.json`:

| Key | VI | EN |
|-----|----|----|
| `countdown.title` | Sự kiện sẽ bắt đầu sau | Event starts in |
| `countdown.days` | NGÀY | DAYS |
| `countdown.hours` | GIỜ | HOURS |
| `countdown.minutes` | PHÚT | MINUTES |

**Lưu ý**: Có thể reuse `homepage.countdown.days/hours/minutes` nếu label giống nhau. Tuy nhiên tiêu đề `countdown.title` là key mới (khác với `homepage.hero.comingSoon`).

---

## Requirements

### Functional Requirements

- **FR-001**: Trang PHẢI hiển thị tiêu đề "Sự kiện sẽ bắt đầu sau" (hoặc bản dịch EN)
- **FR-002**: Trang PHẢI hiển thị bộ đếm ngược 3 đơn vị: Days, Hours, Minutes
- **FR-003**: Bộ đếm ngược PHẢI bắt đầu từ **20 ngày, 20 giờ, 20 phút** mỗi khi load trang (tương tự Homepage)
- **FR-004**: Bộ đếm ngược PHẢI tự giảm 1 phút mỗi 60 giây (interval 60s)
- **FR-005**: Khi countdown = 0, PHẢI hiển thị 00 cho tất cả đơn vị và dừng interval
- **FR-010**: Reload trang PHẢI reset countdown về 20:20:20
- **FR-006**: Background PHẢI hiển thị artwork với gradient overlay (18deg)
- **FR-007**: Trang PHẢI hỗ trợ i18n VI/EN
- **FR-008**: Trang KHÔNG hiển thị header, footer, hay widget button
- **FR-009**: Trang KHÔNG yêu cầu authentication — truy cập công khai

### Technical Requirements

- **TR-001**: Client Component (`"use client"`) cho countdown logic
- **TR-002**: Tránh hydration mismatch — khởi tạo state `null`, set giá trị 20:20:20 trong `useEffect`
- **TR-003**: Background image optimize với `next/image` và `priority`
- **TR-004**: Route: `/countdown` — trang riêng KHÔNG nằm trong layout `(main)` (vì không có header/footer)
- **TR-005**: Font "Digital Numbers" PHẢI được load — dùng `next/font/local` vì không phải Google Font

### Key Entities

- **Initial Countdown**: Giá trị cố định 20 ngày, 20 giờ, 20 phút (tổng cộng 29,300 phút)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Không có | - | Trang hoàn toàn static/client-side | - |

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Countdown hiển thị 20:20:20 khi load và đếm ngược chính xác mỗi phút
- **SC-002**: Trang load dưới 2 giây (LCP) trên 3G
- **SC-003**: Không có lỗi hydration mismatch
- **SC-004**: i18n keys hoàn chỉnh cho cả VI và EN

---

## Out of Scope

- Countdown đến giây (chỉ đến phút)
- Âm thanh hoặc animation khi countdown về 0
- Redirect tự động khi countdown kết thúc
- Header/Footer trên trang này

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Background artwork image: reuse `public/images/homepage-bg.png`
- [x] i18n locales (vi.json, en.json) — cần thêm keys mới
- [ ] Font "Digital Numbers" — cần file font `.ttf`/`.woff2` trong project

---

## Notes

- Trang này nằm NGOÀI layout `(main)` vì không có header/footer → route: `src/app/countdown/page.tsx`
- Font "Digital Numbers" là custom font kiểu LED — cần download và load qua `next/font/local`
- Background image giống với hero banner của Homepage SAA (`homepage-bg.png`)
- Countdown tiles dùng glassmorphism effect: opacity 0.5 chỉ áp dụng cho tile background, KHÔNG áp dụng cho digit text (text luôn opacity 1)
- Gradient overlay góc 18deg — khác với Homepage
- Digit tiles lớn hơn Homepage (77x123px vs 42x72px)
- **Countdown logic tương tự Homepage**: bắt đầu 20:20:20, đếm ngược mỗi phút, có thể reuse/extract `CountdownTimer` component từ Homepage
