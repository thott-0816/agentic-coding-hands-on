# Feature Specification: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-25
**Status**: Reviewed

---

## Overview

Trang chủ Homepage SAA 2025 là landing page chính sau khi đăng nhập. Hiển thị tổng quan sự kiện Sun Annual Awards 2025 với hero banner "ROOT FURTHER", đồng hồ đếm ngược, thông tin sự kiện, nội dung mô tả, hệ thống giải thưởng (6 hạng mục), và khối quảng bá Sun* Kudos. Header có navigation đầy đủ (logo, menu, thông báo, ngôn ngữ, avatar). Footer có links và bản quyền.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem tổng quan sự kiện (Priority: P1)

Là nhân viên Sun*, tôi muốn xem trang chủ SAA 2025 để nắm bắt thông tin sự kiện, thời gian diễn ra và các hạng mục giải thưởng.

**Why this priority**: Đây là trang đầu tiên sau khi đăng nhập — cần hiển thị đúng và đầy đủ thông tin.

**Independent Test**: Đăng nhập → redirect đến Homepage → xác nhận hero banner, countdown, thông tin sự kiện, giải thưởng, và Kudos section đều hiển thị.

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập, **When** truy cập trang chủ, **Then** hiển thị hero banner "ROOT FURTHER" với background artwork
2. **Given** sự kiện chưa diễn ra, **When** trang load, **Then** countdown hiển thị Days/Hours/Minutes đếm ngược real-time, kèm text "Coming soon"
3. **Given** sự kiện đã diễn ra (countdown = 0), **When** trang load, **Then** countdown hiển thị 00/00/00 và ẩn "Coming soon"
4. **Given** trang chủ hiển thị, **When** scroll xuống, **Then** thấy section mô tả "Root Further", hệ thống 6 giải thưởng, và Sun* Kudos
5. **Given** trang chủ hiển thị, **When** nhìn thông tin sự kiện, **Then** thấy thời gian, địa điểm và ghi chú livestream

---

### User Story 2 - Điều hướng đến các trang con (Priority: P1)

Là nhân viên Sun*, tôi muốn click vào các nút/link để truy cập nhanh thông tin chi tiết về giải thưởng hoặc Sun* Kudos.

**Why this priority**: Navigation là chức năng cốt lõi — người dùng cần đến được các trang chi tiết.

**Independent Test**: Click các nút CTA và links → xác nhận redirect đúng.

**Acceptance Scenarios**:

1. **Given** trang chủ hiển thị, **When** click "ABOUT AWARDS", **Then** navigate đến trang Awards Information
2. **Given** trang chủ hiển thị, **When** click "ABOUT KUDOS", **Then** navigate đến trang Sun* Kudos
3. **Given** section giải thưởng hiển thị, **When** click vào thẻ giải (ảnh/tiêu đề/Chi tiết), **Then** navigate đến trang Awards Information kèm hashtag slug hạng mục tương ứng
4. **Given** section Sun* Kudos hiển thị, **When** click "Chi tiết", **Then** navigate đến trang Sun* Kudos
5. **Given** Header hiển thị, **When** click nav link (About SAA 2025 / Awards Information / Sun* Kudos), **Then** navigate đến trang tương ứng. Link đang active có highlight vàng + underline

---

### User Story 3 - Header navigation đầy đủ (Priority: P2)

Là nhân viên Sun*, tôi muốn sử dụng header để truy cập thông báo, đổi ngôn ngữ, và quản lý tài khoản.

**Why this priority**: Header là shared component dùng ở mọi trang — cần hoạt động đúng.

**Independent Test**: Click bell icon → panel thông báo. Click VN → dropdown ngôn ngữ. Click avatar → dropdown profile.

**Acceptance Scenarios**:

1. **Given** header hiển thị, **When** click icon chuông, **Then** mở panel thông báo. Hiển thị badge đỏ khi có thông báo chưa đọc
2. **Given** header hiển thị, **When** click language selector "VN", **Then** mở dropdown chọn ngôn ngữ VN/EN
3. **Given** header hiển thị, **When** click avatar icon, **Then** mở dropdown profile với 2 options: "Profile" (icon người) và "Logout" (icon chevron phải)
4. **Given** dropdown profile đang mở, **When** click "Profile", **Then** navigate đến trang Profile cá nhân và đóng dropdown
5. **Given** dropdown profile đang mở, **When** click "Logout", **Then** gọi Supabase `signOut()`, xóa session cookie, redirect về trang Login `/login`, đóng dropdown
6. **Given** dropdown profile đang mở, **When** click bên ngoài dropdown, **Then** đóng dropdown
7. **Given** dropdown profile đang mở, **When** nhấn Escape, **Then** đóng dropdown và focus trở lại avatar button
8. **Given** đang ở trang About SAA 2025, **When** nhìn header, **Then** link "About SAA 2025" có highlight vàng (selected state)

