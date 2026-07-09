import os
import importlib
import google.generativeai as genai

SKILL_REGISTRY = {}
ALL_FUNCTIONS = {}

# Đọc tất cả các file trong thư mục skills/
current_dir = os.path.dirname(__file__)
for filename in os.listdir(current_dir):
    if filename.endswith(".py") and filename != "__init__.py":
        module_name = filename[:-3]
        module = importlib.import_module(f"skills.{module_name}")
        
        skill_name = getattr(module, "SKILL_NAME", module_name)
        skill_prompt = getattr(module, "SYSTEM_PROMPT", getattr(module, "SKILL_PROMPT", ""))
        skill_schemas = getattr(module, "SCHEMAS", [])
        skill_tools = getattr(module, "TOOLS", [])
        skill_functions = getattr(module, "FUNCTIONS", {})
        
        # Gom Functions chung (để tiện tra cứu khi có hàm được gọi)
        if skill_functions:
            ALL_FUNCTIONS.update(skill_functions)
        
        # Đóng gói list tools thành genai.protos.Tool object để truyền vào model con
        if skill_schemas:
            registered_tools = [genai.protos.Tool(function_declarations=skill_schemas)]
        elif skill_tools:
            registered_tools = skill_tools
        else:
            registered_tools = None
            
        SKILL_REGISTRY[module_name] = {
            "name": skill_name,
            "description": f"Kỹ năng: {skill_name}",
            "prompt": skill_prompt,
            "tools": registered_tools
        }

# Tool dành riêng cho Orchestrator (Main Agent)
ORCHESTRATOR_TOOLS = [
    genai.protos.Tool(
        function_declarations=[
            genai.protos.FunctionDeclaration(
                name="delegate_task",
                description="Giao việc cho một Sub-agent cụ thể dựa trên danh sách kỹ năng.",
                parameters=genai.protos.Schema(
                    type=genai.protos.Type.OBJECT,
                    properties={
                        "skill_name": genai.protos.Schema(
                            type=genai.protos.Type.STRING,
                            description=f"Tên kỹ năng cần gọi. Bắt buộc phải là một trong: {list(SKILL_REGISTRY.keys())}"
                        ),
                        "task_description": genai.protos.Schema(
                            type=genai.protos.Type.STRING,
                            description="Mô tả chi tiết công việc mà Sub-agent cần làm."
                        )
                    },
                    required=["skill_name", "task_description"]
                )
            ),
            genai.protos.FunctionDeclaration(
                name="create_execution_plan",
                description="Lên kế hoạch chi tiết các bước cần làm trước khi gọi delegate_task.",
                parameters=genai.protos.Schema(
                    type=genai.protos.Type.OBJECT,
                    properties={
                        "plan": genai.protos.Schema(
                            type=genai.protos.Type.STRING,
                            description="Mô tả kế hoạch từng bước rõ ràng (VD: Bước 1:..., Bước 2:...)"
                        )
                    },
                    required=["plan"]
                )
            ),
            genai.protos.FunctionDeclaration(
                name="think_aloud",
                description="Dùng để tự suy ngẫm (Metacognition) hoặc tự chẩn đoán lỗi trước khi gọi lại Sub-agent.",
                parameters=genai.protos.Schema(
                    type=genai.protos.Type.OBJECT,
                    properties={
                        "thought": genai.protos.Schema(
                            type=genai.protos.Type.STRING,
                            description="Suy nghĩ của bạn về tình huống hiện tại hoặc lý do lỗi."
                        )
                    },
                    required=["thought"]
                )
            )
        ]
    )
]
