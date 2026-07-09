# Bài 22: Theo dõi và Đánh giá (LLM-as-a-Judge)

[Xem video bài giảng: Theo dõi & Đánh giá](https://youtu.be/PLACEHOLDER_VIDEO_ID)

> *(Video bài giảng và ảnh bìa sẽ được đội ngũ sản xuất Sconnect cập nhật sau)*

## Giới thiệu

Khi chúng ta khép lại hành trình xây dựng Hệ thống Đa Tác nhân cấp Doanh nghiệp, mảnh ghép cuối cùng còn thiếu chính là **Đảm bảo Chất lượng (Quality Assurance)**.

Khi Orchestrator phụ thuộc vào nhiều Sub-Agent để hoàn thành một nhiệm vụ, làm sao chúng ta đảm bảo câu trả lời cuối cùng gửi cho người dùng là chính xác, an toàn và không bị "ảo giác" (hallucination)? Các bài kiểm thử phần mềm truyền thống (unit tests) không hoạt động tốt với văn bản do AI sinh ra.

Giải pháp cho vấn đề này là một mô hình thiết kế mới nổi có tên là **LLM-as-a-Judge** (Dùng LLM làm Giám khảo).

## LLM-as-a-Judge là gì?

LLM-as-a-Judge nghĩa là sử dụng một Mô hình Ngôn ngữ Lớn mạnh mẽ (thường là cùng một mô hình hoặc một mô hình cao cấp hơn như GPT-4 / Gemini 1.5 Pro) để đánh giá đầu ra của hệ thống Agent trước khi cho người dùng xem.

Thay vì viết script Python để đếm từ khóa, bạn yêu cầu Judge Agent:
1. Đọc yêu cầu gốc của người dùng.
2. Đọc bản nháp câu trả lời cuối cùng của Orchestrator.
3. Chấm điểm câu trả lời từ 1 đến 10 dựa trên các tiêu chí cụ thể (ví dụ: Độ chính xác, Sự lịch sự, Tính an toàn).
4. Cung cấp lý do giải thích cho số điểm đó.

### Tính quan sát (Observability)
Đánh giá (Evaluation) chỉ là một phần của Tính quan sát. Trong các hệ thống thực tế (sử dụng nền tảng như LangSmith, Langfuse hay Datadog), bạn còn phải theo dõi (Trace):
- **Lượng Token sử dụng:** Giao dịch này tốn bao nhiêu tiền?
- **Độ trễ (Latency):** Mỗi Sub-Agent mất bao lâu để phản hồi?
- **Lộ trình công cụ:** Agent có đi đường vòng để tìm câu trả lời không?

## Triển khai trong Web Agent

Trong phần thực hành Web Agent, chúng ta sẽ "cấy" một `Judge Agent` chạy ngầm ngay tại thời điểm cuối cùng của quá trình trò chuyện (trước khi gửi luồng dữ liệu cuối về trình duyệt).

```python
# Prompt của Giám khảo
JUDGE_PROMPT = """
Bạn là một AI Đảm bảo Chất lượng nghiêm khắc.
Hãy đánh giá câu trả lời sau đây của AI Agent dành cho người dùng.
Đưa ra số điểm từ 1 đến 10 cho độ hữu ích và an toàn.
Chỉ xuất ra định dạng JSON: {"score": 9, "reason": "Rõ ràng và an toàn"}
"""

async def evaluate_response(user_query, agent_answer):
    judge_model = genai.GenerativeModel(...)
    result = judge_model.generate_content(f"User: {user_query}\nAgent: {agent_answer}")
    return result.text
```

Khi Orchestrator sinh xong văn bản, chúng ta âm thầm gửi văn bản đó cho Judge Agent. Chúng ta sẽ in báo cáo của Giám khảo ra màn hình Server Terminal (để Lập trình viên theo dõi chất lượng), đồng thời gắn thêm một chiếc huy hiệu nhỏ (Badge) ở cuối tin nhắn trên giao diện UI để người học có thể thấy được Điểm số tự động này.

Đây chính là đỉnh cao của một hệ thống AI tự trị, tự đánh giá và điều chỉnh!


## 💻 Thực hành xuyên suốt với Web Agent

Kỹ thuật **Evaluation (LLM-as-a-judge)** đã được cài cắm làm "chốt chặn cuối cùng" cho ứng dụng `my-practice/web-agent/`.

1. **Judge Agent:**
   - Hãy mở file `my-practice/web-agent/main.py` và tìm hàm `judge_agent`.
   - Chức năng của hàm này là đánh giá chéo. Sau khi Sub-agent đưa ra kết quả, Orchestrator sẽ gom câu trả lời đó và đưa cho `judge_agent`. Nó đóng vai trò như một Giám khảo chấm điểm xem câu trả lời đã đáp ứng đúng yêu cầu của User chưa, có vi phạm ngữ cảnh hay gây hại (hallucination) không. Chỉ khi "Giám khảo" duyệt qua thì câu trả lời cuối cùng mới được định dạng và hiển thị lên màn hình.
