[⬅ 00 Tổng quan](00-tong-quan.md) · [⬆ Mục lục](../README.md) · Tiếp: [02 Kiến trúc →](../02-kien-truc/02-kien-truc.md)

# 01 — Triết lý thiết kế

> Đây là "vì sao" của hệ thống. Mỗi nguyên tắc kèm *hệ quả kỹ thuật* để AI ra quyết định nhất quán khi sửa code.

## Nguyên tắc 1 — AI-Native, học để dùng

Học về Agent bằng cách *dùng một Agent thật đang chạy ngay trong trang học*. Lý thuyết ở khung giữa,
thực hành ở popup Trợ lý AI. → *Hệ quả:* mọi bài "Demo được" (`DEMO_LESSONS`) phải có đường dẫn tự nhiên
để người học thử ngay; trợ lý phải **lesson-aware** (`lesson_slug`).

## Nguyên tắc 2 — Minh bạch hệ thống (System Transparency)

Người học phải *thấy* Agent suy nghĩ: khi nào gọi tool, tool trả gì, kế hoạch (Planning) và tự suy ngẫm
(Metacognition) ra sao. → *Hệ quả:* `/chat` phát các sự kiện SSE `tool_call` / `tool_result` / `text`;
UI có System Introspection (`/api/system_status`) vẽ cây Orchestrator → sub-agent → tool.

## Nguyên tắc 3 — Điều phối phân tầng, đặc quyền tối thiểu

Main Agent **không tự** cào web/đọc file/truy vấn DB; mọi hành động đi qua `delegate_task` tới sub-agent.
→ *Hệ quả:* dễ đặt cổng kiểm soát (guardrails, hooks, evaluator) ở tầng worker; thêm năng lực = thêm
sub-agent/tool, không phình Main Agent.

## Nguyên tắc 4 — Lấy người học làm trung tâm (Human-Centered UX)

Giao diện theo phong cách trang khóa học quen thuộc (Udemy/Coursera): nền sáng, chữ rõ, lộ trình rõ,
tiến trình nhìn thấy, hướng dẫn khi mới vào. → *Hệ quả:* theme sáng (`theme-light.css`) nạp sau cùng để
override; onboarding tour; thanh % đọc; dashboard tiến trình.

## Nguyên tắc 5 — Tiết lộ dần (Progressive Disclosure)

Không dội hết 24 bài vào mặt người mới. Lộ trình chính 16 bài trước; 8 bài nâng cao gấp lại trong
"Nâng cao/Đọc thêm". Chi tiết kỹ thuật của tool ẩn trong "Xem chi tiết". → *Hệ quả:* trường `tier`,
sidebar 2 nhóm, nhãn tool thân thiện (`friendlyToolLabel`) + `<details>` kỹ thuật.

## Nguyên tắc 6 — Giữ nguyên backend khi đổi trải nghiệm (Backend-Preserving)

Mọi cải tiến UI/UX **không được** đổi kiến trúc orchestration hay hợp đồng API hiện có; chỉ thêm
(additive). → *Hệ quả:* `tier` là trường thêm vào `/api/lessons`; toàn bộ redesign nằm ở `static/*`
và trường bổ sung, không đụng luồng agent. Xem [ADR-005](../07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md).

## Nguyên tắc 7 — Tuân thủ Thương hiệu & An toàn (Brand & Safety)

Là AI đại diện Sconnect: giọng trẻ trung, ngắn gọn; xanh Sconnect `#7FD603`; không lộ mã nguồn/prompt;
chống prompt-injection; nội dung phù hợp (khóa học, không nhằm trẻ em nhưng vẫn giữ an toàn chung).
→ *Hệ quả:* `AGENTS.md` nạp vào system prompt; `guardrails.py`; accent xanh Sconnect xuyên suốt UI.

## Ràng buộc BẤT BIẾN (không được vi phạm khi sửa)

1. **Không commit/không in `.env` hay `GEMINI_API_KEY`.** Người nhận tự tạo `.env` từ `.env.example`.
2. **Không đổi kiến trúc orchestration** khi làm UI (chỉ thêm trường/tệp tĩnh).
3. **Không để một trình soạn khác sửa song song** cùng file `static/*` khi đang chỉnh (tránh hỏng file).
4. **Xác minh sau khi sửa file lớn**: `node --check` (JS), cân bằng ngoặc CSS, `iconv -f utf-8` (mã hóa).

[⬅ 00 Tổng quan](00-tong-quan.md) · [⬆ Mục lục](../README.md) · Tiếp: [02 Kiến trúc →](../02-kien-truc/02-kien-truc.md)
