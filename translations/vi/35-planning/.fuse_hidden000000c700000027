# Planning — Agent tự lập kế hoạch

> Chặng 4 · Bài 11/16 — Ghép thành hệ · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Hiểu **Planning**: agent chia một mục tiêu lớn thành các bước con trước khi hành động.
- Thấy vì sao lập kế hoạch giúp việc nhiều bước đáng tin hơn.
- Tự cho agent lập kế hoạch trước khi làm trên Claude.

## 📖 Lý thuyết
**Planning** là "chức năng điều hành" của agent: trước khi bắt tay, agent **phân rã** nhiệm vụ thành các bước con có thứ tự, rồi mới thực thi từng bước. Với việc nhiều bước, lập kế hoạch giảm sai sót và cho phép kiểm soát/điều chỉnh giữa chừng.

## 🔍 Soi qua ví dụ
`web-agent` có tool `create_execution_plan` (Orchestrator) và `create_plan` (core skill): với yêu cầu nhiều bước, agent **bắt buộc lập kế hoạch trước** rồi mới `delegate_task` — hiện lên UI dạng badge "📋 Kế hoạch".

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Với mọi yêu cầu nhiều bước, hãy LUÔN xuất "KẾ HOẠCH" (đánh số các bước) TRƯỚC,
rồi hỏi mình "duyệt kế hoạch?" — chỉ làm sau khi mình đồng ý.
```
**Bước 3.** Gõ `Giúp mình chuẩn bị ra mắt một video mới trên kênh.` → **Kỳ vọng:** Claude xuất kế hoạch đánh số, dừng chờ duyệt.
**Bước 4.** Gõ `Duyệt, làm bước 1.` → **Kỳ vọng:** Claude chỉ làm bước 1.
**Nếu kẹt:** Claude làm luôn không lập kế hoạch → nhắc "kế hoạch trước, chờ duyệt".

## ↪️ Chuyển giao
Khi tùy biến, bạn có thể **thêm/chỉnh luật lập kế hoạch** cho phù hợp quy trình đơn vị (vd luôn có bước kiểm duyệt nội dung trẻ em). Planning là điểm cài "human-in-the-loop".

> Gợi mở: *Quy trình nào ở đơn vị bạn cần agent "lập kế hoạch + chờ duyệt" thay vì làm ngay?*

## ✅ Tự kiểm tra
1. Planning giúp gì cho việc nhiều bước?
2. Vì sao "kế hoạch trước, thực thi sau" an toàn hơn?
3. Tool nào trong web-agent làm nhiệm vụ lập kế hoạch?
4. Planning liên quan human-in-the-loop thế nào?

---
*Tiếp: [Multi-Agent](../36-multi-agent/README.md)*
