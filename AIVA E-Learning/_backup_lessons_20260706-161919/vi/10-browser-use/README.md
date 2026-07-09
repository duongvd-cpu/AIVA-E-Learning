# Xây dựng Computer Use Agents (Agent Sử Dụng Máy Tính)

Computer use agents (Agent sử dụng máy tính) có thể tương tác với các trang web giống như cách con người làm: mở trình duyệt, kiểm tra trang và thực hiện hành động tốt nhất tiếp theo từ những gì chúng nhìn thấy. Trong bài học này, bạn sẽ xây dựng một Agent tự động hóa trình duyệt để tìm kiếm trên Airbnb, trích xuất dữ liệu danh sách phòng có cấu trúc và xác định chỗ ở rẻ nhất tại Stockholm.

Bài học này kết hợp **Browser-Use** (để điều hướng bằng AI), **Playwright** và **Chrome DevTools Protocol (CDP)** (để kiểm soát trình duyệt), **Azure OpenAI** (để suy luận qua hình ảnh - Vision) và **Pydantic** (để trích xuất dữ liệu có cấu trúc).

## Giới thiệu

Bài học này sẽ đề cập đến:
- Hiểu được khi nào Computer use agents phù hợp hơn các dạng tự động hóa chỉ dùng API.
- Kết hợp `Browser-Use` với `Playwright` và CDP để quản lý vòng đời trình duyệt một cách đáng tin cậy.
- Sử dụng Azure OpenAI Vision và đầu ra có cấu trúc Pydantic để trích xuất dữ liệu danh sách từ các trang web động (dynamic web pages).
- Quyết định khi nào nên sử dụng mô hình ưu tiên Agent (Agent-first), ưu tiên Actor (Actor-first) hoặc kết hợp (Hybrid) trong tự động hóa trình duyệt.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách:
- Cấu hình `Browser-Use` với Azure OpenAI và Playwright.
- Xây dựng luồng tự động hóa trình duyệt điều hướng một trang web thực và xử lý các phần tử giao diện (UI) thay đổi liên tục.
- Trích xuất dữ liệu định dạng sẵn từ nội dung hiển thị trên trang và biến chúng thành logic nghiệp vụ.
- Chọn giữa mô hình Agent và Actor dựa trên mức độ "dễ đoán" của tác vụ trên trình duyệt.

## Code Mẫu

Bài học này bao gồm một tài liệu hướng dẫn Jupyter notebook:
- **[10-browser-user.ipynb](./10-browser-user.ipynb)**: Khởi chạy một phiên Chrome qua CDP, tìm kiếm các chỗ ở tại Stockholm trên Airbnb, trích xuất giá bằng tính năng Vision của `Browser-Use`, và trả về lựa chọn rẻ nhất dưới dạng dữ liệu có cấu trúc.

## Yêu cầu trước khi học

- Python 3.12 trở lên.
- Đã cấu hình deployment Azure OpenAI trong môi trường của bạn.
- Đã cài đặt Chrome hoặc Chromium trên máy.
- Cài đặt thư viện Playwright.
- Làm quen cơ bản với lập trình bất đồng bộ (async Python).

## Cài đặt (Setup)

Cài đặt các gói phần mềm (packages) được sử dụng trong notebook:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Thiết lập các biến môi trường Azure OpenAI được sử dụng bởi notebook:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Tùy chọn: Mặc định sử dụng phiên bản API mới nhất nếu bỏ qua
AZURE_OPENAI_API_VERSION=...
```

## Tổng quan Kiến trúc

Notebook trình diễn một quy trình tự động hóa trình duyệt lai (hybrid workflow):

1. Chrome khởi động với CDP được bật để cả Playwright và `Browser-Use` có thể chia sẻ chung một phiên trình duyệt.
2. Một Agent `Browser-Use` xử lý các tác vụ điều hướng mở, chẳng hạn như mở Airbnb, đóng các pop-up quảng cáo, và tìm kiếm từ khóa Stockholm.
3. Trang web hiện tại được kiểm tra bằng lược đồ Pydantic có cấu trúc để trích xuất tiêu đề phòng, giá mỗi đêm, đánh giá và URL.
4. Đoạn code Python sẽ so sánh các kết quả vừa trích xuất và làm nổi bật kết quả rẻ nhất.

Cách tiếp cận này giữ lại được khả năng linh hoạt, suy luận dựa trên hình ảnh mà `Browser-Use` rất mạnh, đồng thời cung cấp khả năng kiểm soát trình duyệt theo cách truyền thống (deterministic) khi cần thiết.

## Điểm nhấn và Phương pháp Thực hành Tốt nhất

### Khi nào dùng Agent vs Actor

| Tình huống | Nên dùng Agent | Nên dùng Actor |
|----------|-----------|-----------|
| Giao diện động (Dynamic layouts) | Có, AI có thể thích ứng với thay đổi trang | Không, các selector (xpath/css) cố định dễ bị gãy |
| Cấu trúc đã biết trước | Không, Agent xử lý chậm hơn code trực tiếp | Có, nhanh và chính xác |
| Tìm kiếm phần tử | Có, dùng ngôn ngữ tự nhiên rất tốt | Không, cần phải biết chính xác selector |
| Kiểm soát thời gian (Timing) | Không, khó dự đoán | Có, kiểm soát hoàn toàn việc chờ đợi (wait) và thử lại (retry) |
| Luồng làm việc phức tạp | Có, tự xử lý các trạng thái UI bất ngờ | Không, yêu cầu viết code rẽ nhánh (if-else) rõ ràng |

### Phương pháp Thực hành Tốt nhất với Browser-Use

1. Bắt đầu bằng một **Agent** để khám phá và điều hướng động.
2. Chuyển sang **Actor** (kiểm soát trang trực tiếp bằng code) khi các tương tác đã trở nên dễ đoán.
3. Sử dụng các mô hình đầu ra có cấu trúc (như Pydantic) để đảm bảo dữ liệu trích xuất hợp lệ và an toàn về kiểu dữ liệu (type-safe).
4. Cố tình thêm khoảng trễ (delays) sau các hành động gây ra sự thay đổi giao diện (UI).
5. Chụp ảnh màn hình (screenshots) trong quá trình chạy thử để dễ dàng gỡ lỗi (debug) khi có sự cố.
6. Luôn chuẩn bị tinh thần rằng các trang web sẽ thay đổi và thiết kế chiến lược dự phòng cho các cửa sổ pop-up hoặc thay đổi bố cục.
7. Kết hợp mô hình Agent và Actor để đạt được cả sự linh hoạt và độ chính xác cao.

### Ứng dụng Thực tế

- Đặt vé du lịch và theo dõi giá.
- Kiểm tra tính có sẵn và so sánh giá trong thương mại điện tử.
- Trích xuất dữ liệu có cấu trúc từ các trang web động.
- Kiểm thử và xác minh UI bằng khả năng nhận diện hình ảnh (Vision).
- Giám sát trang web và cảnh báo.
- Điền form thông minh qua nhiều bước (multi-step flows).

## Tài liệu Tham khảo

- [Mẫu tích hợp Playwright với Browser-Use](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Tham số actor trong Browser-Use và trích xuất nội dung](https://docs.browser-use.com/customize/actor/all-parameters)
- [Cài đặt Khóa học](../01-course-setup/README.md)