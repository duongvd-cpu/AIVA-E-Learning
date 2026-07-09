# Nguyên tắc thiết kế Agent (nhập môn)

> Chặng 2 · Bài 5/16 — Agent là gì · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Nắm các nguyên tắc làm nên một agent **tốt**: minh bạch, có kiểm soát, an toàn, đúng mục đích.
- Biết đánh giá nhanh một agent theo checklist nguyên tắc.

## 📖 Lý thuyết
Một agent tốt được thiết kế quanh 3 chiều (từ bài gốc "Nguyên tắc thiết kế Agent"):
- **Không gian (Space):** kết nối người & tri thức, dễ tiếp cận, không gây phiền.
- **Thời gian (Time):** học từ quá khứ (bộ nhớ), hỗ trợ đúng lúc, thích ứng tương lai.
- **Cốt lõi (Core):** chấp nhận bất định nhưng xây **niềm tin** qua *minh bạch* và *quyền kiểm soát của người dùng*.

Nguyên tắc vận hành nổi bật: **minh bạch** (agent phơi bày điều nó đang làm), **human-in-the-loop** (người giữ quyền quyết định ở điểm rủi ro), **đúng mục đích** (mỗi năng lực có lý do).

## 🔍 Soi qua ví dụ
`web-agent` minh bạch bằng cách phát sự kiện mỗi lần gọi tool ra giao diện; có xác nhận cho hành động nguy hiểm (`delete_all_data` cần `CONFIRMED`) — đúng nguyên tắc minh bạch + kiểm soát.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Đây là checklist đánh giá một AI Agent:
1) Có minh bạch việc nó đang làm không?
2) Người dùng có kiểm soát/được xác nhận ở bước rủi ro không?
3) Mỗi năng lực có mục đích rõ không?
4) Có an toàn (chặn hành động nguy hiểm) không?
Mình sẽ mô tả một agent; hãy chấm theo 4 tiêu chí, mỗi tiêu chí Đạt/Chưa + lý do.
```
**Bước 3.** Mô tả một agent bất kỳ (thật hoặc tưởng tượng). → **Kỳ vọng:** Claude chấm 4 tiêu chí kèm lý do.
**Bước 4.** Hỏi: `Agent này nên thêm gì để "đáng tin" hơn?` → **Kỳ vọng:** đề xuất minh bạch/kiểm soát.
**Nếu kẹt:** yêu cầu Claude chấm *từng* tiêu chí, không gộp.

## ↪️ Chuyển giao
Dùng chính 4 tiêu chí này để **thẩm định một hệ thống được đưa xuống** trước khi tùy biến: nó đã minh bạch/an toàn chưa, chỗ nào bạn cần bổ sung kiểm soát cho đơn vị.

> Gợi mở: *Tiêu chí nào hệ thống của bạn hay thiếu nhất?*

## ✅ Tự kiểm tra
1. Ba chiều thiết kế (Space/Time/Core) nói gì?
2. "Human-in-the-loop" là gì và vì sao cần?
3. Cho một ví dụ về "minh bạch" trong agent.
4. 4 tiêu chí đánh giá nhanh một agent?

---
*Hết Chặng 2. Tiếp — Chặng 3: [Tool Use](../30-tool-use/README.md)*
