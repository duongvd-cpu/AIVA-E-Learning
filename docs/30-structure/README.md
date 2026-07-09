# 🌿 30 — Cấu trúc (Bản đồ Workspace)

> Cành. "Cái gì ở đâu · đâu là chuẩn · được đụng gì · muốn làm X thì vào đâu".
> ⚠️ Đây KHÔNG phải kiến trúc kỹ thuật của app — kiến trúc web-agent nằm ở **`my-practice/web-agent/docs/`** (nguồn kỹ thuật duy nhất).

## Bản đồ gói (đã phát)

```
sconnect-ai-agents-course-full/
├── AGENTS.md                 Luật rút gọn cho AI partner (nạp đầu phiên)
├── HUONG-DAN-CAI-DAT-ANTIGRAVITY.md/.docx   Hướng dẫn cài đặt cho nhân sự
├── docs/                     ★ Sổ tay workspace (spine 10 tầng — tài liệu này)
├── translations/vi/          Nội dung 16 bài (6 chặng, 25–40)
├── translated_images/vi/     Ảnh bài giảng
└── my-practice/web-agent/    ★ Mã nguồn app + docs/ kỹ thuật
    ├── main.py · skills/ · static/ · data/ · guardrails.py · hooks.py
    └── docs/                 Tài liệu KỸ THUẬT app (kiến trúc, API, UX, data)
```

## Vùng làm việc & quyền

| Vùng | Quyền | Gồm |
|------|-------|-----|
| 🟢 Đọc-ghi tự do | sửa thoải mái (theo luật [20](../20-principles/README.md)) | `web-agent/*.py`, `skills/`, `static/`, `docs/`, `web-agent/docs/` |
| 🟡 Ghi có kiểm soát | ảnh hưởng dữ liệu/khởi động | `data/*.txt`, `company.db`, `COURSE_MODULES` trong `main.py` |
| 🔴 Không đụng (sinh tự động) | sửa tay gây hỏng | `venv/`, `data/chroma_db/`, ảnh bài giảng |
| ⚫ Nhạy cảm | không in/commit | `.env` (chứa `GEMINI_API_KEY`) |

## Nguồn sự thật (khi mâu thuẫn)

`code` > `docs/` > `my-practice/web-agent/docs/` > `.docx` cũ.

## Naming

- Tầng docs: `NN-tên/` (prefix số, bước 10). File con: `kebab-case.md`. ADR: `ADR-NNN-*.md`. Code: `snake_case.py`.
- Ngày: DD/MM/YYYY.

→ Tiếp: [40-guides](../40-guides/README.md).
