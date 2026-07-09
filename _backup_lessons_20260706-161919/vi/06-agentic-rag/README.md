[![Agentic RAG](../../../06-agentic-rag/images/lesson-5-thumbnail.png)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Nhấn vào hình ảnh bên trên để xem video của bài học này)_

# Agentic RAG (Retrieval-Augmented Generation kết hợp Agent)

Bài học này cung cấp một cái nhìn tổng quan toàn diện về **Agentic Retrieval-Augmented Generation (Agentic RAG)**, một mô hình AI mới nổi nơi các Mô hình Ngôn ngữ Lớn (LLM) tự chủ lập kế hoạch cho các bước tiếp theo trong khi trích xuất thông tin từ các nguồn bên ngoài. Khác với các mẫu retrieval-then-read (tìm-rồi-đọc) tĩnh, Agentic RAG bao gồm các lệnh gọi lặp đi lặp lại tới LLM, xen kẽ với các lệnh gọi Tool hoặc hàm (function) và đầu ra có cấu trúc (structured outputs). Hệ thống tự đánh giá kết quả, tinh chỉnh câu truy vấn, gọi thêm Tool nếu cần, và tiếp tục chu trình này cho đến khi đạt được giải pháp thỏa đáng.

## Giới thiệu

Bài học này sẽ bao gồm:

- **Hiểu về Agentic RAG:** Tìm hiểu mô hình mới nổi trong AI, nơi LLM tự chủ lập kế hoạch cho các bước tiếp theo trong khi trích xuất thông tin từ các nguồn dữ liệu bên ngoài.
- **Nắm bắt Phong cách lặp Maker-Checker:** Hiểu được vòng lặp gọi LLM liên tục, đan xen giữa việc gọi Tool và đầu ra có cấu trúc, được thiết kế để cải thiện độ chính xác và xử lý các câu truy vấn bị sai lệch.
- **Khám phá Các ứng dụng Thực tế:** Nhận biết các kịch bản mà Agentic RAG tỏa sáng, chẳng hạn như môi trường ưu tiên độ chính xác tuyệt đối (correctness-first), tương tác cơ sở dữ liệu phức tạp, và các quy trình công việc (workflows) kéo dài.

## Mục tiêu Học tập

Sau khi hoàn thành bài học này, bạn sẽ hiểu và biết cách:

- **Hiểu về Agentic RAG:** Tìm hiểu về mô hình AI nơi LLM tự chủ lập kế hoạch trong khi tìm kiếm thông tin bên ngoài.
- **Phong cách lặp Maker-Checker:** Nắm được khái niệm về vòng lặp gọi LLM, xen kẽ gọi Tool để đảm bảo chất lượng kết quả và sửa chữa lỗi sai.
- **Làm chủ Quá trình Suy luận:** Hiểu được khả năng của hệ thống trong việc tự quản lý luồng suy luận, tự đưa ra quyết định tiếp cận vấn đề mà không phụ thuộc vào các đường dẫn được định nghĩa sẵn.
- **Quy trình làm việc (Workflow):** Hiểu cách một mô hình Agentic độc lập đưa ra quyết định để lấy báo cáo xu hướng thị trường, xác định dữ liệu đối thủ, tương quan dữ liệu nội bộ, tổng hợp kết quả và đánh giá chiến lược.
- **Vòng lặp Lặp lại, Tích hợp Tool và Memory:** Tìm hiểu sự phụ thuộc của hệ thống vào mẫu tương tác vòng lặp, duy trì trạng thái và bộ nhớ qua các bước để tránh bị lặp vô hạn và đưa ra quyết định có cơ sở.
- **Xử lý Các chế độ Lỗi và Tự sửa chữa:** Khám phá cơ chế tự sửa lỗi mạnh mẽ của hệ thống, bao gồm lặp lại, truy vấn lại, sử dụng công cụ chẩn đoán và chuyển quyền (fallback) cho con người kiểm duyệt.
- **Giới hạn của Tính tự chủ (Agency):** Hiểu được các hạn chế của Agentic RAG, tập trung vào tính tự chủ trong một miền cụ thể (domain-specific), sự phụ thuộc vào hạ tầng và tôn trọng các rào chắn an toàn (guardrails).
- **Trường hợp Sử dụng và Giá trị Thực tiễn:** Nhận diện các tình huống mà Agentic RAG hoạt động tối ưu.
- **Quản trị, Tính minh bạch và Độ tin cậy:** Tìm hiểu tầm quan trọng của việc quản trị, bao gồm suy luận có thể giải thích được, kiểm soát thành kiến và giám sát từ con người.

