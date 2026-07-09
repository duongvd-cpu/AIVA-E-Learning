# Context Engineering — Lắp ráp ngữ cảnh

> Chặng 3 · Bài 9/16 — Thành phần lõi · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Hiểu **Context Engineering**: chủ động *lắp ráp* đúng ngữ cảnh vào prompt thay vì nhồi tất cả.
- Thấy System Prompt được ghép từ nhiều khối (persona + sổ tay + bộ nhớ + tri thức bài).
- Tự thiết kế một "master prompt" nhiều khối trên Claude.

## 📖 Lý thuyết
Sau khi có Tool/RAG/Memory, câu hỏi là: *đưa cái gì vào ngữ cảnh của LLM, lúc nào?* **Context Engineering** = nghệ thuật **lắp ráp động** ngữ cảnh: chỉ nạp đúng khối cần cho vai trò/nhiệm vụ hiện tại — đủ để đúng, gọn để rẻ và không nhiễu. Nguyên tắc: *"mọi thứ là ngữ cảnh, nhưng chỉ nạp thứ cần".*

## 🔍 Soi qua ví dụ
`web-agent` có `get_dynamic_system_prompt()` ghép **4 khối** đúng thứ tự: (1) Persona lõi + danh sách skill, (2) Sổ tay `AGENTS.md`, (3) Bộ nhớ dài hạn, (4) Ngữ cảnh bài học đang đọc. Prompt không tĩnh — lắp ráp lại mỗi phiên.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Cùng thiết kế "master prompt" cho một trợ lý nội dung, gồm 4 khối:
1) VAI TRÒ, 2) LUẬT THƯƠNG HIỆU, 3) GHI NHỚ VỀ NGƯỜI DÙNG, 4) NGỮ CẢNH NHIỆM VỤ.
Hãy hỏi mình từng khối một, rồi ghép lại thành 1 prompt hoàn chỉnh.
```
**Bước 3.** Trả lời lần lượt 4 khối Claude hỏi. → **Kỳ vọng:** Claude ghép thành 1 master prompt mạch lạc.
**Bước 4.** Hỏi `Nếu bỏ khối 3 (ghi nhớ), câu trả lời sẽ kém đi thế nào?` → **Kỳ vọng:** Claude giải thích mất cá nhân hóa.
**Nếu kẹt:** yêu cầu Claude "hỏi từng khối, đừng gộp".

## ↪️ Chuyển giao
Khi tùy biến hệ thống, đây là nơi bạn **chèn ngữ cảnh của đơn vị** (luật thương hiệu, tài liệu nghiệp vụ) vào đúng khối — mà không phá cấu trúc prompt gốc.

> Gợi mở: *Khối ngữ cảnh nào của đơn vị bạn cần agent luôn "mang theo"?*

## ✅ Tự kiểm tra
1. Context Engineering khác "nhồi hết vào prompt" ở điểm nào?
2. Kể 4 khối trong master prompt của web-agent.
3. Vì sao prompt nên lắp ráp *động*?
4. Bạn sẽ chèn ngữ cảnh đơn vị vào đâu?

---
*Tiếp: [Agent Skills](../34-agent-skills/README.md)*
