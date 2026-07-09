# Môi trường Thực hành: Web Agent Local

Đây là dự án Web Agent do Antigravity phối hợp xây dựng, sử dụng **FastAPI** và **Gemini API** để cung cấp một môi trường thực hành trực quan (Chat UI) cho khóa học **AI Agents for Beginners**.

## Tính năng (Phase 0 - Nền tảng)
- Giao diện Chat UI (Dark mode + Glassmorphism).
- Kết nối trực tiếp với **Gemini 2.0 Flash**.
- Hỗ trợ **Server-Sent Events (SSE)** để stream câu trả lời theo thời gian thực (Typing effect).
- Hỗ trợ **Function Calling (Tool Use)**: Có thể xem UI báo hiệu khi Agent đang gọi tool, và kết quả tool trả về.

## Cài đặt & Chạy

### Yêu cầu
- Python 3.12+ (sử dụng môi trường ảo của toàn khóa học).

### Các bước chạy
1. **Mở Terminal** và kích hoạt môi trường ảo (từ thư mục gốc `ai-agents-for-beginners`):
   ```bash
   source venv/bin/activate  # macOS/Linux
   # hoặc: venv\Scripts\activate trên Windows
   ```

2. **Cài đặt thư viện**:
   ```bash
   cd my-practice/web-agent
   pip install -r requirements.txt
   ```

3. **Cấu hình API Key**:
   - File `.env` đã được cấu hình sẵn `GEMINI_API_KEY`.
   - *(Nếu chạy trên máy khác, hãy copy `.env.example` thành `.env` và điền key).*

4. **Khởi động Server**:
   ```bash
   python run.py
   ```

5. **Mở trình duyệt**: Truy cập [http://localhost:3000](http://localhost:3000).

## Các thư mục chính
- `main.py`: Logic Backend FastAPI. Nơi đăng ký các Tools (Function Calling) và xử lý stream Gemini.
- `static/index.html`: Khung giao diện Web.
- `static/style.css`: Các tuỳ chỉnh về giao diện (Dark theme).
- `static/app.js`: Logic gửi/nhận tin nhắn qua SSE và render thẻ Markdown.
