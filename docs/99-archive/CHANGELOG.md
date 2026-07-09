⬆ 99 Archive · Bản đồ tài liệu

# CHANGELOG — Bộ tài liệu Sconnect AI Agents

> Lịch sử phiên bản của **bộ tài liệu** (không phải của web-agent). Ngày theo DD/MM/YYYY.

## v2.3 — 06/07/2026
- **Tái đánh số & đổi tên 12 folder** theo layout mới: thêm `00-Gioi-thieu`; `Hop-dong-van-hanh-AI` chuyển về **10**, `Kien-truc-Tech` **11**, `Hoc-lieu-AI` **12**; các phần còn lại dịch số tương ứng. Đổi tên sang Title-Case.
- Cập nhật toàn bộ link nội bộ, nhãn số tham chiếu `[NN.x]`, heading và breadcrumb theo thứ tự mới (0 link gãy).

## v2.7 — 03/07/2026
- **Polish UI giàu tính education** (trong ADR-005): card bo góc + đổ bóng nổi, hover-lift; **thanh % đọc từng bài** (`static/enhance.js`, lưu localStorage theo scroll); khu đọc bài **nền trắng, rộng & thoáng hơn** (sidebar gọn 186px, cột đọc max 820px); animation fade-in nội dung, pop badge; **icon Tabler** (webfont CDN) + **toast động viên** khi đọc nửa/xong bài.

## v2.6 — 03/07/2026
- **Theme sáng kiểu Udemy/Coursera** cho web-agent: thêm `static/theme-light.css` (nền trắng, chữ đậm rõ, accent Sconnect green) nạp sau cùng để override dark theme; đổi highlight.js sang theme sáng (github). Thuộc phạm vi ADR-005.

## v2.5 — 03/07/2026
- **ADR-005 → ACCEPTED & triển khai code** trong `my-practice/web-agent/`: sidebar chia Lộ trình chính 16 / Nâng cao 8 (backend `tier`), onboarding (modal + tour 5 bước + nút Hướng dẫn), chat chế độ thân thiện, gợi ý câu hỏi nổi bật. Backend giữ nguyên kiến trúc.

## v2.4 — 03/07/2026
- Thêm **ADR-005** (Redesign UX web tri thức + Onboarding): chốt tier map 16 core / 8 advanced, đổi UI/UX cho người dùng thật, đặc tả onboarding, backend additive `tier`. Trạng thái PROPOSED (chờ duyệt để code).

## v2.3 — 03/07/2026
- Thêm Decisions (ADR): nhật ký quyết định kiến trúc, nhập **ADR-004** (Thước đo Giữ/Lược bài học sidebar, trạng thái PROPOSED) từ bộ docs khác, chuẩn hoá cross-ref.

## v2.2 — 02/07/2026
- Thêm 11 Kiến trúc kỹ thuật: **chuyển `kien-truc-tech/` vào trong `docs/`** (trước đây là folder ngang hàng) theo feedback.
- Thêm 12 Học liệu cho AI: lộ trình onboard, mô hình tư duy, lỗi thường gặp, self-check.
- Thêm 99 Archive + CHANGELOG này; **dời bản `.docx v1.1`** cũ từ gốc repo vào archive.

## v2.1 — 02/07/2026
- **F1:** viết lại bản đồ cây thư mục thành 2 tầng (repo territory + gói tài liệu) cho khớp thực tế sau khi gộp bundle.
- **F2:** khử trùng — cơ chế ChromaDB gom về `10-kien-truc-tech/05`; bảng "3 loại luật" canonical ở `01-triet-ly`.
- **F3:** đổi tên `04-hop-dong-van-hanh-AI` → `04-hop-dong-van-hanh-ai` (nhất quán kebab-thường).

## v2.0 — 02/07/2026
- **Tái cấu trúc lớn** theo phản hồi review: chuyển từ file phẳng sang **folder-per-section**.
- Tách *bản đồ workspace* (điều hướng) khỏi *kiến trúc tech*.
- Nâng "Hợp đồng vận hành cho AI" thành phần trung tâm; phân biệt 3 loại luật A/B/C.
- Sắp xếp gốc → cành; chuẩn hoá "Nợ kỹ thuật" thành debt register.
- Thêm `AGENTS.md` gốc gói; gộp toàn bộ vào một folder `Sconnect_AI_Agents_Workspace_Docs/`.

## v1.1 — 01/07/2026
- Thêm "Phần 9 — Hợp đồng vận hành cho AI" (routing, I/O, capability manifest, non-goals, provenance, luật verbatim, schema).
- Đính chính mục 8.4 (thêm điểm lệch model mặc định `gemini-1.5-flash`).
- Xuất bản `.docx` v1.1 (cấu trúc phẳng, 9 phần) — nay lưu trong archive.

## v1.0 — 01/07/2026
- Bản `.docx` đầu tiên: tài liệu tổng thể 8 phần (Triết lý · Bài học · Playbook · Chiến lược…), cấu trúc phẳng.

---
⬆ 99 Archive · Bản đồ tài liệu
