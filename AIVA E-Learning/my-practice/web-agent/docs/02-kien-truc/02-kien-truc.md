[⬅ 01 Triết lý](../01-tong-quan/01-triet-ly.md) · [⬆ Mục lục](../README.md) · Tiếp: [03 Agent & Orchestration →](03-agent-orchestration.md)

# 02 — Kiến trúc hệ thống

## Sơ đồ luồng tổng

```
Trình duyệt (static/*.js)
   │  GET /api/lessons, /api/lessons/{slug}, /api/lessons/{slug}/suggestions
   │  GET /api/system_status
   │  POST /chat  (SSE stream) ── body: {message, lesson_slug, [system_prompt]}
   │  POST /reset
   ▼
FastAPI (main.py)
   ├─ get_dynamic_system_prompt(lesson_slug)  ← nạp AGENTS.md + ngữ cảnh bài
   ├─ guardrails.check_input_safety()         ← chặn prompt-injection
   ├─ Gemini Main Agent (Orchestrator)        ← function-calling
   │     └─ delegate_task → execute_sub_agent(skill_id, task)
   │            └─ Gemini Sub-agent + tools (skills/*.py)
   │                   └─ hooks (on_agent_start / before_tool_call / ...)
   ├─ create_execution_plan / think_aloud     ← Planning + Metacognition (phát ra 'text')
   ├─ evaluate_response()                      ← AI Judge chấm điểm, gắn badge
   └─ SSE events → trình duyệt (tool_call / tool_result / text / done / error)
```

## Backend (`main.py`, ~950 dòng)

- **App & static mounts:** `/static`, `/lessons/images/translated`, `/lessons/images/root` và các mount ảnh theo bài.
- **Prompt động:** `get_dynamic_system_prompt(lesson_slug)` ghép: persona Orchestrator + **toàn văn `AGENTS.md`** (Sổ tay ngữ cảnh, Bài 16) + ngữ cảnh bài đang đọc (`_build_lesson_context`).
- **Model:** `genai.GenerativeModel(GEMINI_MODEL, system_instruction=...)`. Main Agent, mỗi Sub-agent, và AI Judge đều là instance model riêng với system_instruction khác nhau.
- **Điều phối:** `execute_sub_agent(skill_id, task_description, async_queue)` khởi tạo sub-agent theo `SKILL_REGISTRY`, chạy tool, đẩy sự kiện vào hàng đợi async để stream.
- **An toàn/vòng đời:** `guardrails.py` (lọc input), `hooks.py` (`AgentHookManager`: on_agent_start, before_tool_call…), `evaluate_response()` (Judge).
- **State hội thoại:** biến in-memory toàn tiến trình; `POST /reset` xóa. (Không đa phiên/đa người dùng.)

## Frontend (`static/`, Vanilla JS — không framework)

| File | Trách nhiệm |
| :-- | :-- |
| `index.html` | Khung: navbar (3 toggle) · panel bài học (sidebar + khung đọc) · FAB + popup Trợ lý AI · popup "Hỏi Agent" |
| `style.css` | Layout gốc + theme tối nền tảng |
| `lessons.css` | Style danh sách bài, khung đọc, mini-ToC (bản gốc) |
| `theme-light.css` | **Nạp sau cùng** — theme sáng kiểu Udemy/Coursera, override biến tối; chứa các bản vá layout/ToC/onboarding |
| `lessons.js` | Tải & render bài, sidebar 2 tier, dashboard, mini-ToC, tiến trình, chọn văn bản → "Hỏi Agent" |
| `app.js` | Chat: gửi `/chat`, đọc SSE, render Markdown, nhãn tool thân thiện, cây System Introspection |
| `widget.js` | Điều khiển popup Trợ lý AI kiểu Gemini (FAB mở/đóng, toggle, Esc) |
| `onboarding.js` | Modal chào mừng + tour 4 bước (spotlight) + nút "Hướng dẫn" |
| `enhance.js` | Thanh % đọc từng bài (theo scroll, lưu localStorage) + toast động viên |

## Bản đồ file (rút gọn, bỏ venv/__pycache__/chroma_db)

```
my-practice/web-agent/
├─ main.py                 # backend + routing + SSE
├─ run.py                  # entrypoint (uvicorn, cổng 8899)
├─ start.bat               # 1-click Windows: venv + cài + mở trình duyệt
├─ guardrails.py           # lọc prompt-injection (Bài 18/19)
├─ hooks.py                # lifecycle hooks (Bài 20)
├─ requirements.txt        # phụ thuộc
├─ .env.example            # mẫu cấu hình (KHÔNG chứa key thật)
├─ AGENTS.md               # sổ tay ngữ cảnh Agent tự nạp
├─ AGENT_ARCHITECTURE.md   # kiến trúc kỹ thuật (bản gốc)
├─ README.md               # hướng dẫn ngắn
├─ skills/                 # 7 sub-agent
│  ├─ core_skill.py  rag_skill.py  research_skill.py
│  ├─ memory_skill.py  sql_skill.py  weather_skill.py
│  └─ introspection_skill.py
├─ data/                   # company.db (SQLite), sconnect_knowledge.txt, chroma_db/
├─ static/                 # frontend (xem bảng trên)
└─ docs/                   # BỘ TÀI LIỆU NÀY
```

[⬅ 01 Triết lý](../01-tong-quan/01-triet-ly.md) · [⬆ Mục lục](../README.md) · Tiếp: [03 Agent & Orchestration →](03-agent-orchestration.md)
