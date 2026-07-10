# Sử dụng các Giao thức AI Agent (MCP, A2A và NLWeb)

[![Agentic Protocols](../../../23-agentic-protocols/images/lesson-11-thumbnail.png)](https://youtu.be/X-Dh9R3Opn8)

> _(Nhấn vào hình trên để xem video bài giảng này)_

Khi việc sử dụng AI Agent ngày càng phổ biến, nhu cầu về các giao thức (protocols) nhằm đảm bảo tính tiêu chuẩn hóa, bảo mật và hỗ trợ đổi mới mở càng trở nên cấp thiết. Trong bài học này, chúng ta sẽ tìm hiểu 3 giao thức sinh ra để giải quyết nhu cầu đó: **Model Context Protocol (MCP)**, **Agent to Agent (A2A)** và **Natural Language Web (NLWeb)**.

## Giới thiệu

Trong bài học này, chúng ta sẽ đề cập đến:
- Cách **MCP** cho phép AI Agent truy cập các công cụ và dữ liệu bên ngoài.
- Cách **A2A** cho phép các AI Agent giao tiếp và hợp tác với nhau.
- Cách **NLWeb** mang giao diện ngôn ngữ tự nhiên (Natural language) lên bất kỳ trang web nào, cho phép AI Agent khám phá và tương tác với nội dung web.

## Mục tiêu học tập
- Nhận diện mục đích cốt lõi và lợi ích của MCP, A2A và NLWeb.
- Giải thích cách mỗi giao thức tạo điều kiện giao tiếp giữa LLM, công cụ và các Agent khác.
- Phân biệt vai trò của từng giao thức trong việc xây dựng các hệ thống agent phức tạp.

---

## 1. Model Context Protocol (MCP)

**Model Context Protocol (MCP)** là một tiêu chuẩn mã nguồn mở (open standard) cung cấp cách thức chuẩn hóa để các ứng dụng cung cấp ngữ cảnh và công cụ cho LLM. Nó giống như một "ổ cắm đa năng" giúp AI Agent kết nối nhất quán với nhiều nguồn dữ liệu và công cụ khác nhau.

### Các thành phần cốt lõi của MCP
MCP hoạt động dựa trên kiến trúc **Client-Server (Máy khách - Máy chủ)**:
- **Hosts:** Là các ứng dụng LLM (ví dụ: trình soạn thảo code như VSCode hoặc Cursor) khởi tạo kết nối đến MCP Server.
- **Clients:** Là các thành phần bên trong Host để duy trì kết nối 1-1 với Server.
- **Servers:** Là các chương trình nhẹ, cung cấp các khả năng cụ thể (capabilities).

Mỗi MCP Server sẽ cung cấp 3 khả năng cốt lõi (primitives):
- **Tools (Công cụ):** Các hành động/hàm mà AI có thể gọi (ví dụ: `get_weather`, `purchase_product`). Server sẽ cung cấp tên, mô tả và cấu trúc đầu vào/ra của tool.
- **Resources (Tài nguyên):** Dữ liệu chỉ đọc (read-only) mà Server cung cấp (như file nội dung, bản ghi cơ sở dữ liệu).
- **Prompts (Dấu nhắc):** Các biểu mẫu prompt gợi ý giúp thực hiện các luồng công việc phức tạp.

### Lợi ích của MCP
- **Khám phá Công cụ Động (Dynamic Tool Discovery):** Agent tự động nhận được danh sách công cụ hiện có từ Server. Bạn "chỉ cần tích hợp một lần" (integrate once) và khi Server cập nhật thêm tool, Agent sẽ tự động biết cách xài mà không cần sửa code.
- **Hoạt động chéo giữa các LLM:** MCP hoạt động bất kể bạn dùng mô hình LLM nào (GPT-4, Claude, Gemini,...).
- **Bảo mật chuẩn hóa:** Cung cấp phương thức xác thực chuẩn.

### Ví dụ về MCP
1. **Khám phá Tool:** Bạn bảo Trợ lý AI (MCP Client) tìm vé máy bay. Trợ lý kết nối với Server của hãng hàng không, hỏi xem Server có tool gì. Server đáp: "Tôi có tool search_flight và book_flight".
2. **Thực thi:** AI nhận diện cần gọi `search_flight`, truyền điểm đi/đến cho Server. Server gọi API nội bộ của hãng hàng không và trả về dữ liệu chuyến bay (JSON) cho AI.

---

## 2. Agent-to-Agent Protocol (A2A)

Trong khi MCP tập trung kết nối LLM với Tool, thì giao thức **A2A (Agent-to-Agent)** tiến thêm một bước: cho phép các AI Agent khác nhau giao tiếp và hợp tác với nhau. A2A kết nối các Agent được tạo bởi các công ty/tech-stack khác nhau để cùng hoàn thành một nhiệm vụ.

### Các thành phần cốt lõi của A2A
- **Agent Card (Thẻ Agent):** Giống như mô tả tool của MCP, Thẻ Agent chứa: Tên, Mô tả công việc, Danh sách kỹ năng chuyên môn, URL Endpoint và Version.
- **Agent Executor (Trình thực thi):** Chịu trách nhiệm chuyển bối cảnh (context) của người dùng sang cho Agent từ xa.
- **Artifact (Sản phẩm đầu ra):** Khi Agent từ xa làm xong việc, nó trả về một Artifact chứa kết quả và mô tả những gì đã được hoàn thành.
- **Event Queue (Hàng đợi sự kiện):** Xử lý cập nhật và nhắn tin qua lại, giúp giữ kết nối an toàn khi xử lý các task tốn nhiều thời gian.

### Lợi ích của A2A
- **Tăng cường Hợp tác:** Cho phép Agent của công ty A (chuyên đặt vé) giao tiếp với Agent của công ty B (chuyên đặt phòng).
- **Linh hoạt chọn Model:** Mỗi Agent trong mạng lưới tự quyết định dùng LLM nào của riêng nó.

---

## 3. Natural Language Web (NLWeb)

Từ trước đến nay, các Website là nơi người dùng truy cập dữ liệu bằng cách click chuột. **NLWeb (Natural Language Web)** biến website thành một thực thể có thể giao tiếp bằng ngôn ngữ tự nhiên.

### Các thành phần của NLWeb
- **NLWeb Application:** Động cơ cốt lõi xử lý câu hỏi ngôn ngữ tự nhiên trên web.
- **NLWeb Protocol:** Tập hợp các quy tắc cơ bản để web phản hồi bằng JSON. Nó tạo ra nền tảng cho "AI Web" giống như HTML tạo ra cho "Document Web".
- **MCP Server:** Bất kỳ setup NLWeb nào cũng đồng thời hoạt động như một **MCP Server**, giúp các AI Agent có thể truy cập nội dung web đó.
- **Vector Database (Cơ sở dữ liệu Vector):** Dùng để lưu trữ ý nghĩa (Embeddings) của nội dung website, giúp AI tìm kiếm thông tin ngữ nghĩa (Semantic search) cực kỳ nhanh.

### Ví dụ về NLWeb
Thay vì phải lục lọi danh mục khách sạn trên web, người dùng có thể gõ vào thanh chat: *"Tìm cho tôi một khách sạn cho gia đình ở Honolulu, có hồ bơi cho tuần tới."*
Hệ thống NLWeb dùng LLM hiểu câu hỏi, quét Vector Database, và trả về thông tin chính xác lấy từ danh mục của chính website đó, ngăn chặn việc AI tự bịa (hallucination). Nếu một **AI Agent từ xa** (như Trợ lý du lịch của bạn) gọi website này thông qua cổng MCP, nó cũng sẽ nhận được kết quả tương tự nhưng dưới dạng JSON để tiếp tục xử lý.

---
**Bài trước:** [Lesson 10 - AI Agents in Production](../22-ai-agents-production/README.md)  
**Bài tiếp theo:** [Lesson 12 - Context Engineering](../07-context-engineering/README.md)