# Orchestration — Điều phối & định tuyến

> Chặng 4 · Bài 13/16 — Ghép thành hệ · Thực hành: **Antigravity** (lối lui: Claude)

---

## 🎯 Mục tiêu
- Hiểu vai của **Orchestrator**: điều phối lưu lượng, **định tuyến** việc tới đúng agent.
- Nắm nguyên tắc "điều phối chứ không ôm việc".
- Quan sát/định nghĩa một luật định tuyến.

## 📖 Lý thuyết
**Orchestration** là tầng điều khiển: nhận yêu cầu → lập kế hoạch → **định tuyến (routing)** tới sub-agent phù hợp → tổng hợp kết quả → (nếu lỗi) suy ngẫm & thử lại. Nguyên tắc: Orchestrator **chỉ điều phối**, không tự đi làm việc chuyên môn — nhờ đó dễ kiểm soát & an toàn.

## 🔍 Soi qua ví dụ
`web-agent`: Orchestrator chỉ có 3 tool (`delegate_task`, `create_execution_plan`, `think_aloud`); mọi tác vụ thật đi qua `delegate_task` tới sub-agent. Chính sách định tuyến ("hỏi thời tiết → weather_skill", "hỏi nhân sự → sql_skill"...) là phần bạn có thể tùy biến.

## 🛠️ Thực hành (từng bước)
**Trên Antigravity (khuyến nghị):**
1. Mở project multi-agent ở [bài 36].
2. Thêm một **luật định tuyến**: "yêu cầu liên quan hình ảnh → giao Agent Trình bày; liên quan chữ → Agent Nội dung".
3. Giao vài yêu cầu khác loại, quan sát điều phối đúng agent. → **Kỳ vọng:** việc chảy đúng nhánh.

**Lối lui trên Claude:**
1. Dán:
```
Bạn là Orchestrator. Bảng định tuyến:
- Hỏi số liệu → Agent Dữ liệu
- Hỏi viết lách → Agent Nội dung
- Hỏi hình ảnh → Agent Thiết kế
Với mỗi yêu cầu mình đưa, hãy nói bạn ĐỊNH TUYẾN tới agent nào và vì sao (chưa cần làm).
```
2. Đưa 3 yêu cầu khác loại. → **Kỳ vọng:** Claude định tuyến đúng + lý do.
**Nếu kẹt:** yêu cầu "chỉ định tuyến, đừng tự làm".

## ↪️ Chuyển giao
Định tuyến là "núm" quan trọng khi tùy biến: bạn **thêm/sửa luật routing** để hệ thống biết giao việc đặc thù đơn vị cho đúng agent (kể cả agent bạn mới thêm ở bài 34/36).

> Gợi mở: *Luật định tuyến nào cần thêm cho nghiệp vụ đơn vị bạn?*

## ✅ Tự kiểm tra
1. Vì sao Orchestrator "không ôm việc"?
2. Routing là gì?
3. Ba tool điều phối của web-agent?
4. Bạn tùy biến định tuyến ở đâu?

---
*Hết Chặng 4. Tiếp — Chặng 5: [Trustworthy & Guardrails](../38-trustworthy-guardrails/README.md)*
