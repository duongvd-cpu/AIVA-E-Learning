# Bộ nhớ của AI Agent (Agent Memory)
[![Agent Memory](../../../08-agent-memory/images/lesson-13-thumbnail.png)](https://youtu.be/QrYbHesIxpw?si=qNYW6PL3fb3lTPMk)

> _(Nhấn vào hình trên để xem video bài giảng này)_

Khi nói về lợi ích độc đáo của AI Agent, có hai điều chính thường được nhắc đến: khả năng gọi Công cụ (Tools) để hoàn thành nhiệm vụ, và khả năng **cải thiện theo thời gian**. Bộ nhớ (Memory) chính là nền tảng để tạo ra một Agent có khả năng tự cải thiện và tạo ra trải nghiệm tốt hơn cho người dùng.

Trong bài học này, chúng ta sẽ tìm hiểu bộ nhớ của AI Agent là gì, cách quản lý và sử dụng nó.

## Giới thiệu

Bài học này sẽ đề cập đến:
- **Hiểu về Bộ nhớ Agent:** Bộ nhớ là gì và tại sao nó lại cần thiết.
- **Triển khai và Lưu trữ:** Các phương pháp thực tế để thêm khả năng ghi nhớ cho AI, tập trung vào bộ nhớ ngắn hạn (short-term) và dài hạn (long-term).
- **Tạo ra AI Agent tự cải thiện (Self-Improving):** Cách bộ nhớ giúp AI học hỏi từ các tương tác cũ.

## Hiểu về Bộ nhớ của AI Agent

Về cốt lõi, **bộ nhớ của AI Agent là cơ chế cho phép chúng giữ lại và nhớ lại thông tin**. Thông tin này có thể là: chi tiết về một cuộc trò chuyện, sở thích của người dùng, các hành động trong quá khứ hoặc các mẫu (patterns) đã học được.

Nếu không có bộ nhớ, các ứng dụng AI sẽ ở trạng thái *stateless* (phi trạng thái) - nghĩa là mọi tương tác đều bắt đầu lại từ con số 0. Điều này dẫn đến trải nghiệm người dùng lặp đi lặp lại và bực bội khi AI liên tục "quên" ngữ cảnh.

### Tại sao Bộ nhớ lại quan trọng?

Trí thông minh của Agent gắn liền với khả năng nhớ lại thông tin trong quá khứ. Bộ nhớ cho phép Agent:
- **Suy ngẫm (Reflective):** Học từ những hành động và kết quả đã qua.
- **Tương tác (Interactive):** Duy trì ngữ cảnh xuyên suốt cuộc trò chuyện hiện tại.
- **Chủ động (Proactive):** Dự đoán nhu cầu hoặc phản hồi dựa trên dữ liệu lịch sử.

### Các Loại Bộ Nhớ (Types of Memory)

#### 1. Bộ nhớ làm việc (Working Memory)
Hãy coi đây là một "tờ giấy nháp" (scratchpad) mà Agent sử dụng trong một nhiệm vụ. Nó lưu giữ thông tin trung gian cần thiết để tính toán bước tiếp theo.
*Ví dụ:* Khi bạn nói "Tôi muốn đặt chuyến đi đến Paris", yêu cầu "đến Paris" được lưu tạm trên giấy nháp để định hướng công việc hiện tại.

#### 2. Bộ nhớ ngắn hạn (Short Term Memory)
Loại bộ nhớ này giữ thông tin trong suốt một phiên trò chuyện (session). 
*Ví dụ:* Bạn hỏi "Vé máy bay đi Paris giá bao nhiêu?", sau đó hỏi tiếp "Còn khách sạn ở đó thì sao?", bộ nhớ ngắn hạn giúp AI hiểu từ "đó" chính là "Paris".

#### 3. Bộ nhớ dài hạn (Long Term Memory)
Đây là thông tin tồn tại xuyên suốt nhiều phiên trò chuyện khác nhau. Nó cho phép Agent ghi nhớ sở thích, lịch sử tương tác của người dùng.
*Ví dụ:* Agent nhớ rằng "Hoàng thích trượt tuyết nhưng sợ các dốc cao do từng bị thương". Lần sau khi bạn yêu cầu lên kế hoạch đi chơi, nó sẽ tự động loại bỏ các khu trượt tuyết mạo hiểm.

#### 4. Các loại bộ nhớ chuyên biệt khác:
- **Persona Memory (Bộ nhớ Tính cách):** Giúp Agent giữ vững một "tính cách" nhất quán (ví dụ luôn trả lời với giọng điệu của một chuyên gia).
- **Episodic Memory (Bộ nhớ Giai thoại):** Lưu lại chuỗi các bước Agent đã thực hiện và kết quả (thành công/thất bại) để tránh lặp lại sai lầm.
- **Entity Memory (Bộ nhớ Thực thể):** Trích xuất tên người, địa điểm, sự vật để xây dựng cơ sở dữ liệu có cấu trúc.
- **Structured RAG:** Trích xuất thông tin dày đặc (như email vé máy bay) và lưu trữ có cấu trúc thay vì chỉ lưu văn bản thuần túy.

## Triển khai và Lưu trữ Bộ nhớ

Việc cài đặt bộ nhớ bao gồm một quy trình có hệ thống: **tạo ra, lưu trữ, truy xuất, tích hợp, cập nhật và thậm chí "quên đi" (xóa) thông tin.**

### Công cụ lưu trữ chuyên biệt

#### Mem0
Mem0 hoạt động như một lớp bộ nhớ bền vững (persistent memory layer). Quá trình hoạt động gồm 2 pha:
1. **Trích xuất (Extraction):** Khi có tin nhắn mới, Mem0 dùng một LLM để đọc, tóm tắt và trích xuất những thông tin quan trọng.
2. **Cập nhật (Update):** Một LLM khác sẽ quyết định xem thông tin mới này nên thêm mới, sửa đổi hay xóa đi khỏi hệ thống lưu trữ hiện tại. 

#### Cognee
Cognee là một bộ nhớ ngữ nghĩa mã nguồn mở biến dữ liệu thành "Sơ đồ tri thức" (Knowledge Graph). Nó kết hợp tìm kiếm độ tương đồng vector với các mối quan hệ đồ thị, giúp Agent hiểu được khái niệm A liên quan đến khái niệm B như thế nào.

#### Lưu trữ bằng Azure AI Search
Bạn có thể sử dụng Azure AI Search làm backend để lưu trữ các bộ nhớ dài hạn, đặc biệt mạnh mẽ đối với Structured RAG (Truy xuất có cấu trúc).

## Xây dựng AI Agent "Tự cải thiện" (Self-Improve)

Một mô hình phổ biến để tạo ra Agent tự cải thiện là đưa vào một **"Knowledge Agent" (Agent Tri Thức)**. Agent này sẽ đứng ngoài quan sát cuộc trò chuyện giữa bạn và Agent chính. Vai trò của nó là:
1. Nhận diện các thông tin giá trị (sở thích, thói quen).
2. Trích xuất và tóm tắt.
3. Lưu vào cơ sở dữ liệu Vector.
4. Lần sau khi bạn hỏi, nó sẽ lục tìm trong cơ sở dữ liệu và "mớm" trước thông tin đó cho Agent chính để phục vụ bạn tốt hơn.

---
**Bài trước:** [Lesson 12 - Context Engineering](../07-context-engineering/README.md)  
**Bài tiếp theo:** [Lesson 14 - Microsoft Agent Framework](../24-microsoft-agent-framework/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Khái niệm **Agent Memory** đã được chúng tôi hiện thực hóa trong dự án `my-practice/web-agent/` thông qua 2 cấp độ:

1. **Short-Term Memory (Trí nhớ ngắn hạn):**
   - Được thể hiện qua biến `chat_history` trong file `main.py`. Nó giữ lại toàn bộ luồng hội thoại giữa người dùng và Agent trong suốt phiên làm việc, giúp Orchestrator không bị "mất trí nhớ" giữa các câu hỏi liên tiếp.

2. **Long-Term Memory (Trí nhớ dài hạn):**
   - Bạn hãy mở file `my-practice/web-agent/skills/memory_skill.py`.
   - Agent sở hữu một Kỹ năng tên là "Chuyên gia Ghi nhớ". Khi bạn nói "Tôi tên là Hoàng", Orchestrator sẽ nhận định đây là dữ liệu cần lưu lại lâu dài và gọi Tool `save_to_memory`. 
   - Thông tin này lập tức được ghi vào tệp `data/long_term_memory.json`. Lần sau bạn khởi động lại hệ thống, thông tin này sẽ được load trực tiếp vào **System Prompt** của Orchestrator, giúp nó "nhớ mặt đặt tên" bạn dù server đã từng bị sập!