## Agentic RAG là gì?

Agentic Retrieval-Augmented Generation (Agentic RAG) là một mô hình nơi các LLM tự chủ lên kế hoạch cho các bước tiếp theo đồng thời trích xuất thông tin từ các nguồn bên ngoài. Khác với các hệ thống tĩnh "tìm kiếm-rồi-đọc", Agentic RAG sử dụng vòng lặp: LLM suy nghĩ → LLM gọi Tool → LLM đánh giá kết quả → Nếu chưa đủ, tinh chỉnh truy vấn và lặp lại. Chu trình này tiếp tục cho đến khi thu được câu trả lời thỏa đáng. Phong cách "maker-checker" lặp đi lặp lại này cải thiện tính đúng đắn, khắc phục các truy vấn sai và đảm bảo kết quả chất lượng cao.

Hệ thống chủ động sở hữu quá trình suy luận của mình: viết lại các truy vấn thất bại, chọn các phương thức tìm kiếm khác nhau, và tích hợp nhiều Tool — như vector search, cơ sở dữ liệu SQL, hoặc API tùy chỉnh — trước khi hoàn thiện câu trả lời cuối cùng. Điểm khác biệt lớn nhất tạo nên hệ thống "Agentic" chính là khả năng làm chủ luồng suy nghĩ. RAG truyền thống dựa vào lộ trình định sẵn, nhưng Agentic RAG độc lập quyết định trình tự các bước dựa trên chất lượng thông tin mà nó tìm được.

## Định nghĩa Agentic RAG

Agentic Retrieval-Augmented Generation (Agentic RAG) là một mô hình mới trong phát triển AI, nơi LLM không chỉ lấy thông tin từ các nguồn dữ liệu bên ngoài mà còn tự chủ lên kế hoạch cho các bước tiếp theo. Không giống như các mẫu tìm-rồi-đọc tĩnh hoặc các chuỗi prompt (prompt sequences) được kịch bản hóa cẩn thận, Agentic RAG liên quan đến một vòng lặp gồm các lệnh gọi lặp đi lặp lại tới LLM, xen kẽ với các lệnh gọi Tool và đầu ra có cấu trúc. Tại mỗi lượt, hệ thống đánh giá các kết quả thu được, quyết định xem có nên tinh chỉnh các truy vấn của nó hay không, gọi các Tool bổ sung nếu cần, và tiếp tục chu kỳ này cho đến khi nó đạt được giải pháp thỏa đáng.

Khái niệm này giúp hệ thống tự sửa sai, xử lý các truy vấn không hợp lệ đối với cơ sở dữ liệu có cấu trúc (ví dụ: NL2SQL), và đảm bảo kết quả có chất lượng cao và cân bằng. Thay vì chỉ dựa vào các chuỗi prompt được kỹ sư thiết kế cẩn thận, hệ thống chủ động nắm giữ quá trình lý luận của mình. Điều này loại bỏ nhu cầu về các framework điều phối quá phức tạp. Thay vào đó, một vòng lặp tương đối đơn giản: "gọi LLM → dùng Tool → gọi LLM → ..." có thể mang lại những đầu ra phức tạp và có căn cứ.

![Agentic RAG Core Loop](../../../06-agentic-rag/images/agentic-rag-core-loop.png)

## Làm chủ Quá trình Suy luận (Owning the Reasoning Process)

Chất lượng khác biệt tạo nên một hệ thống "Agentic" chính là khả năng làm chủ quá trình suy luận. Việc triển khai RAG truyền thống thường phụ thuộc vào con người trong việc thiết lập một con đường (path) định sẵn: một luồng suy nghĩ (chain-of-thought) phác thảo những gì cần lấy và khi nào lấy.
Nhưng khi một hệ thống thực sự mang tính Agentic, nó tự quyết định cách tiếp cận bài toán bên trong. Nó không chỉ thực thi một kịch bản; nó tự chủ xác định chuỗi các bước dựa trên chất lượng thông tin nó tìm được.

