# Bài 19: Kỹ năng và Năng lực của Agent (Agent Skills)

[Xem video bài giảng: Xây dựng AI Agent dạng Module với Kỹ năng (Skills)](https://youtu.be/PLACEHOLDER_VIDEO_ID)

> _(Video bài giảng và ảnh bìa sẽ được đội ngũ nội dung của Microsoft bổ sung sau)_

## Giới thiệu

Khi AI Agent của bạn ngày càng phức tạp, việc khai báo trực tiếp ngày càng nhiều công cụ (Tools) vào Agent (cách tiếp cận "nguyên khối" - monolithic) sẽ nhanh chóng dẫn đến nhiều vấn đề:
1. **Quá tải Cửa sổ Ngữ cảnh (Context Window Overload):** Gửi hàng chục lược đồ (schemas) công cụ trong mỗi yêu cầu API gây lãng phí token và làm chậm mô hình.
2. **Ảo giác (Hallucination):** Khi một Agent sở hữu quá nhiều công cụ không liên quan, nó có nguy cơ gọi nhầm công cụ vào sai thời điểm.
3. **Ác mộng bảo trì:** Việc dồn toàn bộ logic của các công cụ vào một file `main.py` duy nhất khiến mã nguồn trở nên vô cùng khó đọc và khó bảo trì.

Bài học này giới thiệu khái niệm **"Kỹ năng" (Skills)** — một mô hình kiến trúc giúp bạn chuyển đổi hệ thống từ một "bot biết gọi hàm" thành một "Nhân sự số (Digital Worker) với những năng lực chuyên biệt".

## Kỹ năng (Skill) là gì?

Nếu một **Công cụ (Tool)** chỉ là một hàm tính toán đơn lẻ, không lưu trạng thái (ví dụ: `get_weather()`), thì một **Kỹ năng (Skill)** là một mô-đun độc lập bao bọc các thành phần sau:
- **Một nhóm các Công cụ liên quan** (ví dụ: `get_weather()`, `get_forecast()`, `get_air_quality()`).
- **Chỉ dẫn chuyên môn (Domain-specific Instructions)** (ví dụ: "Bạn là một chuyên gia khí tượng. Luôn định dạng nhiệt độ theo độ C").
- **Trạng thái hoặc Phụ thuộc** (ví dụ: API keys để kết nối với dịch vụ thời tiết).

Bằng cách nhóm các công cụ thành các Kỹ năng, Agent Điều phối (Orchestrator) của bạn có thể linh hoạt "trang bị" hoặc định tuyến công việc tới các bộ kỹ năng cụ thể chỉ khi thực sự cần thiết, giữ cho ngữ cảnh chính luôn sạch sẽ và tập trung.

## Mục tiêu học tập

Trong bài học này, bạn sẽ học được cách:
- Hiểu sự khác biệt giữa Công cụ (Tools) độc lập và Kỹ năng (Skills) được đóng gói.
- Tái cấu trúc một AI Agent nguyên khối thành một kiến trúc mô-đun sử dụng mô hình **Sổ đăng ký Kỹ năng tĩnh (Static Skill Registry)**.
- Tạo thư mục `skills/` để tổ chức logic, câu lệnh (prompts) và lược đồ (schemas) một cách độc lập.
- Tự động khám phá và tải các kỹ năng vào Agent của bạn khi khởi động.

## Kiến trúc Kỹ năng (Mô hình Static Registry)

Thay vì viết cứng các công cụ vào cấu hình của agent như thế này:
```python
# Cách viết nguyên khối TỒI TỆ
tools = [get_time_tool, get_weather_tool, read_file_tool, delete_data_tool, ...]
```

Chúng ta sẽ tổ chức mã nguồn vào một thư mục `skills`:
```text
web-agent/
├── main.py
└── skills/
    ├── __init__.py
    ├── weather_skill.py
    ├── research_skill.py
    └── admin_skill.py
```

Bên trong `weather_skill.py`, chúng ta định nghĩa mọi thứ agent cần để trở thành một chuyên gia thời tiết:
```python
# skills/weather_skill.py
WEATHER_TOOLS_SCHEMA = [ ... ]
WEATHER_TOOL_FUNCTIONS = { "get_weather": handle_get_weather }
WEATHER_PROMPT = "Khi được hỏi về thời tiết, hãy hành xử như một nhà khí tượng học chuyên nghiệp."
```

Sau đó, trong `main.py`, chúng ta chỉ cần nạp (import) và tổng hợp (aggregate) các kỹ năng này:
```python
# main.py
from skills import ALL_TOOLS, ALL_FUNCTIONS, ALL_PROMPTS
model = GenerativeModel(tools=ALL_TOOLS, system_instruction=ALL_PROMPTS)
```

## Tại sao điều này quan trọng cho môi trường Thực tế (Production)

1. **Làm việc nhóm (Team Collaboration):** Các lập trình viên khác nhau có thể phát triển các kỹ năng khác nhau cùng lúc mà không bị xung đột mã nguồn (merge conflicts) ở file `main.py`.
2. **Cắm và Chạy (Plug and Play):** Cần gỡ bỏ kỹ năng "Quản trị viên" (Admin) đối với bot phục vụ khách hàng công cộng? Chỉ cần xóa file `admin_skill.py`.
3. **Nền tảng cho Multi-Agent:** Khi bạn đã cô lập được các Kỹ năng, việc gán một Kỹ năng cụ thể cho một Sub-Agent chuyên biệt (như đã thấy trong Mô hình Thiết kế Multi-Agent) trở nên vô cùng dễ dàng.

---
**Bước tiếp theo:** Hãy xem phần mã nguồn trong thư mục `web-agent` để hiểu cách các công cụ đã được tái cấu trúc thành công thành các mô-đun kỹ năng!


## 💻 Thực hành xuyên suốt với Web Agent

**Agent Skills (Kỹ năng của Agent)** là khái niệm giúp AI có khả năng tương tác với thế giới thực. Trong dự án `my-practice/web-agent/`, kỹ năng được quản lý theo dạng **Plugin & Dynamic Loading**.

1. **Cơ chế Load tự động (Dynamic Loading):**
   - Bạn hãy mở file `my-practice/web-agent/skills/__init__.py`. Thay vì phải `import` từng file thủ công, hệ thống được viết để tự động quét thư mục `skills/` và đăng ký tất cả các hàm `def` thành công cụ.
   - Khi bạn tạo file kỹ năng mới, Orchestrator sẽ lập tức nhìn thấy kỹ năng đó khi khởi động lại server.

2. **Cách viết một Kỹ năng:**
   - Xem `sql_skill.py`: Chỉ cần một hàm Python bình thường, đi kèm với Docstring `` rõ ràng (đây là điều bắt buộc để LLM hiểu được nó dùng để làm gì). Công cụ `sq_skill` sở hữu khả năng chọc thẳng vào Database SQLite `data/company.db`.
