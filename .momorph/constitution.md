<!--
Sync Impact Report
===================
- Version change: N/A → 1.0.0 (initial creation)
- Added principles:
  1. Clean Code & Organization
  2. Test-First Development (TDD)
  3. Responsive Design
  4. Security (OWASP)
  5. Internationalization (i18n) — VI + EN mandatory
  6. Simplicity & Best Practices
- Added sections:
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
- Templates requiring updates:
  - .momorph/templates/plan-template.md ✅ (aligned — Constitution Compliance Check present)
  - .momorph/templates/spec-template.md ✅ (aligned — responsive breakpoints, accessibility sections present)
  - .momorph/templates/tasks-template.md ✅ (aligned — TDD enforcement, polish phase with security/accessibility)
- Follow-up TODOs: None
-->

# Agentic Coding Live Demo Constitution

## Core Principles

### I. Clean Code & Organization

Toàn bộ source code PHẢI sạch, dễ đọc và được tổ chức rõ ràng:

- Tuân thủ quy tắc đặt tên nhất quán: `camelCase` cho biến/hàm, `PascalCase` cho component/type, `kebab-case` cho file/folder
- Mỗi file chỉ chứa một component. Các file liên quan (component, hook, types) PHẢI được đặt cùng thư mục theo feature
- Sử dụng path alias `@/*` cho tất cả import từ `src/`. Không dùng relative path vượt quá một cấp cha (`../../`)
- Mỗi hàm PHẢI có một trách nhiệm duy nhất (Single Responsibility)
- Không lặp code. Logic dùng chung PHẢI được trích xuất vào `src/libs/` hoặc `src/hooks/`
- TypeScript strict mode là BẮT BUỘC. Không dùng `any` trừ khi có comment giải thích rõ ràng
- Xóa dead code, import không dùng, và code bị comment trước khi commit

### II. Test-First Development (TDD)

TDD là KHÔNG THƯƠNG LƯỢNG cho mọi tính năng:

- Chu trình Red-Green-Refactor PHẢI được tuân thủ nghiêm ngặt:
  1. Viết test thất bại trước để định nghĩa hành vi mong muốn
  2. Viết code tối thiểu để test pass
  3. Refactor trong khi giữ test xanh
- Unit test cho tất cả utility functions, hooks và business logic
- Unit test cho tất cả UI components (bao gồm cả components render-only)
- Integration test cho API routes và tương tác với Supabase
- Mỗi user story PHẢI có acceptance test được định nghĩa trước khi implement
- Test PHẢI được đặt trong thư mục `__tests__/` cùng cấp với source code, hoặc trong `tests/` ở root cho integration/e2e
- **Test enforcement khi sửa code**: Mọi thay đổi code (implement mới, sửa bug, refactor) PHẢI đảm bảo:
  1. File đang sửa ĐÃ CÓ unit test. Nếu chưa có → viết test trước hoặc cùng lúc
  2. Chạy `npx vitest run` sau khi sửa → tất cả test PHẢI pass
  3. Không được merge/commit code mà test đang fail

### III. Responsive Design

Mọi UI component và page PHẢI responsive trên tất cả kích thước màn hình:

- Hỗ trợ tối thiểu ba breakpoint:
  - **Mobile**: < 768px (ưu tiên mobile-first)
  - **Tablet**: 768px – 1024px
  - **Desktop**: > 1024px
- Sử dụng Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) theo hướng mobile-first
- Không dùng fixed width cho container — sử dụng `max-w-*`, `w-full`, flexbox/grid
- Tất cả phần tử tương tác PHẢI có touch target tối thiểu 44x44px trên mobile
- Kiểm tra mọi màn hình/component mới tại cả ba breakpoint trước khi đánh dấu hoàn thành
- **Logo size cố định**: Logo ở Header và Footer PHẢI giữ nguyên kích thước (52x48px) trên mọi breakpoint — KHÔNG được thu nhỏ khi responsive
- **Vertical alignment**: Header, page content và Footer PHẢI thẳng hàng theo chiều dọc trên mọi màn hình. Đạt được bằng cách sử dụng cùng CSS variable cho horizontal padding (`--spacing-page-x` cho desktop, `px-4` cho mobile, `px-12` cho tablet)

### IV. Security (OWASP)

Toàn bộ code PHẢI tuân thủ OWASP secure coding practices:

- **Input Validation**: Validate và sanitize TẤT CẢ input từ người dùng ở cả client và server. Sử dụng Zod hoặc schema validation tương đương
- **Authentication**: Chỉ sử dụng Supabase Auth. Không lưu token trong localStorage — dùng `@supabase/ssr` cho cookie-based session
- **Authorization**: Bắt buộc Row Level Security (RLS) cho mọi table trong Supabase. Không tin tưởng authorization phía client
- **XSS Prevention**: Không dùng `dangerouslySetInnerHTML`. Escape nội dung động trong template
- **CSRF**: Tận dụng Supabase SSR cookie-based auth với SameSite attributes
- **Secrets Management**: Không để secret trong source code. Dùng Cloudflare Workers environment variables và Supabase service role keys chỉ trên server
- **Dependency Security**: Audit dependencies thường xuyên với `yarn audit`. Không dùng package có lỗ hổng critical đã biết
- **API Security**: Rate limiting, HTTP headers phù hợp (CSP, HSTS, X-Frame-Options) qua Cloudflare Workers hoặc Next.js middleware
- **SQL Injection**: Chỉ dùng Supabase client SDK hoặc parameterized queries. Không nối chuỗi user input vào query

### V. Internationalization (i18n)

