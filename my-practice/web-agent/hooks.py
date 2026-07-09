import json
import hashlib

class AgentHookManager:
    """
    Quản lý các sự kiện vòng đời (Lifecycle Events) của Agent.
    Trong thực tế Doanh nghiệp, các hook này được kết nối với hệ thống 
    giám sát (Datadog, Prometheus) hoặc hệ thống phân quyền (IAM).
    """

    @staticmethod
    def on_agent_start(skill_id: str, task: str):
        print(f"\n🟢 [HOOK: on_agent_start] Sub-agent '{skill_id}' vừa được đánh thức.")
        print(f"    Nhiệm vụ: {task[:70]}...")
        # Ví dụ: Kiểm tra ngân sách người dùng trước khi cho Agent chạy
        # if not check_budget(user_id):
        #     raise Exception("Tài khoản hết tín dụng.")

    @staticmethod
    def before_tool_call(skill_id: str, tool_name: str, args: dict):
        print(f"🟡 [HOOK: before_tool_call] '{skill_id}' chuẩn bị chạy tool '{tool_name}'...")
        # Cổng bảo mật: Chặn quyền truy cập nếu gọi hàm nguy hiểm
        if tool_name == "delete_all_data":
            print(f"    ⚠️ CẢNH BÁO: Phát hiện tool nguy hiểm! Yêu cầu phân quyền Admin.")
            # Thực tế: raise Exception("Permission Denied")
            
        payload_to_sign = json.dumps({"tool": tool_name, "args": args}, sort_keys=True).encode('utf-8')
        receipt_hash = hashlib.sha256(payload_to_sign).hexdigest()
        print(f"    🔒 Audit Receipt: sha256:{receipt_hash}")

    @staticmethod
    def after_tool_call(skill_id: str, tool_name: str, result: str):
        print(f"🟢 [HOOK: after_tool_call] '{skill_id}' đã chạy xong tool '{tool_name}'.")

    @staticmethod
    def on_agent_finish(skill_id: str, final_result: str):
        print(f"🔵 [HOOK: on_agent_finish] Sub-agent '{skill_id}' đã hoàn tất công việc.\n")

hook_manager = AgentHookManager()
