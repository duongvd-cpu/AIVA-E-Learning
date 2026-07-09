# Agent Memory — Agent biết ghi nhớ

> Chặng 3 · Bài 8/16 — Thành phần lõi · Thực hành: **Claude**

---

## 🎯 Mục tiêu
- Phân biệt **bộ nhớ ngắn hạn** (trong phiên) và **dài hạn** (qua phiên).
- Hiểu vì sao bộ nhớ giúp agent cá nhân hóa và nhất quán.
- Tự dựng một cơ chế "ghi/đọc bộ nhớ" thủ công trên Claude.

## 📖 Lý thuyết
- **Ngắn hạn:** ngữ cảnh cuộc hội thoại hiện tại (lịch sử tin nhắn).
- **Dài hạn:** thông tin lưu lại để dùng ở các phiên sau (sở thích, dữ kiện về người dùng), thường dạng key–value.
Bộ nhớ biến agent từ "hỏi đâu quên đó" thành "nhớ bạn là ai, thích gì" → phản hồi cá nhân hóa và nhất quán.

## 🔍 Soi qua ví dụ
`web-agent` có `skills/memory_skill.py` với `save_to_memory`/`read_from_memory`, lưu vào `data/long_term_memory.json` (key–value phẳng, vd `{"user_name":"Hoàng"}`), và nạp lại vào System Prompt mỗi phiên.

## 🛠️ Thực hành (từng bước, trên Claude)
**Bước 1.** Mở Claude.
**Bước 2.** Dán:
```
Bạn là agent có "bộ nhớ dài hạn" dạng JSON. Bắt đầu rỗng: {}.
Luật: khi mình cung cấp thông tin cá nhân, hãy cập nhật JSON và in ra.
Khi mình hỏi, trả lời DỰA TRÊN JSON đó.
```
**Bước 3.** Gõ `Mình tên Dương, phụ trách nội dung kênh Wolfoo.` → **Kỳ vọng:** Claude in JSON `{"ten":"Dương","vai_tro":"nội dung Wolfoo"}`.
**Bước 4.** Gõ `Gợi ý cho mình 1 việc nên làm hôm nay.` → **Kỳ vọng:** gợi ý bám vai trò đã nhớ.
**Bước 5.** Gõ `Mình vừa nói mình tên gì?` → **Kỳ vọng:** trả lời đúng từ bộ nhớ.
**Nếu kẹt:** Claude không cập nhật JSON → nhắc "in lại JSON sau mỗi lần cập nhật".

## ↪️ Chuyển giao
Khi tùy biến, bộ nhớ là nơi bạn quyết định **agent nên nhớ gì về người dùng đơn vị** (và không nên nhớ gì — lưu ý PII/bảo mật). Hiểu memory = kiểm soát tính cá nhân hóa an toàn.

> Gợi mở: *Thông tin nào đáng cho agent nhớ, thông tin nào tuyệt đối không lưu?*

## ✅ Tự kiểm tra
1. Khác nhau giữa bộ nhớ ngắn hạn và dài hạn?
2. Vì sao bộ nhớ giúp cá nhân hóa?
3. Web-agent lưu bộ nhớ dài hạn ở file nào?
4. Rủi ro cần lưu ý khi cho agent "nhớ" là gì?

---
*Tiếp: [Context Engineering](../33-context-engineering/README.md)*
