# 🍃 60 — Bài học & Nợ kỹ thuật

> Lá. Tri thức tích lũy: bản đồ bài học của khóa + sổ nợ kỹ thuật của app.

## Bản đồ 16 bài (6 chặng)

Nội dung đầy đủ ở `translations/vi/` (bài 25–40). Tóm tắt mạch:
- **Chặng 1** (25–27): AI-Native · AIVA · Vì sao cần agent.
- **Chặng 2** (28–29): Agent là gì · Nguyên tắc thiết kế.
- **Chặng 3** (30–34): Tool · RAG · Memory · Context · Skills.
- **Chặng 4** (35–37): Planning · Multi-Agent · Orchestration.
- **Chặng 5** (38): Trustworthy & Guardrails.
- **Chặng 6** (39–40): Thiết kế hệ thống · Capstone tùy biến.

## Sổ nợ kỹ thuật (Debt Register)

Định dạng: `DEBT-NN` · mức độ 🔴/🟡/🟢 · trạng thái. Phát hiện nợ mới → thêm một dòng (Luật 9, [20-principles](../20-principles/README.md)).

| ID | Vấn đề | Vị trí | Mức | Trạng thái |
|----|--------|--------|-----|-----------|
| DEBT-01 | `sql_skill`/`memory_skill` thiếu `FUNCTIONS` → sub-agent có thể "Tool không tồn tại" | `skills/sql_skill.py`, `memory_skill.py` | 🔴 | Mở |
| DEBT-02 | Guardrail thuần regex — có thể bị lách | `guardrails.py` | 🟡 | Mở |
| DEBT-03 | `chat_history` biến toàn cục — chưa đa người dùng | `main.py` | 🟡 | Mở |
| DEBT-04 | Audit receipt chỉ in console, chưa lưu bền | `hooks.py` | 🟢 | Mở |

> Chi tiết kỹ thuật của từng mục: đối chiếu `my-practice/web-agent/docs/` + mã nguồn.

→ Tiếp: [70-reference](../70-reference/README.md).
