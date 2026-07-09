# 🌿 20 — Nguyên tắc (Hợp đồng vận hành cho AI)

> Cành. Luật hành xử cho **AI partner** khi làm việc trong workspace này. Bản rút gọn: [`AGENTS.md`](../../AGENTS.md) ở gốc gói.

## Phân biệt 3 loại luật (đừng nhầm)

- **(A) Nguyên tắc thiết kế** — *vì sao* xây thế → [00-philosophy](../00-philosophy/README.md).
- **(B) Luật runtime của web-agent** — retry ≤3, brand voice, routing → `my-practice/web-agent/docs/`.
- **(C) Luật cho AI partner (phần này)** — cách hành xử khi làm việc trong repo.

## 10 luật cốt lõi (loại C)

1. **Code là chuẩn** — đối chiếu `my-practice/web-agent/` trước khi khẳng định; trích file/hàm làm bằng chứng.
2. **Hỏi trước khi phá huỷ** — xoá/ghi đè/thao tác không hoàn tác phải xin xác nhận.
3. **Tôn trọng vùng** — không đụng `venv/`, `data/chroma_db/`, `.git/`, ảnh; không đọc/in `.env`.
4. **Giữ đồng bộ** — sửa code thì cập nhật `docs/` + `web-agent/docs/` liên quan cùng lần.
5. **Cập nhật bản đồ** — thêm/xoá file thì sửa [30-structure](../30-structure/README.md).
6. **Gắn nhãn nguồn gốc** — `[OBSERVED]` (từ code) vs `[PROPOSED]` (đề xuất).
7. **Không lộ bí mật** — che secrets dạng `{REDACTED}`; key chỉ ở `.env` cục bộ.
8. **Theo quy ước đặt tên** — xem [30-structure](../30-structure/README.md).
9. **Ghi nợ kỹ thuật** — phát hiện lỗi/nợ → thêm `DEBT-NN` vào [60-lessons](../60-lessons/README.md).
10. **Tuân org rules** — COPPA (nội dung trẻ em/Wolfoo), bảo vệ IP, mask PII, ngôn ngữ VN + thuật ngữ EN.

## Source of Truth (khi mâu thuẫn)

`code` > `docs/` (này) > `web-agent/docs/` > `.docx` (snapshot cũ).

> Ràng buộc tổ chức Sconnect ưu tiên cao nhất, không thể ghi đè. Không chắc về tuân thủ → từ chối + giải thích + đề nghị leo thang.

→ Tiếp: [30-structure](../30-structure/README.md).
