# Feature Specification: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-24
**Status**: Reviewed

---

## Overview

Màn hình Login là điểm vào (entry point) của ứng dụng SAA 2025 (Sun Annual Awards). Giao diện hiển thị hero banner "ROOT FURTHER" cùng nút đăng nhập bằng Google. Người dùng chưa xác thực sẽ thấy trang này; người đã xác thực sẽ được redirect đến trang chính.

Màn hình bao gồm:
- Header với logo SAA 2025 và bộ chọn ngôn ngữ (VN/EN)
- Hero section với key visual, mô tả và nút "LOGIN With Google"
- Background artwork toàn màn hình
- Footer bản quyền

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Đăng nhập bằng Google (Priority: P1)

Là người dùng SAA 2025, tôi muốn đăng nhập bằng tài khoản Google để truy cập vào hệ thống và khám phá nội dung sự kiện.

**Why this priority**: Đây là chức năng cốt lõi duy nhất của màn hình. Không có đăng nhập, người dùng không thể sử dụng ứng dụng.

**Independent Test**: Mở trang Login, click nút "LOGIN With Google", hoàn thành OAuth flow, xác nhận redirect thành công đến trang chính.

**Acceptance Scenarios**:

1. **Given** người dùng chưa đăng nhập truy cập trang Login, **When** click nút "LOGIN With Google", **Then** hệ thống mở Google OAuth consent screen
2. **Given** người dùng đã chọn tài khoản Google `@sun-asterisk.com` và cấp quyền, **When** Google trả về thông tin xác thực, **Then** hệ thống tạo session và redirect đến Homepage SAA
3. **Given** người dùng chọn tài khoản Google không thuộc domain `@sun-asterisk.com`, **When** OAuth callback trả về, **Then** hệ thống hiển thị toast error "Tài khoản Google này không được phép truy cập" và không tạo session
4. **Given** người dùng đã đăng nhập từ trước, **When** truy cập URL trang Login, **Then** hệ thống tự động redirect đến Homepage SAA (không hiện trang Login)
5. **Given** người dùng đang ở trang Login, **When** click nút "LOGIN With Google", **Then** nút chuyển sang trạng thái loading (disabled + spinner) trong khi xử lý

---

### User Story 2 - Chuyển đổi ngôn ngữ (Priority: P2)

Là người dùng, tôi muốn chuyển đổi ngôn ngữ hiển thị giữa tiếng Việt và tiếng Anh để sử dụng ứng dụng bằng ngôn ngữ mình quen thuộc.

**Why this priority**: Hỗ trợ đa ngôn ngữ là yêu cầu bắt buộc theo constitution (Principle V), nhưng không ảnh hưởng đến chức năng đăng nhập chính.

**Independent Test**: Mở trang Login, click vào language selector "VN", chọn "EN" từ dropdown, xác nhận tất cả text trên trang chuyển sang tiếng Anh.

**Acceptance Scenarios**:

1. **Given** ngôn ngữ mặc định là tiếng Việt (VN), **When** người dùng click vào language selector, **Then** hiển thị dropdown với các tùy chọn ngôn ngữ (VN, EN)
2. **Given** dropdown ngôn ngữ đang mở, **When** người dùng chọn "EN", **Then** toàn bộ text trên trang chuyển sang tiếng Anh, icon cờ chuyển thành cờ UK (Union Jack), label chuyển thành "EN"
3. **Given** người dùng đã chọn ngôn ngữ EN, **When** reload trang, **Then** ngôn ngữ EN vẫn được giữ nguyên (lưu preference)

---

### User Story 3 - Hiển thị trang Login responsive (Priority: P2)

Là người dùng truy cập từ thiết bị di động hoặc tablet, tôi muốn trang Login hiển thị đẹp và sử dụng được trên mọi kích thước màn hình.

**Why this priority**: Constitution (Principle III) yêu cầu responsive bắt buộc, và người dùng thực tế truy cập từ nhiều thiết bị khác nhau.

**Independent Test**: Mở trang Login trên mobile (< 768px), tablet (768-1024px) và desktop (> 1024px), xác nhận layout phù hợp và nút đăng nhập hoạt động ở mọi breakpoint.

**Acceptance Scenarios**:

