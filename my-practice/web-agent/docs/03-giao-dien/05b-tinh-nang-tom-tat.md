[⬆ Mục lục](../README.md) · Cùng nhóm: [05 Frontend/UX](05-frontend-ux.md) · [05a Trợ lý gắn cạnh](05a-tro-ly-ai-docked.md) · Liên quan: [04 API](../04-api/04-api-hop-dong.md)

# 05b — Tính năng "Tóm tắt nhanh" (Lesson Summary)

> **Vấn đề:** tài liệu bài học (dịch từ khóa gốc) khá dài và khó với người mới.
> **Giải pháp:** mỗi bài có nút **"Tóm tắt nhanh"** — nhờ AI gói gọn nội dung thành bản dễ hiểu
> (TL;DR + ý chính + thuật ngữ + gợi ý thực hành), hiển thị ngay ở đầu bài.

## 1. Trải nghiệm người dùng

1. Mở một bài học → ở thanh meta đầu bài (cạnh "phút đọc") xuất hiện nút **✨ Tóm tắt nhanh**.
2. Bấm nút → thẻ tóm tắt hiện ở đầu nội dung bài, có trạng thái *đang tải*.
3. Trong thẻ: nút **🔄 tạo lại** (bỏ cache, gọi AI mới) và **✕ đóng**.
4. Kết quả được **cache** theo bài (cả phía server lẫn trình duyệt) → mở lại là hiện ngay.
5. Chuyển bài khác → thẻ tóm tắt cũ tự gỡ; nút gắn lại cho bài mới.

## 2. Kiến trúc (Frontend ↔ Backend)

```
[Nút Tóm tắt nhanh]  →  GET /api/lessons/{slug}/summary
static/assistant-plus.js        main.py :: get_lesson_summary()
        │                                  │
        │                                  ├─ đọc full README.md của bài
        │                                  ├─ _generate_lesson_summary(): gọi Gemini (không tool)
        │                                  │     với SUMMARIZER_PROMPT (giọng Sconnect, tiếng Việt)
        │                                  ├─ _normalize_summary_md(): chèn dòng trống trước bullet
        │                                  ├─ markdown → summary_html
        │                                  └─ cache theo slug (_SUMMARY_CACHE)
        └─ nhận summary_html → DOMPurify.sanitize → chèn thẻ vào đầu #lesson-body
```

| Thành phần | Vai trò |
| :-- | :-- |
| `static/assistant-plus.js` | Chèn nút vào header, gọi API, render/đóng thẻ tóm tắt, cache phía client. |
| `static/assistant-dock.css` | Style nút `.btn-lesson-summary` và thẻ `.lesson-summary-card`. |
| `main.py :: get_lesson_summary` | Endpoint `GET /api/lessons/{slug}/summary` (xem [04 API](../04-api/04-api-hop-dong.md)). |
| `SUMMARIZER_PROMPT` | Khuôn tóm tắt: TL;DR, Ý chính, Thuật ngữ cần nhớ, Áp dụng/Thực hành. |

## 3. Định dạng dữ liệu trả về

```json
{
  "slug": "05-tool-use",
  "title": "Tool Use",
  "summary_md": "**TL;DR:** ...",
  "summary_html": "<p><strong>TL;DR:</strong> ...</p>",
  "cached": false
}
```

## 4. Ràng buộc & xử lý lỗi

- **Cần mạng tới Gemini + `GEMINI_API_KEY` hợp lệ.** Nếu lỗi (model sai, mất mạng, quota) →
  endpoint trả `502` với `detail`; frontend hiện thông báo nhẹ và cho **thử lại**.
- **Model dùng chung** cấu hình `GEMINI_MODEL` (`.env`). Nếu model bị Google ngừng, đổi 1 dòng
  trong `.env` rồi khởi động lại (xem [06 Vận hành](../06-van-hanh/08-van-hanh-mo-rong.md)).
- Đầu vào được cắt còn ~12.000 ký tự để tiết kiệm token; đã loại ảnh/thumbnail trước khi gửi.
- Không bịa: prompt yêu cầu chỉ tóm tắt trong phạm vi nội dung bài.

[⬆ Mục lục](../README.md)
