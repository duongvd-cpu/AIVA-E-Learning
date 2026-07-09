[⬅ 06 Nhật ký quyết định](../07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md) · [⬆ Mục lục](../README.md) · Tiếp: [08 Vận hành & Mở rộng →](../06-van-hanh/08-van-hanh-mo-rong.md)

# 07 — Dữ liệu & Nội dung

## Nguồn nội dung bài học

- **Bài học (Markdown):** `REPO_ROOT/translations/vi/{slug}/README.md` — bản dịch tiếng Việt (khoảng 29–30 thư mục bài).
- **Hình đã dịch:** `REPO_ROOT/translated_images/vi` → phục vụ tại `/lessons/images/translated`.
- **Hình gốc:** `REPO_ROOT/images` → phục vụ tại `/lessons/images/root`.
- `REPO_ROOT` = 3 cấp trên `main.py` (tức thư mục gốc repo, hoặc gốc gói share).
- Tiêu đề bài lấy từ dòng `# ...` đầu tiên trong README, hoặc suy ra từ slug (`_slug_to_title`).
- Đường dẫn ảnh trong HTML được viết lại theo bài bằng `_rewrite_image_paths`.

## Phân tier bài học (ADR-005) — nguồn: `main.py`

- **Advanced (Nâng cao/Đọc thêm) — 8 bài** (`ADVANCED_LESSONS`):
  `15-context-memory-architecture`, `17-context-assembly-routing`, `19-securing-ai-agents`,
  `20-agent-lifecycle-hooks`, `21-monitoring-evaluation`, `22-ai-agents-production`,
  `23-agentic-protocols`, `24-microsoft-agent-framework`.
- **Core (Lộ trình chính) — 16 bài:** tất cả bài còn lại (mọi slug không nằm trong `ADVANCED_LESSONS`).
- Thanh tiến trình đếm **chỉ core**.

## Bài "Demo được" — `DEMO_LESSONS`

`05-tool-use`, `06-agentic-rag`, `11-planning-design`, `12-metacognition`, `14-agent-orchestration`,
`15-context-memory-architecture`, `16-workspace-context-handbook`, `17-context-assembly-routing`.
→ gắn nhãn **Demo**; `/api/lessons` và `/api/lessons/{slug}` trả `has_demo`.

## Cơ sở dữ liệu & Tri thức

| Nguồn | Vị trí | Dùng bởi |
| :-- | :-- | :-- |
| Vector DB | `data/chroma_db` (collection `sconnect_knowledge`) | RAG Agent (`search_vector_database`) |
| Text KB | `data/sconnect_knowledge.txt`, `knowledge_base.txt` | Research Agent (đọc full-text) |
| KB nhúng | trong `skills/research_skill.py` | Research Agent (`search_knowledge_base`) |
| SQL | `data/company.db` (SQLite) | SQL Agent (`execute_sql_query`, `list_tables`) |

## Trạng thái runtime (không phải dữ liệu bền)

- Lịch sử chat: **in-memory toàn cục**, mất khi restart; `POST /reset` để xóa thủ công.
- Tiến trình đọc & cờ onboarding: **localStorage của trình duyệt** (phía client), không lưu server.

[⬅ 06 Nhật ký quyết định](../07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md) · [⬆ Mục lục](../README.md) · Tiếp: [08 Vận hành & Mở rộng →](../06-van-hanh/08-van-hanh-mo-rong.md)
