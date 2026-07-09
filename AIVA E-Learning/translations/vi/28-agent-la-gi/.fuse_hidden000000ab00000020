# Agent là gì? (định nghĩa & thành phần)

> Chặng 2 · Bài 4/16 — Agent là gì · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Định nghĩa AI Agent và nêu **4 thành phần**: LLM (bộ não) + Công cụ + Tri thức + Bộ nhớ.
- Mô tả vòng **perceive → reason → act**.
- Dựng một "agent mini" bằng prompt trên Claude.

## 📖 Lý thuyết
Một **AI Agent** = một LLM được trao *công cụ*, *tri thức* và *bộ nhớ* để **tự hành động đạt mục tiêu**, thay vì chỉ trả lời một lượt. Vòng lặp cốt lõi:
- **Perceive** — nhận yêu cầu & ngữ cảnh.
- **Reason** — lập kế hoạch, chọn công cụ.
- **Act** — gọi công cụ, quan sát kết quả, lặp lại đến khi xong.

Bốn thành phần: **LLM** (ra quyết định), **Công cụ** (hành động ra thế giới), **Tri thức** (truy hồi thông tin đúng), **Bộ nhớ** (giữ ngữ cảnh qua lượt). Các chặng sau sẽ mổ từng thành phần này.

## 🔍 Soi qua ví dụ
Trong `web-agent`, Orchestrator ở `main.py` chính là "bộ não" chạy vòng perceive–reason–act: nhận tin nhắn → lập kế hoạch → gọi sub-agent (công cụ) → tổng hợp. Đây là hiện thân trực tiếp của định nghĩa trên.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Đóng vai một AI Agent có mục tiêu: "lập kế hoạch một bài đăng mạng xã hội".
Hãy nói to (think-aloud) từng bước theo vòng: PERCEIVE (bạn hiểu gì về yêu cầu),
REASON (bạn định làm gì, cần "công cụ" nào), ACT (bạn làm bước đầu tiên).
Chưa cần làm hết, chỉ diễn 1 vòng để mình thấy cách agent "suy nghĩ".
```
→ **Kỳ vọng:** Claude trình bày rõ 3 giai đoạn, nêu "công cụ" giả định (vd tra xu hướng).
**Bước 3.** Hỏi: `Nếu bỏ đi phần BỘ NHỚ, agent sẽ yếu đi ở đâu?` → **Kỳ vọng:** Claude chỉ ra mất ngữ cảnh qua lượt.
**Nếu kẹt:** yêu cầu Claude "bám đúng 3 giai đoạn perceive–reason–act".

## ↪️ Chuyển giao
Khi nhận một hệ thống, hãy nhận diện 4 thành phần của nó: *LLM nào? công cụ gì? tri thức ở đâu? bộ nhớ thế nào?* — đây là "bản đồ giải phẫu" đầu tiên để hiểu và tùy biến.

> Gợi mở: *Hệ thống bạn từng dùng thiếu thành phần nào trong 4 cái trên?*

## ✅ Tự kiểm tra
1. Bốn thành phần của một agent?
2. Perceive → reason → act nghĩa là gì?
3. Agent khác chatbot ở điểm mấu chốt nào?
4. Trong web-agent, "bộ não" nằm ở đâu?

---
*Tiếp: [Nguyên tắc thiết kế agent](../29-nguyen-tac-thiet-ke-agent/README.md)*
