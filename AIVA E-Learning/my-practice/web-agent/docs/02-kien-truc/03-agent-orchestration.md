[⬅ 02 Kiến trúc](02-kien-truc.md) · [⬆ Mục lục](../README.md) · Tiếp: [04 API →](../04-api/04-api-hop-dong.md)

# 03 — Agent, Orchestration, Tools & An toàn

Mô hình: **Hierarchical Orchestration** (điều phối phân tầng). Chi tiết đầy đủ ở `../AGENT_ARCHITECTURE.md`.

## Orchestrator (Main Agent)

- Vị trí: `main.py`. Nghe người dùng, **bắt buộc** lập kế hoạch trước khi làm việc nhiều bước,
  rồi giao việc; không tự thực thi tool ngoại vi.
- Công cụ của Orchestrator:
  - `delegate_task` — giao việc cho sub-agent kèm bối cảnh.
  - `create_execution_plan` — lập kế hoạch từng bước (Planning).
  - `think_aloud` — tự suy ngẫm/đánh giá lỗi (Metacognition); thử lại tối đa 3 lần trước khi nhờ người.

## 7 Sub-agent (Skills) và Tools

| Sub-agent | Tệp | Tools chính | Vai trò |
| :-- | :-- | :-- | :-- |
| Core Agent | `skills/core_skill.py` | `calculate_expression`, `run_python_code`, `read_file`, `list_directory` | Tính toán, chạy Python sandbox, đọc file/thư mục |
| RAG Agent | `skills/rag_skill.py` | `search_vector_database` | Semantic search trên ChromaDB (Embeddings/KNN) |
| Research Agent | `skills/research_skill.py` | `search_knowledge_base`, `read_company_document`, `read_webpage_content`, `ask_researcher_agent` | Tra KB tĩnh, đọc full-text, cào web, handoff suy luận sâu |
| Memory Agent | `skills/memory_skill.py` | `save_to_memory`, `retrieve_from_memory` | Ghi/đọc bộ nhớ hội thoại |
| SQL Agent | `skills/sql_skill.py` | `execute_sql_query`, `list_tables` | Truy vấn SQLite `data/company.db` |
| Weather Agent | `skills/weather_skill.py` | `get_current_weather`, `get_weather_forecast` | Gọi API thời tiết |
| Introspection | `skills/introspection_skill.py` | (nội soi hệ thống) | Phục vụ `/api/system_status` / self-check |

> Nguồn liệt kê động: `SKILL_REGISTRY` (map skill_id → name/description/prompt/tools) và
> `ORCHESTRATOR_TOOLS`. `/api/system_status` đọc chính hai cấu trúc này để vẽ cây UI — **thêm tool/skill
> ở đây là UI tự cập nhật**, không cần sửa frontend.

## Thư viện tri thức (Knowledge Base) — 3 tầng

1. **Vector DB (ChromaDB):** `data/chroma_db`, collection `sconnect_knowledge`. Tìm theo ý nghĩa (KNN trên embeddings).
2. **Tài liệu text:** `data/sconnect_knowledge.txt`, `knowledge_base.txt` — nguồn thô cho RAG/đọc full-text.
3. **KB nhúng trong code:** từ điển tĩnh trong `skills/research_skill.py` — tra từ khóa O(1).

## Luồng định tuyến (rút gọn)

```
User → Main Agent
  → create_execution_plan (nếu đa bước)
  → chọn skill → delegate_task(skill_id, task)
      → execute_sub_agent: khởi tạo sub-agent + tools
          → hooks.before_tool_call → chạy tool → trả kết quả
  → think_aloud (nếu lỗi → thử cách khác, tối đa 3 lần)
  → tổng hợp → stream 'text' → evaluate_response (Judge) → gắn badge điểm
```

## An toàn & Vòng đời

- **Guardrails (`guardrails.py`):** `check_input_safety(message)` bắt mẫu nguy hiểm (jailbreak, "ignore previous instructions", `drop table`, …) trước khi vào Agent. Bài 18/19.
- **Hooks (`hooks.py` — `AgentHookManager`):** `on_agent_start`, `before_tool_call`, … là điểm gắn giám sát/phân quyền thật (Datadog/IAM) trong doanh nghiệp. Bài 20. Hiện chỉ log minh họa.
- **AI Judge (`evaluate_response`):** một model Gemini riêng chấm điểm 0–10 câu trả lời + lý do, gắn badge cuối tin nhắn. Bài 21 (Monitoring/Eval).
- **Bảo mật prompt:** Agent không tiết lộ mã nguồn/prompt kể cả khi bị gài bẫy (theo `AGENTS.md`).

[⬅ 02 Kiến trúc](02-kien-truc.md) · [⬆ Mục lục](../README.md) · Tiếp: [04 API →](../04-api/04-api-hop-dong.md)
