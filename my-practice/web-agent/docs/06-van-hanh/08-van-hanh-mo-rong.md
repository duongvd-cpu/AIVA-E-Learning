[⬅ 07 Dữ liệu & Nội dung](../05-du-lieu-noi-dung/07-du-lieu-noi-dung.md) · [⬆ Mục lục](../README.md) · Tiếp: [09 Ràng buộc & Non-goals →](../01-tong-quan/09-rang-buoc-non-goals.md)

# 08 — Vận hành & Mở rộng

## Chạy local

**Cách nhanh (Windows):** chạy `start.bat` — tự tạo venv, cài `requirements.txt`, kiểm tra `.env`,
mở trình duyệt `http://localhost:8899`, rồi chạy server.

**Thủ công:**
```bash
cd my-practice/web-agent
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # rồi điền GEMINI_API_KEY thật
python run.py               # phục vụ tại http://localhost:8899
```

- `run.py` chạy `uvicorn main:app` host `127.0.0.1`, **cổng 8899**, `reload=True`.
- Cần **Python 3.12+** và một `GEMINI_API_KEY` hợp lệ (lấy tại Google AI Studio).

## Cấu hình (`.env`)

| Biến | Mặc định | Ghi chú |
| :-- | :-- | :-- |
| `GEMINI_API_KEY` | — | **Bắt buộc.** Bí mật — không commit, không in, không đưa vào tài liệu. |
| `GEMINI_MODEL` | `gemini-2.0-flash` | Đổi model nếu cần. |

## Cách mở rộng

**Thêm một bài học:** tạo `translations/vi/{slug}/README.md` (dòng đầu là `# Tiêu đề`); thêm ảnh vào
`translated_images/vi` nếu có. Muốn thành Nâng cao → thêm slug vào `ADVANCED_LESSONS`; muốn có nhãn Demo →
thêm vào `DEMO_LESSONS`. Không cần sửa frontend.

**Thêm một sub-agent (skill):** tạo `skills/{tên}_skill.py` khai báo prompt + tools (`FunctionDeclaration`);
đăng ký vào `SKILL_REGISTRY` trong `main.py`. `/api/system_status` sẽ tự hiện trong cây UI.

**Thêm một tool cho Orchestrator:** khai báo `FunctionDeclaration` + thêm vào `ORCHESTRATOR_TOOLS` và xử lý
lời gọi trong vòng lặp `/chat`. Ưu tiên đặt năng lực mới ở **sub-agent**, không phình Main Agent.

**Đổi hành vi/ngữ cảnh Agent:** sửa `AGENTS.md` (được nạp vào system prompt mỗi phiên) — cách an toàn
nhất để chỉnh giọng điệu/quy tắc mà không đụng luồng code.

## Đóng gói chia sẻ (an toàn)

- Gói `web-agent-share.zip` **loại trừ** `venv/`, `__pycache__/`, `.env`, `chroma_db/`.
- Kèm `translations/vi` + `translated_images/vi` để bài học hiển thị.
- Người nhận: giải nén → tạo `.env` từ `.env.example` → `start.bat` (hoặc chạy thủ công).

[⬅ 07 Dữ liệu & Nội dung](../05-du-lieu-noi-dung/07-du-lieu-noi-dung.md) · [⬆ Mục lục](../README.md) · Tiếp: [09 Ràng buộc & Non-goals →](../01-tong-quan/09-rang-buoc-non-goals.md)
