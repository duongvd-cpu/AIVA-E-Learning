# Bài 23: Thiết kế Kiến trúc Bộ nhớ Ngữ cảnh cho Agent (Context Memory Architecture)

## 1. Vấn đề của LLM và Ngữ cảnh
Một trong những hiểu lầm lớn nhất khi xây dựng AI Agent là: **LLM có trí nhớ**. Thực tế, mọi mô hình ngôn ngữ lớn (Large Language Models) đều **Stateless** – nghĩa là chúng hoàn toàn "mất trí nhớ" sau mỗi lần trả lời.
Mọi thông tin chúng có để giải quyết yêu cầu của bạn hoàn toàn nằm trong **Ngữ cảnh (Context Window)** mà bạn gửi đi kèm mỗi câu lệnh.

Khi ứng dụng Agent vào môi trường doanh nghiệp phức tạp (Enterprise-Grade) như hệ thống AIVA của Sconnect, số lượng ngữ cảnh cần thiết trở nên khổng lồ:
- Thông tin về người dùng đang chat.
- Nội quy của dự án, thư mục.
- Mô tả của hàng chục công cụ (Tools/Skills).
- Lịch sử chat trước đó.

## 2. Context Memory Architecture (Kiến trúc Bộ nhớ Ngữ cảnh)
Kiến trúc AIVA thiết kế bộ nhớ ngữ cảnh thành nhiều tầng (Tiers) khác nhau:

1. **Short-Term Memory (Bộ nhớ ngắn hạn):**
   - **Bản chất:** Lịch sử trò chuyện gần đây nhất (Chat History).
   - **Tác dụng:** Giúp Agent duy trì mạch hội thoại (ví dụ: "vậy còn cái thứ hai thì sao?").
   - **Giới hạn:** Chỉ nên lưu trữ một lượng tin nhắn nhất định để tránh tràn Context Window.

2. **Long-Term Memory (Bộ nhớ dài hạn):**
   - **Bản chất:** Sở thích, thông tin cá nhân của người dùng, hoặc các quyết định quan trọng đã được chốt từ trước.
   - **Tác dụng:** Giúp Agent có cảm giác quen thuộc với người dùng xuyên suốt nhiều phiên làm việc.
   - **Cách làm:** Lưu vào Vector Database (như ChromaDB) hoặc file JSON/Database truyền thống.

3. **Workspace Memory / Organizational Memory (Bộ nhớ Tổ chức):**
   - **Bản chất:** Các tài liệu về quy tắc dự án, nhận diện thương hiệu (Brand Voice), tiêu chuẩn mã nguồn.
   - **Tác dụng:** Định hình cách Agent suy nghĩ và giải quyết vấn đề theo "Văn hóa công ty". Trong AIVA, điều này được triển khai qua các file cấu hình như `AGENTS.md` hoặc `CLAUDE.md`.

## 3. Bài toán đặt ra
Nếu chúng ta nhồi nhét tất cả các bộ nhớ này vào Context Window mỗi khi người dùng hỏi một câu đơn giản, LLM sẽ gặp phải vấn đề **Hallucination (Ảo giác)** do "nhiễu" thông tin (Noise), đồng thời làm tăng chi phí Token một cách khủng khiếp.

Đó là lúc chúng ta cần đến kỹ năng **Lắp ráp Ngữ cảnh (Context Assembly)** – học ở Bài 25.

---

> **Chuẩn bị cho Bài 24:** Ở bài tiếp theo, chúng ta sẽ đi sâu vào việc triển khai tầng **Workspace Memory** thông qua việc thiết lập Sổ tay Ngữ cảnh (Workspace Handbook) cho Agent.
