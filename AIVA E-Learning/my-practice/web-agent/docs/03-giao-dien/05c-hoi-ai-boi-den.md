[⬆ Mục lục](../README.md) · Cùng nhóm: [05 Frontend/UX](05-frontend-ux.md) · [05a Trợ lý gắn cạnh](05a-tro-ly-ai-docked.md) · [05b Tóm tắt bài học](05b-tinh-nang-tom-tat.md)

# 05c — "Hỏi AI" khi bôi đen đoạn kiến thức

> **Mục tiêu:** người học bôi đen một đoạn khó trong bài → hiện ngay một nút nổi **"Hỏi AI"**;
> bấm vào sẽ mang đúng đoạn đó sang Trợ lý để được giải thích theo ngữ cảnh bài đang đọc.

## 1. Trải nghiệm người dùng

1. Bôi đen (select) một đoạn văn trong khung bài học (độ dài hợp lệ: **10–2000 ký tự**).
2. Một nút nhỏ **💬 Hỏi AI** hiện ngay phía trên vùng bôi đen.
3. Bấm nút → khung Trợ lý mở ra (hoặc đã mở sẵn nếu đang docked), ô nhập được điền sẵn:
   *"Giải thích đoạn sau từ bài \"<tên bài>\": \"<đoạn đã chọn>\""*.
4. Người học có thể chỉnh câu hỏi rồi bấm gửi. Trợ lý trả lời **theo ngữ cảnh bài** (lesson-aware).
5. Bấm ra ngoài hoặc bôi đoạn khác → nút tự ẩn/di chuyển theo.

## 2. Cơ chế kỹ thuật

| Thành phần | Vai trò |
| :-- | :-- |
| `#ask-agent-popup` + `#btn-ask-agent` (index.html) | Nút nổi "Hỏi AI", mặc định ẩn (`.hidden`). |
| `lessons.js :: initAskAgentPopup()` | Nghe `mouseup` trong vùng bài, đọc `window.getSelection()`, canh vị trí nút theo `getBoundingClientRect()`, lưu đoạn chọn vào `dataset.selectedText`. |
| `lessons.js` (handler bấm nút) | Dựng câu hỏi kèm tên bài + đoạn chọn, điền vào `#user-input`. |
| `widget.js` | Cùng nút này còn kích hoạt `open()` để mở Trợ lý. |
| CSS `.ask-agent-popup` (`style.css`) | `position: fixed; z-index: 1000` → nổi đúng trên cả layout gắn cạnh (panel z-index 950). |

Luồng rút gọn:

```
Bôi đen trong #lesson-content-wrapper
   → mouseup → lấy selection (10–2000 ký tự)
   → hiện #ask-agent-popup tại (rect.top-44, giữa vùng chọn)
   → bấm "Hỏi AI":
        lessons.js: điền "Giải thích đoạn sau từ bài ..." vào #user-input
        widget.js : open() Trợ lý
```

## 3. Ràng buộc & lưu ý

- Chỉ kích hoạt bên trong vùng đọc bài (`#lesson-content-wrapper`); bôi đen dưới 10 hoặc trên
  2000 ký tự sẽ không hiện nút (tránh nhiễu và tránh gửi đoạn quá dài).
- Không tự động gửi — để người học kịp chỉnh câu hỏi. Ngữ cảnh bài được backend tự chèn qua
  `lesson_slug` (xem [03 Orchestration](../02-kien-truc/03-agent-orchestration.md) và
  [04 API](../04-api/04-api-hop-dong.md)).
- Tính năng có sẵn từ trước (ADR-005); tài liệu này bổ sung mô tả và đồng bộ nhãn nút thành "Hỏi AI".

[⬆ Mục lục](../README.md)
