[![Trustworthy AI Agents](../../../18-building-trustworthy-agents/images/lesson-6-thumbnail.png)](https://youtu.be/iZKkMEGBCUQ?si=Q-kEbcyHUMPoHp8L)

> _(Nhấn vào hình trên để xem video bài giảng này)_

# Xây dựng AI Agents đáng tin cậy (Trustworthy AI Agents)

## Giới thiệu

Bài học này sẽ trình bày:

- Cách xây dựng và triển khai các AI Agent an toàn và hiệu quả.
- Các cân nhắc bảo mật quan trọng khi phát triển AI Agent.
- Cách duy trì dữ liệu và quyền riêng tư của người dùng khi phát triển AI Agent.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách:

- Nhận diện và giảm thiểu rủi ro khi tạo AI Agent.
- Áp dụng các biện pháp bảo mật để đảm bảo dữ liệu và quyền truy cập được quản lý hợp lý.
- Tạo các AI Agent bảo vệ quyền riêng tư dữ liệu và cung cấp trải nghiệm người dùng chất lượng.

## An toàn (Safety)

Đầu tiên hãy xem xét việc xây dựng các ứng dụng Agentic an toàn. An toàn có nghĩa là AI Agent hoạt động đúng như thiết kế. Là những người xây dựng ứng dụng Agentic, chúng ta có các phương pháp và công cụ để tối đa hóa sự an toàn:

### Xây dựng Khung Thông điệp Hệ thống (System Message Framework)

Nếu bạn từng xây dựng một ứng dụng AI sử dụng Large Language Models (LLM), bạn sẽ biết tầm quan trọng của việc thiết kế một System Prompt (hoặc System Message) mạnh mẽ. Các prompt này thiết lập các siêu quy tắc, hướng dẫn và nguyên tắc về cách LLM sẽ tương tác với người dùng và dữ liệu.

Đối với AI Agent, System Prompt thậm chí còn quan trọng hơn vì AI Agent sẽ cần các hướng dẫn cực kỳ cụ thể để hoàn thành các tác vụ mà chúng ta thiết kế cho chúng.

Để tạo các System Prompt có khả năng mở rộng (scalable), chúng ta có thể sử dụng System Message Framework để xây dựng một hoặc nhiều Agent trong ứng dụng:

![Building a System Message Framework](../../../18-building-trustworthy-agents/images/system-message-framework.png)

#### Bước 1: Tạo một Meta System Message 

Meta prompt sẽ được LLM sử dụng để sinh ra (generate) các System Prompt cho những Agent mà chúng ta tạo. Chúng ta thiết kế nó dưới dạng một khuôn mẫu (template) để có thể tạo ra nhiều Agent một cách hiệu quả nếu cần.

Đây là một ví dụ về Meta System Message mà chúng ta có thể cung cấp cho LLM:

```plaintext
Bạn là một chuyên gia tạo trợ lý AI Agent. 
Bạn sẽ được cung cấp tên công ty, vai trò, trách nhiệm và thông tin khác 
mà bạn sẽ sử dụng để viết một System Prompt.
Để tạo System Prompt, hãy mô tả chi tiết nhất có thể và cung cấp một cấu trúc 
để hệ thống sử dụng LLM có thể hiểu rõ hơn vai trò và trách nhiệm của trợ lý AI.
```

#### Bước 2: Tạo Basic Prompt

Bước tiếp theo là tạo một prompt cơ bản (Basic Prompt) mô tả AI Agent. Bạn nên bao gồm vai trò của Agent, các tác vụ mà Agent sẽ hoàn thành, và bất kỳ trách nhiệm nào khác.

Ví dụ:

```plaintext
Bạn là một đại lý du lịch của Contoso Travel rất giỏi trong việc đặt vé chuyến bay cho khách hàng. Để giúp đỡ khách hàng, bạn có thể thực hiện các tác vụ sau: tra cứu các chuyến bay có sẵn, đặt chuyến bay, hỏi về sở thích chỗ ngồi và thời gian chuyến bay, hủy bất kỳ chuyến bay nào đã đặt trước đó và thông báo cho khách hàng về bất kỳ sự chậm trễ hoặc hủy chuyến nào.
```

#### Bước 3: Cung cấp Basic System Message cho LLM

Bây giờ chúng ta có thể tối ưu hóa System Message này bằng cách kết hợp Meta System Message và Basic System Message. Điều này sẽ tạo ra một System Message được thiết kế tốt hơn để hướng dẫn các AI Agent của chúng ta.

*(Xem file gốc tiếng Anh để thấy ví dụ kết quả chi tiết của System Message này).*

#### Bước 4: Lặp lại và Cải thiện (Iterate and Improve)

Giá trị cốt lõi của System Message Framework là giúp việc mở rộng và tạo prompt cho nhiều Agent dễ dàng hơn, đồng thời cải thiện chúng theo thời gian. Rất hiếm khi bạn có được một System Message hoạt động hoàn hảo ngay lần đầu tiên cho mọi trường hợp sử dụng. Việc thực hiện các điều chỉnh nhỏ trong Basic System Message và chạy lại nó qua Framework sẽ cho phép bạn so sánh và đánh giá kết quả liên tục.

## Hiểu về các Mối Đe Dọa (Understanding Threats)

Để xây dựng các AI Agent đáng tin cậy, điều quan trọng là phải hiểu và giảm thiểu các rủi ro cũng như mối đe dọa đối với AI Agent của bạn. Hãy xem xét một vài mối đe dọa khác nhau và cách bạn có thể chuẩn bị tốt hơn để phòng ngừa chúng.

![Understanding Threats](../../../18-building-trustworthy-agents/images/understanding-threats.png)

### 1. Thao túng Tác vụ và Hướng dẫn (Task and Instruction)

**Mô tả:** Những kẻ tấn công (Attackers) cố gắng thay đổi các hướng dẫn hoặc mục tiêu của AI Agent thông qua việc thao túng prompt (prompt injection) hoặc đầu vào.

**Giảm thiểu:** Thực hiện các bước kiểm tra xác thực và bộ lọc đầu vào (input filters) để phát hiện các prompt nguy hiểm trước khi chúng được xử lý bởi AI Agent. Vì các cuộc tấn công này thường đòi hỏi phải tương tác liên tục với Agent, nên việc giới hạn số lượt (turns) trong một cuộc hội thoại là một cách khác để ngăn chặn loại tấn công này.

### 2. Truy cập vào các Hệ thống Trọng yếu (Access to Critical Systems)

**Mô tả:** Nếu một AI Agent có quyền truy cập vào các hệ thống hoặc dịch vụ lưu trữ dữ liệu nhạy cảm, những kẻ tấn công có thể xâm phạm giao tiếp giữa Agent và các dịch vụ này. Đây có thể là các cuộc tấn công trực tiếp hoặc những nỗ lực gián tiếp nhằm lấy thông tin về các hệ thống đó thông qua Agent.

**Giảm thiểu:** Các AI Agent chỉ nên có quyền truy cập vào các hệ thống trên cơ sở "cần-mới-biết" (need-only basis) để ngăn chặn các cuộc tấn công này. Giao tiếp giữa Agent và hệ thống cũng phải được bảo mật. Việc triển khai xác thực (authentication) và kiểm soát truy cập (access control) là một biện pháp bảo vệ thông tin hiệu quả.

### 3. Làm Quá tải Tài nguyên và Dịch vụ (Resource and Service Overloading)

**Mô tả:** Các AI Agent có thể truy cập các công cụ và dịch vụ khác nhau để hoàn thành tác vụ. Những kẻ tấn công có thể lợi dụng khả năng này để tấn công các dịch vụ bằng cách gửi một lượng lớn yêu cầu thông qua AI Agent, dẫn đến lỗi hệ thống hoặc chi phí phát sinh cao.

**Giảm thiểu:** Áp dụng các chính sách giới hạn số lượng yêu cầu (rate limiting) mà một AI Agent có thể gửi đến một dịch vụ. Giới hạn số lượt trò chuyện và giới hạn yêu cầu gửi tới chính AI Agent của bạn cũng là một cách phòng ngừa.

### 4. Đầu độc Cơ sở Tri thức (Knowledge Base Poisoning)

**Mô tả:** Loại hình tấn công này không nhằm trực tiếp vào AI Agent mà nhắm vào Cơ sở tri thức (Knowledge Base) và các dịch vụ RAG mà AI Agent sẽ sử dụng. Việc này có thể liên quan đến việc làm hỏng, chèn dữ liệu sai lệch vào tài liệu mà AI Agent sẽ dùng để hoàn thành tác vụ, dẫn đến những phản hồi thiên lệch hoặc ngoài ý muốn cho người dùng.

**Giảm thiểu:** Thực hiện kiểm tra định kỳ để xác minh tính chính xác của dữ liệu mà AI Agent sử dụng. Đảm bảo rằng quyền truy cập vào kho dữ liệu này được bảo mật và chỉ được thay đổi bởi các cá nhân đáng tin cậy.

### 5. Lỗi Dây chuyền (Cascading Errors)

**Mô tả:** AI Agent truy cập vào nhiều công cụ và dịch vụ để hoàn thành tác vụ. Sự cố gây ra bởi những kẻ tấn công trên một hệ thống có thể dẫn đến sự cố hàng loạt của các hệ thống khác mà AI Agent kết nối, khiến cuộc tấn công lan rộng hơn và khó khắc phục hơn.

**Giảm thiểu:** Một phương pháp để tránh điều này là cho AI Agent hoạt động trong một môi trường bị giới hạn, chẳng hạn như thực hiện các tác vụ trong Docker container (Sandbox), để ngăn ngừa tấn công trực tiếp vào hệ thống chính. Việc tạo các cơ chế dự phòng (fallback) và logic thử lại (retry logic) khi một số hệ thống phản hồi lỗi cũng là một cách để ngăn ngừa sự cố hệ thống lớn.

## "Con người trong Vòng lặp" (Human-in-the-Loop - HITL)

Một cách hiệu quả khác để xây dựng các hệ thống AI Agent đáng tin cậy là sử dụng mô hình "Human-in-the-loop" (Con người trong Vòng lặp). Phương pháp này tạo ra một luồng công việc trong đó người dùng có khả năng cung cấp phản hồi cho các Agent trong quá trình chạy. Về cơ bản, người dùng hoạt động như một "Agent" đặc biệt với quyền cao nhất trong hệ thống Multi-Agent, và sẽ cấp quyền duyệt (Approval) hoặc chấm dứt (Termination) tiến trình đang chạy.

![Human in The Loop](../../../18-building-trustworthy-agents/images/human-in-the-loop.png)

Dưới đây là một đoạn code snippet sử dụng Microsoft Agent Framework để hiển thị cách thức triển khai HITL:

```python
import os
from agent_framework.azure import AzureAIProjectAgentProvider
from azure.identity import AzureCliCredential

# Tạo Provider với tính năng duyệt bởi con người (human-in-the-loop)
provider = AzureAIProjectAgentProvider(
    credential=AzureCliCredential(),
)

# Tạo agent có thêm bước yêu cầu phê duyệt
response = provider.create_response(
    input="Hãy làm một bài thơ 4 câu về đại dương.",
    instructions="Bạn là trợ lý hữu ích. Phải hỏi sự chấp thuận của người dùng trước khi chốt kết quả.",
)

# Người dùng có thể xem trước và phê duyệt kết quả
print(response.output_text)
user_input = input("Bạn có duyệt bài thơ này không? (APPROVE/REJECT): ")
if user_input == "APPROVE":
    print("Đã duyệt.")
else:
    print("Bị từ chối. Đang chỉnh sửa lại...")
```

## Kết luận

Việc xây dựng các AI Agent đáng tin cậy đòi hỏi sự thiết kế cẩn thận, các biện pháp bảo mật mạnh mẽ và cải tiến liên tục. Bằng cách áp dụng cấu trúc Meta Prompt, thấu hiểu các mối đe dọa tiềm ẩn và có chiến lược giảm thiểu rủi ro, các lập trình viên có thể tạo ra những AI Agent vừa an toàn vừa hiệu quả. Ngoài ra, việc kết hợp phương pháp Human-in-the-loop đảm bảo rằng AI Agent luôn hoạt động đúng ý định của người dùng trong khi hạn chế tối đa rủi ro.

---
**Bài trước:** [Lesson 05 - Agentic RAG](../06-agentic-rag/README.md)  
**Bài tiếp theo:** [Lesson 07 - Planning Design Pattern](../11-planning-design/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Để đảm bảo Agentic System của chúng ta là một hệ thống **Trustworthy** (Đáng tin cậy) và không bị thao túng, dự án `my-practice/web-agent/` đã áp dụng cơ chế **Input Guardrails**.

1. **Kiểm duyệt đầu vào (Input Safety):**
   - Mở file `my-practice/web-agent/guardrails.py`.
   - Tại đây định nghĩa hàm `check_input_safety`. Nó hoạt động như một lớp màng lọc bảo vệ. Trước khi tin nhắn của người dùng chạm đến LLM, nó sẽ quét các cụm từ thao túng Prompt (Prompt Injection) như *"Bỏ qua các lệnh trước đó"*, *"Ignore previous instructions"*.
   - Nếu phát hiện, hệ thống sẽ trả về lỗi ngay lập tức trong `main.py`, ngăn chặn hoàn toàn khả năng hacker bẻ gãy nhân cách của Orchestrator.
