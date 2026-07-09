# Kỹ nghệ Ngữ cảnh cho AI Agent (Context Engineering)

[![Context Engineering](../../../07-context-engineering/images/lesson-12-thumbnail.png)](https://youtu.be/F5zqRV7gEag)

> _(Nhấn vào hình trên để xem video bài giảng này)_

Hiểu được sự phức tạp của hệ thống mà bạn đang xây dựng AI Agent là điều rất quan trọng. Chúng ta cần xây dựng các AI Agent có thể quản lý thông tin một cách hiệu quả để giải quyết các nhu cầu phức tạp, chứ không chỉ đơn thuần là phụ thuộc vào Kỹ nghệ Prompt (Prompt Engineering).

Trong bài học này, chúng ta sẽ tìm hiểu Kỹ nghệ Ngữ cảnh (Context Engineering) là gì và vai trò của nó.

## Giới thiệu

Bài học này sẽ đề cập đến:
- **Context Engineering là gì** và tại sao nó khác với Prompt Engineering.
- **Các chiến lược hiệu quả**, bao gồm cách viết, lựa chọn, nén và cô lập thông tin.
- **Các lỗi Ngữ cảnh thường gặp** (Context Failures) có thể làm chệch hướng AI Agent và cách khắc phục.

## Kỹ nghệ Ngữ cảnh là gì?

Đối với AI Agent, ngữ cảnh (context) là những thông tin giúp chúng lập kế hoạch và hành động. **Context Engineering** là việc thực hành đảm bảo Agent có *đúng và đủ* thông tin để hoàn thành bước tiếp theo của nhiệm vụ. Cửa sổ ngữ cảnh (Context window) của LLM bị giới hạn kích thước (số lượng token), vì vậy chúng ta cần xây dựng các quy trình để thêm, bớt và nén thông tin trong cửa sổ đó.

### Prompt Engineering vs Context Engineering
- **Prompt Engineering:** Tập trung vào một tập hợp các hướng dẫn tĩnh (static instructions) để định hướng AI bằng các quy tắc.
- **Context Engineering:** Quản lý một tập hợp thông tin động (dynamic set of information) theo thời gian.

### Các loại Ngữ cảnh (Types of Context)

![Types of Context](../../../07-context-engineering/images/context-types.png)

Thông tin mà Agent cần không chỉ đến từ một nguồn. Các loại ngữ cảnh bao gồm:
- **Hướng dẫn (Instructions):** Bao gồm prompt, thông báo hệ thống (system messages), các ví dụ (few-shot).
- **Kiến thức (Knowledge):** Sự thật, dữ liệu từ RAG (Truy xuất tăng cường) hoặc cơ sở dữ liệu.
- **Công cụ (Tools):** Định nghĩa về các API, Functions và kết quả trả về từ chúng.
- **Lịch sử trò chuyện (Conversation History):** Đoạn hội thoại càng dài, nó càng chiếm nhiều dung lượng ngữ cảnh.
- **Sở thích người dùng (User Preferences):** Những điều hệ thống học được về sở thích/không thích của người dùng theo thời gian.

## Các Chiến lược Kỹ nghệ Ngữ cảnh Hiệu quả

![Context Engineering Best Practices](../../../07-context-engineering/images/best-practices.png)

Khi thông tin bắt đầu chảy vào cửa sổ ngữ cảnh, chúng ta cần có các chiến lược quản lý:

1. **Bảng nháp (Agent Scratchpad):** Cho phép Agent ghi chú các thông tin quan trọng trong một phiên làm việc để dùng lại mà không làm phình to cửa sổ ngữ cảnh chính.
2. **Ký ức (Memories):** Cho phép lưu trữ và truy xuất thông tin xuyên suốt nhiều phiên (sessions) khác nhau.
3. **Nén ngữ cảnh (Compressing Context):** Khi cửa sổ ngữ cảnh sắp đầy, ta sử dụng kỹ thuật tóm tắt (summarization) hoặc cắt bớt (trimming) lịch sử cũ.
4. **Hệ thống đa tác nhân (Multi-Agent):** Mỗi Agent có một ngữ cảnh riêng, giảm tải cho một Agent duy nhất.
5. **Môi trường Hộp cát (Sandbox):** Nếu Agent cần chạy code hoặc đọc file quá dài, hãy cho nó chạy ở Sandbox và chỉ trả về *kết quả ngắn gọn* vào ngữ cảnh.
6. **Đối tượng Trạng thái (Runtime State Objects):** Lưu trữ kết quả của từng bước xử lý để ngữ cảnh luôn bám sát vào nhiệm vụ hiện tại.

### Ví dụ về Kỹ nghệ Ngữ cảnh
Yêu cầu: **"Đặt cho tôi một chuyến đi tới Paris."**
- Agent chỉ có *Prompt Engineering*: "Được thôi, bạn muốn đi lúc nào?" (Chỉ xử lý bề mặt).
- Agent có *Context Engineering*: Nó sẽ tự động kiểm tra lịch (calendar), nhớ lại sở thích chuyến bay cũ (memory), gọi công cụ tìm vé, rồi mới trả lời: *"Chào [Tên bạn]! Tôi thấy bạn rảnh tuần đầu tháng 10. Tôi tìm chuyến bay thẳng của hãng [Hãng quen thuộc] với ngân sách [X] như mọi khi nhé?"*

## Các Lỗi Ngữ Cảnh Thường Gặp (Common Context Failures)

### 1. Nhiễm độc Ngữ cảnh (Context Poisoning)
- **Vấn đề:** Khi một thông tin sai lệch (hallucination) lọt vào ngữ cảnh, Agent sẽ liên tục tham chiếu và phát triển các chiến lược vô nghĩa.
- **Khắc phục:** Áp dụng **Xác thực ngữ cảnh (context validation)** và "cách ly" thông tin rác trước khi đưa vào bộ nhớ dài hạn.

### 2. Phân tâm Ngữ cảnh (Context Distraction)
- **Vấn đề:** Khi lịch sử trò chuyện quá dài, AI chú ý quá nhiều vào lịch sử cũ thay vì yêu cầu hiện tại, dẫn đến việc hỏi vòng vo.
- **Khắc phục:** **Tóm tắt ngữ cảnh (Context summarization)** để cắt bỏ lịch sử cũ, chỉ giữ lại ý chính.

### 3. Rối loạn Ngữ cảnh (Context Confusion)
- **Vấn đề:** Bạn nhồi nhét cho Agent quá nhiều Tools (ví dụ 50 tools), khiến LLM bối rối và gọi nhầm tool.
- **Khắc phục:** Sử dụng RAG để lọc ra **chỉ 3-5 tools liên quan nhất** dựa trên câu hỏi của người dùng.

### 4. Xung đột Ngữ cảnh (Context Clash)
- **Vấn đề:** Thông tin mâu thuẫn lọt vào ngữ cảnh (Ví dụ ban đầu bạn đòi bay phổ thông, sau đó đổi ý bay thương gia).
- **Khắc phục:** Sử dụng **Cắt tỉa ngữ cảnh (Context pruning)** để xóa hoặc ghi đè thông tin cũ, hoặc dùng Scratchpad để sắp xếp lại thông tin mâu thuẫn trước khi hành động.

---
**Bài trước:** [Lesson 11 - Agentic Protocols](../23-agentic-protocols/README.md)  
**Bài tiếp theo:** [Lesson 13 - Agent Memory](../08-agent-memory/README.md)