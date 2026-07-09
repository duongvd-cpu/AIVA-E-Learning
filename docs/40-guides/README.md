# 🍃 40 — Hướng dẫn vận hành (Guides)

> Lá. Quy trình how-to. Tra khi cần thực thi.

## Cài đặt & chạy (nhân sự)

Cách dễ nhất: theo **Hướng dẫn cài đặt Workspace bằng Antigravity** (.docx ở gốc gói) — mở bằng Antigravity, để AI deploy.

Chạy thủ công (Windows):
```
cd my-practice\web-agent
copy .env.example .env   # điền GEMINI_API_KEY, dùng model gemini-2.5-flash
start.bat                # → http://localhost:8899
```

## Onboarding (lộ trình học)

Đi theo 6 chặng trong `translations/vi/` (bài 25 → 40): vỡ lòng tư duy → agent là gì → thành phần lõi → ghép thành hệ → vận hành đáng tin → thiết kế & tùy biến. Mỗi bài có khối 🛠️ Thực hành làm ngay trên Claude/Antigravity.

## How-to: thêm một Sub-agent (Skill)

1. Tạo `skills/<tên>_skill.py` khai `SKILL_NAME`, `SYSTEM_PROMPT`, `SCHEMAS`, **và `FUNCTIONS`**.
2. Skill Registry tự nạp — không sửa nơi khác.
3. Thêm luật định tuyến nếu cần; ghi quyết định vào [50-decisions](../50-decisions/README.md) nếu có đánh đổi.

## How-to: thêm/sửa bài học

1. Tạo `translations/vi/NN-*/README.md`.
2. Đăng ký slug vào `COURSE_MODULES` (`main.py`).

## Xử lý lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|-----------|
| `API key not valid` | Dùng nút Copy key ở AI Studio, đừng gõ tay |
| `429 / limit: 0` | Đổi model `gemini-2.5-flash`; hoặc chờ/đổi key |
| Trang trống / `undefined` | Ctrl+Shift+R; kiểm server đã chạy |

> Kỹ thuật sâu (kiến trúc, luồng chat, data): xem `my-practice/web-agent/docs/`.

→ Tiếp: [50-decisions](../50-decisions/README.md).
