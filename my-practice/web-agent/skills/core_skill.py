import google.generativeai as genai

SKILL_NAME = "Core & Management Skill"

SKILL_PROMPT = """- QUY ĐỊNH BẢO MẬT (SAFETY GUARDRAIL): Nếu người dùng yêu cầu xoá hệ thống, BẠN KHÔNG ĐƯỢC PHÉP GỌI TOOL `delete_all_data` NGAY LẬP TỨC. Dừng lại và hỏi xác nhận: "TÔI ĐỒNG Ý". Chỉ gọi tool với password 'CONFIRMED' khi có phản hồi chính xác.
- KẾ HOẠCH (PLANNING): Khi được yêu cầu lên kế hoạch, PHẢI gọi `create_plan` để phân rã nhiệm vụ thành main_task và subtasks.
- SIÊU NHẬN THỨC (METACOGNITION): Khi gặp câu đố mẹo, hãy gọi `self_reflect` để 'suy nghĩ lớn tiếng' trước.
- KỸ NGHỆ NGỮ CẢNH: Gọi `take_note_to_scratchpad` để ghi chú thông tin cá nhân của người dùng."""

def delete_all_data(confirm_password: str) -> str:
    """Giả lập hành động nguy hiểm."""
    if confirm_password == "CONFIRMED":
        return "⚠️ CẢNH BÁO: Toàn bộ dữ liệu hệ thống đã bị xoá thành công (Giả lập)!"
    return "Lỗi: Hành động bị từ chối do không có mã xác nhận hợp lệ."

def create_plan(main_task: str, subtasks: list) -> str:
    """Phân rã một công việc lớn thành các công việc nhỏ."""
    plan_output = f"📋 KẾ HOẠCH TỔNG THỂ: {main_task}\nCác bước triển khai:\n"
    for i, task in enumerate(subtasks, 1):
        plan_output += f"  {i}. {task}\n"
    return plan_output

def self_reflect(reflection_thought: str) -> str:
    """Sử dụng siêu nhận thức."""
    return f"🧠 [Self-Reflection]: {reflection_thought}\n(Đã tự đánh giá xong)"

def take_note_to_scratchpad(note: str) -> str:
    """Ghi chú ngữ cảnh."""
    return f"📝 [Scratchpad]: Đã ghi chú: '{note}'."

SCHEMAS = [
    genai.protos.FunctionDeclaration(
        name="delete_all_data",
        description="Xoá toàn bộ dữ liệu. PHẢI có xác nhận.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"confirm_password": genai.protos.Schema(type=genai.protos.Type.STRING)},
            required=["confirm_password"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="create_plan",
        description="Phân rã một tác vụ phức tạp thành các bước nhỏ hơn.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "main_task": genai.protos.Schema(type=genai.protos.Type.STRING),
                "subtasks": genai.protos.Schema(type=genai.protos.Type.ARRAY, items=genai.protos.Schema(type=genai.protos.Type.STRING))
            },
            required=["main_task", "subtasks"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="self_reflect",
        description="Tự suy ngẫm và đánh giá trước khi trả lời.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"reflection_thought": genai.protos.Schema(type=genai.protos.Type.STRING)},
            required=["reflection_thought"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="take_note_to_scratchpad",
        description="Ghi chú thông tin quan trọng vào bảng nháp.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"note": genai.protos.Schema(type=genai.protos.Type.STRING)},
            required=["note"]
        )
    )
]

FUNCTIONS = {
    "delete_all_data": lambda args: delete_all_data(args.get("confirm_password", "")),
    "create_plan": lambda args: create_plan(args.get("main_task", ""), args.get("subtasks", [])),
    "self_reflect": lambda args: self_reflect(args.get("reflection_thought", "")),
    "take_note_to_scratchpad": lambda args: take_note_to_scratchpad(args.get("note", ""))
}
