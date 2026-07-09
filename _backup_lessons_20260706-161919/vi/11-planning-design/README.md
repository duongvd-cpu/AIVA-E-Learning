[![Planning Design Pattern](../../../11-planning-design/images/lesson-7-thumbnail.png)](https://youtu.be/kPfJ2BrBCMY?si=9pYpPXp0sSbK91Dr)

> _(Nhấn vào hình trên để xem video bài giảng này)_

# Mô hình Thiết kế Lập Kế Hoạch (Planning Design Pattern)

## Giới thiệu

Bài học này sẽ trình bày:

* Cách xác định mục tiêu tổng thể rõ ràng và chia nhỏ một tác vụ phức tạp thành các tác vụ nhỏ hơn dễ quản lý.
* Tận dụng "đầu ra có cấu trúc" (structured output) để tạo ra các phản hồi đáng tin cậy hơn và dễ dàng cho máy đọc/xử lý.
* Áp dụng phương pháp tiếp cận hướng sự kiện (event-driven) để xử lý các tác vụ động và dữ liệu đầu vào bất ngờ.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ hiểu về:

* Cách xác định và thiết lập mục tiêu tổng thể cho một AI Agent, đảm bảo nó biết rõ cần phải hoàn thành điều gì.
* Cách phân rã một tác vụ phức tạp thành các tác vụ phụ (subtasks) có thể quản lý được và tổ chức chúng theo một trình tự hợp lý.
* Cách trang bị cho Agent các công cụ phù hợp (ví dụ: công cụ tìm kiếm hoặc công cụ phân tích dữ liệu), quyết định khi nào và cách sử dụng chúng, cũng như xử lý các tình huống bất ngờ phát sinh.
* Đánh giá kết quả của các tác vụ phụ, đo lường hiệu suất và lặp lại các hành động để cải thiện kết quả cuối cùng.

## Xác định Mục tiêu Tổng thể và Phân rã Tác vụ

![Defining Goals and Tasks](../../../11-planning-design/images/defining-goals-tasks.png)

Hầu hết các tác vụ trong thế giới thực đều quá phức tạp để giải quyết chỉ trong một bước duy nhất. Một AI Agent cần một mục tiêu súc tích để định hướng lập kế hoạch và hành động. Ví dụ, hãy xem xét mục tiêu sau:

    "Lên kế hoạch cho lịch trình du lịch 3 ngày."

Mặc dù diễn đạt rất đơn giản, mục tiêu này vẫn cần được tinh chỉnh. Mục tiêu càng rõ ràng, AI Agent (và bất kỳ cộng tác viên là con người nào) càng có thể tập trung tốt hơn vào việc đạt được kết quả đúng đắn, chẳng hạn như tạo ra một hành trình toàn diện với các lựa chọn chuyến bay, đề xuất khách sạn và gợi ý hoạt động.

### Phân rã Tác vụ (Task Decomposition)

Các tác vụ lớn hoặc phức tạp sẽ trở nên dễ quản lý hơn khi được chia thành các tác vụ phụ nhỏ hơn, định hướng theo mục tiêu.
Đối với ví dụ về lịch trình du lịch, bạn có thể phân rã mục tiêu thành:

* Đặt vé máy bay (Flight Booking)
* Đặt phòng khách sạn (Hotel Booking)
* Thuê ô tô (Car Rental)
* Cá nhân hóa (Personalization)

Mỗi tác vụ phụ sau đó có thể được giải quyết bởi các Agent hoặc quy trình chuyên dụng. Một Agent có thể chuyên tìm kiếm các giao dịch chuyến bay tốt nhất, một Agent khác tập trung vào việc đặt phòng khách sạn... Một Agent điều phối hoặc "hạ nguồn" (downstream agent) sau đó có thể tổng hợp các kết quả này thành một lịch trình gắn kết để gửi cho người dùng cuối.

Phương pháp tiếp cận mô-đun này cũng cho phép nâng cấp dần dần. Ví dụ, bạn có thể thêm các Agent chuyên dụng để Đề xuất Đồ ăn hoặc Đề xuất Hoạt động Địa phương và tinh chỉnh lịch trình theo thời gian.

### Đầu ra có cấu trúc (Structured output)

Các Mô hình Ngôn ngữ Lớn (LLMs) có thể tạo ra đầu ra có cấu trúc (ví dụ: JSON), giúp các Agent hoặc dịch vụ hạ nguồn phân tích cú pháp và xử lý dễ dàng hơn. Điều này đặc biệt hữu ích trong ngữ cảnh Đa Tác nhân (Multi-agent), nơi chúng ta có thể thực thi các tác vụ này sau khi nhận được đầu ra từ khâu Lập kế hoạch (Planning).

*(Xem mã nguồn Python trong bài học gốc bằng tiếng Anh để biết cách dùng Pydantic định nghĩa cấu trúc JSON cho một Kế hoạch Du lịch).*

### Agent Lập Kế Hoạch với Điều phối Đa Tác nhân (Multi-Agent Orchestration)

Trong ví dụ này, một Semantic Router Agent (Agent định tuyến ngữ nghĩa) nhận một yêu cầu của người dùng (ví dụ: "Tôi cần lên kế hoạch khách sạn cho chuyến đi của mình.").

Agent Lập Kế Hoạch (Planner) sau đó thực hiện:

* **Tiếp nhận Kế hoạch:** Planner nhận thông điệp của người dùng và, dựa trên một system prompt (bao gồm thông tin chi tiết về các Agent hiện có), tạo ra một kế hoạch du lịch có cấu trúc.
* **Liệt kê Agent và Công cụ của họ:** Kho (registry) Agent lưu giữ danh sách các Agent (ví dụ: cho chuyến bay, khách sạn, thuê xe) cùng với các chức năng hoặc công cụ mà họ cung cấp.
* **Định tuyến Kế hoạch cho các Agent tương ứng:** Tùy thuộc vào số lượng tác vụ phụ, Planner sẽ gửi thông điệp trực tiếp đến một Agent chuyên dụng (cho các tình huống đơn tác vụ) hoặc điều phối thông qua trình quản lý nhóm chat (group chat manager) để hợp tác đa tác nhân.
* **Tóm tắt Kết quả:** Cuối cùng, Planner tóm tắt kế hoạch đã tạo để làm rõ thông tin cho người dùng.

*(Ví dụ Output JSON có trong bài gốc mô tả chi tiết cách gán task cho `assigned_agent`).*

### Lập Kế Hoạch Lặp (Iterative Planning)

Một số tác vụ đòi hỏi sự qua lại hoặc lập kế hoạch lại, nơi kết quả của một tác vụ phụ ảnh hưởng đến tác vụ tiếp theo. Ví dụ: nếu Agent phát hiện định dạng dữ liệu không mong muốn trong khi đặt vé chuyến bay, nó có thể cần điều chỉnh chiến lược của mình trước khi chuyển sang đặt phòng khách sạn.

Ngoài ra, phản hồi của người dùng (ví dụ: khách hàng quyết định họ thích một chuyến bay sớm hơn) có thể kích hoạt quy trình tái lập kế hoạch một phần (partial re-plan). Phương pháp tiếp cận động và lặp lại này đảm bảo rằng giải pháp cuối cùng phù hợp với các ràng buộc trong thế giới thực và sở thích đang thay đổi của người dùng.

## Tóm tắt

Trong bài viết này, chúng ta đã xem xét ví dụ về cách tạo ra một **Planner** có thể tự động chọn lựa các Agent hiện có. Đầu ra của Planner sẽ phân rã tác vụ và phân công cho các Agent để thực thi. Người ta giả định rằng các Agent đã có sẵn quyền truy cập vào các hàm/công cụ cần thiết để thực hiện tác vụ. Ngoài các tác nhân này, bạn có thể bao gồm các mô hình (pattern) khác như phản xạ (reflection), tóm tắt (summarizer) và hội thoại vòng tròn (round robin chat) để tùy chỉnh sâu hơn.

---
**Bài trước:** [Lesson 06 - Building Trustworthy AI Agents](../18-building-trustworthy-agents/README.md)  
**Bài tiếp theo:** [Lesson 08 - Multi-Agent Design Pattern](../13-multi-agent/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Khái niệm **Planning (Lập kế hoạch)** đã được tích hợp vào não bộ của Orchestrator (Người điều phối) trong dự án `my-practice/web-agent/`.

1. **Buộc phải vạch ra kế hoạch (Create Execution Plan):**
   - Bạn hãy mở file `my-practice/web-agent/skills/__init__.py`. Chúng ta đã trang bị cho Orchestrator một "công cụ bản năng" mang tên `create_execution_plan`.
   - Trong `main.py` (phần System Prompt), Orchestrator bị **bắt buộc** phải sử dụng công cụ này để liệt kê chi tiết các bước cần làm (Bước 1, Bước 2...) trước khi thực sự phân công công việc (`delegate_task`) cho các Agent khác.
   - Khi chạy Web UI, bạn sẽ thấy Agent in ra dòng trạng thái: *"📋 Kế hoạch (Planning): Bước 1... Bước 2..."* trước khi hành động. Điều này giúp tiến trình trở nên minh bạch và tránh thiếu sót khi xử lý lệnh phức tạp.
