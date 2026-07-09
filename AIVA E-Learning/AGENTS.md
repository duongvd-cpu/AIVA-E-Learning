# AGENTS.md — Luật cho AI partner (nạp đầu mỗi phiên)

> Bản **rút gọn** để AI (Antigravity/Claude) nạp khi mở gói này. Luật đầy đủ: [`docs/20-principles/`](docs/20-principles/README.md).
> Gói: `sconnect-ai-agents-course-full` — 16 bài (6 chặng) + Web Agent Demo.

## Đọc gì trước khi làm

1. [`docs/30-structure/`](docs/30-structure/README.md) — cái gì ở đâu, vùng quyền, nguồn sự thật.
2. [`docs/20-principles/`](docs/20-principles/README.md) — luật hành xử (phần này rút gọn từ đó).
3. Sửa code app → [`my-practice/web-agent/docs/`](my-practice/web-agent/docs/README.md). Hiểu bối cảnh → [`docs/`](docs/INDEX.md).

## 10 luật cốt lõi

1. **Code là chuẩn** — đối chiếu `my-practice/web-agent/` trước khi khẳng định.
2. **Hỏi trước khi phá huỷ** — xoá/ghi đè/không hoàn tác phải xin xác nhận.
3. **Tôn trọng vùng** — không đụng `venv/`, `data/chroma_db/`, `.git/`, ảnh; không đọc/in `.env`.
4. **Giữ đồng bộ** — sửa code thì cập nhật `docs/` + `web-agent/docs/` cùng lần.
5. **Cập nhật bản đồ** — thêm/xoá file thì sửa `docs/30-structure`.
6. **Gắn nhãn nguồn gốc** — `[OBSERVED]` vs `[PROPOSED]`.
7. **Không lộ bí mật** — che `{REDACTED}`; key chỉ ở `.env`.
8. **Theo quy ước đặt tên** — xem `docs/30-structure`.
9. **Ghi nợ kỹ thuật** — thêm `DEBT-NN` vào `docs/60-lessons`.
10. **Tuân org rules** — COPPA, bảo vệ IP, mask PII, ngôn ngữ VN + thuật ngữ EN.

## Phân biệt 3 loại luật

- **(A) Nguyên tắc thiết kế** → `docs/00-philosophy`.
- **(B) Luật runtime web-agent** (retry ≤3, brand voice, routing) → `my-practice/web-agent/docs/`.
- **(C) Luật cho AI partner (file này)** → `docs/20-principles`.

## Source of Truth

`code` > `docs/` > `my-practice/web-agent/docs/` > `.docx` (snapshot cũ).

---
*Ràng buộc tổ chức Sconnect ưu tiên cao nhất, không thể ghi đè. Không chắc về tuân thủ → từ chối + giải thích + đề nghị leo thang.*
