# Vì sao cần AI Agent?

> Chặng 1 · Bài 3/16 — Vỡ lòng tư duy · Thực hành: **Claude** (phản tư)

---

## 🎯 Mục tiêu

Sau bài này bạn sẽ:
- Giải thích vì sao "agent" tiến xa hơn một chatbot hay một prompt đơn lẻ.
- Nắm **bối cảnh của khóa học**: công ty sẽ đưa xuống nhiều hệ thống agent, và vai của bạn là **tiếp nhận & tùy biến** chúng cho đơn vị.
- Nêu được điều bạn sẽ *làm được* sau khóa.

## 📖 Lý thuyết

Một **AI Agent** không chỉ trả lời — nó **hành động để đạt mục tiêu**: tự lập kế hoạch, gọi công cụ, tra tri thức, nhớ ngữ cảnh, và tự điều chỉnh. So sánh nhanh:

| | Prompt/Chatbot đơn lẻ | AI Agent |
|---|---|---|
| Bản chất | Hỏi–đáp một lượt | Perceive → reason → act, nhiều bước |
| Công cụ | Không | Gọi tool để hành động thật |
| Tri thức/Bộ nhớ | Chỉ những gì trong prompt | Truy hồi tri thức + nhớ qua lượt |
| Kết quả | Văn bản | Hoàn thành *tác vụ* |

Vì sao Sconnect cần điều này: các quy trình sáng tạo–vận hành có nhiều bước lặp, nhiều nguồn dữ liệu. Agent giúp **AI vận hành các bước đó** để con người tập trung vào sáng tạo & quyết định (đúng tinh thần [AIVA](../26-aiva-la-gi/README.md)).

**Bối cảnh khóa học:** công ty + team AI sẽ liên tục đưa xuống **nhiều hệ thống agent**. Khóa này là **nền tảng năng lực** để bạn: (1) *hiểu* hệ thống được giao, (2) *tùy biến* nó theo đặc trưng đơn vị — tới tận mức thêm/sửa năng lực khi cần.

## 🔍 Soi qua ví dụ

`web-agent` là hệ agent thu nhỏ bạn sẽ dùng xuyên khóa để *nhìn thấy* từng khái niệm sống trong code thật — và ở chặng cuối, chính nó là "hệ thống được đưa xuống" để bạn tập tiếp nhận & tùy biến.

## 🛠️ Thực hành (từng bước, trên Claude)

**Bước 1.** Mở Claude.

**Bước 2.** Dán prompt:
```
Giúp mình phân biệt bằng ví dụ cụ thể: cùng một nhu cầu
"tổng hợp thông tin về một chủ đề rồi viết báo cáo ngắn",
một CHATBOT thường làm tới đâu, và một AI AGENT làm thêm được gì?
Liệt kê từng bước agent sẽ đi.
```
→ **Kỳ vọng:** Claude chỉ ra agent biết *chia bước, gọi công cụ tra cứu, tổng hợp*, còn chatbot dừng ở trả lời theo trí nhớ.

**Bước 3.** Hỏi: `Nêu 3 công việc trong một công ty sáng tạo nội dung mà agent giúp ích rõ nhất, và vì sao.`
→ **Kỳ vọng:** ví dụ có tính áp dụng (tra cứu, soạn nháp nhiều bước, kiểm tra theo checklist...).

**Nếu kẹt:** yêu cầu Claude "cho ví dụ có các bước hành động, không chỉ trả lời văn bản".

## ↪️ Chuyển giao (áp cho hệ thống được đưa xuống)

Hiểu "agent là để *hoàn thành tác vụ*" giúp bạn, khi nhận một hệ thống, hỏi đúng câu: **"Nó được thiết kế để hoàn thành tác vụ gì? Mình cần nó làm thêm tác vụ nào cho đơn vị?"** — đó là điểm khởi đầu của mọi tùy biến.

> Câu hỏi gợi mở: *Tác vụ nhiều-bước nào ở đơn vị bạn đáng để một agent gánh?*

## ✅ Tự kiểm tra

1. Ba khác biệt lớn giữa agent và chatbot đơn lẻ?
2. "Perceive → reason → act" nghĩa là gì?
3. Vai trò của bạn với các hệ thống công ty đưa xuống là gì (2 việc)?
4. Sau khóa, bạn kỳ vọng *làm được* điều gì?

---
*Hết Chặng 1. Tiếp theo — Chặng 2: [Agent là gì (định nghĩa kỹ)](../28-agent-la-gi/README.md).*
