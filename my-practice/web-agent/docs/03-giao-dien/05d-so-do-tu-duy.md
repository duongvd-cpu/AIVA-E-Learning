[⬆ Mục lục](../README.md) · Cùng nhóm: [05 Frontend/UX](05-frontend-ux.md) · [05b Tóm tắt nhanh](05b-tinh-nang-tom-tat.md) · Liên quan: [04 API](../04-api/04-api-hop-dong.md)

# 05d — Tính năng "Sơ đồ tư duy" (Mind Map)

> **Vấn đề:** đọc bài dài khó nắm cấu trúc tổng thể.
> **Giải pháp:** mỗi bài có nút **"Sơ đồ tư duy"** — nhờ AI sinh mã **Mermaid `mindmap`** từ nội dung bài,
> frontend render thành sơ đồ; có **phóng to**, **tạo lại**, và **tự chuyển sang sơ đồ khối (flowchart)**
> nếu mã mindmap bị lỗi cú pháp.

## 1. Trải nghiệm người dùng

1. Mở một bài → thanh meta đầu bài có nút **🗺️ Sơ đồ tư duy** (cạnh "Tóm tắt nhanh", "Thực hành").
2. Bấm → thẻ sơ đồ hiện ở đầu bài, trạng thái *đang vẽ*.
3. Trong thẻ: **⤢ phóng to** (overlay toàn màn), **🔄 tạo lại** (bỏ cache, gọi AI mới), **✕ đóng**.
4. Kết quả **cache** theo bài (server + trình duyệt) → mở lại hiện ngay.
5. Chuyển bài khác → thẻ cũ tự gỡ; nút gắn lại cho bài mới.

## 2. Kiến trúc (Frontend ↔ Backend)

```
[Nút Sơ đồ tư duy]  →  GET /api/lessons/{slug}/mindmap
static/assistant-plus.js         main.py :: get_lesson_mindmap()
        │                                  │
        │                                  ├─ đọc full README.md của bài, bỏ ảnh/thumbnail
        │                                  ├─ _generate_lesson_mindmap(): gọi Gemini với MINDMAP_PROMPT
        │                                  ├─ _clean_mermaid_mindmap(): gỡ ```, ép bắt đầu bằng 'mindmap'
        │                                  └─ cache theo slug (_MINDMAP_CACHE)
        └─ nhận {mermaid} → stripFences → mermaid.render(mindmap)
                 └─ nếu lỗi cú pháp → mindmapToFlowchart() → mermaid.render(graph TD)  [FALLBACK]
```

| Thành phần | Vai trò |
| :-- | :-- |
| `static/assistant-plus.js` | Chèn nút, gọi API, render Mermaid, **fallback flowchart**, phóng to, cache client. |
| `static/assistant-dock.css` | Style `.btn-lesson-mindmap`, `.lesson-mindmap-card`, `.mm-canvas`, `.mm-overlay`, `.mm-note`. |
| `index.html` | Nạp thư viện **Mermaid** (CDN, `mermaid@11`). |
| `main.py :: get_lesson_mindmap` | Endpoint `GET /api/lessons/{slug}/mindmap` (xem [04 API](../04-api/04-api-hop-dong.md)). |
| `MINDMAP_PROMPT` | Khuôn sinh mã Mermaid mindmap: dòng đầu `mindmap`, nút gốc `root((...))`, thụt lề 2 space, nhãn ngắn, cấm ký tự đặc biệt. |
| `_clean_mermaid_mindmap` | Làm sạch output LLM để chắc chắn là mã mindmap hợp lệ. |

## 3. Định dạng dữ liệu trả về

```json
{
  "slug": "05-tool-use",
  "title": "Tool Use",
  "mermaid": "mindmap\n  root((Tool Use))\n    Khai niem\n      ...",
  "cached": false
}
```

## 4. Cơ chế dự phòng (Fallback flowchart)

LLM đôi khi sinh mã `mindmap` sai cú pháp → Mermaid ném lỗi khi render. Thay vì báo lỗi ngay,
frontend thử phương án 2:

1. `mermaid.render(code)` với mã `mindmap` gốc.
2. Nếu **throw** → gọi `mindmapToFlowchart(code)`: đọc **mức thụt lề** từng dòng để suy ra quan hệ
   cha–con, lấy nhãn bên trong shape (`root((x))`, `(x)`, `[x]`, `{x}`), làm sạch ký tự, rồi dựng
   `graph TD` với các cạnh `-->`.
3. `mermaid.render(flowchart)` → hiện kèm ghi chú `.mm-note` "đã hiển thị ở dạng sơ đồ khối".
4. Nếu cả hai đều hỏng → hiện lỗi + `<details>` **Xem mã sơ đồ** (mã gốc) + nút **Tạo lại**.

→ Nhờ vậy tính năng gần như luôn hiển thị được *một* sơ đồ, thay vì màn hình lỗi.

## 5. Ràng buộc & xử lý lỗi

- **Cần mạng tới Gemini + `GEMINI_API_KEY` hợp lệ.** Lỗi (model sai, mất mạng, quota) → endpoint trả
  `502` với `detail`; frontend hiện thông báo nhẹ + **Tạo lại**.
- **Cần tải được Mermaid CDN**; nếu chưa tải xong → báo "Chưa tải được thư viện Mermaid".
- Dùng chung `GEMINI_MODEL` (`.env`). Model bị ngừng → đổi 1 dòng `.env` rồi khởi động lại (xem [06 Vận hành](../06-van-hanh/08-van-hanh-mo-rong.md)).
- Đầu vào cắt còn ~12.000 ký tự, đã loại ảnh/thumbnail trước khi gửi.

[⬆ Mục lục](../README.md)