Ví dụ, nếu được yêu cầu xây dựng chiến lược ra mắt sản phẩm, nó không chỉ dựa vào một prompt vạch ra toàn bộ quy trình nghiên cứu. Thay vào đó, mô hình Agentic độc lập quyết định:
1. Lấy các báo cáo xu hướng thị trường hiện tại bằng công cụ Tìm kiếm Web.
2. Xác định dữ liệu đối thủ cạnh tranh có liên quan qua Hệ thống tìm kiếm (Search System).
3. Tương quan các số liệu bán hàng nội bộ trong quá khứ thông qua Cơ sở dữ liệu SQL.
4. Tổng hợp các phát hiện thành một chiến lược gắn kết.
5. Đánh giá chiến lược để tìm ra khoảng trống hoặc sự mâu thuẫn, từ đó nhắc nhở một vòng truy xuất thông tin khác nếu cần.

Tất cả các bước này—tinh chỉnh truy vấn, chọn nguồn, lặp lại cho đến khi "hài lòng" với câu trả lời—đều do mô hình tự quyết định, không phải do con người lập kịch bản trước.

## Vòng lặp, Tích hợp Tool và Bộ nhớ (Memory)

![Tool Integration Architecture](../../../06-agentic-rag/images/tool-integration.png)

Một hệ thống Agentic phụ thuộc vào mẫu tương tác vòng lặp:
- **Lần gọi đầu tiên:** Mục tiêu của người dùng (user prompt) được trình bày cho LLM.
- **Gọi Tool:** Nếu mô hình xác định bị thiếu thông tin hoặc hướng dẫn không rõ ràng, nó sẽ chọn một Tool hoặc phương pháp tìm kiếm (như truy vấn SQL hoặc tìm kiếm Vector) để thu thập thêm ngữ cảnh.
- **Đánh giá & Tinh chỉnh:** Sau khi xem xét dữ liệu trả về, mô hình quyết định xem thông tin đó có đủ không. Nếu không, nó tinh chỉnh câu truy vấn, thử một Tool khác hoặc điều chỉnh phương pháp.
- **Lặp lại cho đến khi hài lòng:** Chu trình này tiếp tục cho đến khi mô hình xác định rằng nó có đủ sự rõ ràng và bằng chứng để đưa ra câu trả lời cuối cùng, hợp lý.
- **Memory & State (Bộ nhớ & Trạng thái):** Vì hệ thống duy trì trạng thái và bộ nhớ qua các bước, nó có thể nhớ lại các nỗ lực trước đó và kết quả của chúng, tránh lặp lại sai lầm và đưa ra quyết định sáng suốt hơn khi tiến hành.

Qua thời gian, điều này tạo ra cảm giác về sự hiểu biết tiến hóa, cho phép mô hình điều hướng các nhiệm vụ phức tạp, nhiều bước mà không cần con người liên tục can thiệp hoặc định hình lại prompt.

## Xử lý Chế độ Lỗi và Tự sửa chữa

Sự tự chủ của Agentic RAG cũng liên quan đến cơ chế tự sửa chữa (self-correction) mạnh mẽ. Khi hệ thống gặp phải bế tắc—như lấy ra các tài liệu không liên quan hoặc gặp lỗi truy vấn—nó có thể:
- **Lặp lại và Truy vấn lại:** Thay vì trả về các câu trả lời giá trị thấp, mô hình thử các chiến lược tìm kiếm mới, viết lại các truy vấn cơ sở dữ liệu, hoặc tìm kiếm trên các tập dữ liệu thay thế.
- **Sử dụng Công cụ Chẩn đoán:** Hệ thống có thể gọi các chức năng bổ sung được thiết kế để giúp nó gỡ lỗi hoặc xác nhận tính chính xác của dữ liệu.
- **Chuyển quyền cho Con người Giám sát (Fallback):** Trong các kịch bản quan trọng hoặc bị lỗi nhiều lần, mô hình có thể báo hiệu sự không chắc chắn và yêu cầu con người hướng dẫn. Sau khi con người đưa ra phản hồi chỉnh sửa, mô hình có thể tiếp thu bài học đó cho tương lai.

## Giới hạn của Tính tự chủ

Bất chấp tính tự chủ trong một nhiệm vụ, Agentic RAG không tương đồng với Trí tuệ Nhân tạo Tổng hợp (AGI). Các khả năng "Agentic" của nó bị giới hạn ở các Tool, nguồn dữ liệu và chính sách do các nhà phát triển cung cấp. Nó không thể tự phát minh ra Tool riêng của mình hoặc bước ra ngoài giới hạn miền (domain) đã được thiết lập. 

