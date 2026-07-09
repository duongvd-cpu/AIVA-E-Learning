# Tool Use — Mô hình Sử dụng Công cụ

> Chặng 3 · Bài 6/16 — Thành phần lõi · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Giải thích **Tool Use** và vì sao agent cần công cụ.
- Tự cho AI **quyết định gọi công cụ** và hoàn tất vòng lặp tool trên Claude.
- Biết đọc danh sách công cụ của một hệ thống và hình dung cách thêm công cụ.

## 📖 Lý thuyết
**Tool Use** cho phép LLM tương tác với công cụ bên ngoài để *hành động* — từ hàm đơn giản đến gọi API (thời tiết, giá cổ phiếu, truy vấn CSDL). Khi cần dữ liệu thật, LLM **không đoán bừa** mà tạo một **function call** đúng lược đồ; hệ thống chạy hàm, trả kết quả, LLM mới trả lời cuối. Ba phần của một lược đồ công cụ: **tên · mục đích · tham số**.

## 🔍 Soi qua ví dụ
Mở `my-practice/web-agent/skills/weather_skill.py`: định nghĩa `get_weather(location)`, khai báo qua `SCHEMAS` (FunctionDeclaration); khi hỏi thời tiết, LLM *gọi* hàm này rồi mới trả lời — đúng vòng lặp lý thuyết.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán lược đồ + luật:
```
Bạn là agent chỉ có 1 công cụ: get_weather(city) -> thời tiết hiện tại.
Luật: nếu câu hỏi cần thời tiết, ĐỪNG trả lời ngay, hãy xuất 1 dòng JSON:
{"tool_call":{"name":"get_weather","args":{"city":"<thành phố>"}}}
Nếu không cần thời tiết, trả lời bình thường. Xác nhận đã hiểu.
```
**Bước 3.** Gõ `Thời tiết Đà Nẵng hôm nay?` → **Kỳ vọng:** Claude xuất JSON tool_call (chưa trả lời).
**Bước 4.** Đóng vai hệ thống, dán: `Kết quả công cụ: {"city":"Đà Nẵng","temp":"29°C","desc":"mưa rào"}` → **Kỳ vọng:** Claude trả lời tự nhiên từ dữ liệu.
**Bước 5.** Gõ `2 mũ 10 bằng mấy?` → **Kỳ vọng:** trả lời thẳng, **không** gọi công cụ.
**Nếu kẹt:** Claude quên xuất JSON → nhắc "tuân luật xuất tool_call trước".

## ↪️ Chuyển giao
Nhận một hệ thống → **đọc danh sách công cụ** để biết nó *làm được gì*. Muốn agent làm thêm việc cho đơn vị → **thêm một công cụ** đúng 3 phần (tên/mục đích/tham số) rồi khai báo cho LLM.

> Gợi mở: *Tác vụ tra cứu/hành động nào của đơn vị đáng biến thành "công cụ"?*

## ✅ Tự kiểm tra
1. Tool Use khắc phục hạn chế nào của LLM "trần"?
2. Ba phần của một lược đồ công cụ?
3. Vì sao agent không gọi công cụ cho câu "2^10"?
4. File nào trong web-agent chứa ví dụ Tool Use?

---
*Tiếp: [Agentic RAG](../31-agentic-rag/README.md)*