1. **Given** người dùng mở trang Login trên mobile (< 768px), **When** trang load xong, **Then** layout hiển thị đúng: logo thu nhỏ, key visual scale phù hợp, nút login full-width, touch target >= 44px
2. **Given** người dùng mở trang Login trên tablet (768-1024px), **When** trang load xong, **Then** layout hiển thị cân đối với spacing phù hợp
3. **Given** người dùng mở trang Login trên desktop (> 1024px), **When** trang load xong, **Then** layout hiển thị đúng theo Figma design (1440px)

---

### Edge Cases

- Khi Google OAuth bị lỗi (mạng, từ chối quyền): Hiển thị thông báo lỗi rõ ràng, cho phép thử lại
- Khi Google account không thuộc domain `@sun-asterisk.com`: Hiển thị thông báo "Tài khoản Google này không được phép truy cập" (toast notification)
- Khi trang Login mất kết nối mạng: Nút login vẫn hiển thị nhưng thông báo lỗi khi click
- Khi user click nút Login nhiều lần liên tiếp: Chỉ xử lý request đầu tiên, nút disabled sau click đầu
- Khi Supabase Auth service không khả dụng: Hiển thị thông báo lỗi hệ thống

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A_Header | `662:14391` | Thanh header chứa logo và language selector, nền bán trong suốt | Cố định trên đầu trang |
| A.1_Logo | `I662:14391;186:2166` | Logo "Sun Annual Awards 2025", 52x56px | Không tương tác |
| A.2_Language | `I662:14391;186:1601` | Nút chọn ngôn ngữ "VN" với cờ và chevron | Click mở dropdown |
| B_Bìa | `662:14393` | Hero section chứa key visual, mô tả, nút login | - |
| B.1_Key Visual | `662:14395` | Logo "ROOT FURTHER" 451x200px | Không tương tác |
| B.2_content | `662:14753` | Text mô tả 2 dòng | Không tương tác |
| B.3_Login | `662:14425` | Nút "LOGIN With Google" màu vàng 305x60px | Click → Google OAuth; Hover → hiệu ứng nâng/shadow; Loading state |
| C_Keyvisual | `662:14388` | Background artwork toàn màn hình | Không tương tác |
| D_Footer | `662:14447` | Footer bản quyền "Bản quyền thuộc về Sun* © 2025" | Không tương tác |

### Navigation Flow

- **From**: URL trực tiếp (entry point) hoặc redirect từ protected routes
- **To**: Homepage SAA (`2167:9026`) sau khi đăng nhập thành công
- **Triggers**:
  - Click "LOGIN With Google" → Google OAuth → redirect đến Homepage SAA
  - Click Language selector → Mở dropdown chọn ngôn ngữ (frame `721:4942`)

### Visual Requirements

- **Responsive breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- **Animations/Transitions**:
  - Nút Login: hover effect (nâng nhẹ + shadow)
  - Nút Login: loading state với spinner khi đang xử lý
  - Language dropdown: fade-in/out khi mở/đóng
- **Accessibility**: WCAG AA — color contrast tối thiểu 4.5:1 cho text
- **Chi tiết design**: Xem `design-style.md`

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI hiển thị nút "LOGIN With Google" cho phép đăng nhập qua Google OAuth sử dụng Supabase Auth. Chỉ chấp nhận email có domain `@sun-asterisk.com`
- **FR-002**: Hệ thống PHẢI redirect người dùng đã đăng nhập sang trang chính khi truy cập trang Login
- **FR-003**: Hệ thống PHẢI hiển thị trạng thái loading trên nút Login khi đang xử lý xác thực
- **FR-004**: Hệ thống PHẢI hỗ trợ chuyển đổi ngôn ngữ giữa tiếng Việt (VI) và tiếng Anh (EN)
- **FR-005**: Hệ thống PHẢI lưu preference ngôn ngữ của người dùng bằng cookie (không dùng localStorage — cần server-side readable cho SSR)
- **FR-006**: Hệ thống PHẢI hiển thị thông báo lỗi rõ ràng khi đăng nhập thất bại
- **FR-007**: Hệ thống PHẢI hiển thị header với logo SAA 2025 và footer bản quyền

### Technical Requirements