Những điểm khác biệt chính bao gồm:
1. **Tính tự chủ đặc thù theo miền (Domain-Specific):** Tập trung vào việc đạt được các mục tiêu của người dùng trong một miền nhất định.
2. **Phụ thuộc vào Cơ sở hạ tầng:** Khả năng của hệ thống phụ thuộc vào các Tool và dữ liệu do nhà phát triển tích hợp.
3. **Tôn trọng các Rào chắn (Guardrails):** Các nguyên tắc đạo đức, quy tắc tuân thủ và chính sách nghiệp vụ luôn được ưu tiên.

## Các trường hợp sử dụng thực tế

Agentic RAG tỏa sáng trong các kịch bản đòi hỏi sự tinh chỉnh và độ chính xác lặp đi lặp lại:
1. **Môi trường Ưu tiên tính Chính xác:** Trong kiểm tra tuân thủ, phân tích quy định hoặc nghiên cứu pháp lý, mô hình có thể liên tục xác minh sự kiện, tham khảo nhiều nguồn.
2. **Tương tác Cơ sở dữ liệu phức tạp:** Khi xử lý dữ liệu có cấu trúc, nơi các câu truy vấn thường gặp lỗi, hệ thống có thể tự động tinh chỉnh câu lệnh SQL để lấy đúng ý định người dùng.
3. **Quy trình kéo dài (Extended Workflows):** Đối với các phiên làm việc lâu dài, khi thông tin mới xuất hiện, Agentic RAG có thể liên tục kết hợp dữ liệu mới, thay đổi chiến lược khi nó hiểu thêm về vấn đề.

## Quản trị, Tính minh bạch và Độ tin cậy

Khi các hệ thống này trở nên tự chủ hơn trong suy luận, sự quản trị và tính minh bạch là rất quan trọng:
- **Suy luận có thể giải thích:** Mô hình có thể cung cấp dấu vết kiểm toán (audit trail) của các truy vấn mà nó đã thực hiện, các nguồn nó đã tham khảo, và các bước lý luận nó đã thực hiện để đạt được kết luận.
- **Kiểm soát thành kiến và Tìm kiếm cân bằng:** Cần điều chỉnh chiến lược tìm kiếm để đảm bảo nguồn dữ liệu cân bằng, đại diện, và thường xuyên kiểm tra đầu ra để phát hiện sự sai lệch.
- **Sự giám sát của con người:** Đối với các nhiệm vụ nhạy cảm, đánh giá của con người vẫn là yếu tố cần thiết. Agentic RAG không thay thế phán đoán của con người—nó tăng cường bằng cách cung cấp các tùy chọn đã được kiểm duyệt kỹ lưỡng.

---
**Bài trước:** [Sử dụng Tool / Tool Use Pattern](../05-tool-use/README.md)  
**Bài tiếp theo:** [Xây dựng AI Agents đáng tin cậy](../18-building-trustworthy-agents/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Trong kho lưu trữ này, kiến trúc **Agentic RAG** và **Hybrid Database** đã được ứng dụng thực tế vào dự án `my-practice/web-agent/`.

1. **RAG với Vector Database (ChromaDB)**
   - Bạn hãy mở file `my-practice/web-agent/skills/rag_skill.py`.
   - Tại đây, hệ thống tự động đọc file văn bản `data/sconnect_knowledge.txt`, chặt nhỏ thành các đoạn (chunks) và nhúng (embed) vào ChromaDB. Khi người dùng hỏi về Sứ mệnh công ty, Vector Agent sẽ tiến hành *Semantic Search* và lấy ngữ cảnh trả về.

2. **RAG với Structured Database (SQLite)**
   - Bạn hãy mở file `my-practice/web-agent/skills/sql_skill.py`.
   - Cùng một nguyên lý RAG, nhưng thay vì Vector, Agent này được cung cấp cơ sở dữ liệu có cấu trúc (`data/company.db`). Agent sẽ nhận câu hỏi của người dùng, chuyển đổi thành lệnh `SELECT` (Text-to-SQL) và tra cứu bảng `employees`.
   
Để trải nghiệm, hãy mở Terminal, chạy lệnh `python run.py` trong thư mục `web-agent` và hỏi các câu như: *"Có bao nhiêu nhân viên phòng IT?"* hoặc *"Tầm nhìn của Sconnect là gì?"*.
