import datetime
import google.generativeai as genai

# Tên của Skill (Sẽ hiển thị trong System Prompt hoặc Logs)
SKILL_NAME = "Weather & Time Skill"

# System Prompt riêng cho Skill (nếu cần gộp)
SKILL_PROMPT = "- Bạn có quyền truy cập vào thông tin thời tiết và thời gian hệ thống."

# Các hàm thực thi
def get_current_time() -> str:
    """Lấy ngày giờ hiện tại của hệ thống."""
    now = datetime.datetime.now()
    return f"Hiện tại là {now.strftime('%H:%M:%S, ngày %d/%m/%Y')}"

def get_weather(location: str) -> str:
    """
    Lấy thông tin thời tiết cho một địa điểm.
    (Dữ liệu giả lập để minh họa Tool Use)
    """
    mock_data = {
        "Hà Nội":        "🌤  25°C, trời nhiều mây, độ ẩm 75%",
        "Hồ Chí Minh":   "☀️  33°C, nắng nóng, độ ẩm 60%",
        "Đà Nẵng":       "🌧  22°C, có mưa nhẹ, độ ẩm 85%",
        "Tokyo":         "🌸  18°C, mát mẻ, có gió nhẹ",
        "New York":      "🌨  5°C, trời lạnh, khả năng có tuyết",
    }
    result = mock_data.get(location)
    if result:
        return f"Thời tiết tại {location}: {result}"
    return f"Không có dữ liệu thời tiết cho '{location}'. Thử các thành phố: Hà Nội, Hồ Chí Minh, Đà Nẵng, Tokyo, New York."

# Schema mô tả Tool cho LLM
SCHEMAS = [
    genai.protos.FunctionDeclaration(
        name="get_current_time",
        description="Lấy ngày và giờ hiện tại của hệ thống.",
        parameters=genai.protos.Schema(type=genai.protos.Type.OBJECT, properties={})
    ),
    genai.protos.FunctionDeclaration(
        name="get_weather",
        description="Lấy thông tin thời tiết cho một thành phố cụ thể.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "location": genai.protos.Schema(
                    type=genai.protos.Type.STRING,
                    description="Tên thành phố, ví dụ: 'Hà Nội', 'Tokyo'"
                )
            },
            required=["location"]
        )
    )
]

# Ánh xạ tên hàm sang Python function
FUNCTIONS = {
    "get_current_time": lambda args: get_current_time(),
    "get_weather": lambda args: get_weather(args.get("location", ""))
}