---

### User Story 4 - Responsive display (Priority: P2)

Là người dùng mobile/tablet, tôi muốn trang Homepage hiển thị đẹp trên mọi thiết bị.

**Why this priority**: Constitution yêu cầu responsive bắt buộc.

**Independent Test**: Mở trang ở 3 breakpoints → xác nhận layout đúng.

**Acceptance Scenarios**:

1. **Given** mobile (< 768px), **When** xem award grid, **Then** hiển thị 2 cột
2. **Given** tablet (768-1023px), **When** xem award grid, **Then** hiển thị 2 cột
3. **Given** desktop (≥ 1024px), **When** xem award grid, **Then** hiển thị 3 cột
4. **Given** mobile, **When** xem countdown, **Then** countdown tiles co lại nhưng vẫn đọc được

---

### Edge Cases

- Khi countdown target date chưa được config: Hiển thị 00/00/00
- Khi mô tả giải thưởng quá dài: Cắt tối đa 2 dòng + ellipsis
- Khi ảnh giải thưởng chưa load: Hiển thị placeholder
- Khi user chưa auth truy cập Homepage: Redirect về /login
- Widget button (FAB) luôn cố định ở góc phải dưới

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A1_Header | `2167:9091` | Header navigation đầy đủ: logo, nav links (3), bell, language, avatar | Fixed top, links hover/selected/normal states |
| A1.8_Avatar Dropdown | `666:9601` | Dropdown menu khi click avatar: "Profile" (icon người) + "Logout" (icon chevron) | Click avatar → toggle, click-outside → close, Escape → close |
| 3.5_Keyvisual | `2167:9027` | Hero banner — background artwork "ROOT FURTHER" | Static background |
| B1_Countdown | `2167:9035` | Countdown timer: Days/Hours/Minutes + "Coming soon" + event info | Real-time update mỗi phút |
| B2_Event Info | `2167:9053` | Thời gian, địa điểm, ghi chú livestream | Static text |
| B3_CTA | `2167:9062` | 2 nút: "ABOUT AWARDS" (hover), "ABOUT KUDOS" (normal) | Click navigate, hover states |
| B4_Content | `5001:14827` | Mô tả "Root Further" — text block dài | Static, responsive wrap |
| C1_Award Header | `2167:9069` | Tiêu đề "Hệ thống giải thưởng" | Static |
| C2_Award List | `5005:14974` | Grid 6 thẻ giải thưởng (3x2 desktop, 2x3 mobile) | Click navigate, hover lift |
| D1_Sunkudos | `3390:10349` | Khối quảng bá Sun* Kudos: title, description, CTA, image | Click "Chi tiết" navigate |
| 6_Widget Button | `5022:15169` | FAB button cố định góc phải dưới (105x64px, nền vàng) | Click mở quick actions |
| 7_Footer | `5001:14800` | Footer: logo, nav links, "Tiêu chuẩn chung", bản quyền | Click navigate |

### Award Cards (6 hạng mục)

| # | Hạng mục | Node ID |
|---|----------|---------|
| 1 | Top Talent | `2167:9075` |
| 2 | Top Project | `2167:9076` |
| 3 | Top Project Leader | `2167:9077` |
| 4 | Best Manager | `2167:9079` |
| 5 | Signature 2025 - Creator | `2167:9080` |
| 6 | MVP (Most Valuable Person) | `2167:9081` |

### Navigation Flow

