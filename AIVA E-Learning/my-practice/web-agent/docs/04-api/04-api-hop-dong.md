[⬅ 03 Agent & Orchestration](../02-kien-truc/03-agent-orchestration.md) · [⬆ Mục lục](../README.md) · Tiếp: [05 Frontend/UX →](../03-giao-dien/05-frontend-ux.md)

# 04 — Hợp đồng API (Endpoints, I/O, SSE)

> Base URL local: `http://localhost:8899`. Tất cả đường dẫn dưới đây định nghĩa trong `main.py`.

## Bảng endpoint

| Method | Path | Vào | Ra |
| :-- | :-- | :-- | :-- |
| GET | `/` | — | `index.html` (HTML) |
| GET | `/api/lessons` | — | Danh sách bài + module + `tier` + `has_demo` |
| GET | `/api/lessons/{lesson_slug}` | slug | Nội dung bài (Markdown→HTML), `has_demo` |
| GET | `/api/lessons/{lesson_slug}/suggestions` | slug | Danh sách câu hỏi gợi ý cho bài |
| POST | `/chat` | JSON (xem dưới) | **SSE stream** sự kiện |
| POST | `/reset` | — | Xóa lịch sử chat in-memory |
| GET | `/api/system_status` | — | Cây Orchestrator + skills + knowledge_bases |

Static mounts: `/static/*`, `/lessons/images/translated/*`, `/lessons/images/root/*` (+ mount ảnh theo bài).

## `POST /chat` — request

```json
{
  "message": "chuỗi câu hỏi người dùng (bắt buộc)",
  "lesson_slug": "vd: 05-tool-use | null  (để trợ lý lesson-aware)",
  "system_prompt": "tùy chọn — override system prompt (nếu client gửi)"
}
```

Xử lý: nếu có `system_prompt` → dùng trực tiếp; nếu không → `get_dynamic_system_prompt(lesson_slug)`
(persona + `AGENTS.md` + ngữ cảnh bài). Input đi qua `check_input_safety` trước.

## `POST /chat` — SSE response

Mỗi dòng dạng `data: {json}\n\n`. Các loại sự kiện (`type`):

| type | Trường kèm | Ý nghĩa (UI dùng để) |
| :-- | :-- | :-- |
| `tool_call` | `tool`, `args` | Agent bắt đầu gọi tool → hiện spinner + nhãn thân thiện, sáng node cây |
| `tool_result` | `tool`, `result` | Tool trả kết quả → đổi thành dấu ✓ + "Xem chi tiết kỹ thuật" |
| `text` | `content` | Mảnh văn bản trả lời (stream). Planning & Metacognition cũng gửi qua `text` (có tiền tố 📋 / 🤔) |
| `done` | `tool_calls` | Kết thúc; kèm số tool đã gọi |
| `error` | `message` | Lỗi phía server |

> `text` được ghép dần rồi render Markdown ở client (`marked` + `DOMPurify`). AI Judge chèn badge điểm
> vào cuối bằng thêm một sự kiện `text`.

## `GET /api/lessons` — cấu trúc phần tử bài

```json
{
  "slug": "05-tool-use",
  "title": "…",
  "module": "…",
  "has_demo": true,
  "tier": "core"   // "core" (Lộ trình chính) | "advanced" (Nâng cao/Đọc thêm)
}
```

## `GET /api/system_status` — cấu trúc

```json
{
  "orchestrator": { "name": "Main Agent", "role": "Orchestrator", "tools": [{"name","description"}] },
  "skills": [ { "id", "name", "description", "tools": [{"name","description"}] } ],
  "knowledge_bases": [
    {"name": "sconnect_knowledge", "type": "ChromaDB (Vector RAG)"},
    {"name": "knowledge_base.txt",  "type": "Local Text Document"}
  ]
}
```

[⬅ 03 Agent & Orchestration](../02-kien-truc/03-agent-orchestration.md) · [⬆ Mục lục](../README.md) · Tiếp: [05 Frontend/UX →](../03-giao-dien/05-frontend-ux.md)

---

## Endpoint: Tóm tắt bài học (bổ sung)

`GET /api/lessons/{lesson_slug}/summary`

Sinh bản tóm tắt dễ hiểu (AI) cho một bài học. Xem chi tiết tính năng ở
[05b — Tóm tắt bài học](../03-giao-dien/05b-tinh-nang-tom-tat.md).

**Query params**

| Tham số | Kiểu | Mặc định | Ý nghĩa |
| :-- | :-- | :-- | :-- |
| `refresh` | bool | `false` | `true` → bỏ cache, gọi Gemini tạo lại. |

**Phản hồi 200** (`application/json`)

```json
{
  "slug": "05-tool-use",
  "title": "Tool Use",
  "summary_md": "**TL;DR:** ...",
  "summary_html": "<p><strong>TL;DR:</strong> ...</p>",
  "cached": false
}
```

**Lỗi**

| Mã | Khi nào |
| :-- | :-- |
| `404` | Slug bài học không tồn tại. |
| `502` | Không gọi được model (sai model, mất mạng, hết quota) — `detail` mô tả lỗi. |

**Ghi chú triển khai**

- Tóm tắt được **cache theo slug** trong bộ nhớ tiến trình (`_SUMMARY_CACHE`); `refresh=true` để làm mới.
- Đầu vào cắt còn ~12.000 ký tự, đã loại ảnh trước khi gửi model.
- Model dùng cấu hình chung `GEMINI_MODEL` (`.env`); đổi model xem [06 Vận hành](../06-van-hanh/08-van-hanh-mo-rong.md).
