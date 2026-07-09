# Bộ tài liệu Hệ thống — Web Agent Learning Hub

> **Đối tượng đọc: AI (máy đọc trước, người đọc sau).** Tài liệu mô tả toàn bộ hệ thống ứng dụng
> *Web Agent Learning Hub* — vừa là **môi trường học** khóa "AI Agents for Beginners", vừa là
> **AI Assistant mẫu** minh họa các bài học (Tool Use → Planning → Metacognition → Memory → Security).
> Ngày theo DD/MM/YYYY. Không chứa bí mật (API key nằm ở `.env`, không bao giờ đưa vào tài liệu).

## Cách một AI nên đọc bộ này

1. Đọc [00 — Tổng quan & Capability Manifest](01-tong-quan/00-tong-quan.md) để biết hệ thống *làm được gì / không làm gì*.
2. Đọc [01 — Triết lý thiết kế](01-tong-quan/01-triet-ly.md) để hiểu *vì sao* hệ thống được dựng như vậy.
3. Cần hành động trên code → nhảy tới: [02 Kiến trúc](02-kien-truc/02-kien-truc.md), [03 Orchestration](02-kien-truc/03-agent-orchestration.md), [04 API](04-api/04-api-hop-dong.md), [05 Frontend/UX](03-giao-dien/05-frontend-ux.md).
4. Trước khi sửa → đọc [09 Ràng buộc & Non-goals](01-tong-quan/09-rang-buoc-non-goals.md) và [06 Nhật ký quyết định](07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md).

## Bản đồ tài liệu (theo thư mục)

Tài liệu được chia thành các **thư mục con theo chủ đề**. Số thứ tự file giữ nguyên để tiện tra cứu.

### 📂 01-tong-quan — Tổng quan & Nền tảng
| File | Nội dung |
| :-- | :-- |
| [00-tong-quan.md](01-tong-quan/00-tong-quan.md) | Hệ thống là gì, thành phần, capability manifest (làm được / không làm được) |
| [01-triet-ly.md](01-tong-quan/01-triet-ly.md) | 7 nguyên tắc thiết kế + ràng buộc bất biến |
| [09-rang-buoc-non-goals.md](01-tong-quan/09-rang-buoc-non-goals.md) | Ràng buộc, bất biến, non-goals |
| [10-tu-dien.md](01-tong-quan/10-tu-dien.md) | Từ điển thuật ngữ |

### 📂 02-kien-truc — Kiến trúc & Agent
| File | Nội dung |
| :-- | :-- |
| [02-kien-truc.md](02-kien-truc/02-kien-truc.md) | Kiến trúc backend + frontend, luồng dữ liệu, bản đồ file |
| [03-agent-orchestration.md](02-kien-truc/03-agent-orchestration.md) | Orchestrator + 7 sub-agent + tools + KB + guardrails/hooks/judge |

### 📂 03-giao-dien — Giao diện & Trải nghiệm học
| File | Nội dung |
| :-- | :-- |
| [05-frontend-ux.md](03-giao-dien/05-frontend-ux.md) | Hệ thống giao diện: module JS, theme, layout, onboarding |
| [05a-tro-ly-ai-docked.md](03-giao-dien/05a-tro-ly-ai-docked.md) | ✨ Trợ lý AI gắn cạnh (docked), mở mặc định trên desktop |
| [05b-tinh-nang-tom-tat.md](03-giao-dien/05b-tinh-nang-tom-tat.md) | ✨ Tính năng "Tóm tắt nhanh" bài học (AI) |
| [05c-hoi-ai-boi-den.md](03-giao-dien/05c-hoi-ai-boi-den.md) | ✨ Nút "Hỏi AI" khi bôi đen đoạn kiến thức |
| [05d-so-do-tu-duy.md](03-giao-dien/05d-so-do-tu-duy.md) | ✨ Tính năng "Sơ đồ tư duy" (Mermaid mindmap + fallback flowchart) |

### 📂 04-api — Hợp đồng API
| File | Nội dung |
| :-- | :-- |
| [04-api-hop-dong.md](04-api/04-api-hop-dong.md) | Endpoint, I/O schema, sự kiện SSE, endpoint tóm tắt |

### 📂 05-du-lieu-noi-dung — Dữ liệu & Nội dung
| File | Nội dung |
| :-- | :-- |
| [07-du-lieu-noi-dung.md](05-du-lieu-noi-dung/07-du-lieu-noi-dung.md) | Bài học, tier map, KB, database |

### 📂 06-van-hanh — Vận hành & Mở rộng
| File | Nội dung |
| :-- | :-- |
| [08-van-hanh-mo-rong.md](06-van-hanh/08-van-hanh-mo-rong.md) | Cách chạy, cấu hình (kể cả đổi model), và mở rộng (thêm bài/agent/tool) |

### 📂 07-nhat-ky-quyet-dinh — Nhật ký quyết định (ADR)
| File | Nội dung |
| :-- | :-- |
| [06-nhat-ky-quyet-dinh.md](07-nhat-ky-quyet-dinh/06-nhat-ky-quyet-dinh.md) | ADR-004, ADR-005, ADR-006 (3 tính năng mới) + các bản vá UI |

## Nguồn sự thật (Single Source of Truth)

- **Hành vi Agent:** `main.py` (routing, prompt động, SSE, endpoint tóm tắt), `skills/*.py`, `guardrails.py`, `hooks.py`.
- **Sổ tay ngữ cảnh Agent tự nạp:** `AGENTS.md` (đọc vào system prompt mỗi phiên).
- **Kiến trúc kỹ thuật chi tiết (bản gốc):** `AGENT_ARCHITECTURE.md`.
- **Giao diện:** `static/*.html|css|js` (gồm `assistant-dock.css`, `assistant-plus.js`, `widget.js`).
- Khi tài liệu này lệch với code → **code thắng**; hãy cập nhật tài liệu.