- **TR-001**: Thời gian load trang Login PHẢI dưới 3 giây trên mạng 3G
- **TR-002**: Xác thực PHẢI sử dụng Supabase Auth với Google OAuth provider qua `@supabase/ssr` (cookie-based session, không localStorage). Server-side PHẢI validate email domain `@sun-asterisk.com` sau OAuth callback
- **TR-003**: Trang Login PHẢI tương thích với Cloudflare Workers edge runtime
- **TR-004**: Background image PHẢI được tối ưu (next/image hoặc lazy loading) để không ảnh hưởng LCP
- **TR-005**: Tất cả text PHẢI được externalize vào translation files (vi.json, en.json)

### Key Entities *(if feature involves data)*

- **User Session**: Supabase Auth session chứa user info, access token, refresh token — quản lý qua cookie

---

## State Management

### Local Component State

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `isLoading` | `boolean` | `false` | Login button loading state — `true` khi đang xử lý OAuth |
| `error` | `string \| null` | `null` | Thông báo lỗi đăng nhập (null = không lỗi) |
| `langDropdownOpen` | `boolean` | `false` | Trạng thái mở/đóng dropdown ngôn ngữ |

### Global State

| State | Storage | Description |
|-------|---------|-------------|
| `locale` | Cookie (`lang`) | Ngôn ngữ hiện tại: `"vi"` hoặc `"en"`. Server-side readable cho SSR |
| `session` | Cookie (Supabase SSR) | Auth session — quản lý hoàn toàn bởi `@supabase/ssr` |

### Loading & Error States

- **Loading**: Khi `isLoading = true`, nút Login hiển thị spinner, disabled, opacity giảm
- **Error**: Khi `error` có giá trị, hiển thị error toast/banner phía trên nút Login
- **Error tự động ẩn**: Sau 5 giây hoặc khi user click dismiss
- **Retry**: Sau lỗi, user có thể click lại nút Login (nút trở về trạng thái default)

---

## Error Messages

| Error Code | Thông báo (VI) | Thông báo (EN) | i18n Key |
|------------|----------------|----------------|----------|
| OAuth cancelled | Đăng nhập đã bị hủy. Vui lòng thử lại. | Login was cancelled. Please try again. | `login.error.cancelled` |
| OAuth failed | Đăng nhập thất bại. Vui lòng thử lại sau. | Login failed. Please try again later. | `login.error.failed` |
| Network error | Không có kết nối mạng. Vui lòng kiểm tra và thử lại. | No internet connection. Please check and try again. | `login.error.network` |
| Domain restricted | Tài khoản Google này không được phép truy cập. | This Google account is not authorized. | `login.error.unauthorized` |
| Service unavailable | Hệ thống đang bảo trì. Vui lòng quay lại sau. | System is under maintenance. Please come back later. | `login.error.serviceUnavailable` |

**Hiển thị**: Error message hiển thị dạng toast notification phía trên nút Login, nền semi-transparent dark, text white, icon cảnh báo bên trái.

---

## i18n Translation Keys

| Key | VI | EN |
|-----|----|----|
| `login.hero.description.line1.before` | Bắt đầu hành trình của bạn cùng  | Start your journey with  |
| `login.hero.description.line1.highlight` | SAA 2025 | SAA 2025 |
| `login.hero.description.line1.after` | . | . |
| `login.hero.description.line2` | Đăng nhập để khám phá! | Login to explore! |
| `login.button.loginWithGoogle` | ĐĂNG NHẬP với Google | LOGIN With Google |
| `login.button.ariaLabel` | Đăng nhập bằng Google | Sign in with Google |
| `login.button.loading` | Đang tải... | Loading... |
| `login.error.cancelled` | Đăng nhập đã bị hủy. Vui lòng thử lại. | Login was cancelled. Please try again. |
| `login.error.failed` | Đăng nhập thất bại. Vui lòng thử lại sau. | Login failed. Please try again later. |
| `login.error.network` | Không có kết nối mạng. Vui lòng kiểm tra và thử lại. | No internet connection. Please check and try again. |
| `login.error.unauthorized` | Tài khoản Google này không được phép truy cập. | This Google account is not authorized. |
| `login.error.serviceUnavailable` | Hệ thống đang bảo trì. Vui lòng quay lại sau. | System is under maintenance. Please come back later. |
| `common.header.language.vi` | VN | VN |
| `common.header.language.en` | EN | EN |
| `common.header.language.ariaLabel` | Chọn ngôn ngữ | Select language |
| `common.footer.copyright` | Bản quyền thuộc về Sun* © 2025 | Copyright belongs to Sun* © 2025 |

