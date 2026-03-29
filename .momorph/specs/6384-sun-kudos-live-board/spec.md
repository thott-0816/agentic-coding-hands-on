# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**MoMorph Frame ID**: `6384`
**Created**: 2026-03-27
**Status**: Reviewed

---

## Overview

Trang Sun* Kudos Live Board (`/kudos`) hiển thị hệ thống ghi nhận và cảm ơn nội bộ Sun*. Trang gồm 4 phần chính:

1. **KV Banner** — Hero banner với tiêu đề "Hệ thống ghi nhận lời cảm ơn" + logo KUDOS + ô nhập để mở form gửi Kudos
2. **Highlight Kudos** — Carousel hiển thị TOP Kudos có nhiều lượt tim nhất, có filter theo Hashtag/Phòng ban
3. **Spotlight Board** — Bảng word cloud/diagram tương tác hiển thị tên người nhận Kudos, có tìm kiếm và pan/zoom
4. **All Kudos** — Feed danh sách tất cả Kudos (bên trái) + Sidebar thống kê và "10 Sunner nhận quà mới nhất" (bên phải)

Route: `/kudos` — nằm trong layout `(main)` với header full + footer full + FAB.

---

## User Scenarios & Testing

### User Story 1 - Xem danh sách All Kudos (Priority: P1)

Người dùng truy cập trang `/kudos` để xem tất cả lời cảm ơn từ đồng nghiệp. Mỗi Kudos hiển thị: người gửi, người nhận, thời gian, nội dung (tối đa 5 dòng), ảnh đính kèm, hashtag, lượt tim, nút Copy Link.

**Why this priority**: Chức năng cốt lõi — hiển thị feed Kudos là mục đích chính của trang.

**Independent Test**: Truy cập `/kudos`, xác nhận danh sách Kudos hiển thị đầy đủ thông tin.

**Acceptance Scenarios**:

1. **Given** có Kudos trong hệ thống, **When** truy cập trang, **Then** hiển thị feed Kudos mới nhất trước
2. **Given** mỗi Kudos card, **When** nhìn vào card, **Then** thấy: avatar+tên+phòng ban người gửi, avatar+tên+phòng ban người nhận, thời gian (HH:mm - MM/DD/YYYY), nội dung (tối đa 5 dòng + "..."), hashtag, ảnh đính kèm (nếu có), số lượt tim, nút Copy Link
3. **Given** nội dung Kudos > 5 dòng, **When** hiển thị, **Then** cắt ngắn với "..."
4. **Given** người dùng click "Copy Link" trên Kudos, **When** click, **Then** URL được copy vào clipboard + hiện toast xác nhận

---

### User Story 2 - Highlight Kudos Carousel (Priority: P1)

Carousel hiển thị TOP Kudos có nhiều lượt tim nhất. **Card center nổi bật, 2 card bên trái/phải để mờ (opacity thấp).** Hỗ trợ filter theo Hashtag và Phòng ban qua dropdown. Có nút prev/next và chỉ số trang.

**Why this priority**: Tính năng nổi bật — giúp highlight những Kudos ý nghĩa nhất.

**Independent Test**: Xem carousel, navigate qua các slide, dùng filter.

**Acceptance Scenarios**:

