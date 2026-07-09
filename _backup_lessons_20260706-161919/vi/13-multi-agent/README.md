[![Multi-Agent Design](../../../13-multi-agent/images/lesson-8-thumbnail.png)](https://youtu.be/V6HpE9hZEx0?si=A7K44uMCqgvLQVCa)

> _(Nhấn vào hình trên để xem video bài giảng này)_

# Các Mô hình Thiết kế Đa Tác Nhân (Multi-Agent Design Patterns)

Ngay khi bạn bắt đầu làm việc trên một dự án liên quan đến nhiều Agent, bạn sẽ cần xem xét mô hình thiết kế Đa tác nhân (Multi-Agent). Tuy nhiên, có thể bạn chưa rõ ngay khi nào nên chuyển sang kiến trúc Multi-Agent và những lợi ích của nó là gì.

## Giới thiệu

Trong bài học này, chúng ta sẽ trả lời các câu hỏi sau:

- Những kịch bản nào phù hợp để áp dụng Multi-Agent?
- Lợi ích của việc sử dụng Multi-Agent so với một Agent duy nhất thực hiện nhiều tác vụ là gì?
- Các thành phần cốt lõi (building blocks) để triển khai mô hình Multi-Agent là gì?
- Làm thế nào để chúng ta có thể quan sát (visibility) cách các Agent tương tác với nhau?

## Mục tiêu học tập

Sau bài học này, bạn sẽ có khả năng:

- Xác định các kịch bản áp dụng Multi-Agent hiệu quả.
- Nhận ra lợi thế của việc sử dụng Multi-Agent so với một Agent đơn lẻ.
- Hiểu được các thành phần cốt lõi của việc triển khai kiến trúc Multi-Agent.

**Bức tranh lớn hơn là gì?**

*Multi-Agents là một mô hình thiết kế cho phép nhiều Agent làm việc cùng nhau để đạt được một mục tiêu chung*.

Mô hình này được sử dụng rộng rãi trong nhiều lĩnh vực khác nhau, bao gồm robot học, hệ thống tự trị và điện toán phân tán.

## Các kịch bản phù hợp với Multi-Agents

Vậy những kịch bản nào là trường hợp sử dụng tốt cho Multi-Agents? Câu trả lời là có rất nhiều kịch bản mà việc tuyển dụng nhiều Agent sẽ mang lại lợi ích lớn, đặc biệt là trong các trường hợp sau:

- **Khối lượng công việc lớn (Large workloads)**: Khối lượng công việc lớn có thể được chia thành các tác vụ nhỏ hơn và giao cho các Agent khác nhau, cho phép xử lý song song và hoàn thành nhanh hơn. Một ví dụ là trong trường hợp tác vụ xử lý dữ liệu lớn.
- **Tác vụ phức tạp (Complex tasks)**: Các tác vụ phức tạp có thể được phân rã thành các tác vụ phụ (như đã học ở Lesson 07) và giao cho các Agent chuyên biệt, mỗi Agent chuyên sâu về một khía cạnh cụ thể. Ví dụ điển hình là xe tự lái, nơi có các Agent khác nhau quản lý việc điều hướng, phát hiện chướng ngại vật và giao tiếp với xe khác.
- **Chuyên môn đa dạng (Diverse expertise)**: Các Agent khác nhau có thể sở hữu chuyên môn khác nhau, giúp chúng xử lý hiệu quả hơn. Trong lĩnh vực y tế, các Agent có thể phân chia để quản lý quá trình chẩn đoán, lên kế hoạch điều trị và theo dõi bệnh nhân.

## Lợi ích của Multi-Agents so với Một Agent Đơn lẻ

Một hệ thống Agent đơn lẻ (Single Agent) có thể hoạt động tốt cho các tác vụ đơn giản, nhưng đối với các tác vụ phức tạp hơn, việc sử dụng nhiều Agent mang lại nhiều ưu điểm:

- **Sự chuyên môn hóa (Specialization)**: Mỗi Agent có thể được chuyên biệt hóa cho một tác vụ cụ thể. Nếu dùng một Agent duy nhất cho mọi việc, nó có thể bị nhầm lẫn khi đối mặt với một tác vụ phức tạp, dẫn đến kết quả sai lệch.
- **Khả năng mở rộng (Scalability)**: Dễ dàng mở rộng quy mô hệ thống bằng cách thêm nhiều Agent thay vì làm quá tải một Agent.
- **Khả năng chịu lỗi (Fault Tolerance)**: Nếu một Agent bị lỗi, các Agent khác vẫn có thể tiếp tục hoạt động, đảm bảo độ tin cậy của hệ thống.

**Ví dụ:** Hãy tưởng tượng việc đặt một chuyến đi cho người dùng. Một hệ thống Single Agent sẽ phải xử lý mọi khía cạnh, từ tìm chuyến bay, đặt khách sạn đến thuê xe. Agent đó sẽ cần rất nhiều công cụ khác nhau, tạo ra một hệ thống nguyên khối (monolithic) phức tạp, khó bảo trì. Ngược lại, một hệ thống Multi-Agent có thể chia ra: một Agent tìm chuyến bay, một Agent đặt khách sạn. Hệ thống sẽ trở nên dạng mô-đun, dễ bảo trì và dễ mở rộng hơn.

## Các Thành phần cốt lõi của Multi-Agent

Trước khi có thể triển khai Multi-Agent, bạn cần hiểu các thành phần xây dựng nên kiến trúc này:

- **Giao tiếp giữa các Agent (Agent Communication)**: Các Agent cần chia sẻ thông tin về sở thích và ràng buộc của người dùng. Nghĩa là bạn phải quyết định *các Agent nào sẽ chia sẻ thông tin và cách thức chia sẻ*.
- **Cơ chế Điều phối (Coordination Mechanisms)**: Các Agent cần phối hợp hành động. Ví dụ: Agent đặt khách sạn cần phối hợp với Agent thuê xe để đảm bảo khách sạn gần sân bay và xe cũng thuê tại sân bay. Bạn phải quyết định *cách các Agent phối hợp*.
- **Kiến trúc Agent (Agent Architecture)**: Các Agent cần có cấu trúc nội bộ để ra quyết định và học hỏi.
- **Khả năng quan sát (Visibility into Multi-Agent Interactions)**: Cần có các công cụ (như dashboard, log) để theo dõi hoạt động của chúng.
- **Các mẫu Multi-Agent (Multi-Agent Patterns)**: Có các mẫu kiến trúc khác nhau như tập trung (centralized), phi tập trung (decentralized) và lai (hybrid).
- **Human-in-the-loop**: Trong nhiều trường hợp, bạn sẽ cần người dùng can thiệp (chẳng hạn như xác nhận trước khi thanh toán).

## Các Mẫu Đa Tác Nhân (Multi-Agent Patterns)

Hãy cùng đi sâu vào một số mẫu (pattern) cụ thể để tạo ứng dụng Multi-Agent:

### 1. Group Chat (Hội thoại nhóm)

Rất hữu ích để tạo ứng dụng nhóm chat nơi các Agent giao tiếp chéo với nhau. Thường dùng trong hợp tác nhóm, hỗ trợ khách hàng. Mỗi Agent đại diện cho một người dùng/vai trò trong nhóm.

![Group chat](../../../13-multi-agent/images/multi-agent-group-chat.png)

### 2. Hand-off (Chuyển giao)

Hữu ích khi bạn muốn các Agent chuyển giao công việc cho nhau theo quy trình (workflow). Thường dùng trong tự động hóa quy trình làm việc. Ví dụ: Agent CSKH nhận yêu cầu -> chuyển giao cho Agent Kỹ thuật -> chuyển giao cho Agent Hoàn tiền.

![Hand off](../../../13-multi-agent/images/multi-agent-hand-off.png)

### 3. Collaborative filtering (Lọc cộng tác)

Sử dụng khi bạn muốn nhiều Agent hợp tác để đưa ra đề xuất cho người dùng.
Ví dụ: Khi tư vấn mua cổ phiếu, bạn có thể gọi:
- Agent Chuyên gia ngành.
- Agent Phân tích kỹ thuật.
- Agent Phân tích cơ bản.
Sự hợp tác của 3 Agent này sẽ cho ra kết quả toàn diện nhất.

![Recommendation](../../../13-multi-agent/images/multi-agent-filtering.png)

## Tổng kết

Trong bài học này, chúng ta đã tìm hiểu về mô hình Multi-Agent: thời điểm nên sử dụng, lợi ích vượt trội so với Single Agent, các khối xây dựng cốt lõi và các kiến trúc Multi-Agent phổ biến (Group Chat, Hand-off, Collaborative Filtering). Bằng cách áp dụng đúng mô hình, bạn có thể giải quyết được các quy trình nghiệp vụ cực kỳ phức tạp một cách gọn gàng và ổn định.

---
**Bài trước:** [Lesson 07 - Planning Design Pattern](../11-planning-design/README.md)  
**Bài tiếp theo:** [Lesson 09 - Metacognition in AI Agents](../12-metacognition/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Khái niệm **Multi-Agent (Đa Tác nhân)** chính là trái tim của dự án thực hành `my-practice/web-agent/` mà chúng ta đã xây dựng. Chúng ta đã áp dụng mô hình **Orchestrator-Workers (Quản đốc - Công nhân)**.

1. **Quản đốc (Orchestrator):** 
   - Đóng vai trò là điểm chạm duy nhất với người dùng. Orchestrator được lập trình tại `main.py` với System Prompt chuyên biệt, KHÔNG trực tiếp làm việc mà chỉ lắng nghe và lên kế hoạch (Planning).
2. **Công nhân (Sub-agents):**
   - Nằm tại thư mục `skills/`. Mỗi file Python như `sql_skill.py`, `rag_skill.py`, `memory_skill.py` là một chuyên gia. Orchestrator dùng kỹ năng `delegate_task` để gọi các chuyên gia này xử lý các yêu cầu chuyên biệt.
   - Nhờ kiến trúc này, khi bạn muốn Agent biết thêm một nghiệp vụ mới (như xem giá vàng), bạn chỉ cần tạo một file `gold_skill.py` thay vì phải đập đi xây lại toàn bộ hệ thống!
