[⬆ Mục lục](../README.md) · Cùng nhóm: [05 Frontend/UX](05-frontend-ux.md) · [05b Tóm tắt bài học](05b-tinh-nang-tom-tat.md)

# 05a — Trợ lý AI gắn cạnh (Docked Assistant)

> **Mục tiêu UX:** đưa khung chat AI thành **mặc định mở** và **ngồi cạnh** bài học, để người
> học trao đổi trực tiếp với Trợ lý về bài đang đọc và phần thực hành — thay vì phải bấm mở
> bong bóng ở góc. Đây là thay đổi **cộng thêm (additive)**, không đụng orchestration/skills.

## 1. Hành vi

- **Desktop (bề ngang ≥ 1025px):** khung Trợ lý AI **tự mở** khi tải trang, hiển thị dạng
  **panel dọc gắn bên phải**, cao hết màn hình, nằm cạnh khung bài học (không đè nội dung — vùng
  đọc được chừa lề phải đúng bằng bề rộng panel).
- **Màn hình hẹp (< 1025px):** giữ nguyên hành vi cũ — **bong bóng nổi** (FAB) ở góc dưới phải,
  đóng sẵn để không che nội dung.
- **Nút gắn/thả:** trên thanh tiêu đề của khung chat có nút chuyển giữa *gắn cạnh* (docked) và
  *thả nổi* (floating). Lựa chọn được ghi nhớ qua `localStorage` (khóa `assistantDock`).
- **Đóng/mở:** vẫn dùng nút Trợ lý AI trên navbar, nút đóng (✕) trên header, hoặc FAB khi ở chế
  độ nổi. Phím `Esc` chỉ đóng khi đang ở dạng nổi (docked thì giữ để tiện học).

## 2. Cơ chế kỹ thuật

| Thành phần | Vai trò |
| :-- | :-- |
| `static/widget.js` | Điều khiển mở/đóng, quyết định docked ↔ floating theo bề ngang, ghi nhớ lựa chọn, chèn nút gắn/thả. |
| `static/assistant-dock.css` | Lớp CSS bổ sung (nạp **sau** `theme-light.css`) biến `.agent-widget.docked` thành panel dọc; thêm lề phải cho `.app-container` qua class `body.assistant-docked`. |
| `--dock-w` (CSS var) | Bề rộng panel gắn cạnh (mặc định `440px`). Đổi 1 chỗ là đổi toàn bộ. |

Luồng khởi tạo (rút gọn):

```
Tải trang → widget.js kiểm tra bề ngang
   ├─ ≥1025px & dockPref=on → open() + gắn class .docked + body.assistant-docked
   └─ <1025px               → giữ FAB, đóng sẵn
Đổi kích thước cửa sổ → applyDockState() cập nhật lại
```

## 3. Ràng buộc & lưu ý

- Không thay đổi endpoint chat, không đổi luồng SSE hay orchestration — chỉ là lớp trình bày.
- Không dùng `localStorage` cho dữ liệu nhạy cảm; chỉ lưu **sở thích hiển thị** (docked on/off).
- Khi thêm CSS, luôn đặt file bổ sung **sau** `theme-light.css` trong `index.html` để ghi đè đúng.

[⬆ Mục lục](../README.md)
