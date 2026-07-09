# AI-Native là gì?

> Chặng 1 · Bài 1/16 — Vỡ lòng tư duy · Thực hành: **Claude** (phản tư, chưa build)
> Theo ADR-005 trình tự · khuôn 6 khối

---

## 🎯 Mục tiêu

Sau bài này bạn sẽ:
- Phân biệt được **AI-Native** với "gắn thêm AI" (AI-added).
- Diễn đạt được nguyên lý nền của Sconnect: **"AI vận hành — Con người định hướng & sáng tạo."**
- Nhìn một quy trình và chỉ ra đâu là phần AI nên *vận hành*, đâu là phần người *giữ quyết định*.

## 📖 Lý thuyết

**AI-Native** là cách tư duy đặt AI làm **lõi vận hành** ngay từ đầu, chứ không phải một tính năng đính kèm vào cuối. Nguyên lý cốt lõi:

> **AI Operates — Humans Strategy & Create.**
> AI là lõi điều phối & thực thi có kỷ luật (chuẩn hóa quy trình, đảm bảo chất lượng, chạy việc lặp). Con người là lõi chiến lược & sáng tạo (định hướng, quyết định thương hiệu, tạo giá trị).

Giá trị sinh ra từ **cộng hưởng**: *Độ chính xác của AI × Sức sáng tạo của người → giá trị gấp bội*.

Ba dấu hiệu của tư duy AI-Native:
- **Mặc định hỏi:** "AI sẽ đọc/vận hành việc này thế nào?" — thay vì làm thủ công rồi mới nghĩ đến AI.
- **Hệ thống hóa:** việc gì lặp lại, có quy tắc → giao AI; việc gì cần phán đoán giá trị → giữ cho người.
- **Tài liệu-trước:** mô tả rõ ràng để cả người lẫn AI cùng hiểu và tái lập được.

**AI-Native ≠ AI-added:** dán một chatbot lên quy trình cũ là AI-added; thiết kế lại quy trình quanh năng lực AI là AI-Native.

## 🔍 Soi qua ví dụ

Hệ mẫu `my-practice/web-agent/` là một ví dụ AI-Native ở quy mô nhỏ: nó không phải "web có thêm nút AI", mà được dựng *quanh* một agent điều phối — AI vận hành việc trả lời/tra cứu, con người (bạn) giữ vai định hướng và tùy biến. Càng học các chặng sau, bạn càng thấy rõ ranh giới "AI vận hành ↔ người định hướng" này.

## 🛠️ Thực hành (từng bước, trên Claude)

> Chặng 1 là bài *tư duy* — bạn luyện cách nhìn, chưa build gì.

**Bước 1.** Mở Claude, tạo cuộc trò chuyện mới.

**Bước 2.** Dán prompt sau:
```
Mình đang học tư duy AI-Native ("AI vận hành — con người định hướng & sáng tạo").
Hãy đóng vai người hướng dẫn. Mình sẽ mô tả một quy trình công việc,
bạn giúp mình chia nó thành 2 cột:
(A) phần AI nên VẬN HÀNH, (B) phần CON NGƯỜI nên giữ quyết định.
Kèm 1 câu lý do cho mỗi phần.
```

**Bước 3.** Mô tả một quy trình quen thuộc của bạn, ví dụ:
```
Quy trình: viết mô tả sản phẩm cho một video mới —
gồm: nghĩ ý tưởng, viết bản nháp, kiểm chính tả, đăng lên kênh, trả lời bình luận.
```
→ **Kỳ vọng:** Claude tách được, ví dụ (A) soạn nháp/kiểm chính tả/gợi ý trả lời bình luận; (B) chốt ý tưởng/giọng thương hiệu/quyết định đăng.

**Bước 4.** Hỏi tiếp: `Nếu làm AI-added (chỉ dán AI vào) thì khác gì làm AI-Native (thiết kế lại quanh AI)?`
→ **Kỳ vọng:** Claude chỉ ra khác biệt "vá víu" vs "thiết kế lại từ gốc".

**Nếu kẹt:** Claude tách chưa hợp lý → thêm ràng buộc "việc cần phán đoán giá trị/thương hiệu thì để con người".

## ↪️ Chuyển giao (áp cho hệ thống được đưa xuống)

Khi công ty đưa xuống một hệ thống AI, câu hỏi đầu tiên để làm chủ nó là: **"AI đang vận hành phần nào, và mình — người của đơn vị — giữ quyết định ở đâu?"** Hiểu ranh giới này giúp bạn tùy biến đúng chỗ mà không phá vỡ vai trò của AI.

> Câu hỏi gợi mở: *Trong đơn vị bạn, đâu là việc đáng để AI vận hành, đâu là việc phải giữ cho con người?*

## ✅ Tự kiểm tra

1. Nói lại nguyên lý "AI Operates — Humans Strategy & Create" bằng lời của bạn.
2. Cho một ví dụ AI-added và một ví dụ AI-Native cho cùng một công việc.
3. Ba dấu hiệu của tư duy AI-Native là gì?
4. Vì sao "ranh giới AI vận hành ↔ người định hướng" lại quan trọng khi tiếp nhận hệ thống?

---
> 📝 *Ghi chú biên soạn:* nội dung nền dựa trên triết lý AI-Native của Sconnect. Dương có thể bổ sung **ví dụ thực tế của Sconnect/Wolfoo** để bài sống động hơn.
