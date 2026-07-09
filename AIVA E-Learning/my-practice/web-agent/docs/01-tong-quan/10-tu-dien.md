[⬅ 09 Ràng buộc & Non-goals](09-rang-buoc-non-goals.md) · [⬆ Mục lục](../README.md)

# 10 — Từ điển thuật ngữ

- **Orchestrator / Main Agent:** Agent điều phối trong `main.py`; lên kế hoạch và giao việc, không tự thực thi tool ngoại vi.
- **Sub-agent / Skill / Worker:** Agent chuyên trách trong `skills/*.py` (RAG, Research, Core, Memory, SQL, Weather, Introspection).
- **Tool (Công cụ):** Hàm được khai báo `FunctionDeclaration` để LLM tự gọi (function calling).
- **delegate_task:** Cổng Orchestrator giao việc cho sub-agent kèm ngữ cảnh.
- **create_execution_plan (Planning):** Lập kế hoạch từng bước trước khi hành động.
- **think_aloud (Metacognition):** Tự suy ngẫm/đánh giá lỗi; thử lại tối đa 3 lần.
- **RAG:** Retrieval-Augmented Generation — tìm dữ liệu liên quan (ChromaDB) rồi mới trả lời.
- **ChromaDB:** Vector database lưu embeddings; tìm theo ý nghĩa (collection `sconnect_knowledge`).
- **SSE (Server-Sent Events):** Kênh một chiều server→client để stream câu trả lời & sự kiện tool theo thời gian thực.
- **tier:** Nhãn `core` (Lộ trình chính) / `advanced` (Nâng cao/Đọc thêm) phân nhóm bài trên sidebar (ADR-005).
- **lesson-aware:** Trợ lý nhận `lesson_slug` để trả lời sát bài đang mở.
- **DEMO_LESSONS:** Tập slug bài có nhãn "Demo" (thực hành trực tiếp).
- **Guardrails:** Lớp lọc input chống prompt-injection (`guardrails.py`).
- **Hooks:** Sự kiện vòng đời Agent (`hooks.py`) — điểm gắn giám sát/phân quyền.
- **AI Judge:** Model Gemini riêng chấm điểm 0–10 câu trả lời (`evaluate_response`).
- **AGENTS.md:** Sổ tay ngữ cảnh được nạp vào system prompt mỗi phiên (Bài 16 — Workspace Context Handbook).
- **FAB:** Floating Action Button — nút nổi góc dưới phải mở Trợ lý AI.
- **ToC (mini-toc):** Mục lục trong bài, dạng thanh sticky bên phải.
- **REPO_ROOT:** Thư mục gốc repo (hoặc gốc gói share) = 3 cấp trên `main.py`.
- **ADR:** Architecture Decision Record — bản ghi quyết định kiến trúc.

[⬅ 09 Ràng buộc & Non-goals](09-rang-buoc-non-goals.md) · [⬆ Mục lục](../README.md)