1. **Given** trang load, **When** nhìn phần Highlight, **Then** thấy carousel với 1 card Kudos ở center (full opacity, scale lớn), 2 card hai bên mờ (opacity thấp, scale nhỏ hơn)
2. **Given** carousel hiển thị, **When** click nút tiến, **Then** slide sang card tiếp theo (card center mới nổi bật, card cũ mờ đi), cập nhật chỉ số trang (e.g. "2/5")
3. **Given** đang ở slide 1, **When** click nút lùi, **Then** không chuyển (disable) hoặc wrap to last
4. **Given** có filter "Hashtag", **When** click, **Then** hiện dropdown (Figma `721:5580`) danh sách 13 hashtag: Toàn diện, Giỏi chuyên môn, Hiệu suất cao, Truyền cảm hứng, Cống hiến, Aim High, Be Agile, Wasshoi, Hướng mục tiêu, Hướng khách hàng, Chuẩn quy trình, Giải pháp sáng tạo, Quản lý xuất sắc. Click chọn → filter carousel, item selected có glow effect
5. **Given** có filter "Phòng ban", **When** click, **Then** hiện dropdown (Figma `721:5684`) danh sách ~50 phòng ban (CTO, SPD, FCOV, CEVC1-4, STVC, OPDC, GEU, PAO, IAV, BDV, CPV...). Click chọn → filter carousel theo phòng ban
6. **Given** filter đang active, **When** click filter button lần nữa hoặc chọn "All", **Then** reset filter, hiện lại tất cả

---

### User Story 3 - Sidebar thống kê cá nhân (Priority: P1)

Sidebar bên phải hiển thị thống kê cá nhân: Số Kudos nhận được, đã gửi, số tim nhận được, Secret Box (đã mở/chưa mở) + nút "Mở Secret Box" + Danh sách "10 Sunner nhận quà mới nhất".

**Why this priority**: Gamification — thúc đẩy engagement.

**Independent Test**: Xem sidebar, xác nhận số liệu, click "Mở Secret Box".

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập, **When** xem sidebar, **Then** thấy 5 metrics: Số Kudos nhận, Số Kudos gửi, Số tim nhận được, Số Secret Box đã mở, Số Secret Box chưa mở
2. **Given** có Secret Box chưa mở, **When** click "Mở Secret Box", **Then** mở dialog Secret Box
3. **Given** sidebar load, **When** nhìn phần "10 Sunner nhận quà mới nhất", **Then** thấy danh sách 10 user với avatar, tên, thông tin phụ

---

### User Story 4 - Spotlight Board (Priority: P2)

Bảng word cloud/diagram tương tác hiển thị tên người nhận Kudos. Hỗ trợ tìm kiếm và pan/zoom.

**Why this priority**: Tính năng phụ trợ — visualization thú vị nhưng không phải core.

**Independent Test**: Xem Spotlight, tìm kiếm tên, pan/zoom.

**Acceptance Scenarios**:

1. **Given** trang load, **When** nhìn Spotlight, **Then** thấy bảng tổng "388 KUDOS" + word cloud tên người nhận
2. **Given** Spotlight hiển thị, **When** gõ tên vào ô tìm kiếm, **Then** highlight người tương ứng trên board (max 100 chars)
3. **Given** Spotlight hiển thị, **When** click toggle pan/zoom, **Then** chuyển đổi giữa mode pan và zoom

---

### User Story 5 - KV Banner + Mở form gửi Kudos (Priority: P2)

Hero banner với tiêu đề và ô nhập "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" — click vào mở modal viết Kudos.

**Why this priority**: Entry point phụ cho viết Kudos (FAB là entry chính).

**Independent Test**: Click ô nhập, xác nhận modal viết Kudos mở.

**Acceptance Scenarios**:

1. **Given** trang load, **When** nhìn hero banner, **Then** thấy tiêu đề "Hệ thống ghi nhận lời cảm ơn" + logo KUDOS
2. **Given** banner hiển thị, **When** click ô nhập, **Then** mở modal viết Kudos (liên kết với spec `7052-viet-kudos`)

---

### User Story 6 - Tương tác tim (heart) trên Kudos (Priority: P2)

Mỗi Kudos có nút tim. Click để thả tim, click lại để bỏ tim. Hiển thị tổng số tim. Dùng optimistic update.

**Why this priority**: Engagement feature — tăng tương tác nhưng không ảnh hưởng core flow.

**Independent Test**: Click tim trên Kudos card, xác nhận state toggle và count thay đổi.

**Acceptance Scenarios**:

