# Bài 25: Lắp ráp Trang Ngữ cảnh cho LLM (Context Assembly / Routing)

## 1. Bài toán Lắp ráp Ngữ cảnh
Bây giờ, Agent của chúng ta đã có:
1. **Core Persona:** Định nghĩa cơ bản về Agent (Bạn là ai, Brand Voice là gì).
2. **Workspace Memory:** Quy tắc dự án trong file `AGENTS.md`.
3. **Long-Term Memory:** Thông tin về user đang chat.
4. **Tools/Skills Context:** Danh sách hàng chục công cụ mà Agent có thể gọi.
5. **Short-Term Memory:** Lịch sử chat.

Vấn đề là: LLM có giới hạn về độ dài Context (Token Limit) và giới hạn về khả năng tập trung (Attention Span). Nếu mỗi lần người dùng hỏi "1+1 bằng mấy?", hệ thống lại gửi toàn bộ 5 khối dữ liệu khổng lồ trên vào LLM, Agent sẽ bị "quá tải thông tin" (Information Overload), dẫn đến phản hồi chậm, sai lệch, và tốn kém chi phí.

## 2. Nghệ thuật "Context Assembly" (Lắp ráp Ngữ cảnh)
Đây là kiến trúc tối thượng được sử dụng trong các hệ thống như AIVA Sconnect. Thay vì nạp toàn bộ, Hệ thống (Orchestrator Builder) sẽ thực hiện **Lắp ráp Ngữ cảnh Động (Dynamic Context Assembly)**.

Quá trình này diễn ra như sau khi nhận 1 yêu cầu từ người dùng:

1. **Phân tích Ý định ban đầu (Intent Routing):** Hệ thống đánh giá sơ bộ câu hỏi của người dùng.
2. **Lật Sổ tay (Handbook Routing):** Chỉ trích xuất những quy tắc liên quan trong file `AGENTS.md` (Không đọc toàn bộ).
3. **Nạp Công cụ (Tool Pruning):** Nếu người dùng hỏi về cơ sở dữ liệu, chỉ nạp mô tả của công cụ `sql_skill`. Lược bỏ đi các công cụ không liên quan (như sinh ảnh) để tiết kiệm token.
4. **Lắp ráp (Assembly):** Ghép nối Persona + Các quy tắc đã lọc + Các công cụ đã lọc + Lịch sử chat gần nhất thành một "Trang A4" hoàn hảo.
5. **Gửi cho LLM:** LLM lúc này sẽ nhận được một bức tranh cực kỳ sắc nét, sạch sẽ, không nhiễu. Nó nhanh chóng phân tích và giải quyết công việc.

## 3. Áp dụng vào Thực tế
Trong dự án `my-practice/web-agent`, việc lắp ráp này được thực thi bởi hàm `get_dynamic_system_prompt()` nằm trong `main.py`. Nó làm nhiệm vụ thu thập, gom nhặt thông tin từ nhiều nguồn để "gói" thành một System Prompt động hoàn chỉnh trước khi bắn API tới Gemini.

Kiến trúc này đảm bảo Agent của bạn là một thực thể linh hoạt, phản ứng nhanh, và luôn làm đúng theo "văn hóa" của từng môi trường mà nó được nhúng vào.
