import urllib.request
import re
import os
import google.generativeai as genai

SKILL_NAME = "Research & Knowledge Skill"

SKILL_PROMPT = "- Bạn đóng vai trò là một Điều phối viên (Orchestrator). Nếu câu hỏi cần phân tích học thuật, hãy gọi `ask_researcher_agent`. Nếu cần tra cứu web, hãy gọi `read_webpage_content`."

def search_knowledge_base(query: str) -> str:
    """Tìm kiếm trong kho kiến thức về AI Agents."""
    kb = {
        "foundations":  "Module 1 - Foundations (Nhập môn): Các khái niệm cơ bản về AI Agents, Microsoft Agent Framework và Azure AI.",
        "capabilities": "Module 2 - Capabilities (Năng lực mở rộng): Mẫu thiết kế Sử dụng công cụ (Tool Use) và trí nhớ của Agent (Memory).",
        "cognitive":    "Module 3 - Cognitive (Tư duy & Lập kế hoạch): Mẫu thiết kế Lên kế hoạch (Planning) và tự sửa lỗi (Metacognition) xử lý công việc phức tạp.",
        "architecture": "Module 4 - Architecture (Kiến trúc hệ thống): Thiết kế Sổ tay ngữ cảnh (Context Handbook), lắp ráp ngữ cảnh (Context Assembly) và quản lý hệ thống nhiều Agent (Orchestration).",
        "production":   "Module 5 - Production (Vận hành & Sản xuất): Lớp bảo vệ (Guardrails), theo dõi luồng sự kiện (Telemetry) và dùng LLM chấm điểm Agent (LLM-as-a-judge).",
    }
    query_lower = query.lower()
    for key, value in kb.items():
        if key in query_lower:
            return f"📚 Từ kho kiến thức: {value}"
    return f"Không tìm thấy thông tin về '{query}' trong kho kiến thức. Hãy thử: tool use, rag, agent, planning, multi-agent, memory."

def read_company_document(query: str) -> str:
    """Đọc tài liệu nội bộ công ty (Sconnect) từ file knowledge_base.txt"""
    try:
        with open("knowledge_base.txt", "r", encoding="utf-8") as f:
            content = f.read()
        return f"Tài liệu nội bộ Sconnect: \n{content}\n(Lưu ý: Hãy trích xuất câu trả lời cho từ khóa '{query}' từ tài liệu trên)"
    except Exception as e:
        return f"Lỗi đọc tài liệu: {str(e)}"

def ask_researcher_agent(topic: str) -> str:
    """Gọi một Agent chuyên biệt (Researcher) để xử lý nghiên cứu sâu."""
    try:
        model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        researcher_prompt = "Bạn là Researcher Agent, một chuyên gia phân tích dữ liệu. Hãy phân tích chuyên sâu nhưng tóm tắt cực kỳ ngắn gọn (dưới 100 từ) về chủ đề được giao."
        researcher = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=researcher_prompt
        )
        response = researcher.generate_content(topic)
        return f"\n🤖 [Researcher Agent trả lời]: {response.text}\n(Đã hoàn thành bàn giao từ Main Agent)"
    except Exception as e:
        return f"Lỗi gọi Researcher Agent: {str(e)}"

def read_webpage_content(url: str) -> str:
    """Mô phỏng Computer Use Agent / Browser Use."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        html = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<[^>]+>', ' ', html)
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:4000] + ("...\n[Đã cắt bớt nội dung]" if len(text) > 4000 else "")
    except Exception as e:
        return f"Lỗi khi truy cập trang web: {e}"

SCHEMAS = [
    genai.protos.FunctionDeclaration(
        name="search_knowledge_base",
        description="Tìm kiếm thông tin về các khái niệm AI Agent trong kho kiến thức của khóa học.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"query": genai.protos.Schema(type=genai.protos.Type.STRING, description="Từ khóa tìm kiếm")},
            required=["query"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="read_company_document",
        description="Tìm kiếm và đọc tài liệu nội bộ.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"query": genai.protos.Schema(type=genai.protos.Type.STRING, description="Từ khóa cần tìm")},
            required=["query"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="ask_researcher_agent",
        description="Ủy quyền (handoff) một tác vụ nghiên cứu sâu cho Researcher Agent.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"topic": genai.protos.Schema(type=genai.protos.Type.STRING, description="Chủ đề cần phân tích")},
            required=["topic"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="read_webpage_content",
        description="Đọc nội dung văn bản thuần túy của một URL được cung cấp.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={"url": genai.protos.Schema(type=genai.protos.Type.STRING, description="Đường dẫn URL")},
            required=["url"]
        )
    )
]

FUNCTIONS = {
    "search_knowledge_base": lambda args: search_knowledge_base(args.get("query", "")),
    "read_company_document": lambda args: read_company_document(args.get("query", "")),
    "ask_researcher_agent": lambda args: ask_researcher_agent(args.get("topic", "")),
    "read_webpage_content": lambda args: read_webpage_content(args.get("url", ""))
}
