# Nguyên tắc thiết kế hệ thống agent (nâng cao)

> Chặng 6 · Bài 15/16 — Thiết kế & Tùy biến · Thực hành: **Claude** (chuẩn bị cho capstone)

---

## 🎯 Mục tiêu
- Tổng hợp các bài trước thành **bức tranh hệ thống**: các thành phần ghép lại ra sao.
- Nắm ranh giới **"chuẩn công ty ↔ tùy biến đơn vị"** khi thiết kế.
- Lập một "bản thiết kế 1 trang" cho một hệ agent.

## 📖 Lý thuyết
Một hệ agent hoàn chỉnh = **Orchestrator** (điều phối) + **sub-agent/skills** (năng lực) + **công cụ** (hành động) + **RAG/dữ liệu** (tri thức) + **bộ nhớ** + **guardrails** + **giao diện**. Thiết kế tốt là **phân tách trách nhiệm** rõ và định rõ:
- **Lõi chuẩn** (giữ ổn định để nhận cập nhật từ công ty): kiến trúc điều phối, luật an toàn nền.
- **Lớp tùy biến đơn vị** (được sửa): skill riêng, tri thức riêng, luật định tuyến, ngữ cảnh thương hiệu.

Hiểu ranh giới này = tùy biến mà không phá vỡ khả năng đồng bộ với bản chuẩn.

## 🔍 Soi qua ví dụ
`web-agent` gói đủ các mảnh trên. Nhìn tổng thể: `main.py` (điều phối + context assembly + judge) · `skills/` (năng lực) · `data/` (tri thức/bộ nhớ) · `guardrails.py` (an toàn) · `static/` (UI). Đây là "ca mổ" bạn sẽ tùy biến ở bài 40.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Giúp mình lập "bản thiết kế 1 trang" cho một hệ AI Agent, gồm các mục:
1) Mục tiêu hệ thống  2) Orchestrator  3) Các skill/sub-agent
4) Công cụ  5) Nguồn tri thức  6) Bộ nhớ  7) Guardrails  8) Giao diện.
Với mỗi mục, đánh dấu [CHUẨN] (nên giữ) hay [TÙY BIẾN] (đơn vị được sửa).
Hệ mình cần: "trợ lý nội dung cho 1 phòng ban".
```
→ **Kỳ vọng:** Claude ra bản 8 mục, có nhãn CHUẨN/TÙY BIẾN.
**Bước 3.** Hỏi `Nếu công ty nâng cấp lõi, phần [TÙY BIẾN] của mình có an toàn không? Cần lưu ý gì?` → **Kỳ vọng:** Claude nêu nguyên tắc tách lớp để đồng bộ.
**Nếu kẹt:** yêu cầu gán nhãn CHUẨN/TÙY BIẾN cho *từng* mục.

## ↪️ Chuyển giao
Bản thiết kế 1 trang này chính là **công cụ bạn dùng khi nhận bất kỳ hệ thống nào**: vẽ nhanh 8 mục, khoanh vùng được sửa — rồi mới tùy biến. Bài cuối sẽ làm thật.

> Gợi mở: *Với hệ thống đơn vị bạn sắp nhận, mục nào chắc chắn thuộc [TÙY BIẾN]?*

## ✅ Tự kiểm tra
1. Kể 7–8 thành phần của một hệ agent hoàn chỉnh.
2. Phân biệt "lõi chuẩn" và "lớp tùy biến đơn vị".
3. Vì sao giữ ranh giới này giúp đồng bộ với bản chuẩn?
4. "Bản thiết kế 1 trang" gồm mấy mục?

---
*Tiếp — Capstone: [Thiết kế & tùy biến một hệ agent](../40-thiet-ke-va-tuy-bien-he-agent/README.md)*
