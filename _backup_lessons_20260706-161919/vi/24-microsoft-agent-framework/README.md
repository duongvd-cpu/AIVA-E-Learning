# Khám phá Microsoft Agent Framework

![Agent Framework](../../../24-microsoft-agent-framework/images/lesson-14-thumbnail.png)

### Giới thiệu

Bài học này sẽ đề cập đến:
- Hiểu về Microsoft Agent Framework (MAF): Các tính năng chính và giá trị cốt lõi
- Khám phá các khái niệm quan trọng của Microsoft Agent Framework
- Các mô hình MAF nâng cao: Workflows, Middleware, và Memory

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách:
- Xây dựng các AI Agent sẵn sàng cho môi trường thực tế (Production Ready) bằng Microsoft Agent Framework.
- Áp dụng các tính năng cốt lõi của Microsoft Agent Framework vào các trường hợp sử dụng (Use Cases) của bạn.
- Sử dụng các mô hình nâng cao như workflow (luồng công việc), middleware (phần mềm trung gian) và observability (khả năng quan sát).

## Code Mẫu

Code mẫu cho [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) có thể được tìm thấy trong kho lưu trữ này ở các tệp có đuôi `xx-python-agent-framework.ipynb` và `xx-dotnet-agent-framework.ipynb`.

## Hiểu về Microsoft Agent Framework

![Framework Intro](../../../24-microsoft-agent-framework/images/framework-intro.png)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) là một framework thống nhất của Microsoft để xây dựng AI Agent. Nó cung cấp sự linh hoạt để giải quyết nhiều trường hợp sử dụng Agent khác nhau trong cả môi trường thực tế lẫn nghiên cứu, bao gồm:

- **Sequential Agent orchestration (Điều phối tuần tự):** Trong các kịch bản cần luồng công việc theo từng bước.
- **Concurrent orchestration (Điều phối đồng thời):** Trong các kịch bản các Agent cần hoàn thành nhiệm vụ cùng lúc.
- **Group chat orchestration (Điều phối trò chuyện nhóm):** Trong các kịch bản các Agent cần hợp tác với nhau.
- **Handoff Orchestration (Điều phối bàn giao):** Trong các kịch bản các Agent bàn giao nhiệm vụ cho nhau khi xong việc.
- **Magnetic Orchestration (Điều phối từ tính):** Trong các kịch bản có một Agent quản lý tạo ra danh sách nhiệm vụ và điều phối các sub-agent.

Để đưa AI Agent vào **Môi trường thực tế (Production)**, MAF bao gồm các tính năng:
- **Khả năng quan sát (Observability):** Thông qua OpenTelemetry để giám sát mọi hành động, tool calls, luồng suy luận.
- **Bảo mật (Security):** Tích hợp Microsoft Foundry với kiểm soát truy cập, bảo vệ dữ liệu riêng tư và an toàn nội dung.
- **Độ bền bỉ (Durability):** Agent threads và workflows có thể tạm dừng, tiếp tục và phục hồi sau lỗi.
- **Kiểm soát (Control):** Hỗ trợ luồng "Human in the loop" yêu cầu con người phê duyệt.

Microsoft Agent Framework cũng tập trung vào khả năng tương tác:
- **Cloud-agnostic (Độc lập đám mây):** Chạy trên container, on-premise hoặc nhiều cloud khác nhau.
- **Provider-agnostic (Độc lập nhà cung cấp):** Hỗ trợ Azure OpenAI, OpenAI, MiniMax...
- **Tiêu chuẩn mở (Open Standards):** Giao thức Agent-to-Agent (A2A) và Model Context Protocol (MCP).
- **Plugins:** Kết nối với các kho dữ liệu (Microsoft Fabric, SharePoint, Pinecone, Qdrant).

## Các Khái niệm Chính

### Agents

![Agent Framework](../../../24-microsoft-agent-framework/images/agent-components.png)

**Tạo Agent**
Việc tạo Agent được thực hiện bằng cách xác định dịch vụ Suy luận (LLM Provider), tập hợp các Hướng dẫn (Instructions) và gán Tên (`name`). Bạn có thể sử dụng nhiều Provider khác nhau, như Azure OpenAI, OpenAI nguyên bản, MiniMax, hoặc Remote Agents qua A2A.

**Chạy Agent**
Agent được chạy bằng phương thức `.run` hoặc `.run_stream`. Mỗi lần chạy có thể tùy chỉnh tham số như `max_tokens`, `tools` và `model`.

**Tools**
Tools có thể được định nghĩa khi khởi tạo Agent, hoặc cung cấp "đột xuất" (on-the-fly) tại mỗi lần gọi hàm `.run()`.

**Agent Threads (Luồng Agent)**
Agent Threads dùng để xử lý hội thoại nhiều lượt (multi-turn). Bạn có thể tạo Thread mới qua `get_new_thread()`, lưu lại (serialize) và khôi phục (deserialize) từ bộ nhớ để dùng cho lần sau.

**Agent Middleware (Phần mềm trung gian)**
Middleware cho phép bạn thực thi hoặc theo dõi các tác vụ nằm *ở giữa* các lần gọi hàm hoặc gọi LLM:
- **Function Middleware:** Chặn luồng trước và sau khi Agent gọi Tool (thường dùng để log).
- **Chat Middleware:** Chặn luồng trước và sau khi Agent gửi request/nhận response từ LLM.

**Agent Memory (Bộ nhớ Agent)**
MAF hỗ trợ nhiều loại bộ nhớ:
- *In-Memory Storage:* Lưu trực tiếp trên RAM lúc chương trình chạy.
- *Persistent Messages:* Lưu trữ qua factory để duy trì context qua nhiều session.
- *Dynamic Memory:* Tích hợp với dịch vụ ngoại vi như Mem0 để Agent có khả năng "tự học".

**Agent Observability (Giám sát Agent)**
Tích hợp `get_tracer` và `get_meter` từ thư viện OpenTelemetry để đo lường, theo dõi span và metrics.

### Workflows (Luồng công việc)

Workflows là các bước được xác định trước để hoàn thành một nhiệm vụ, trong đó Agent là một thành phần.
- **Executors:** Thành phần nhận input, xử lý nhiệm vụ và trả output. Có thể là Agent hoặc Code logic.
- **Edges:** Các cạnh định nghĩa luồng kết nối giữa các Executors (Trực tiếp, Có điều kiện, Switch-case, Fan-out, Fan-in).
- **Events:** MAF hỗ trợ bắn các sự kiện tích hợp (như `WorkflowStartedEvent`, `ExecutorInvokeEvent`, `WorkflowErrorEvent`) để giám sát luồng chạy dễ dàng hơn.

## Code Mẫu

Bạn hãy mở các tệp Jupyter Notebook `24-microsoft-agent-framework.ipynb` để chạy thử các code mẫu thực tế đã được xây dựng sẵn.

---
**Bài trước:** [Lesson 13 - Agent Memory](../08-agent-memory/README.md)  
**Bài tiếp theo:** [Lesson 15 - Browser Use](../10-browser-use/README.md)