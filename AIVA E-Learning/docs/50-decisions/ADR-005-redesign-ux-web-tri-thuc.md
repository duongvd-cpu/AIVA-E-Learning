⬆ Decisions · Bản đồ tài liệu

# ADR-005 — Redesign UX Web Tri thức cho người dùng thật + Onboarding

> Trạng thái: **ACCEPTED** (đã duyệt & triển khai 03/07/2026) · Persona: STRATEGIST + UX
> Liên quan: ADR-004 · 11 Kiến trúc kỹ thuật · 06 Bài học · 12 Học liệu cho AI
> Nhãn nguồn gốc: hiện trạng UI = [OBSERVED] (đối chiếu `static/`); phương án = [PROPOSED].

## Bối cảnh

Web tri thức (`localhost:3000`) hướng tới **người dùng thật là nhân sự Sconnect học việc** — không rành kỹ thuật. UI hiện tại (đối chiếu `static/index.html`, `app.js`, `lessons.js`) đang **nặng tính developer**: danh sách 24 bài phẳng, panel "Kiến Trúc Hệ Thống / nội soi hệ thống", chat stream `tool_call/tool_result` thô, thanh kéo-thả. Cần đơn giản hoá **chức năng + UI/UX** và **thêm onboarding** hướng dẫn khi mới vào — trong khi **giữ nguyên kiến trúc backend** (Orchestrator + 7 sub-agent + endpoints).

## Quyết định (đã chốt với chủ dự án)

| Điểm | Chốt |
|------|------|
| Kiến trúc backend | **Giữ nguyên**; chỉ đổi frontend + additive nhỏ |
| Panel "Kiến trúc hệ thống" (phải) | **Giữ như hiện tại** |
| Lộ trình chính | **16 bài** = GIỮ (10) + CÂN NHẮC (6) theo ADR-004 |
| Rổ LƯỢC (8 bài) | **Ẩn vào nhóm "Nâng cao / Đọc thêm"** (gập lại, không xoá) |
| Phạm vi backend | **Cho phép additive**: thêm field `tier` cho bài học; không đổi orchestration |

## Phân tier bài học (áp cho sidebar)

| Tier | Bài | Hiển thị |
|------|-----|----------|
| `core` (Lộ trình chính, 16) | 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 16, 18 | Mặc định, mở sẵn |
| `advanced` (Nâng cao/Đọc thêm, 8) | 15, 17, 19, 20, 21, 22, 23, 24 | Trong nhóm gập lại |

> Nguồn phân loại: ADR-004 (GIỮ+CÂN NHẮC = core; LƯỢC = advanced).

## Thay đổi cụ thể (theo file)

### Backend (additive, không đổi orchestration)
- `main.py` — `COURSE_MODULES`: thêm `tier` cho mỗi lesson (`core`/`advanced`); `/api/lessons` trả kèm `tier`. Không đụng `chat`, `execute_sub_agent`, skills.

### Frontend
- `static/lessons.js` — render sidebar 2 nhóm: **"Lộ trình chính"** (core, mở) + **"Nâng cao / Đọc thêm"** (advanced, `<details>` gập). Nhãn "Nền tảng/Nâng cao". Progress bar đếm theo `core`.
- `static/index.html` — thêm: (1) **modal onboarding** lần đầu; (2) nút **"Hướng dẫn"** ở navbar; (3) lớp phủ **coach-mark** cho tour; (4) trang "Bắt đầu ở đây" nâng cấp từ `lesson-welcome`.
- `static/app.js` — logic tour (bước, spotlight, cờ `localStorage` `onboarding_seen`); hiển thị **gợi ý câu hỏi** nổi bật khi mở bài (dùng endpoint `/api/lessons/{slug}/suggestions`).
- `static/style.css` / `lessons.css` — style nhóm gập, modal, coach-mark, empty-state; branding Sconnect green (#7FD603).
- (Tuỳ chọn, giữ minh bạch) chat: bọc `tool_call/tool_result` thành trạng thái thân thiện ("Đang tra cứu tài liệu…") + nút "Xem chi tiết kỹ thuật". **Panel phải giữ nguyên** theo quyết định.

## Đặc tả Onboarding (phần Guide)

1. **Modal chào mừng** (lần đầu): "Đây là gì · Học thế nào · 2 nút: Bắt đầu tour / Bỏ qua".
2. **Guided tour 5 bước** (spotlight): (1) Lộ trình bài học → (2) Khung đọc bài → (3) Hỏi AI ở khung chat → (4) "Bôi đen để hỏi" → (5) Panel "AI đang làm gì".
3. **Nút "Hướng dẫn"** ở navbar để xem lại tour bất cứ lúc nào.
4. **Cờ đã xem**: `localStorage.onboarding_seen` (web app thật, dùng được).
5. **Trang "Bắt đầu ở đây"**: mô tả lộ trình 16 bài + mời chọn bài đầu tiên.

## Hệ quả

- Người dùng phổ thông thấy lộ trình gọn 16 bài, có hướng dẫn ngay từ đầu → giảm rào cản.
- Kiến trúc backend nguyên vẹn; rủi ro thấp; có thể rollback bằng cách bỏ `tier`/ẩn onboarding.
- 8 bài nâng cao vẫn truy cập được (không mất nội dung).

## Điểm mở — đã chốt

1. Chat "chế độ thân thiện" (bọc tool-call): **CÓ** — hiển thị trạng thái thân thiện + nút "Xem chi tiết kỹ thuật"; panel phải giữ nguyên.
2. Onboarding ngôn ngữ: **Tiếng Việt** (giữ thuật ngữ kỹ thuật EN).

## Đã triển khai (03/07/2026)

| Hạng mục | File |
|----------|------|
| Backend `tier` (core/advanced) | `main.py` (`ADVANCED_LESSONS`, `/api/lessons`) |
| Sidebar 2 nhóm + progress theo core | `static/lessons.js`, `static/lessons.css` |
| Chat chế độ thân thiện + gợi ý nổi bật | `static/app.js`, `static/style.css` |
| Onboarding: modal + tour 5 bước + nút Hướng dẫn | `static/onboarding.js`, `static/index.html`, `static/style.css` |

Kiến trúc backend (Orchestrator + 7 sub-agent + endpoints) **giữ nguyên**.

---
⬆ Decisions · Bản đồ tài liệu
