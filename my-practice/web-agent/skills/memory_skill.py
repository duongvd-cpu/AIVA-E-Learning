import os
import json

MEMORY_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "long_term_memory.json")

def load_memory() -> dict:
    if os.path.exists(MEMORY_FILE):
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_to_memory(key: str, value: str) -> str:
    """
    Lưu một thông tin cá nhân hoặc sở thích của người dùng vào bộ nhớ dài hạn.
    Ví dụ: key='user_name', value='Hoàng'
    """
    memory = load_memory()
    memory[key] = value
    
    os.makedirs(os.path.dirname(MEMORY_FILE), exist_ok=True)
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(memory, f, ensure_ascii=False, indent=2)
        
    return f"Đã lưu thành công: {key} = {value}"

def read_from_memory(key: str) -> str:
    """
    Đọc một thông tin từ bộ nhớ dài hạn.
    """
    memory = load_memory()
    return memory.get(key, "Không tìm thấy thông tin này trong bộ nhớ.")

# --- Cấu hình Agent ---
SYSTEM_PROMPT = """Bạn là Memory Agent (Chuyên gia Ghi nhớ).
Nhiệm vụ của bạn là lưu trữ hoặc trích xuất các thông tin sở thích, cá nhân, ghi chú lâu dài của người dùng.
Khi người dùng giới thiệu bản thân hoặc bày tỏ sở thích, hãy sử dụng `save_to_memory` để lưu lại.
Khi người dùng hỏi lại về bản thân họ, hãy sử dụng `read_from_memory` để tìm.
"""

TOOLS = [save_to_memory, read_from_memory]