---

## Accessibility Requirements

### Keyboard Navigation

- **Tab order**: Logo (skip, non-interactive) → Language selector → Login button
- **Enter/Space**: Kích hoạt nút Login và Language selector
- **Escape**: Đóng language dropdown nếu đang mở
- **Arrow Up/Down**: Điều hướng trong language dropdown khi đang mở

### Focus Management

- Trang load xong → focus tự động vào nút Login (primary action)
- Language dropdown mở → focus vào option đầu tiên
- Language dropdown đóng → focus trở lại Language selector button
- Sau lỗi đăng nhập → focus quay lại nút Login

### ARIA Attributes

| Element | ARIA | Value |
|---------|------|-------|
| Login button | `role` | `button` (implicit) |
| Login button | `aria-label` | `login.button.ariaLabel` ("Đăng nhập bằng Google" / "Sign in with Google") |
| Login button (loading) | `aria-busy` | `true` |
| Login button (loading) | `aria-disabled` | `true` |
| Language selector | `aria-haspopup` | `listbox` |
| Language selector | `aria-expanded` | `true/false` |
| Language selector | `aria-label` | `common.header.language.ariaLabel` ("Chọn ngôn ngữ" / "Select language") |
| Language dropdown | `role` | `listbox` |
| Language option | `role` | `option` |
| Language option | `aria-selected` | `true/false` |
| Error message | `role` | `alert` |
| Error message | `aria-live` | `assertive` |

### Screen Reader

- Background image PHẢI có `aria-hidden="true"` (decorative)
- Key visual "ROOT FURTHER" PHẢI có `alt` text phù hợp: "ROOT FURTHER - Sun Annual Awards 2025"
- Logo PHẢI có `alt`: "Sun Annual Awards 2025"
- Google icon PHẢI có `aria-hidden="true"` (text label đủ)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/auth/callback` | GET | Supabase OAuth callback handler — nhận authorization code và exchange lấy session | New (predicted) |
| `/api/auth/login` | POST | Server action khởi tạo Google OAuth flow qua Supabase | New (predicted) |

> **Note**: Supabase Auth SDK xử lý phần lớn OAuth flow. Các endpoint trên là Next.js route handlers/server actions hỗ trợ.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% người dùng có tài khoản Google PHẢI đăng nhập thành công trong ≤ 2 click (click Login → chọn Google account)
- **SC-002**: Trang Login PHẢI đạt Lighthouse Performance score ≥ 90 trên desktop
- **SC-003**: Thời gian từ click Login đến redirect hoàn thành PHẢI ≤ 5 giây (bao gồm Google OAuth)
- **SC-004**: Trang PHẢI hiển thị đúng ở cả 2 ngôn ngữ (VI, EN) không thiếu text nào

---

## Out of Scope

- Đăng nhập bằng email/password hoặc các provider khác (GitHub, Facebook, v.v.)
- Đăng ký tài khoản mới (sign up)
- Forgot password / reset password
- Nội dung chi tiết của dropdown ngôn ngữ (sẽ spec riêng nếu cần, frame `721:4942`)
- Trang dashboard sau khi đăng nhập
- Remember me / keep logged in toggle

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- Design sử dụng font **Montserrat** (body) và **Montserrat Alternates** (footer) — cần load từ Google Fonts
- Background artwork là ảnh tĩnh, cần media file từ Figma (node `662:14389`)
- Key visual "ROOT FURTHER" là ảnh (node `2939:9548`), không phải text — cần media file
- Logo SAA 2025 cũng là ảnh (node `I662:14391;178:1033;178:1030`) — cần media file
- Google icon trong nút Login cũng là media asset (node `I662:14426;186:1766`)
- Language selector hiện hiển thị cờ Việt Nam — cần asset cho các cờ khác (EN)
- Gradient overlays: left-to-right (#00101A → transparent) và bottom-to-top (#00101A → transparent) để tạo hiệu ứng đọc text trên background
