# Multi-Agent — Nhiều agent phối hợp

> Chặng 4 · Bài 12/16 — Ghép thành hệ · Thực hành: **Antigravity** (lối lui: Claude)

---

## 🎯 Mục tiêu
- Hiểu mô hình **nhiều agent phối hợp** và khái niệm **handoff** (chuyển việc).
- Phân biệt "một agent ôm tất cả" vs "nhiều agent chuyên trách".
- Quan sát nhiều agent chia việc trên Antigravity (hoặc mô phỏng trên Claude).

## 📖 Lý thuyết
Thay vì một agent làm mọi thứ, ta chia thành **nhiều agent chuyên trách** phối hợp — mỗi agent giỏi một mảng, **handoff** việc cho nhau. Lợi ích: trách nhiệm rạch ròi, dễ kiểm soát, dễ mở rộng. Mẫu phổ biến: **Orchestrator–Worker** (một điều phối, nhiều thợ).

## 🔍 Soi qua ví dụ
`web-agent` là Orchestrator–Worker: `main.py` điều phối; `execute_sub_agent` khởi tạo từng sub-agent chuyên trách (rag, sql, research...); `ask_researcher_agent` là ví dụ **handoff** cho một LLM chuyên sâu.

## 🛠️ Thực hành (từng bước)
**Trên Antigravity (khuyến nghị):**
1. Mở Antigravity, tạo project trống.
2. Giao mục tiêu: *"Tạo trang tĩnh giới thiệu 3 dịch vụ"* và yêu cầu **chia cho nhiều sub-agent** (một lo nội dung, một lo HTML/CSS).
3. Quan sát bảng tiến trình: các agent chạy song song, sửa file, báo cáo. → **Kỳ vọng:** thấy công việc được *chia và ghép* lại.

**Lối lui trên Claude (nếu chưa có Antigravity):**
1. Dán: `Đóng vai 2 agent: "Agent Nội dung" và "Agent Trình bày". Mình giao 1 nhiệm vụ, hãy cho 2 agent lần lượt làm phần của mình và HANDOFF cho nhau.`
2. Giao: `Làm 1 đoạn giới thiệu 3 dịch vụ + gợi ý bố cục trình bày.` → **Kỳ vọng:** thấy 2 vai tách bạch + handoff.

**Nếu kẹt:** yêu cầu nêu rõ "ai làm gì, chuyển giao ở bước nào".

## ↪️ Chuyển giao
Hệ thống đưa xuống thường là multi-agent. Hiểu mô hình này giúp bạn biết **thêm một agent chuyên trách cho đơn vị** (vd "Agent nghiệp vụ phòng X") và cắm vào luồng phối hợp có sẵn.

> Gợi mở: *Đơn vị bạn cần thêm "agent chuyên trách" nào?*

## ✅ Tự kiểm tra
1. Vì sao chia nhiều agent chuyên trách tốt hơn một agent ôm tất cả?
2. "Handoff" là gì?
3. Mẫu Orchestrator–Worker hoạt động ra sao?
4. Trong web-agent, đâu là ví dụ handoff?

---
*Tiếp: [Orchestration](../37-orchestration/README.md)*
