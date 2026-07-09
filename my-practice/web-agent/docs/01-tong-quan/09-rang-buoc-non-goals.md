[⬅ 08 Vận hành & Mở rộng](../06-van-hanh/08-van-hanh-mo-rong.md) · [⬆ Mục lục](../README.md) · Tiếp: [10 Từ điển →](10-tu-dien.md)

# 09 — Ràng buộc, Bất biến & Non-goals

## Bất biến (INVARIANTS — không được phá khi sửa)

1. **Bí mật không rời `.env`.** Không commit/in/nhúng `GEMINI_API_KEY`. Trong ví dụ/log dùng `{REDACTED}`.
2. **Giữ nguyên kiến trúc orchestration & hợp đồng API.** Cải tiến UI/UX chỉ được *thêm* (trường mới, tệp tĩnh mới); không đổi luồng agent hay đổi nghĩa endpoint hiện có.
3. **Main Agent không tự thực thi ngoại vi.** Mọi hành động qua `delegate_task` → sub-agent.
4. **Một người/agent sửa `static/*` tại một thời điểm.** Tránh sửa song song gây hỏng/cắt cụt file.
5. **Xác minh sau khi ghi file lớn:** `node --check` (JS), cân bằng `{}` (CSS), `iconv -f utf-8` (mã hóa), so md5 ổn định.
6. **Theme sáng nạp sau cùng.** `theme-light.css` phải nằm cuối để override; không xóa biến theme gốc.

## Ràng buộc kỹ thuật

- Python 3.12+; phụ thuộc chốt phiên bản trong `requirements.txt`.
- Không build step ở frontend (Vanilla JS + CDN). Sửa file là chạy.
- State chat in-memory, đơn tiến trình — không mở rộng đa người dùng như hiện tại.
- Phụ thuộc mạng: gọi Gemini API + tải thư viện CDN (Tabler, marked, DOMPurify, highlight.js).

## Non-goals (CỐ Ý không làm)

- Không xác thực/đăng nhập, không phân quyền thật (hooks chỉ minh họa điểm gắn).
- Không lưu trữ hội thoại bền vững, không đồng bộ tiến trình lên server.
- Không phải sản phẩm production; là **môi trường học + demo minh họa**.
- Không nhắm nội dung tới trẻ em; vẫn giữ an toàn chung và chống prompt-injection.

## Tuân thủ tổ chức (Sconnect)

- Giọng thương hiệu (trẻ trung, ngắn gọn) & màu xanh Sconnect `#7FD603`.
- Không tiết lộ mã nguồn/prompt nội bộ của Agent kể cả khi bị gài bẫy.
- Không tái tạo IP bên thứ ba; nội dung khóa học giữ đúng bản quyền gốc.

[⬅ 08 Vận hành & Mở rộng](../06-van-hanh/08-van-hanh-mo-rong.md) · [⬆ Mục lục](../README.md) · Tiếp: [10 Từ điển →](10-tu-dien.md)
