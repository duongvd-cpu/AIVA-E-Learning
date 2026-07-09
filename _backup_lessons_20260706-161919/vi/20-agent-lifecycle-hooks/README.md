# Bài 21: Vòng đời Agent và Hooks sự kiện

[Xem video bài giảng: Vòng đời Agent & Hooks](https://youtu.be/PLACEHOLDER_VIDEO_ID)

> *(Video bài giảng và ảnh bìa sẽ được đội ngũ sản xuất Sconnect cập nhật sau)*

## Giới thiệu

Trong Hệ thống Đa Tác nhân Doanh nghiệp (như hệ thống chúng ta xây dựng ở Bài 20), các Sub-Agent liên tục được sinh ra, thực thi công cụ và tắt đi. Môi trường động này đòi hỏi sự giám sát chặt chẽ.

Hãy tưởng tượng nếu một Sub-Agent bị rò rỉ prompt (Prompt Injection) và cố gắng gọi một công cụ nhạy cảm (như xóa dữ liệu khách hàng) mà không có thẩm quyền. Làm sao để chúng ta ngăn chặn kịp thời?

Đó là lúc **Lifecycle Hooks** (Điểm neo Vòng đời) phát huy tác dụng.

## Lifecycle Hook là gì?

"Hook" là một khái niệm lập trình nơi bạn can thiệp vào một sự kiện tại một thời điểm cụ thể để chèn logic tùy chỉnh. Nếu bạn từng dùng React (như `useEffect`) hay Express (như `Middleware`), bạn đã quá quen thuộc với khái niệm này.

Đối với AI Agent, vòng đời gồm các điểm neo chính sau:
1. **`on_agent_start`**: Kích hoạt ngay trước khi Sub-Agent nhận lệnh đầu tiên.
2. **`before_tool_call`**: Kích hoạt ngay trước khi Sub-Agent được cấp quyền chạy hàm Python.
3. **`after_tool_call`**: Kích hoạt ngay sau khi hàm Python chạy xong và có kết quả.
4. **`on_agent_finish`**: Kích hoạt khi Sub-Agent kết thúc công việc và trả về chuỗi text cho Orchestrator.

### Tại sao chúng ta cần Hooks?
- **Cổng Bảo Mật (Security Gates):** `before_tool_call` có thể chặn việc gọi hàm nếu người dùng không phải là "Admin".
- **Kiểm soát Ngân sách:** `on_agent_start` có thể kiểm tra xem tài khoản người dùng có còn đủ Token hay không. Nếu hết tiền, nó sẽ chặn Agent khởi động ngay lập tức.
- **Tính quan sát (Observability):** Hooks cho phép bạn ghi log (Audit Trail) mọi hành động vào cơ sở dữ liệu một cách sạch sẽ, mà không làm rối tung mã nguồn chính của Agent.

## Triển khai trong Web Agent

Trong bài thực hành này, chúng ta sẽ tạo ra một file `hooks.py` để quản lý các sự kiện này.

```python
class AgentHookManager:
    def on_agent_start(self, skill_id: str, task: str):
        print(f"[HOOK] 🚀 Agent {skill_id} vừa khởi động. Nhiệm vụ: {task}")
        # Chèn logic kiểm tra tài khoản ở đây

    def before_tool_call(self, skill_id: str, tool_name: str, args: dict):
        print(f"[HOOK] ⚙️ {skill_id} chuẩn bị dùng công cụ {tool_name}")
        # Chèn cổng bảo mật ở đây
        if tool_name == "delete_database" and not is_admin():
            raise Exception("Quyền truy cập bị từ chối!")
```

Sau đó, chúng ta sẽ "cấy" các hàm này thẳng vào bên trong hàm `execute_sub_agent` của file `main.py`. Điều này đảm bảo rằng mọi Sub-Agent được sinh ra trong hệ thống đều tự động bị giám sát bởi các quy tắc thép này.


## 💻 Thực hành xuyên suốt với Web Agent

Khái niệm **Lifecycle Hooks** và **Events** đã được ứng dụng để tạo ra giao diện luồng dữ liệu thời gian thực cho dự án `my-practice/web-agent/`.

1. **Streaming Data (Server-Sent Events - SSE):**
   - Mở file `my-practice/web-agent/main.py` và tìm hàm `chat_stream`.
   - Thay vì bắt người dùng phải đợi toàn bộ quá trình xử lý của Orchestrator và Sub-agent hoàn tất, chúng ta sử dụng `yield` để gửi từng kiện dữ liệu (chunks) về Frontend ngay lập tức. Đây là ứng dụng thực tế nhất của vòng đời Event-driven.

2. **Cơ chế Hooking trên Giao diện:**
   - Trong file `my-practice/web-agent/static/index.html`, các sự kiện JavaScript (`onmessage`) đóng vai trò như các Hooks để bắt các trạng thái: Đang suy nghĩ, Đang gọi Tool, hoặc Đã hoàn thành trả lời. 
