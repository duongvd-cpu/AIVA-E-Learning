# AI Agents cho người mới bắt đầu - Hướng dẫn học & Tóm tắt khóa học

Hướng dẫn này cung cấp tóm tắt khóa học "AI Agents cho người mới bắt đầu" và giải thích các khái niệm chính, framework, và mẫu thiết kế để xây dựng AI Agents.

## 1. Giới thiệu về AI Agents

**AI Agent là gì?**  
AI Agents là các hệ thống mở rộng khả năng của Mô hình Ngôn ngữ Lớn (LLM) bằng cách cung cấp cho chúng quyền truy cập vào **công cụ (tools)**, **kiến thức (knowledge)**, và **bộ nhớ (memory)**. Khác với chatbot LLM tiêu chuẩn chỉ tạo ra văn bản dựa trên dữ liệu huấn luyện, một AI Agent có thể:  
- **Nhận biết** môi trường của nó (thông qua cảm biến hoặc đầu vào).  
- **Lập luận** về cách giải quyết vấn đề.  
- **Hành động** để thay đổi môi trường (thông qua bộ truyền động hoặc thực thi công cụ).

**Các thành phần chính của một Agent:**  
- **Môi trường**: Không gian nơi Agent hoạt động (ví dụ: hệ thống đặt chỗ).  
- **Cảm biến**: Cơ chế để thu thập thông tin (ví dụ: đọc API).  
- **Bộ truyền động**: Cơ chế để thực hiện hành động (ví dụ: gửi email).  
- **Bộ não (LLM)**: Công cụ lập luận lên kế hoạch và quyết định hành động nào cần thực hiện.

## 2. Framework Agent

Khóa học sử dụng **Microsoft Agent Framework (MAF)** với **Dịch vụ Azure AI Foundry Agent V2** để xây dựng các Agent:

| Thành phần | Tập trung | Phù hợp nhất cho |
|------------|-----------|------------------|
| **Microsoft Agent Framework** | SDK Python/C# hợp nhất cho Agent, công cụ và luồng công việc | Xây dựng Agent với công cụ, luồng công việc Multi-Agent và mẫu hình sản xuất. |
| **Dịch vụ Azure AI Foundry Agent** | Môi trường chạy đám mây được quản lý | Triển khai an toàn, có thể mở rộng với quản lý trạng thái tích hợp, khả năng quan sát và độ tin cậy. |

## 3. Mẫu thiết kế Agent

Mẫu thiết kế giúp cấu trúc cách Agent vận hành để giải quyết vấn đề một cách tin cậy.

### **Mẫu Sử dụng Công cụ (Tool Use)** (Bài 05)  
Mẫu này cho phép Agent tương tác với thế giới bên ngoài.  
- **Khái niệm**: Agent được cung cấp một "kịch bản" (danh sách các chức năng có sẵn và tham số của chúng). LLM quyết định *công cụ* nào sẽ gọi và với *tham số* gì dựa trên yêu cầu của người dùng.  
- **Luồng**: Yêu cầu người dùng -> LLM -> **Chọn công cụ** -> **Thực thi công cụ** -> LLM (với kết quả công cụ) -> Phản hồi cuối cùng.  
- **Trường hợp sử dụng**: Truy xuất dữ liệu thời gian thực (thời tiết, giá cổ phiếu), thực hiện phép tính, chạy mã lệnh.

### **Mẫu Lập kế hoạch (Planning)** (Bài 11)  
Mẫu này cho phép Agent giải quyết các nhiệm vụ phức tạp nhiều bước.  
- **Khái niệm**: Agent phân nhỏ mục tiêu cao thành chuỗi các nhiệm vụ nhỏ hơn.  
- **Phương pháp**:  
  - **Phân rã nhiệm vụ**: Chia "Lên kế hoạch chuyến đi" thành "Đặt vé máy bay", "Đặt khách sạn", "Thuê xe".  
  - **Lập kế hoạch lặp đi lặp lại**: Đánh giá lại kế hoạch dựa trên kết quả của các bước trước (ví dụ: nếu chuyến bay hết chỗ, chọn ngày khác).  
- **Triển khai**: Thường bao gồm Agent "Người lập kế hoạch" tạo ra kế hoạch cấu trúc (ví dụ: JSON) sau đó các Agent khác thực thi.

## 4. Nguyên tắc thiết kế

Khi thiết kế Agent, xem xét ba chiều:  
- **Không gian**: Agent nên kết nối con người và kiến thức, dễ tiếp cận nhưng không gây phiền hà.  
- **Thời gian**: Đại lý nên học từ *Quá khứ*, cung cấp gợi ý phù hợp trong *Hiện tại*, và thích ứng cho *Tương lai*.  
- **Cốt lõi**: Chấp nhận sự không chắc chắn nhưng xây dựng tin cậy qua minh bạch và kiểm soát của người dùng.

## 5. Tóm tắt các bài học chính

- **Bài 02**: Agent là hệ thống, không chỉ là mô hình. Chúng nhận biết, lập luận và hành động.  
- **Bài 03**: Microsoft Agent Framework đơn giản hóa việc gọi công cụ và quản lý trạng thái.  
- **Bài 04**: Thiết kế với sự minh bạch và kiểm soát của người dùng trong tâm trí.  
- **Bài 05**: Công cụ là "cánh tay" của Agent. Định nghĩa kịch bản rất quan trọng để LLM hiểu cách sử dụng chúng.  
- **Bài 11**: Lập kế hoạch là "chức năng điều hành" của Agent, cho phép nó xử lý các luồng công việc phức tạp.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc không chính xác. Tài liệu gốc bằng ngôn ngữ gốc của nó nên được coi là nguồn có thẩm quyền. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu lầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->