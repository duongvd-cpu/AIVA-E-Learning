[⬅ 04 API](../04-api/04-api-hop-dong.md) · [⬆ Mục lục](../README.md) · Tiếp: [06 Nhật ký quyết định →](../07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md)

# 05 — Hệ thống Frontend & UX

Vanilla JS thuần, không framework, không build step. Tất cả trong `static/`. Theme sáng `theme-light.css`
**nạp cuối cùng** để override theme tối gốc.

## Khung trang (`index.html`)

- **Navbar:** logo + tên khóa + 3 nút toggle: `#btn-toggle-lessons` (Bài giảng), `#btn-toggle-agent` (Trợ lý AI), `#btn-guide` (Hướng dẫn) — đều dùng icon Tabler + nhãn `.tg-label`. Kèm thanh tiến trình `#progress-bar`.
- **Panel bài học:** `#lesson-sidebar` (giáo trình) + `#lesson-content-wrapper` (khung đọc: `#lesson-header` + `#lesson-body`, và `#lesson-welcome`/dashboard khi chưa chọn bài).
- **Trợ lý AI (popup kiểu Gemini):** nút nổi `#agent-fab` (góc dưới phải) + panel `#agent-widget` (header có nút xem kiến trúc/cây, xóa chat, đóng; khu chat; ô nhập).
- **Popup "Hỏi Agent":** `#ask-agent-popup` hiện khi bôi đen văn bản trong bài.

## Module JS & trách nhiệm

- **`lessons.js`** — tải `/api/lessons`, chia **core/advanced** theo `tier`; dựng sidebar "Lộ trình chính" + nhóm gấp "Nâng cao/Đọc thêm"; render **dashboard** (vòng tiến trình + nút tiếp tục + thẻ module) khi chưa chọn bài; tải bài `/api/lessons/{slug}`, dựng **mini-ToC**; theo dõi scroll để active mục ToC; bắt bôi đen văn bản → hiện "Hỏi Agent". Icon module theo `MODULE_ICONS`.
- **`app.js`** — chat: gửi `/chat`, đọc SSE, render Markdown an toàn (`marked`+`DOMPurify`); **nhãn tool thân thiện** (`friendlyToolLabel`/`friendlyToolDone`) + `<details>` kỹ thuật; tải `/api/system_status` vẽ cây Orchestrator→sub-agent→tool; nút reset.
- **`widget.js`** — điều khiển popup Trợ lý AI: mở/đóng FAB ↔ `#agent-widget`, toggle từ navbar, Esc để đóng, "Hỏi Agent" mở widget.
- **`onboarding.js`** — modal chào mừng lần đầu (localStorage `onboarding_seen`) + **tour 4 bước** với **nền mờ spotlight** + vùng sáng nổi bật; mỗi bước tự chọn phần tử đang hiển thị (fallback). Nút `#btn-guide` xem lại.
- **`enhance.js`** — thanh **% đọc từng bài** (theo scroll, lưu localStorage) + toast động viên khi đọc nửa/xong.

## Lộ trình học trên sidebar (áp dụng ADR-005)

- **Lộ trình chính (core, 16 bài):** hiển thị trước, học tuần tự.
- **Nâng cao/Đọc thêm (advanced, 8 bài):** gấp trong nhóm riêng.
- Bài "Demo được" gắn nhãn **Demo**; mục đang chọn tô đậm xanh Sconnect + in đậm.
- Tiến trình (`#progress-bar`) đếm **chỉ core**.

## Bố cục khung đọc (bản mới nhất)

- Màn rộng (≥1401px): **cột nội dung + Mục lục (ToC) ghép thành một cụm căn giữa** — lề trái/phải cân đối, ToC là thanh sticky bên phải, không đè nội dung.
- Màn hẹp (<1400px): ẩn ToC nổi, nội dung căn giữa gọn (max 820px).
- Scroll: `.lesson-content-wrapper` là vùng cuộn dọc (fix chiều cao 100% để cuộn được).

## Thư viện ngoài (CDN)

Font Inter · **Tabler Icons** (webfont) · `marked` (Markdown) · `DOMPurify` (sanitize) · `highlight.js`
(theme `github` sáng). Không có bước build; sửa file là chạy.

## Chuẩn xác minh khi sửa frontend

`node --check file.js` cho JS · đếm cân bằng `{}` cho CSS · `iconv -f utf-8` kiểm mã hóa · dùng
bash heredoc / thay chuỗi cho file lớn (tránh công cụ ghi cắt cụt file).

[⬅ 04 API](../04-api/04-api-hop-dong.md) · [⬆ Mục lục](../README.md) · Tiếp: [06 Nhật ký quyết định →](../07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md)
