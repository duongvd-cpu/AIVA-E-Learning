# Bài 24: Thiết kế Sổ tay Ngữ cảnh Workspace cho Agent (Workspace Context Handbook)

## 1. Sổ tay Ngữ cảnh Workspace là gì?

Khi một nhân sự mới gia nhập dự án, điều đầu tiên họ cần đọc là "Tài liệu Onboarding" (Quy định dự án, cách làm việc, văn hóa công ty). 
**AI Agent cũng vậy.** 

Thay vì mã hóa cứng (hardcode) toàn bộ quy tắc vào trong source code Python của Agent, những hệ thống hiện đại như AIVA Cowork System sử dụng khái niệm **Sổ tay Ngữ cảnh Workspace (Workspace Context Handbook)**.

Đây thường là một file văn bản (như `AGENTS.md`, `CLAUDE.md`, hoặc `RULES.md`) nằm ở thư mục gốc (root) của dự án. 

## 2. Tại sao phải thiết kế dưới dạng Sổ tay (Handbook)?

- **Decoupling (Sự tách biệt):** Logic điều khiển của Agent (Python) và Kiến thức chuyên môn (Domain Knowledge) được tách biệt hoàn toàn. AI Agent (Orchestrator) trở thành một cái vỏ rỗng. Khi bạn thả Agent vào thư mục dự án Kế toán, nó đọc sổ tay Kế toán và trở thành AI Kế toán. Khi thả vào dự án Phim hoạt hình, nó đọc sổ tay sản xuất và trở thành AI Sản xuất.
- **Dễ dàng cập nhật:** Bạn không cần phải là một lập trình viên để thay đổi hành vi của AI. Bất kỳ ai cũng có thể vào sửa file `AGENTS.md` bằng ngôn ngữ tự nhiên. Cập nhật xong, Agent sẽ tự động thay đổi hành vi ở phiên làm việc tiếp theo.
- **Tiết kiệm Prompt:** Trong một số hệ thống nâng cao, Sổ tay có thể lên đến hàng trăm trang. Hệ thống sẽ kết hợp RAG để chỉ lật đúng trang cần thiết cho Agent đọc.

## 3. Cấu trúc điển hình của Sổ tay Ngữ cảnh
Dựa trên kiến trúc chuẩn của Sconnect, một sổ tay ngữ cảnh (như file `AGENTS.md`) thường bao gồm:

1. **Project Overview (Tổng quan):** Dự án này làm về gì? Mục tiêu là gì?
2. **Setup & Commands:** Các câu lệnh cơ bản để chạy hệ thống (khởi động server, chạy test).
3. **Development Workflow:** Quy trình làm việc chuẩn.
4. **Code Style & Conventions:** Các quy chuẩn về viết code (ví dụ: luôn dùng TypeScript, luôn dùng màu xanh Sconnect).
5. **Project-Specific Context:** Các ghi chú đặc thù (ví dụ: cơ chế dịch đa ngôn ngữ đang nằm ở đâu).

## 4. Tích hợp Sổ tay vào Agent
Thay vì chỉ viết Sổ tay cho "người" đọc, Sổ tay này được thiết kế theo chuẩn Markdown để **Máy (Agent)** đọc.
Ở bài tiếp theo, chúng ta sẽ học cách Orchestrator "cầm lấy" cuốn sổ tay này, kết hợp với các bộ nhớ khác để tạo ra một System Prompt hoàn hảo gửi cho LLM (Context Assembly).
