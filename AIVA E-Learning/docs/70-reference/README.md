# 🍃 70 — Tham chiếu (Reference)

> Lá. Glossary, bảo mật, lưu trữ dữ liệu — tra cứu nhanh.

## Glossary (thuật ngữ)

| Thuật ngữ | Nghĩa |
|-----------|-------|
| Agent | Chương trình AI tự lập kế hoạch & gọi tool để hoàn thành tác vụ |
| Orchestrator | Agent chủ, điều phối các sub-agent qua `delegate_task` |
| Sub-agent / Skill | Worker chuyên trách; skill = gói prompt + tool + hàm |
| Tool / Function Calling | Hàm có schema agent gọi tự động để hành động |
| RAG | Truy hồi tri thức rồi mới sinh câu trả lời |
| ChromaDB | Vector DB lưu embeddings cho RAG |
| Guardrails | Lớp kiểm tra an toàn đầu vào |
| ADR | Bản ghi quyết định kiến trúc |
| SSoT | Nguồn sự thật duy nhất |

## Bảo mật & tuân thủ (tóm tắt)

- **Secrets:** `GEMINI_API_KEY` chỉ ở `.env` cục bộ; không in/commit; che `{REDACTED}`.
- **COPPA / nội dung trẻ em:** mặc định khán giả có thể là trẻ em (bối cảnh Wolfoo) — guardrails bắt buộc, tuân COPPA.
- **Lớp bảo vệ:** guardrail đầu vào + xác nhận cho hành động nguy hiểm + audit receipt. Chi tiết: `my-practice/web-agent/docs/`.

## Lưu trữ dữ liệu (3 tầng tri thức)

| Nguồn | Loại | Ai đọc |
|-------|------|--------|
| `data/chroma_db/` | Vector DB | `rag_skill` |
| `data/*.txt`, `knowledge_base.txt` | Text | RAG / `research_skill` |
| `data/company.db` | SQLite (bảng employees) | `sql_skill` |
| `data/long_term_memory.json` | JSON key-value | `memory_skill` |

> Cơ chế chunking/embedding/luồng chi tiết: `my-practice/web-agent/docs/`.

→ Tiếp: [80-changelog](../80-changelog/README.md).