1. **Given** Kudos hiển thị với nút tim xám (chưa like), **When** click tim, **Then** tim chuyển đỏ ngay (optimistic), count +1, gửi API
2. **Given** đã tim rồi (tim đỏ), **When** click lại, **Then** tim chuyển xám, count -1
3. **Given** API trả lỗi sau optimistic update, **When** request fail, **Then** revert UI về trạng thái trước
4. **Given** chưa đăng nhập, **When** truy cập `/kudos`, **Then** redirect về `/login` (trang yêu cầu auth)

---

### User Story 7 - i18n + Responsive (Priority: P2)

Trang hỗ trợ VI/EN và responsive trên mobile/tablet/desktop.

**Why this priority**: Constitution bắt buộc (Principle III + V).

**Independent Test**: Chuyển ngôn ngữ, kiểm tra labels. Resize browser, kiểm tra layout thay đổi.

**Acceptance Scenarios**:

1. **Given** ngôn ngữ EN, **When** trang load, **Then** tiêu đề và labels hiển thị EN
2. **Given** mobile (<768px), **When** trang load, **Then** sidebar ẩn hoặc collapse dưới feed, feed full-width, carousel 1 card + swipe
3. **Given** tablet (768-1279px), **When** trang load, **Then** sidebar collapse dưới feed, carousel 3 cards visible
4. **Given** desktop (≥1280px), **When** trang load, **Then** layout 2 cột: feed bên trái + sidebar sticky bên phải

---

### Edge Cases

- **Carousel**: nút lùi disabled ở slide đầu, nút tiến disabled ở slide cuối
- **Kudos card**: nội dung empty → không hiển thị card
- **Ảnh đính kèm**: nhiều ảnh → hiển thị horizontal scroll thumbnails
- **Spotlight**: quá nhiều tên → cần zoom out tự động
- **Auth**: Trang `/kudos` yêu cầu đăng nhập — chưa đăng nhập → redirect về `/login`
- **Heart**: optimistic update → revert nếu API fail
- **Pagination**: Hiển thị tối đa 4 Kudos ban đầu, sau đó dùng nút "Load more" (page size = 4)
- **Loading states**: Skeleton loading cho feed, carousel, sidebar khi fetch data
- **Error states**: Hiển thị retry button nếu API fail, toast cho network errors
- **Empty states**: "Chưa có Kudos nào" nếu feed trống, "Không có kết quả" nếu filter trả empty
- **Filter combination**: Hashtag + Phòng ban có thể active đồng thời (AND logic)
- **Profile hover**: Debounce 300ms trước khi show preview popup, ẩn khi mouse rời

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| KV Banner | `2940:13437` | Hero banner + logo KUDOS | Readonly |
| Ô nhập ghi nhận | `2940:13449` | Pill input "Hôm nay, bạn muốn gửi..." | Click → mở modal viết Kudos |
| Highlight Header | `2940:13452` | Title "HIGHLIGHT KUDOS" + filters | Filter buttons |
| Button Hashtag | `2940:13459` | Filter dropdown hashtag (13 tags) | Click → dropdown `563:8026` |
| Button Phòng ban | `2940:13460` | Filter dropdown phòng ban (~50 depts) | Click → dropdown `563:8027` |
| Dropdown Hashtag | `563:8026` | List 13 hashtag, single-select, scrollable | Click item → filter + close |
| Dropdown Phòng ban | `563:8027` | List ~50 phòng ban, single-select, scrollable | Click item → filter + close |
| Highlight Carousel | `2940:13461` | Center-focus carousel: 1 card nổi bật, 2 bên mờ | Swipe/click navigate |
| Carousel Prev/Next | `2940:13468`, `2940:13470` | Arrow buttons | Click navigate |
| Pagination | `2940:13471` | "2/5" + prev/next buttons | Click navigate |
| Spotlight Board | `2940:14174` | Word cloud diagram | Pan/zoom, search |
| Search Sunner | `2940:14833` | Tìm kiếm input (max 100 chars) | Type to search |
| Pan/Zoom Toggle | `3007:17479` | Toggle pan/zoom mode | Click toggle |
| All Kudos Header | `2940:14221` | Title "ALL KUDOS" | Readonly |
| Kudos Post Card | `3127:21871` | Full kudos card | Heart, Copy Link, hover profile |
| Heart Button | `I3127:21871;256:5175` | Like/unlike | Click toggle |
| Copy Link | `I3127:21871;256:5216` | Copy URL | Click → clipboard |
| Sidebar Stats | `2940:13489` | 5 metrics + Mở Secret Box button | Click button |
| Mở Secret Box | `2940:13497` | Button mở quà | Click → dialog |
| 10 Sunner List | `2940:13510` | Top 10 sunner nhận quà | Readonly |
| Footer | footer | Full nav + copyright | Nav links |

