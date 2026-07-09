# Đưa AI Agent vào Thực tế: Khả năng Quan sát & Đánh giá (Observability & Evaluation)

[![AI Agents in Production](../../../22-ai-agents-production/images/lesson-10-thumbnail.png)](https://youtu.be/l4TP6IyJxmQ?si=reGOyeqjxFevyDq9)

> _(Nhấn vào hình trên để xem video bài giảng này)_

Khi các AI Agent chuyển từ các nguyên mẫu (prototypes) thử nghiệm sang các ứng dụng thực tế (production), khả năng hiểu được hành vi của chúng, theo dõi hiệu suất và đánh giá có hệ thống trở nên cực kỳ quan trọng.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ nắm được:
- Các khái niệm cốt lõi về Khả năng quan sát (Observability) và Đánh giá (Evaluation) của Agent.
- Kỹ thuật nâng cao hiệu suất, giảm chi phí và tăng độ hiệu quả của Agent.
- Cách đánh giá Agent một cách có hệ thống.
- Cách kiểm soát chi phí khi đưa AI Agent lên production.
- Cách cài đặt bộ theo dõi (instrument) cho Agent.

Mục tiêu là trang bị cho bạn kiến thức để biến Agent từ một "chiếc hộp đen" (black box) thành một hệ thống "hộp kính" (glass box) minh bạch, dễ quản lý và đáng tin cậy.

## Traces và Spans (Dấu vết và Nhịp)

Các công cụ theo dõi như [Langfuse](https://langfuse.com/) hoặc [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry) thường biểu diễn quá trình chạy của Agent dưới dạng các "Trace" và "Span".

- **Trace (Dấu vết):** Đại diện cho một tác vụ hoàn chỉnh của Agent từ đầu đến cuối (ví dụ: toàn bộ quá trình xử lý một câu hỏi của người dùng).
- **Span (Nhịp/Bước):** Là các bước riêng lẻ nằm bên trong một Trace (ví dụ: quá trình gọi mô hình ngôn ngữ LLM, hoặc quá trình truy xuất dữ liệu RAG).

![Trace tree in Langfuse](https://langfuse.com/images/cookbook/example-autogen-evaluation/trace-tree.png)

Nếu không có khả năng quan sát, AI Agent giống như một "hộp đen" - trạng thái nội bộ và cách nó suy luận bị mờ mịt, khiến việc chẩn đoán lỗi trở nên khó khăn.

## Tại sao Observability lại quan trọng ở Production?

Chuyển AI Agent sang môi trường production mang lại nhiều thách thức:

- **Gỡ lỗi (Debugging) và Tìm nguyên nhân gốc rễ (Root-Cause Analysis):** Khi Agent thất bại hoặc phản hồi sai, các công cụ observability cung cấp Trace để xác định chính xác lỗi xảy ra ở bước nào.
- **Độ trễ (Latency) và Chi phí (Cost):** Agent thường gọi các LLM (tính tiền theo token). Observability giúp phát hiện các cuộc gọi API quá chậm hoặc quá đắt để có thể tối ưu lại Prompt hoặc đổi mô hình.
- **Sự Tin cậy và Tuân thủ (Trust, Safety, Compliance):** Giúp lưu lại nhật ký (audit trail) kiểm tra mọi hành động của Agent, đảm bảo nó không tạo ra nội dung độc hại hay rò rỉ dữ liệu cá nhân.
- **Vòng lặp Cải tiến Liên tục:** Dữ liệu theo dõi là nền tảng để tinh chỉnh (fine-tune) mô hình ngày càng tốt hơn.

## Các Chỉ số Quan trọng cần Theo dõi (Key Metrics)

- **Latency (Độ trễ):** Agent phản hồi nhanh cỡ nào?
- **Costs (Chi phí):** Chi phí cho mỗi lần chạy Agent là bao nhiêu?
- **Request Errors (Lỗi yêu cầu):** Có bao nhiêu lệnh gọi API bị lỗi? (Cần chuẩn bị phương án dự phòng - fallback).
- **User Feedback (Phản hồi Người dùng):** Đánh giá rõ ràng (Like/Dislike, 1-5 sao).
- **Implicit User Feedback (Phản hồi ngầm):** Người dùng có thường xuyên phải hỏi lại, hoặc liên tục bấm nút retry không?
- **Accuracy (Độ chính xác):** Tần suất Agent tạo ra kết quả đúng (Dựa vào bài test).
- **Automated Evaluation Metrics (Đánh giá tự động):** Dùng một LLM khác để chấm điểm (score) đầu ra của Agent xem có hữu ích hay không.

## Cài đặt Bộ theo dõi (Instrument your Agent)

Để thu thập dữ liệu trace, bạn cần cài đặt bộ theo dõi vào mã nguồn. 
**OpenTelemetry (OTel)** là một tiêu chuẩn ngành. Nhiều framework Agent (như Microsoft Agent Framework) tích hợp sẵn OpenTelemetry để đẩy dữ liệu ra các công cụ giám sát một cách tự động.

## Đánh giá Agent (Agent Evaluation)

Observability cung cấp cho ta các *chỉ số* (metrics), còn Evaluation là quá trình *phân tích* dữ liệu đó để xác định xem AI Agent hoạt động tốt đến đâu.

Có 2 hình thức Đánh giá chính:

### 1. Offline Evaluation (Đánh giá Ngoại tuyến)
Đây là đánh giá trong môi trường được kiểm soát. Bạn chuẩn bị sẵn một tập dữ liệu (dataset) gồm các câu hỏi test và "đáp án đúng" (ground truth). Chạy Agent trên tập test này để đo độ chính xác trước khi đưa ra cho người dùng thật (Deploy). Thường được đưa vào quy trình CI/CD.

### 2. Online Evaluation (Đánh giá Trực tuyến)
Đánh giá trong môi trường thực tế với người dùng thật. Nó giúp phát hiện những kịch bản bất ngờ mà bạn chưa từng chuẩn bị trong môi trường test (Offline). Bao gồm việc thu thập phản hồi, thử nghiệm A/B.

*Quy trình chuẩn: Đánh giá Offline -> Triển khai (Deploy) -> Giám sát Online -> Tìm ra ca lỗi mới -> Thêm vào tập Offline -> Tối ưu Agent -> Lặp lại.*

## Quản lý Chi phí (Managing Costs)

- **Dùng mô hình nhỏ (Smaller Models - SLMs):** Đừng luôn dùng mô hình đắt tiền nhất (như GPT-4) cho mọi việc. Những việc đơn giản (phân loại ý định) có thể dùng mô hình nhỏ, nhanh, rẻ.
- **Dùng mô hình điều hướng (Router Model):** Xây dựng một Agent làm nhiệm vụ phân loại câu hỏi (Routing Agent). Nếu câu hỏi dễ -> đẩy cho mô hình SLM rẻ. Nếu câu hỏi khó (cần suy luận) -> đẩy cho mô hình lớn đắt tiền.
- **Lưu bộ nhớ đệm (Caching Responses):** Nếu nhiều người dùng hỏi cùng một câu hỏi giống nhau, hãy trả về kết quả đã lưu sẵn thay vì bắt Agent xử lý lại từ đầu.

---
**Bài trước:** [Lesson 09 - Metacognition Design Pattern](../12-metacognition/README.md)  
**Bài tiếp theo:** [Lesson 11 - Agentic Protocols](../23-agentic-protocols/README.md)