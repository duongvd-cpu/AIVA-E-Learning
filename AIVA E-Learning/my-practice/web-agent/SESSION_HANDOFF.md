# Handoff phiên làm việc — Web Agent Learning Hub

/ Cập nhật: 06/07/2026 · Dự án: `my-practice/web-agent` (FastAPI + Gemini, chạy local cổng 8899)

## Đã làm trong phiên này (tất cả ADDITIVE — không đụng orchestration/skills/nội dung bài)

1. **Chat AI mở mặc định, gắn cạnh bài học (docked)** trên desktop; màn hình hẹp giữ bong bóng nổi.
   - Files: `static/widget.js`, `static/assistant-dock.css` (mục 1).
2. **Nút "Tóm tắt nhanh"** mỗi bài → thẻ tóm tắt AI (TL;DR + ý chính + thực hành).
   - Backend: `GET /api/lessons/{slug}/summary` trong `main.py` (có cache, chuẩn hoá markdown).
   - Frontend: `static/assistant-plus.js`, CSS mục 2–3.
3. **Nút "Hỏi AI" khi bôi đen** đoạn text (đã có sẵn từ trước) — chuẩn hoá nhãn + style pill xanh đậm chữ trắng (`assistant-dock.css` mục 4).
4. **Nút "Sơ đồ tư duy"** → AI sinh Mermaid `mindmap`, render + phóng to.
   - Backend: `GET /api/lessons/{slug}/mindmap` trong `main.py`.
   - Frontend: Mermaid CDN trong `index.html`; `assistant-plus.js`; CSS mục 5.
5. **Nút "Thực hành"** (CTA xanh đậm) → mở/đưa focus vào khung chat + điền sẵn câu mở đầu luyện tập; chat đã lesson-aware.
   - Frontend: `assistant-plus.js` (focusChat/startPractice); CSS mục 6.
6. **Sửa lỗi model:** `gemini-2.0-flash` đã bị Google ngừng (01/06/2026). Đã chuyển sang **`gemini-2.5-flash`** trong `.env` + `main.py`; thêm `load_dotenv(override=True)` và cơ chế **tự nâng cấp** nếu cấu hình còn trỏ model đã ngừng (`_RETIRED_MODELS`).
7. **Docs** tổ chức lại thành 7 thư mục con trong `docs/` (01-tong-quan ... 07-nhat-ky-quyet-dinh), viết lại toàn bộ cross-link (0 link gãy), thêm 05a/05b/05c + ADR-006.
8. **Đóng gói:** `web-agent-share.zip` (ở gốc dự án) — bản chia sẻ, đã kiểm tra KHÔNG chứa `.env`/`venv`/`chroma_db`/API key.

## File chính đã thêm/sửa
- Thêm: `static/assistant-dock.css`, `static/assistant-plus.js`, `docs/03-giao-dien/05a|05b|05c*.md`, `SESSION_HANDOFF.md`.
- Sửa: `main.py` (3 endpoint mới + fix model), `static/index.html` (nạp CSS/JS + Mermaid), `static/widget.js`, `.env`, `.env.example`.

## Cách chạy / test
- Chạy: vào `my-practice/web-agent`, `python run.py` (hoặc `start.bat`) → http://localhost:8899
- Đổi backend (main.py / .env) → **phải tắt hẳn server rồi chạy lại**.
- Đổi file tĩnh (js/css/html) → chỉ cần **Ctrl+Shift+R** trên trình duyệt.
- Kiểm tra route: mở `/docs`; kiểm tra model: log khởi động in cảnh báo nếu tự nâng cấp.

## Đã xử lý tiếp (07/07/2026)
- ✅ Nút "Thực hành" **tự gửi** câu luyện tập ngay khi bấm (mở Trợ lý nếu đang đóng) — `static/assistant-plus.js` (submitChat/startPractice).
- ✅ Mermaid mindmap: thêm **fallback flowchart** — mindmap lỗi cú pháp → dựng `graph TD` theo mức thụt lề rồi render lại; vẫn giữ nút "Tạo lại" + xem mã gốc — `static/assistant-plus.js`.
- ✅ Viết `docs/03-giao-dien/05d-so-do-tu-duy.md`; thêm vào `docs/README.md`; ghi 2 tinh chỉnh vào `docs/07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md`.

## Việc còn mở / gợi ý tiếp theo
- (chưa có) — các mục mở trước đó đã hoàn tất.

## Lưu ý kỹ thuật (đã gặp trong phiên)
- Công cụ ghi file lớn có lúc bị cắt cụt → nên ghi/patch bằng script và kiểm tra `wc -l` + compile sau mỗi lần.
- Xóa file trong thư mục người dùng cần bật quyền xóa.