### Navigation Flow

- **From**: Header nav "Sun* Kudos" từ bất kỳ trang nào, hoặc Homepage KudosPromo "Chi tiết" button
- **To**: Profile page (click avatar/tên), Secret Box dialog (click "Mở Secret Box"), Modal Viết Kudos (click ô nhập hoặc FAB)
- **Route**: `/kudos`

### Visual Requirements

- Layout: Full-width, 2-column trên desktop (feed + sidebar)
- Carousel: horizontal scroll/slide, animated transitions
- Spotlight: interactive canvas, pan/zoom capable
- Responsive: sidebar ẩn trên mobile, carousel stack

### Accessibility Requirements

- Carousel: `role="region"`, `aria-label="Highlight Kudos"`, prev/next buttons có `aria-label`, live region cho page indicator
- Dropdowns: `role="listbox"`, items có `role="option"` + `aria-selected`, keyboard nav (ArrowUp/Down, Escape, Enter)
- Heart button: `aria-pressed` (true/false), `aria-label="Like this kudos"` / `aria-label="Unlike this kudos"`
- Copy Link: `aria-label="Copy link"`, announce "Copied" via `aria-live="polite"` toast
- Feed: `role="feed"`, each card `role="article"`, `aria-labelledby` linking to sender name
- Spotlight search: `aria-label`, debounce kết quả, announce matches via `aria-live`
- Focus visible: all interactive elements có focus ring (outline 2px solid #FFEA9E, offset 2px)
- Keyboard: Tab qua carousel controls, Enter/Space to activate, Escape to close dropdowns

### State Management

- **Local state** (Client Components):
  - Carousel: `currentSlide`, `totalSlides`
  - Dropdowns: `isOpen`, `selectedHashtag`, `selectedDepartment`
  - Heart: `isLiked` (per card), `heartsCount` (per card) — optimistic
  - Spotlight: `panMode`, `zoomLevel`, `searchQuery`
- **Server state** (fetched from API):
  - `kudosFeed[]` — load more (page size 10), sort by newest
  - `highlightKudos[]` — top by hearts, filtered
  - `userStats{}` — sidebar metrics
  - `topRecipients[]` — 10 sunner list
  - `spotlightData{}` — word cloud data
- **Loading/Error**: Each section independent loading state (skeleton) + error state (retry button)

---

## Requirements

### Functional Requirements

- **FR-001**: Trang PHẢI hiển thị feed All Kudos với đầy đủ thông tin (người gửi/nhận, nội dung, hashtag, tim, thời gian)
- **FR-002**: Highlight Carousel PHẢI hiển thị TOP Kudos có nhiều tim nhất, **card center nổi bật (full opacity + scale lớn), 2 card hai bên mờ (opacity thấp + scale nhỏ)**
- **FR-003**: Carousel PHẢI có prev/next navigation + chỉ số trang
- **FR-004**: Filter Hashtag PHẢI hiện dropdown 13 hashtag (Figma `721:5580`, Node `563:8026`), item selected có glow + bg highlight
- **FR-005**: Filter Phòng ban PHẢI hiện dropdown ~50 phòng ban (Figma `721:5684`, Node `563:8027`), item selected có glow + bg highlight
- **FR-006**: Cả 2 dropdown PHẢI có scrollable list, đóng khi click outside hoặc Escape hoặc chọn item
- **FR-007**: Sidebar PHẢI hiển thị 5 metrics cá nhân + nút "Mở Secret Box"
- **FR-008**: Sidebar PHẢI hiển thị "10 Sunner nhận quà mới nhất"
- **FR-009**: Mỗi Kudos PHẢI có nút Heart (toggle like/unlike) + nút Copy Link
- **FR-010**: Spotlight Board PHẢI hiển thị word cloud tên người nhận + search + pan/zoom
- **FR-011**: Ô nhập trên banner PHẢI mở modal viết Kudos khi click
- **FR-012**: Nội dung Kudos tối đa 5 dòng trong feed, 3 dòng trong highlight → truncate với "..."
- **FR-013**: Trang PHẢI hỗ trợ i18n VI/EN
- **FR-014**: Hover vào avatar/tên → mở preview profile popup (debounce 300ms)
- **FR-015**: All Kudos feed hiển thị tối đa 4 Kudos ban đầu, sau đó dùng nút "Load more" (page size = 4)
- **FR-019**: Trang `/kudos` YÊU CẦU đăng nhập — chưa auth → redirect về `/login`
- **FR-016**: Loading states: skeleton UI khi fetch data cho feed, carousel, sidebar
- **FR-017**: Error states: retry button khi API fail, toast cho network errors
- **FR-018**: Banner PHẢI có search input "Tìm kiếm profile Sunner" bên phải ô nhập ghi nhận

### Technical Requirements

- **TR-001**: Dữ liệu Kudos từ Supabase với RLS
- **TR-002**: Carousel là Client Component (`"use client"`)
- **TR-003**: Spotlight Board cần canvas/SVG rendering + pan/zoom library
- **TR-004**: "Load more" button cho All Kudos feed (page size = 10)
- **TR-008**: Auth guard: middleware hoặc server-side check → redirect `/login` nếu chưa đăng nhập
- **TR-005**: Heart toggle dùng optimistic update
- **TR-006**: Route: `/kudos` trong layout `(main)`
- **TR-007**: Sidebar sticky trên desktop (giống trang Awards)

### Key Entities

- **Kudo**: id, author_id, recipient_id, content, hashtags[], images[], hearts_count, created_at, updated_at
- **Heart**: id, kudo_id, user_id (unique constraint: 1 heart per user per kudo)
- **SecretBox**: id, user_id, is_opened, opened_at
- **User**: id, name, email, avatar_url, department

---

## i18n Keys (dự kiến)

| Key | VI | EN |
|-----|----|----|
| `kudos.banner.title` | Hệ thống ghi nhận và cảm ơn | Recognition & Appreciation System |
| `kudos.banner.inputPlaceholder` | Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai? | Who would you like to appreciate today? |
| `kudos.banner.searchPlaceholder` | Tìm kiếm profile Sunner | Search Sunner profile |
| `kudos.highlight.subtitle` | Sun* Annual Awards 2025 | Sun* Annual Awards 2025 |
| `kudos.highlight.title` | HIGHLIGHT KUDOS | HIGHLIGHT KUDOS |
| `kudos.highlight.filterHashtag` | Hashtag | Hashtag |
| `kudos.highlight.filterDepartment` | Phòng ban | Department |
| `kudos.spotlight.title` | SPOTLIGHT BOARD | SPOTLIGHT BOARD |
| `kudos.spotlight.searchPlaceholder` | Tìm kiếm | Search |
| `kudos.allKudos.title` | ALL KUDOS | ALL KUDOS |
| `kudos.card.copyLink` | Copy Link | Copy Link |
| `kudos.card.viewDetail` | Xem chi tiết | View detail |
| `kudos.card.copiedToast` | Đã copy link! | Link copied! |
| `kudos.sidebar.kudosReceived` | Số Kudos bạn nhận được | Kudos you received |
| `kudos.sidebar.kudosSent` | Số Kudos bạn đã gửi | Kudos you sent |
| `kudos.sidebar.heartsReceived` | Số tim bạn nhận được | Hearts you received |
| `kudos.sidebar.secretBoxOpened` | Số Secret Box bạn đã mở | Secret Boxes opened |
| `kudos.sidebar.secretBoxRemaining` | Số Secret Box chưa mở | Secret Boxes remaining |
| `kudos.sidebar.openSecretBox` | Mở Secret Box | Open Secret Box |
| `kudos.sidebar.topRecipients` | 10 SUNNER NHẬN QUÀ MỚI NHẤT | 10 LATEST GIFT RECIPIENTS |
| `kudos.empty` | Chưa có Kudos nào | No Kudos yet |
| `kudos.filterEmpty` | Không có kết quả | No results |
| `kudos.loadMore` | Tải thêm | Load more |
| `kudos.error.loadFailed` | Không thể tải dữ liệu | Failed to load data |
| `kudos.error.retry` | Thử lại | Retry |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/kudos` | GET | Lấy danh sách Kudos (phân trang, sort mới nhất) | New (predicted) |
| `/api/kudos/highlights` | GET | Lấy TOP Kudos nhiều tim nhất (filter hashtag/dept) | New (predicted) |
| `/api/kudos/:id/heart` | POST | Toggle heart (like/unlike) | New (predicted) |
| `/api/kudos/stats` | GET | Thống kê cá nhân (kudos sent/received, hearts, boxes) | New (predicted) |
| `/api/kudos/spotlight` | GET | Dữ liệu Spotlight Board (user names + kudos count) | New (predicted) |
| `/api/users/top-recipients` | GET | 10 Sunner nhận quà mới nhất | New (predicted) |
| `/api/secret-box/open` | POST | Mở Secret Box | New (predicted) |

---

## Success Criteria

- **SC-001**: Feed Kudos hiển thị đầy đủ với thông tin chính xác
- **SC-002**: Carousel Highlight hoạt động smooth, filter đúng
- **SC-003**: Sidebar stats hiển thị chính xác cho logged-in user
- **SC-004**: Heart toggle hoạt động real-time
- **SC-005**: Responsive 3 breakpoints
- **SC-006**: i18n VI/EN hoàn chỉnh

---

## Out of Scope

- Viết Kudos (spec riêng: `7052-viet-kudos`)
- Admin quản lý Kudos
- Notification khi nhận Kudos
- Comment/Reply trên Kudos
- Kudos analytics dashboard

---

## Dependencies

- [x] Constitution document
- [x] Layout `(main)` với Header/Footer
- [x] i18n system
- [ ] Supabase database schema cho Kudos, Hearts, SecretBox
- [ ] User profiles với department info
- [ ] Spec `7052-viet-kudos` cho modal viết Kudos
- [x] design-style.md (tạo cùng lúc)

---

## Notes

- Page width 1440px, content padding 144px mỗi bên → content width 1152px
- Section gap 120px giữa các phần lớn
- Highlight Kudos card truncate 3 dòng, All Kudos card truncate 5 dòng
- Spotlight Board có thể cần thư viện canvas (d3.js, react-flow, hoặc custom SVG)
- Thời gian format: "HH:mm - MM/DD/YYYY"
- Carousel pagination format: "2/5"
- Heart states: xám (chưa tim), đỏ (đã tim)
- "10 Sunner nhận quà mới nhất" — realtime hoặc polling
- Liên kết chặt với spec `7052-viet-kudos` (FAB, modal viết Kudos, ô nhập banner)
