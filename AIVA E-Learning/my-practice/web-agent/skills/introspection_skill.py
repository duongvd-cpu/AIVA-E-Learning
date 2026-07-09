import json
import google.generativeai as genai

SKILL_NAME = "System Introspection Agent"

SYSTEM_PROMPT = """Bạn là System Introspection Agent (Hệ thống nội soi tự nhận thức) của khóa học AI Agents for Beginners - Sconnect.
Nhiệm vụ của bạn là hỗ trợ Main Agent giải thích cho người dùng hiểu về cấu trúc, khả năng và trạng thái của toàn bộ hệ thống.
Bạn có khả năng "nhìn thấu" hệ thống bằng công cụ `scan_system_architecture`.

Quy tắc:
1. LUÔN sử dụng công cụ `scan_system_architecture` ĐẦU TIÊN để lấy dữ liệu thực tế trước khi trả lời.
2. Tuyệt đối KHÔNG ĐƯỢC tự bịa ra công cụ hay kỹ năng nào không có trong dữ liệu trả về.
3. Trình bày danh sách kỹ năng, công cụ một cách rõ ràng, dễ đọc bằng Markdown (Dùng bullet points hoặc bảng).
4. Giữ phong cách chuyên nghiệp, thân thiện, mang đậm chất Sconnect. Dùng đại từ "mình" hoặc "hệ thống".
"""

def scan_system_architecture():
    """
    Quét và trả về toàn bộ dữ liệu cấu trúc hệ thống bao gồm: Orchestrator Tools, các Sub-agents, và Cơ sở dữ liệu.
    """
    # Local import để tránh circular import khi __init__ nạp module này
    from skills import SKILL_REGISTRY
    
    skills_data = []
    for skill_id, skill_info in SKILL_REGISTRY.items():
        tools_list = []
        if skill_info["tools"]:
            for t in skill_info["tools"]:
                if hasattr(t, "function_declarations"):
                    for func in t.function_declarations:
                        tools_list.append({"name": func.name, "description": getattr(func, "description", "")})
                elif callable(t):
                    tools_list.append({"name": getattr(t, "__name__", str(t)), "description": getattr(t, "__doc__", "")})

        skills_data.append({
            "id": skill_id,
            "name": skill_info["name"],
            "description": skill_info["description"],
            "tools": tools_list
        })
        
    system_data = {
        "orchestrator_tools": [
            "delegate_task (Điều phối Sub-agent)",
            "create_execution_plan (Lập kế hoạch)",
            "think_aloud (Tự suy ngẫm lỗi)"
        ],
        "active_sub_agents": skills_data,
        "knowledge_bases": ["sconnect_knowledge (ChromaDB)", "knowledge_base.txt (Local Text)"]
    }
    return json.dumps(system_data, ensure_ascii=False)

FUNCTIONS = {
    "scan_system_architecture": scan_system_architecture
}

SCHEMAS = [
    genai.protos.FunctionDeclaration(
        name="scan_system_architecture",
        description="Quét bộ nhớ và trả về toàn bộ danh sách Agent, Tools và Databases hiện có của hệ thống dưới định dạng JSON."
    )
]
