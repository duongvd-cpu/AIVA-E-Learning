⬆ Decisions · Bản đồ tài liệu

> **Ghi chú nhập bản:** ADR này được nhập từ một bộ docs khác (scheme `00-philosophy`/`10-purpose`/`INDEX.md`). Các cross-ref đã được **chuẩn hoá sang bộ tài liệu hiện tại**. Nội dung, trạng thái (PROPOSED) và 2 điểm mở được **giữ nguyên**. Nhãn nguồn gốc: [PROPOSED].

# ADR-004 — Thước đo Giữ/Lược bài học (sidebar khóa học)

> Trạng thái: **PROPOSED** (chờ Dương chốt 2 điểm mở ở cuối) · Ngày: 02/07/2026 · Persona: STRATEGIST
> Liên quan: 02 Triết lý · 01 Tổng quan (mục tiêu) · 06 Bài học (mapping)

## Bối cảnh

Website (`localhost:3000`) **không phải** một hệ thống để tùy biến, mà là **tri thức nền / nền tảng năng lực**: nhân sự Sconnect học ở đây để đủ sức **tiếp nhận và tự tùy biến các hệ thống mà công ty + team AI đưa xuống** theo đặc trưng đơn vị (được tùy biến tới tận code: thêm sub-agent/skill, sửa logic).

Vấn đề: 24 bài trong sidebar hiện **vượt mức** so với mục tiêu — nhiều bài là chủ đề chuyên gia/vận hành, không phải kiến thức chuyển giao cần thiết.

## Quyết định — Thước đo giữ/lược

**Câu hỏi lõi cho mỗi bài:**

> "Bài này có cần để nhân sự (a) hiểu một hệ agent gồm gì, và (b) đủ sức tiếp nhận & tùy biến hệ thống được đưa xuống không — hay là chủ đề chuyên sâu vượt mục tiêu?"

**3 phép thử phụ khi lưỡng lự:**

1. **Tính chuyển giao** — áp được sang hệ thống khác (khái niệm/phương pháp) hay chỉ đúng với demo này?
2. **Đúng người đọc** — viết cho *người học tiếp nhận hệ thống*, hay cho *người bảo trì demo / lãnh đạo*?
3. **Chi phí lỗi thời** — mau cũ, tốn công cập nhật, không phải kiến thức nền → lược.

**Hai nguyên tắc áp dụng:**

- **Xét theo từng bài, không theo module** — bài "nâng cao" vẫn có thể là trọng tâm tùy biến (vd 09, 16); bài "cơ bản" vẫn có thể chỉ cần lướt.
- **Lược ≠ xóa** — bài vượt mức chuyển sang nhánh **"Nâng cao / Đọc thêm"** (ẩn khỏi lộ trình chính, vẫn xem được), không xóa.

## Phân loại 24 bài

### GIỮ — nền tảng bắt buộc
| # | Bài | Lý do |
|---|-----|-------|
| 01 | Thiết lập Khóa học | Vào cuộc |
| 02 | Giới thiệu AI Agents & Use Cases | Mô hình tư duy nền tảng |
| 04 | Nguyên tắc thiết kế Agent | Khung tư duy khi tiếp nhận hệ thống |
| 05 | Tool Use | "Núm" tùy biến trực tiếp |
| 06 | Agentic RAG | Núm tùy biến tri thức |
| 07 | Context Engineering | Cốt lõi vận hành agent |
| 08 | Agent Memory | Núm tùy biến bộ nhớ |
| 09 | Agent Skills | **Trọng tâm tùy biến** (đóng gói năng lực) |
| 13 | Multi-Agent | Hiểu cấu trúc hệ nhiều agent |
| 14 | Agent Orchestration | Hiểu cách điều phối/định tuyến |

### CÂN NHẮC — tùy độ sâu đơn vị (giữ nhưng có thể gọn / để "đọc thêm")
| # | Bài | Ghi chú |
|---|-----|---------|
| 03 | Explore Agentic Frameworks | Khảo sát; gọn được |
| 10 | Computer/Browser Use | Hữu ích tùy nhu cầu |
| 11 | Planning Design | Khái niệm tốt, có demo |
| 12 | Metacognition | Nâng chất lượng, không bắt buộc |
| 16 | Workspace Context Handbook | **Đúng trọng tâm tùy biến** — nên nghiêng GIỮ |
| 18 | Trustworthy Agents | Nền an toàn cơ bản |

### LƯỢC — chuyên sâu vượt mục tiêu (chuyển "Nâng cao / Đọc thêm")
| # | Bài | Lý do |
|---|-----|-------|
| 15 | Context Memory Architecture | Kiến trúc chuyên sâu |
| 17 | Context Assembly / Routing | Chuyên sâu |
| 19 | Securing w/ Cryptographic Receipts | Chuyên gia bảo mật |
| 20 | Lifecycle & Hooks | Vận hành nội bộ |
| 21 | Monitoring & LLM-as-a-Judge | Giám sát/vận hành |
| 22 | AI Agents in Production | Vận hành production |
| 23 | Agentic Protocols (MCP/A2A/NLWeb) | Giao thức nâng cao |
| 24 | Microsoft Agent Framework | Chuyên sâu framework cụ thể |

**Tóm tắt:** GIỮ 10 · CÂN NHẮC 6 · LƯỢC 8.

## Hệ quả

- Lộ trình chính cho nhân sự phổ thông gọn còn ~10–16 bài, tập trung vào *hiểu + tùy biến*.
- Bổ sung (đề xuất, ngoài phạm vi ADR này): một mạch **"cách tiếp nhận & tùy biến một hệ thống bất kỳ"** — năng lực chuyển giao hiện còn thiếu trong cả 4 bản docs.

## Điểm mở — chờ Dương chốt

1. **Rổ phân loại** đã đúng khẩu vị chưa? Bài nào cần kéo từ LƯỢC về GIỮ (hoặc ngược lại)?
2. **Xử lý rổ LƯỢC:** ẩn sang "Nâng cao / Đọc thêm" (mặc định đề xuất — không phá hủy) hay bỏ hẳn khỏi bản phát hành?

*(Sau khi chốt → cập nhật trạng thái ACCEPTED và phản ánh vào sidebar/`COURSE_MODULES`.)*

---
⬆ Decisions · Bản đồ tài liệu
