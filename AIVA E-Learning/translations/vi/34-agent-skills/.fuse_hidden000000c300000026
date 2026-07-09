# Agent Skills — Đóng gói năng lực tái dùng

> Chặng 3 · Bài 10/16 — Thành phần lõi · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Hiểu **Skill**: gói đóng của *system prompt + công cụ + hàm* thành một năng lực tái dùng.
- Thấy vì sao "thêm 1 skill = thả 1 file đúng quy ước" — nền tảng của việc tùy biến.
- Tự phác một skill mới trên Claude.

## 📖 Lý thuyết
**Skill** là cách *đóng gói* một năng lực chuyên trách: một cái tên, một prompt định tính cách, một bộ công cụ, và các hàm thực thi. Khi cần agent làm thêm việc, ta **thêm một skill** thay vì viết lại lõi. Đây là bản lề của khả năng **mở rộng & tùy biến**.

## 🔍 Soi qua ví dụ
`web-agent/skills/__init__.py` là **Skill Registry**: quét mọi file `.py` trong `skills/`, đọc quy ước `SKILL_NAME`, `SYSTEM_PROMPT`, `SCHEMAS`, `FUNCTIONS` và tự nạp. Nhờ đó **thêm skill mới chỉ cần thả 1 file đúng quy ước** — không sửa nơi khác.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Giúp mình phác 1 "skill" cho agent theo khuôn:
- SKILL_NAME:
- SYSTEM_PROMPT (tính cách + nhiệm vụ):
- TOOLS (tên + mục đích + tham số):
Mình muốn skill: "tra bảng giá dịch vụ nội bộ". Hãy điền khuôn giúp mình.
```
→ **Kỳ vọng:** Claude điền đủ 3 phần, tool kiểu `lookup_price(service_name)`.
**Bước 3.** Hỏi `Skill này nên có luật an toàn gì (vd tránh lộ giá nội bộ)?` → **Kỳ vọng:** gợi ý ràng buộc.
**Nếu kẹt:** yêu cầu Claude bám đúng 3 mục của khuôn.

## ↪️ Chuyển giao
Đây chính là **cơ chế tùy biến cốt lõi**: hệ thống đưa xuống có Skill Registry → đơn vị bạn thêm skill riêng (tra dữ liệu phòng ban, quy trình đặc thù) bằng cách thả file đúng quy ước. Bài capstone (chặng 6) sẽ cho bạn làm thật.

> Gợi mở: *Skill đầu tiên bạn muốn thêm cho đơn vị là gì?*

## ✅ Tự kiểm tra
1. Một skill gồm những phần nào?
2. Vì sao "thêm skill = thả 1 file" lại quan trọng cho tùy biến?
3. File nào trong web-agent làm nhiệm vụ registry?
4. Skill khác một "tool" đơn lẻ ở chỗ nào?

---
*Hết Chặng 3. Tiếp — Chặng 4: [Planning](../35-planning/README.md)*