- **From**: Login page (sau đăng nhập) hoặc các trang khác qua header
- **To**:
  - "ABOUT AWARDS" / Award cards → Awards Information page (kèm #slug)
  - "ABOUT KUDOS" / "Chi tiết" Kudos → Sun* Kudos page
  - Header links → trang tương ứng
  - Bell icon → Notification panel
  - Avatar → Profile dropdown
  - Language → Language dropdown
  - Widget button → Quick actions menu

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- **Award grid**: 3 cột desktop, 2 cột mobile/tablet
- **Countdown**: Auto-update real-time (mỗi phút)
- **FAB**: Fixed position bottom-right
- **Header**: Fixed top, semi-transparent bg
- **Chi tiết design**: Xem `design-style.md`

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI hiển thị hero banner "ROOT FURTHER" với background artwork toàn màn hình
- **FR-002**: Hệ thống PHẢI hiển thị countdown đếm ngược real-time đến thời điểm sự kiện (configurable via env var, ISO-8601 format)
- **FR-003**: Khi countdown = 0, hệ thống PHẢI ẩn "Coming soon" và giữ 00/00/00
- **FR-004**: Hệ thống PHẢI hiển thị 6 thẻ giải thưởng dạng grid (3 cột desktop, 2 cột mobile)
- **FR-005**: Click thẻ giải thưởng PHẢI navigate đến Awards Information kèm hashtag slug
- **FR-006**: Hệ thống PHẢI hiển thị khối Sun* Kudos với nút "Chi tiết" navigate đến trang Kudos
- **FR-007**: Header PHẢI có: logo (→ homepage), 3 nav links (selected/hover/normal), bell, language, avatar
- **FR-008**: Footer PHẢI có: logo, nav links (About SAA 2025, Awards Information, Sun* Kudos, Tiêu chuẩn chung), bản quyền
- **FR-009**: Widget button (FAB) PHẢI cố định góc phải dưới, click mở quick actions
- **FR-010**: Tất cả text PHẢI hỗ trợ i18n VI/EN
- **FR-011**: Click avatar icon PHẢI mở dropdown với 2 options: "Profile" (icon người, navigate đến Profile page) và "Logout" (icon chevron, gọi Supabase `signOut()` → redirect `/login`)
- **FR-012**: Logout PHẢI xóa session cookie hoàn toàn qua Supabase `signOut()` và redirect về trang Login
- **FR-013**: Dropdown profile PHẢI đóng khi click bên ngoài hoặc nhấn Escape

### Technical Requirements

- **TR-001**: Countdown target date PHẢI configurable via env var (ISO-8601)
- **TR-002**: Page PHẢI tương thích Cloudflare Workers edge runtime
- **TR-003**: Background image PHẢI optimize (next/image, priority)
- **TR-004**: Award card images PHẢI lazy load
- **TR-005**: Tất cả text PHẢI externalize vào translation files

### Key Entities

- **Award Category**: name, slug, description, thumbnail image
- **Event Info**: date, venue, livestream note (static/configurable)

---

## State Management

### Local Component State

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `countdown` | `{ days, hours, minutes }` | Calculated | Thời gian còn lại đến event |
| `isEventStarted` | `boolean` | `false` | True khi countdown = 0 |
| `activeNavLink` | `string` | Current route | Nav link đang active |
| `notificationOpen` | `boolean` | `false` | Panel thông báo mở/đóng |
| `profileDropdownOpen` | `boolean` | `false` | Dropdown profile mở/đóng |

### Global State

| State | Storage | Description |
|-------|---------|-------------|
| `locale` | Cookie (`lang`) | Ngôn ngữ hiện tại (vi/en) |
| `session` | Cookie (Supabase SSR) | Auth session |

---

## Award Category Slugs

| # | Hạng mục | Slug | Navigation Target |
|---|----------|------|-------------------|
| 1 | Top Talent | `top-talent` | `/awards#top-talent` |
| 2 | Top Project | `top-project` | `/awards#top-project` |
| 3 | Top Project Leader | `top-project-leader` | `/awards#top-project-leader` |
| 4 | Best Manager | `best-manager` | `/awards#best-manager` |
| 5 | Signature 2025 - Creator | `signature-2025-creator` | `/awards#signature-2025-creator` |
| 6 | MVP (Most Valuable Person) | `mvp` | `/awards#mvp` |

---

## Accessibility Requirements

### Keyboard Navigation

- **Tab order**: Header (logo → nav links → bell → language → avatar) → Hero (CTA buttons) → Award cards → Kudos "Chi tiết" → Footer links
- **Enter/Space**: Kích hoạt buttons, links, dropdown items
- **Escape**: Đóng profile dropdown, language dropdown, notification panel
- **Arrow keys**: Điều hướng trong dropdowns

### Focus Management

- Page load → focus vào main content (skip header)
- Profile dropdown mở → focus vào "Profile" option
- Profile dropdown đóng → focus trở lại avatar button
- Sau logout → redirect, không cần focus management

### ARIA Attributes

| Element | ARIA | Value |
|---------|------|-------|
| Header nav | `role` | `navigation` |
| Nav link (active) | `aria-current` | `page` |
| Bell icon | `aria-label` | i18n "Thông báo" / "Notifications" |
| Bell badge | `aria-label` | i18n "{n} thông báo chưa đọc" |
| Avatar button | `aria-haspopup` | `menu` |
| Avatar button | `aria-expanded` | `true/false` |
| Profile dropdown | `role` | `menu` |
| Profile/Logout items | `role` | `menuitem` |
| Countdown | `aria-live` | `polite` |
| Countdown | `aria-label` | i18n "Đếm ngược: X ngày Y giờ Z phút" |
| Award card | `role` | `article` |
| FAB | `aria-label` | i18n "Hành động nhanh" / "Quick actions" |

### Screen Reader

- Background images PHẢI có `aria-hidden="true"`
- Award card images PHẢI có `alt` text mô tả hạng mục
- Countdown tiles PHẢI có accessible label tổng hợp (không đọc từng số)

---

## i18n Translation Keys (Homepage)

| Key | VI | EN |
|-----|----|----|
| `homepage.hero.comingSoon` | Sắp ra mắt | Coming soon |
| `homepage.countdown.days` | NGÀY | DAYS |
| `homepage.countdown.hours` | GIỜ | HOURS |
| `homepage.countdown.minutes` | PHÚT | MINUTES |
| `homepage.event.time` | Thời gian | Time |
| `homepage.event.venue` | Địa điểm | Venue |
| `homepage.event.livestream` | Tường thuật trực tiếp qua sóng Livestream | Live broadcast via Livestream |
| `homepage.cta.aboutAwards` | ABOUT AWARDS | ABOUT AWARDS |
| `homepage.cta.aboutKudos` | ABOUT KUDOS | ABOUT KUDOS |
| `homepage.awards.caption` | Sun* annual awards 2025 | Sun* annual awards 2025 |
| `homepage.awards.title` | Hệ thống giải thưởng | Awards System |
| `homepage.awards.detail` | Chi tiết | Details |
| `homepage.kudos.label` | Phong trào ghi nhận | Recognition Movement |
| `homepage.kudos.title` | Sun* Kudos | Sun* Kudos |
| `homepage.kudos.detail` | Chi tiết | Details |
| `common.header.profile` | Hồ sơ | Profile |
| `common.header.logout` | Đăng xuất | Logout |
| `common.header.notifications` | Thông báo | Notifications |
| `common.header.quickActions` | Hành động nhanh | Quick actions |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| (none) | - | Homepage hiện tại là static content — không cần API | - |

> **Note**: Award categories và event info có thể hardcode ban đầu. Nếu cần dynamic content, thêm API sau.

---

## Success Criteria *(mandatory)*

- **SC-001**: Trang Homepage PHẢI load và hiển thị đầy đủ trong ≤ 3 giây trên mạng 3G
- **SC-002**: Countdown PHẢI cập nhật đúng real-time (±1 phút)
- **SC-003**: Tất cả navigation links PHẢI hoạt động đúng
- **SC-004**: Lighthouse Performance score ≥ 85 trên desktop
- **SC-005**: Trang PHẢI hiển thị đúng ở cả 2 ngôn ngữ (VI, EN)

---

## Out of Scope

- Nội dung chi tiết từng giải thưởng (trang Awards Information riêng)
- Chức năng viết Kudos (trang Sun* Kudos riêng)
- Panel thông báo chi tiết (spec riêng)
- Widget button menu options (spec riêng)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Login page implemented (redirect logic)
- [ ] Awards Information page (navigation target)
- [ ] Sun* Kudos page (navigation target)

---

## Notes

- Design width: 1512px (khác Login 1440px — cần verify responsive behavior)
- Header ở Homepage có navigation links đầy đủ (khác Login chỉ có logo + language)
- Background artwork cần media file từ Figma (node `2167:9027`)
- 6 award thumbnails cần media files riêng
- Countdown target date: cần env var `NEXT_PUBLIC_EVENT_DATE` (ISO-8601)
- Sun* Kudos section có ảnh minh họa bên phải
- Footer ở Homepage có nhiều links hơn Login (thêm nav links + "Tiêu chuẩn chung")
- Widget button (FAB) là component mới — pill shape 105x64px, nền vàng, icon bút chì + SAA icon
