# Bài 20: Hệ điều hành điều phối Agent (Agent Orchestration)

[Xem video bài giảng: Agent Orchestration](https://youtu.be/PLACEHOLDER_VIDEO_ID)

> *(Video bài giảng và ảnh bìa sẽ được đội ngũ sản xuất Sconnect cập nhật sau)*

## Giới thiệu

Trong các bài học trước, chúng ta đã xây dựng một **Monolithic Agent** (Agent nguyên khối) — một bộ não AI duy nhất được trang bị tất cả các công cụ (thời tiết, nghiên cứu, lên kế hoạch, v.v.). Mặc dù cách tiếp cận này đơn giản, nó gặp phải những giới hạn nghiêm trọng khi hệ thống mở rộng:
1. **Quá tải Cửa sổ Ngữ cảnh (Context Window):** Truyền hơn 50 schema công cụ cho model sẽ tiêu tốn một lượng token khổng lồ.
2. **Giảm độ chính xác:** Càng có nhiều công cụ, xác suất AI chọn nhầm công cụ càng cao.
3. **Rủi ro Bảo mật:** Một Agent duy nhất vừa có quyền "Gửi Email" vừa có quyền "Xóa Cơ sở dữ liệu" là cực kỳ nguy hiểm.

Để giải quyết vấn đề này, chúng ta chuyển sang một **Kiến trúc Doanh nghiệp (Enterprise Architecture)** được gọi là **Agent Orchestration** (Hệ điều hành Agent hoặc Hệ thống Đa Tác nhân).

## Orchestrator (Quản đốc) là gì?

Orchestrator (hay Router Agent) là một "Người Quản lý". Đặc điểm nhận dạng của nó là **nó không tự mình thực thi các công cụ**.

Thay vào đó, Orchestrator chỉ có đúng một công cụ duy nhất: `delegate_task(skill_name, instructions)` (Giao việc cho kỹ năng).

Khi người dùng gửi yêu cầu, Orchestrator sẽ:
1. Phân tích ý định.
2. Xác định xem cần sử dụng "Kỹ năng" (Sub-Agent) nào.
3. Gọi hàm `delegate_task` để sinh ra một Sub-Agent (Tác nhân con) mới, gọn nhẹ.
4. Truyền hướng dẫn chi tiết cho Sub-Agent.
5. Thu thập kết quả và báo cáo lại cho người dùng.

### Lợi ích:
- **Hiệu suất:** Orchestrator hoàn toàn tập trung vào việc lập kế hoạch và điều phối.
- **Độ chính xác:** Một Sub-Agent chỉ cầm 2 công cụ chuyên biệt (vd: `weather_skill`) sẽ hiếm khi mắc lỗi so với một Agent ôm đồm 20 công cụ.
- **Khả năng mở rộng:** Bạn có thể thêm 100 kỹ năng mới vào hệ thống mà không làm phình to Prompt của Main Agent.

## Mô hình Triển khai

Chúng ta thực hiện điều này trong Python bằng cách duy trì một **Skill Registry** (Sổ đăng ký Kỹ năng).

```python
# Công cụ DUY NHẤT của Orchestrator
def delegate_task(skill_name: str, task_instruction: str) -> str:
    # 1. Lấy kỹ năng được yêu cầu từ Registry
    skill = SKILL_REGISTRY.get(skill_name)
    
    # 2. Sinh ra một GenerativeModel mới (Sub-agent) CHỈ nạp các công cụ của kỹ năng này
    sub_agent = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        system_instruction=skill["prompt"],
        tools=skill["tools"]
    )
    
    # 3. Yêu cầu Sub-agent thực thi nhiệm vụ
    response = sub_agent.generate_content(task_instruction)
    
    return response.text
```

Mô hình này chính là nền tảng của các framework sức mạnh như Microsoft AutoGen, Semantic Kernel và LangGraph. Trong phần thực hành Web Agent, bạn sẽ tái cấu trúc toàn bộ file `main.py` để áp dụng kiến trúc đỉnh cao này.


## 💻 Thực hành xuyên suốt với Web Agent

Hệ điều hành **Agent Orchestrator** đã được triển khai hoàn chỉnh tại dự án thực hành của chúng ta trong thư mục `my-practice/web-agent/`.

1. **Cấu trúc Routing và Delegation:**
   - Hãy mở file `my-practice/web-agent/main.py`.
   - Bạn sẽ thấy hàm `orchestrator_agent` đóng vai trò là "Bộ não trung tâm". Nó không tự trả lời người dùng mà được cấp một công cụ là `delegate_task(skill_name, task_description)`. 
   
2. **Quản lý Skill (Skill Registry):**
   - Mở file `my-practice/web-agent/skills/__init__.py`.
   - Đây là nơi hệ thống tải tự động (Dynamic Loading) tất cả các Kỹ năng (như Weather, RAG, SQL) thành một danh sách (Registry) để cung cấp cho Orchestrator. 
   
Để trải nghiệm khả năng điều phối, hãy khởi chạy dự án và hỏi trộn lẫn các câu hỏi khác nhau. Bạn sẽ thấy Log hiển thị Orchestrator đang chia việc (delegate) cho từng Sub-agent tương ứng.
