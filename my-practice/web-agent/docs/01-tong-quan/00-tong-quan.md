[⬆ Mục lục](../README.md) · Tiếp: [01 Triết lý →](01-triet-ly.md)

# 00 — Tổng quan & Capability Manifest

## Hệ thống là gì

**Web Agent Learning Hub** là ứng dụng web chạy local, phục vụ hai mục tiêu song song:

1. **Learning Hub** — nơi đọc 24+ bài học của khóa "AI Agents for Beginners" (bản tiếng Việt), có video,
   hình minh họa, lộ trình, tiến trình đọc, và onboarding cho người mới.
2. **AI Assistant mẫu** — một hệ Multi-Agent thật (Orchestrator + 7 sub-agent) để người học *thấy tận mắt*
   các khái niệm trong bài đang chạy: Tool Use, Planning, Metacognition, Memory, RAG, Security.

Hai mục tiêu này gắn với nhau: người học đọc bài ở khung giữa, và hỏi Trợ lý AI (popup góc phải) — trợ lý
**biết đang đọc bài nào** (lesson-aware) để trả lời sát ngữ cảnh.

## Thành phần cấp cao

| Tầng | Công nghệ | Vai trò |
| :-- | :-- | :-- |
| Backend | FastAPI + Uvicorn (Python 3.12) | Phục vụ API, điều phối Agent, stream SSE |
| LLM | Google Gemini (`gemini-2.0-flash`, cấu hình qua `GEMINI_MODEL`) | Sinh câu trả lời, function-calling |
| Vector DB | ChromaDB (`data/chroma_db`, collection `sconnect_knowledge`) | RAG semantic search |
| SQL DB | SQLite (`data/company.db`) | Dữ liệu có cấu trúc cho SQL Agent |
| Frontend | HTML + CSS + Vanilla JS (không framework) | UI học tập + chat |
| Nội dung | `translations/vi/**/README.md` + `translated_images/vi` | Bài học tiếng Việt + hình |

## Capability Manifest — Hệ thống LÀM ĐƯỢC gì

- Liệt kê & render bài học tiếng Việt (Markdown → HTML), viết lại đường dẫn ảnh cho đúng.
- Phân bài thành **Lộ trình chính (core, 16 bài)** và **Nâng cao/Đọc thêm (advanced, 8 bài)** qua trường `tier`.
- Chat streaming (SSE) với Trợ lý AI, hiển thị realtime khi Agent gọi tool và khi có kết quả.
- **Orchestration phân tầng:** Main Agent giao việc cho sub-agent qua `delegate_task`; không tự làm.
- **Planning** (`create_execution_plan`) và **Metacognition** (`think_aloud`) hiển thị ra chat.
- **RAG** (ChromaDB), **đọc tài liệu/web**, **SQL**, **Memory**, **Weather**, **tính toán/chạy Python sandbox**.
- **Guardrails** chặn prompt-injection cơ bản; **Hooks** vòng đời agent; **AI Judge** chấm điểm câu trả lời.
- Gợi ý câu hỏi theo từng bài; trợ lý AI **lesson-aware** (biết bài đang mở).
- Trải nghiệm học: dashboard tiến trình, thanh % đọc từng bài, mục lục (ToC) nổi, tour hướng dẫn.

## Capability Manifest — Hệ thống KHÔNG làm (Non-goals tóm tắt)

- Không phải hệ sản xuất/đa người dùng: state chat lưu **in-memory toàn cục**, reset khi restart.
- Không xác thực người dùng, không phân quyền thật (hooks chỉ minh họa).
- Không lưu bí mật trong code/tài liệu; API key chỉ ở `.env` (không commit).
- Không đổi kiến trúc orchestration khi làm UI/UX (xem [09](09-rang-buoc-non-goals.md)).

## Từ vựng nhanh

- **Orchestrator / Main Agent:** agent điều phối, chỉ giao việc.
- **Sub-agent / Skill:** worker chuyên trách (RAG, SQL, Research, Core, Memory, Weather, Introspection).
- **Tool:** hàm được khai báo `FunctionDeclaration` để LLM tự gọi (function calling).
- **tier:** nhãn `core` / `advanced` phân nhóm bài trên sidebar (thêm ở ADR-005, additive).
- **lesson-aware:** trợ lý nhận `lesson_slug` để trả lời sát bài đang đọc.

[⬆ Mục lục](../README.md) · Tiếp: [01 Triết lý →](01-triet-ly.md)
