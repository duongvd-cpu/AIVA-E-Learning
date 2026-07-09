# Agentic RAG — Agent biết truy hồi tri thức

> Chặng 3 · Bài 7/16 — Thành phần lõi · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Giải thích **RAG** (Retrieval-Augmented Generation) và vì sao agent cần nó.
- Phân biệt "trả lời từ trí nhớ mô hình" vs "trả lời có truy hồi nguồn".
- Tự chạy một vòng RAG thủ công trên Claude.

## 📖 Lý thuyết
**RAG** = *truy hồi rồi mới sinh*: trước khi trả lời, agent **tìm trong kho tri thức** (tài liệu, vector database) những đoạn liên quan, rồi trả lời **dựa trên** đoạn đó. Lợi ích: trả lời đúng dữ liệu thật, có nguồn, giảm "bịa". "Agentic" RAG = agent tự *quyết định khi nào cần truy hồi* và truy hồi cái gì.

## 🔍 Soi qua ví dụ
`web-agent` dùng **ChromaDB** (vector DB) trong `skills/rag_skill.py` — công cụ `search_vector_database` tìm theo ngữ nghĩa trong collection `sconnect_knowledge`, nạp từ `sconnect_knowledge.txt` (chia theo `##`). Agent truy hồi 2 đoạn gần nhất rồi mới trả lời.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán một "kho tri thức" nhỏ (giả lập nguồn nội bộ):
```
KHO TRI THỨC (nguồn nội bộ):
[Doc1] Giờ làm việc: 8:30–17:30, T2–T6.
[Doc2] Quy trình nghỉ phép: gửi đơn trước 3 ngày qua hệ thống HR.
[Doc3] Wifi khách: mật khẩu đổi mỗi thứ Hai, hỏi lễ tân.
LUẬT: chỉ trả lời dựa trên kho trên. Nếu không có, nói "không có trong tài liệu".
Luôn ghi [DocN] làm nguồn.
```
**Bước 3.** Hỏi `Xin nghỉ phép cần làm gì?` → **Kỳ vọng:** Claude trả lời trích **[Doc2]**.
**Bước 4.** Hỏi `Căng-tin mấy giờ đóng?` → **Kỳ vọng:** Claude nói "không có trong tài liệu" (không bịa).
**Nếu kẹt:** Claude bịa → nhấn mạnh "chỉ dùng kho, ghi nguồn [DocN]".

## ↪️ Chuyển giao
Khi tùy biến một hệ thống cho đơn vị, RAG là chỗ bạn **nạp tri thức riêng** (quy định, tài liệu phòng ban). Hiểu RAG = biết "đổ" kiến thức đơn vị vào agent ở đâu và ràng buộc nó trả lời có nguồn.

> Gợi mở: *Kho tài liệu nào của đơn vị nên cho agent truy hồi?*

## ✅ Tự kiểm tra
1. RAG gồm 2 bước nào?
2. Vì sao "trả lời có nguồn" giảm bịa?
3. "Agentic" thêm gì so với RAG thường?
4. Web-agent lưu tri thức RAG bằng công nghệ gì?

---
*Tiếp: [Agent Memory](../32-agent-memory/README.md)*
