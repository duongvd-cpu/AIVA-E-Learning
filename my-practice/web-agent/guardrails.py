"""
Guardrails - Lớp màng lọc bảo mật (Bài 18, 19)
Dùng để bắt các hành vi nguy hiểm, thao túng Prompt (Prompt Injection/Jailbreak)
"""

import re

# Các cụm từ thường được hacker dùng để Jailbreak (Prompt Injection)
DANGEROUS_PATTERNS = [
    r"bỏ qua (tất cả|các) lệnh",
    r"ignore previous instructions",
    r"system override",
    r"bạn (đã|sẽ) trở thành",
    r"quên (hết|tất cả)",
    r"hãy đóng vai",
    r"disregard all",
    r"drop table", 
    r"delete from"
]

def check_input_safety(message: str) -> tuple[bool, str]:
    """
    Kiểm tra tin nhắn đầu vào của người dùng.
    Trả về (True, "") nếu an toàn.
    Trả về (False, "lý do") nếu phát hiện dấu hiệu thao túng.
    """
    message_lower = message.lower()
    
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, message_lower):
            return False, f"🛡️ **GUARDRAIL BLOCK:** Hệ thống phát hiện tin nhắn của bạn chứa câu lệnh thao túng không an toàn ('{pattern}'). Yêu cầu đã bị từ chối."
            
    return True, ""
