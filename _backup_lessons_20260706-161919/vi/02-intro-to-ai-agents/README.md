[![Intro to AI Agents](../../../translated_images/vi/lesson-1-thumbnail.d21b2c34b32d35bb.webp)](https://youtu.be/3zgm60bXmQk?si=QA4CW2-cmul5kk3D)

> _(Nhấn vào hình ảnh phía trên để xem video bài học này)_

# Giới thiệu về AI Agents và Các Trường hợp sử dụng Agent

Chào mừng bạn đến với khóa học **AI Agents for Beginners**! Khóa học này cung cấp cho bạn kiến thức nền tảng — cùng với mã thực thi thực tế — để bắt đầu xây dựng các AI Agents từ đầu.

Hãy ghé thăm <a href="https://discord.gg/kzRShWzttr" target="_blank">Cộng đồng Discord Azure AI</a> — nơi đầy những người học và nhà phát triển AI sẵn sàng trả lời câu hỏi của bạn.

Trước khi bắt tay vào xây dựng, hãy chắc chắn rằng chúng ta thực sự hiểu AI Agent *là gì* và khi nào nên sử dụng nó.

---

## Giới thiệu

Bài học này bao gồm:

- AI Agent là gì, và những loại khác nhau tồn tại
- Những loại nhiệm vụ nào AI Agent phù hợp nhất
- Những khối cấu thành cốt lõi bạn sẽ dùng khi thiết kế một giải pháp Agentic

## Mục tiêu học tập

Kết thúc bài học, bạn sẽ có thể:

- Giải thích AI Agent là gì và nó khác thế nào so với một giải pháp AI thông thường
- Biết khi nào nên dùng AI Agent (và khi nào không nên)
- Phác thảo một thiết kế giải pháp Agentic cơ bản cho một vấn đề thực tế

---

## 🛠 Thực hành Xuyên suốt Khóa học (Web Agent)

> [!TIP]
> **Bắt đầu từ đâu?** 
> Dù đây là bài lý thuyết, chúng tôi đã chuẩn bị sẵn một dự án thực hành mang tên **Web Agent** trong thư mục `my-practice/web-agent/`. 
> Tại đây, bạn sẽ được tự tay code một "Hệ điều hành AI" thu nhỏ. Sau khi nắm vững lý thuyết ở các bài đầu, bạn có thể nhảy ngay vào file `main.py` của dự án để xem các khối cấu thành cốt lõi (Cảm biến, Môi trường, Bộ truyền động) hoạt động bằng mã nguồn thật như thế nào.

---

## Định nghĩa AI Agents và Các Loại AI Agents

### AI Agent là gì?

Đây là cách đơn giản để nghĩ về nó:

> **AI Agent là các hệ thống cho phép Mô hình Ngôn ngữ Lớn (LLMs) thực sự *làm việc* — bằng cách cung cấp cho chúng công cụ và kiến thức để tác động đến thế giới, không chỉ phản hồi các câu lệnh.**

Hãy giải thích kỹ hơn chút:

- **Hệ thống** — Một AI Agent không chỉ là một thứ. Nó là tập hợp các phần phối hợp với nhau. Về cốt lõi, mỗi Agent có ba phần:
  - **Môi trường** — Không gian mà Agent làm việc. Ví dụ, với Agent đặt chuyến đi, đó là chính nền tảng đặt vé.
  - **Cảm biến** — Cách Agent đọc trạng thái hiện tại của môi trường. Agent du lịch có thể kiểm tra tình trạng phòng khách sạn hoặc giá vé máy bay.
  - **Bộ truyền động (Actuator)** — Cách Agent thực hiện hành động. Agent có thể đặt phòng, gửi xác nhận, hoặc hủy đặt chỗ.

![What Are AI Agents?](../../../translated_images/vi/what-are-ai-agents.1ec8c4d548af601a.webp)

- **Mô hình Ngôn ngữ Lớn** — Agent đã tồn tại trước LLM, nhưng LLM là yếu tố làm cho Agent hiện đại mạnh mẽ. Chúng hiểu ngôn ngữ tự nhiên, suy luận bối cảnh, và biến yêu cầu mơ hồ thành kế hoạch hành động cụ thể.

- **Thực hiện Hành động** — Nếu không có hệ thống Agent, LLM chỉ tạo ra văn bản. Trong hệ thống Agent, LLM có thể thực sự *thực thi* các bước — tìm kiếm cơ sở dữ liệu, gọi API, gửi tin nhắn.

- **Truy cập Công cụ** — Công cụ mà Agent sử dụng phụ thuộc vào (1) môi trường nó hoạt động và (2) những gì nhà phát triển thiết lập. Agent du lịch có thể tìm chuyến bay nhưng không thể chỉnh sửa hồ sơ khách hàng — tất cả tùy thuộc vào kết nối của bạn.

- **Bộ nhớ + Kiến thức** — Agent có thể có bộ nhớ ngắn hạn (cuộc hội thoại hiện tại) và bộ nhớ dài hạn (cơ sở dữ liệu khách hàng, tương tác trước). Agent du lịch có thể "nhớ" bạn thích chỗ ngồi bên cửa sổ.

---

### Các loại AI Agent khác nhau

Không phải Agent nào cũng được xây dựng giống nhau. Dưới đây là phân loại các loại chính, lấy ví dụ Agent đặt chuyến du lịch:

| **Loại Agent** | **Chức năng** | **Ví dụ Agent du lịch** |
|---|---|---|
| **Agent phản xạ đơn giản** | Tuân theo các quy tắc cố định — không có bộ nhớ, không có kế hoạch. | Nhận được email phàn nàn → chuyển tiếp cho bộ phận chăm sóc khách hàng. Chỉ vậy thôi. |
| **Agent phản xạ dựa trên mô hình** | Giữ một mô hình nội bộ về thế giới và cập nhật khi có sự thay đổi. | Theo dõi giá vé máy bay lịch sử và đánh dấu các tuyến đường đột ngột tăng giá. |
| **Agent dựa trên mục tiêu** | Có mục tiêu và tìm cách đạt được từng bước. | Đặt toàn bộ chuyến đi (vé máy bay, xe cộ, khách sạn) từ vị trí hiện tại của bạn đến điểm đến. |
| **Agent dựa trên lợi ích** | Không chỉ tìm *một* giải pháp — tìm *giải pháp tốt nhất* bằng cách cân nhắc lợi ích và thiệt hại. | Cân bằng chi phí và sự tiện lợi để tìm chuyến đi phù hợp nhất với sở thích của bạn. |
| **Agent học hỏi** | Cải thiện theo thời gian dựa trên phản hồi. | Điều chỉnh đề xuất đặt chuyến dựa trên kết quả khảo sát sau chuyến đi. |
| **Agent phân cấp** | Agent cấp cao chia công việc thành các nhiệm vụ nhỏ và giao cho Agent cấp thấp hơn. | Yêu cầu "hủy chuyến đi" được chia thành: hủy vé máy bay, hủy khách sạn, hủy thuê xe — mỗi phần do một Agent con xử lý. |
| **Hệ thống đa tác tử (Multi-Agent System - MAS)** | Nhiều Agent độc lập làm việc cùng nhau (hoặc cạnh tranh). | Hợp tác: các Agent riêng biệt xử lý khách sạn, vé máy bay, và giải trí. Cạnh tranh: nhiều Agent tranh giành đặt phòng khách sạn với giá tốt nhất. |

---

## Khi nào nên sử dụng AI Agents

Chỉ vì bạn *có thể* dùng AI Agent không có nghĩa bạn *luôn nên* dùng. Dưới đây là những tình huống Agent phát huy tác dụng:

![When to use AI Agents?](../../../translated_images/vi/when-to-use-ai-agents.54becb3bed74a479.webp)

- **Vấn đề Mở** — Khi các bước giải quyết không thể lập trình sẵn. Bạn cần LLM tìm đường đi một cách linh hoạt.
- **Quy trình Nhiều bước** — Nhiệm vụ yêu cầu sử dụng nhiều công cụ qua nhiều lượt, không chỉ tra cứu hay tạo ra một lần.
- **Cải tiến theo thời gian** — Khi bạn muốn hệ thống trở nên thông minh hơn dựa trên phản hồi người dùng hoặc tín hiệu môi trường.

Chúng ta sẽ khám phá sâu hơn về khi nào (và khi nào *không*) nên sử dụng AI Agent trong bài học **Building Trustworthy AI Agents** sau trong khóa học.

---

## Cơ bản về Giải pháp Agentic

### Phát triển Agent

Điều đầu tiên bạn làm khi xây Agent là xác định *nó có thể làm gì* — công cụ, hành động và hành vi của nó.

Trong khóa học này, chúng ta sử dụng **Azure AI Agent Service** làm nền tảng chính. Nó hỗ trợ:

- Các mẫu từ nhà cung cấp như OpenAI, Mistral, và Meta (Llama)
- Dữ liệu có bản quyền từ các nhà cung cấp như Tripadvisor
- Định nghĩa công cụ tiêu chuẩn OpenAPI 3.0

### Mẫu thiết kế Agentic (Agentic Patterns)

Bạn giao tiếp với LLM thông qua các câu lệnh prompt. Với Agent, bạn không thể tự tay tạo mọi prompt — Agent phải hành động qua nhiều bước. Đó là lý do có **Mẫu thiết kế Agentic**. Chúng là các chiến lược tái sử dụng để tạo prompt và điều phối LLM một cách mở rộng và đáng tin cậy.

Khóa học này được cấu trúc quanh các mẫu agentic phổ biến và hữu ích nhất.

### Framework Agentic

Framework Agentic cung cấp cho nhà phát triển các mẫu, công cụ, và hạ tầng sẵn sàng để xây dựng Agent. Chúng giúp:

- Kết nối công cụ và khả năng
- Quan sát hành động Agent (và gỡ lỗi khi có lỗi)
- Hợp tác giữa nhiều Agent

Trong khóa học, chúng ta tập trung vào **Microsoft Agent Framework (MAF)** để xây dựng Agent sẵn sàng sản xuất.

---

## Mẫu Code

Sẵn sàng để xem hoạt động thực tế? Dưới đây là mẫu code cho bài học:

- 🐍 Python: [Agent Framework](./code_samples/01-python-agent-framework.ipynb)
- 🔷 .NET: [Agent Framework](./code_samples/01-dotnet-agent-framework.md)

---

## Có câu hỏi?

Tham gia [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) để kết nối với những người học khác, tham dự giờ làm việc, và được cộng đồng trả lời câu hỏi về AI Agents.

---

## Bài học trước

[Course Setup](../01-course-setup/README.md)

## Bài học tiếp theo

[Exploring Agentic Frameworks](../03-explore-agentic-frameworks/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->