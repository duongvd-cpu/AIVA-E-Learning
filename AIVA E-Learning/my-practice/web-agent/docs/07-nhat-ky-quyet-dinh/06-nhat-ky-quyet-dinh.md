[⬅ 05 Frontend/UX](../03-giao-dien/05-frontend-ux.md) · [⬆ Mục lục](../README.md) · Tiếp: [07 Dữ liệu & Nội dung →](../05-du-lieu-noi-dung/07-du-lieu-noi-dung.md)

# 06 — Nhật ký quyết định (Decision Log)

> ADR gốc của toàn workspace nằm ở `Sconnect_AI_Agents_Workspace_Docs/docs/decisions/`. Đây là bản tóm
> tắt các quyết định **ảnh hưởng trực tiếp tới web-agent** + các bản vá UI gần đây.

## ADR-004 — Thước đo Giữ/Lược bài học trên sidebar

Chuẩn hóa tiêu chí quyết định bài nào hiển thị nổi/bài nào gấp lại, tránh cảm tính. Là tiền đề cho việc
phân tier ở ADR-005. Trạng thái: nhập từ bộ docs khác (tham chiếu).

## ADR-005 — Redesign UX web tri thức + Onboarding (ACCEPTED)

**Bối cảnh:** người dùng thật khó dùng UI cũ (tối, 24 bài phẳng, không hướng dẫn).
**Quyết định:**
- Phân **tier** `core` (16) / `advanced` (8) — trường *additive* ở `/api/lessons`, **không đổi orchestration**.
- Sidebar 2 nhóm; **onboarding** (modal + tour + nút Hướng dẫn); **chat chế độ thân thiện** (nhãn tool dễ hiểu + gợi ý câu hỏi).
- **Theme sáng** kiểu Udemy/Coursera (`theme-light.css` nạp cuối), accent xanh Sconnect.
- Polish giàu tính education: card nổi, **% đọc/bài**, icon Tabler, animation, dashboard tiến trình.
**Ràng buộc:** giữ nguyên backend; mọi thay đổi ở `static/*` + trường bổ sung.

## Các bản vá UI sau ADR-005 (thời điểm 03/07/2026)

| Vấn đề | Quyết định | Tệp |
| :-- | :-- | :-- |
| Trợ lý AI chiếm cột cố định | Chuyển thành **popup nổi kiểu Gemini** (FAB + widget) + toggle bật/tắt | `index.html`, `widget.js`, `theme-light.css` |
| Không cuộn được, translations rỗng trong gói share | Fix chiều cao `.lesson-content-wrapper` (100% + overflow) ; copy đủ `translations/vi` | `theme-light.css`, gói share |
| Mục lục (ToC) chiếm nửa màn trên, nhiều khoảng trống | ToC thành **thanh sticky bên phải**, ghép với nội dung thành cụm căn giữa cân đối | `theme-light.css` |
| Chọn bài chữ bị mờ | Override màu chữ theme sáng: thường xám đậm, **đang chọn = xanh Sconnect in đậm** | `theme-light.css` |
| Khoảng trống trái quá rộng | Cân lại: nội dung + ToC = 1 cụm căn giữa (≥1401px); màn hẹp căn giữa gọn | `theme-light.css` |
| Bật "Hướng dẫn" như không hiện gì | Thêm **nền mờ spotlight** + vùng sáng nổi bật; mỗi bước tự chọn phần tử đang hiển thị (bong bóng ẩn → dùng nút navbar) | `onboarding.js`, `theme-light.css` |

## Bài học vận hành (rút ra khi làm)

- Công cụ ghi file lớn có lúc **cắt cụt đuôi file** → chuyển sang **bash heredoc / thay chuỗi Python**, luôn `node --check` + kiểm mã hóa sau khi ghi.
- **Xung đột sửa song song** (IDE agent khác cùng sửa `static/*`) gây hỏng file → chỉ một nơi được sửa tại một thời điểm.
- Cổng bị nhầm với dự án khác trên máy (Laragon) → đổi cổng **3000 → 8899**.

[⬅ 05 Frontend/UX](../03-giao-dien/05-frontend-ux.md) · [⬆ Mục lục](../README.md) · Tiếp: [07 Dữ liệu & Nội dung →](../05-du-lieu-noi-dung/07-du-lieu-noi-dung.md)

---

## ADR-006 — Trợ lý mặc định gắn cạnh + Tóm tắt bài học + Hỏi AI theo đoạn chọn

**Ngày:** 03/07/2026 · **Trạng thái:** Đã áp dụng

**Bối cảnh.** Người học phản hồi: (1) khung chat trước đây là bong bóng đóng sẵn nên ít dùng để
trao đổi trực tiếp về bài; (2) tài liệu dài, khó nắm ý nhanh; (3) mong có cách hỏi nhanh về một
đoạn cụ thể đang đọc.

**Quyết định.**
1. **Trợ lý gắn cạnh, mở mặc định** trên desktop (docked panel), giữ bong bóng nổi trên màn hình
   hẹp. Chi tiết: [05a](../03-giao-dien/05a-tro-ly-ai-docked.md).
2. **Tính năng "Tóm tắt nhanh"** mỗi bài, dùng endpoint `/api/lessons/{slug}/summary` gọi Gemini.
   Chi tiết: [05b](../03-giao-dien/05b-tinh-nang-tom-tat.md).
3. **Chuẩn hóa & tô đậm tính năng "Hỏi AI" khi bôi đen** (đã có từ ADR-005), đổi nhãn nút thành
   "Hỏi AI". Chi tiết: [05c](../03-giao-dien/05c-hoi-ai-boi-den.md).

**Nguyên tắc.** Tất cả **cộng thêm (additive)**: 1 endpoint mới + 2 file tĩnh mới
(`assistant-dock.css`, `assistant-plus.js`) + sửa nhẹ `widget.js`, `index.html`. **Không** đổi
orchestration, skills, hay nội dung bài học.

**Hệ quả.**
- `gemini-2.0-flash` bị Google ngừng (01/06/2026) → chuyển mặc định sang `gemini-2.5-flash`
  trong `.env` và `main.py`. Áp dụng cho **cả** chat lẫn tóm tắt.
- Cần khởi động lại server sau khi đổi `.env` (đọc lúc khởi động).

## Tinh chỉnh 07/07/2026 (sau ADR-006)

| Vấn đề | Quyết định | Tệp |
| :-- | :-- | :-- |
| Nút "Thực hành" mới điền sẵn, phải nhấn Enter | **Tự gửi** câu luyện tập ngay khi bấm (đúng tinh thần thực hành ngay) | `static/assistant-plus.js` (submitChat/startPractice) |
| Mermaid mindmap đôi khi lỗi cú pháp do LLM | Thêm **fallback flowchart**: mindmap lỗi → dựng `graph TD` theo mức thụt lề rồi render lại; vẫn giữ nút Tạo lại + xem mã gốc | `static/assistant-plus.js`, [05d](../03-giao-dien/05d-so-do-tu-duy.md) |