Mọi tính năng PHẢI hỗ trợ đa ngôn ngữ tiếng Việt (VI) và tiếng Anh (EN) ngay từ đầu:

- Tất cả chuỗi hiển thị cho người dùng PHẢI được tách ra translation files — không hardcode text trong component
- Quy tắc đặt tên key: `screen.section.element` (ví dụ: `login.form.emailLabel`)
- File translation PHẢI được tổ chức theo locale trong `src/libs/i18n/locales/`:
  - `vi.json` — Tiếng Việt (locale mặc định)
  - `en.json` — Tiếng Anh
- Cả hai file `vi.json` và `en.json` PHẢI được cập nhật đồng thời khi thêm tính năng mới. Không được thiếu key ở bất kỳ locale nào
- Mọi component mới PHẢI sử dụng translation hook/function — cấm dùng string literal trực tiếp trong JSX cho text hiển thị
- Định dạng ngày, số, tiền tệ PHẢI tuân theo locale đang hoạt động

### VI. Simplicity & Best Practices

Tuân theo best practices của nền tảng và giữ giải pháp tối giản:

- **Next.js**: Dùng App Router. Ưu tiên Server Components mặc định; chỉ dùng `"use client"` khi cần client interactivity. Dùng `next/image` cho ảnh, `next/link` cho navigation
- **Cloudflare Workers**: Tuân thủ edge runtime — không dùng Node.js-only APIs. Dùng patterns của `@opennextjs/cloudflare`. Giữ bundle size tối thiểu
- **Supabase**: Dùng typed client từ database schema. Ưu tiên server-side Supabase client cho data mutations. Dùng realtime subscriptions có chọn lọc
- **Tailwind CSS**: Dùng utility classes trực tiếp. Tránh `@apply` trừ global styles. Dùng CSS custom properties cho theme values
- **YAGNI**: Không xây dựng feature, abstraction hay utility cho đến khi thực sự cần. Ba dòng code tương tự tốt hơn một abstraction vội vàng
- **Dependencies**: Giảm thiểu third-party packages. Mỗi dependency mới PHẢI được justify. Ưu tiên built-in browser/platform APIs

## Technology Stack & Constraints

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript (strict mode) | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database & Auth | Supabase (supabase-js + SSR) | 2.x |
| Deployment | Cloudflare Workers (@opennextjs/cloudflare) | - |
| Package Manager | Yarn | 1.22 |
| Linting | ESLint (eslint-config-next) | 9.x |
| Build | Turbopack (dev), Webpack (prod via Next.js) | - |

### Folder Structure

```text
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Trang chủ
│   ├── globals.css         # Global styles
│   └── [feature]/          # Feature routes
│       ├── page.tsx
│       └── layout.tsx
├── components/             # Shared UI components
│   └── [feature]/          # Feature-specific components
├── hooks/                  # Custom React hooks
├── libs/                   # Shared libraries and utilities
│   ├── supabase/           # Supabase client configuration
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Auth middleware
│   └── i18n/               # Internationalization
│       ├── config.ts       # i18n configuration
│       └── locales/        # Translation files
│           ├── vi.json     # Tiếng Việt (mặc định)
│           └── en.json     # English
├── types/                  # Shared TypeScript types
└── services/               # API/business logic services
```

### Constraints

- Tương thích edge runtime là BẮT BUỘC — không dùng Node.js-only APIs trong code deploy
- Tất cả environment variables PHẢI được truy cập qua Cloudflare Workers bindings hoặc Next.js `env`
- Thay đổi database schema PHẢI đi qua Supabase migrations (`supabase/migrations/`)
- Theo dõi bundle size mỗi route: tối ưu nếu vượt 200KB gzipped

## Development Workflow

### Code Quality Gates

1. **Pre-commit**: ESLint PHẢI pass với zero errors. Warnings NÊN được giải quyết
2. **Pre-merge**: Tất cả test PHẢI pass. Không giảm test coverage
3. **Review**: Mọi PR PHẢI được review đối chiếu constitution compliance

### Commit Conventions

- Dùng conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- Mỗi commit NÊN là atomic — một thay đổi logic cho mỗi commit
- Commit message PHẢI mô tả "tại sao", không chỉ "cái gì"

### Development Commands

```bash
yarn dev          # Khởi động dev server (Turbopack)
yarn build        # Build production
yarn lint         # Chạy ESLint
yarn deploy       # Build và deploy lên Cloudflare
yarn cf-typegen   # Generate Cloudflare environment types
```

### TDD Workflow cho mỗi Feature

1. Đọc và hiểu `spec.md`
2. Viết failing acceptance tests
3. Implement code tối thiểu để pass
4. Refactor trong khi test vẫn xanh
5. Kiểm tra responsive tại tất cả breakpoints
6. Kiểm tra i18n: cả `vi.json` và `en.json` đều đầy đủ key mới
7. Chạy security checklist (các mục OWASP ở trên)
8. Submit để review

## Governance

- Constitution này là nguồn chân lý duy nhất cho mọi quyết định phát triển trong dự án
- Tất cả PR và code review PHẢI xác minh tuân thủ các nguyên tắc này
- Sửa đổi constitution yêu cầu:
  1. Đề xuất bằng văn bản mô tả thay đổi và lý do
  2. Review và phê duyệt bởi project lead
  3. Version bump theo semantic versioning
  4. Cập nhật tất cả template liên quan nếu bị ảnh hưởng
- Ngoại lệ cho bất kỳ nguyên tắc nào PHẢI được ghi chú inline: `// CONSTITUTION EXCEPTION: <lý do>`
- Dùng `.momorph/constitution.md` làm tham chiếu chính trong plan review và task breakdown

**Version**: 1.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
