# Bảo mật AI Agent bằng Biên lai Mật mã (Cryptographic Receipts)

[Xem video bài giảng: Bảo mật AI Agent bằng Biên lai Mật mã](https://youtu.be/PLACEHOLDER_VIDEO_ID)

> _(Video bài giảng và ảnh bìa sẽ được đội ngũ nội dung của Microsoft bổ sung sau, tương tự mô hình các bài 14 / 15.)_

## Giới thiệu

Bài học này sẽ đề cập đến:
- Tại sao Dấu vết kiểm toán (audit trails) cho AI Agent lại quan trọng đối với tính tuân thủ pháp lý, việc gỡ lỗi (debugging) và sự tin cậy.
- Biên lai mật mã (cryptographic receipt) là gì và sự khác biệt của nó so với một dòng log thông thường không có chữ ký.
- Cách tạo ra một biên lai có chữ ký số cho việc gọi Tool (công cụ) của Agent bằng Python thuần túy.
- Cách xác minh (verify) một biên lai ngoại tuyến (offline) và phát hiện giả mạo.
- Cách tạo Chuỗi biên lai (chain receipts) sao cho việc xóa hoặc thay đổi thứ tự bất kỳ biên lai nào cũng làm hỏng toàn bộ chuỗi.
- Những gì biên lai này CHỨNG MINH ĐƯỢC và những gì nó RÕ RÀNG KHÔNG CHỨNG MINH.

## Mục tiêu học tập

Sau khi hoàn thành bài học này, bạn sẽ biết cách:
- Nhận diện các lỗi hổng hệ thống buộc chúng ta phải có Nguồn gốc Mật mã (cryptographic provenance) cho hành động của AI Agent.
- Tạo một biên lai được ký bằng thuật toán `Ed25519` dựa trên một payload JSON chuẩn hóa.
- Xác minh độc lập một biên lai mà chỉ cần sử dụng khóa công khai (public key) của người ký.
- Phát hiện việc giả mạo bằng cách chạy lại quá trình xác minh trên một biên lai đã bị chỉnh sửa.
- Xây dựng một Chuỗi băm (hash-chain) cho các biên lai và giải thích tại sao chuỗi này lại quan trọng.
- Phân định rõ ranh giới giữa việc biên lai chứng minh điều gì (nguồn gốc, tính toàn vẹn, thứ tự) và không chứng minh điều gì (tính đúng đắn của hành động, mức độ an toàn của hệ thống).

## Vấn đề: Dấu vết kiểm toán của AI Agent

Hãy tưởng tượng bạn vừa triển khai một AI Agent cho hệ thống Contoso Travel. Agent này đọc yêu cầu của khách hàng, gọi API tìm kiếm chuyến bay và tiến hành đặt ghế. Quý trước, Agent này xử lý 50.000 lượt đặt vé.

Hôm nay, một điều tra viên (kiểm toán viên) bước vào. Họ hỏi một câu đơn giản: *"Hãy cho tôi xem AI Agent của bạn đã làm những gì."*
Bạn đưa cho họ các tệp nhật ký (log files). Điều tra viên nhìn vào đó và hỏi một câu khó hơn: *"Làm sao tôi biết những dòng log này chưa bị ai chỉnh sửa?"*

Đây chính là bài toán Dấu vết kiểm toán (Audit Trail). Hầu hết các Agent hiện nay phụ thuộc vào:
- **Application logs:** do chính Agent viết, ai có quyền truy cập file system đều có thể sửa.
- **Cloud logging services:** an toàn ở cấp độ nền tảng, nhưng chỉ khi bạn hoàn toàn tin tưởng nhà cung cấp Cloud.
- **Database transaction logs:** phù hợp cho việc thay đổi dữ liệu (database), nhưng không dành cho các Tool calls ngẫu nhiên (chẳng hạn như gửi email).

Tất cả các phương án trên đều đòi hỏi Kiểm toán viên phải "tin tưởng" một bên thứ ba (bạn, nhà cung cấp Cloud, v.v.). Điều này có thể chấp nhận trong nội bộ, nhưng đối với các ngành quản lý nghiêm ngặt (Tài chính, Y tế, hoặc luật AI của EU) thì không thể chấp nhận.

**Biên lai Mật mã (Cryptographic receipts)** giải quyết bài toán này bằng cách làm cho từng hành động của Agent có thể được xác minh độc lập. Kiểm toán viên không cần phải tin tưởng bạn. Họ chỉ cần `Public Key` của bạn và chính chiếc Biên lai.

## Biên lai Mật mã là gì?

Một biên lai là một cấu trúc JSON ghi lại hành động của Agent, được gắn thêm Chữ ký số (Digital Signature).

Một biên lai tối giản có dạng như sau:
```json
{
  "type": "agent.tool_call.v1",
  "agent_id": "contoso-travel-bot",
  "tool_name": "lookup_flights",
  "tool_args_hash": "sha256:a3f9c1...",
  "result_hash": "sha256:7b2e1d...",
  "policy_id": "contoso-travel-policy-v3",
  "timestamp": "2026-04-25T14:30:00Z",
  "sequence": 47,
  "previous_receipt_hash": "sha256:9d4e6a...",
  "signature": {
    "alg": "EdDSA",
    "sig": "c5af83...",
    "public_key": "8f3b2c..."
  }
}
```

Ba đặc tính giúp hệ thống này hoạt động hiệu quả:
1. **Chữ ký (Signature):** Biên lai được ký bởi cổng của Agent bằng `Private Key` (khóa bí mật) Ed25519. Bất cứ ai có `Public Key` tương ứng đều có thể kiểm tra xem chữ ký này có hợp lệ không. Sửa bất kỳ chữ nào trong biên lai sẽ làm sai chữ ký.
2. **Mã hóa Chuẩn hóa (Canonical encoding):** Trước khi ký, biên lai được ép theo chuẩn JSON JCS (RFC 8785) để đảm bảo không bị sai lệch cấu trúc dấu cách, xuống dòng.
3. **Chuỗi băm (Hash chaining):** Trường `previous_receipt_hash` chứa mã băm của cái biên lai ngay trước đó. Điều này tạo thành một chuỗi giống như Blockchain. Xóa hoặc đảo lộn một biên lai ở giữa sẽ làm đứt chuỗi.

3 đặc tính này cung cấp 3 đảm bảo:
- **Nguồn gốc (Attribution):** Ai/Khóa nào đã ký dữ liệu này.
- **Tính toàn vẹn (Integrity):** Nội dung không hề bị thay đổi kể từ lúc ký.
- **Thứ tự (Ordering):** Hành động này xảy ra trước hay sau hành động kia.

## Cách tạo Biên lai bằng Python
Bạn không cần một thư viện quá phức tạp. Hãy mở sổ tay Jupyter notebook `18-signed-receipts.ipynb` để thực hành code từng bước với thư viện `nacl`.

## Những gì Biên lai chứng minh (Và KHÔNG CHỨNG MINH)

Đây là phần quan trọng nhất của bài học. Biên lai mật mã rất mạnh mẽ nhưng sức mạnh của nó có giới hạn.

**✅ Biên lai chứng minh được:**
1. Rằng khóa bí mật này đã ký vào dữ liệu cụ thể này (Nguồn gốc).
2. Dữ liệu này không bị thay đổi (Toàn vẹn).
3. Thứ tự các hành động (Chuỗi băm).

**❌ Biên lai KHÔNG CHỨNG MINH được:**
1. **Tính đúng đắn (Correctness):** Nó không chứng minh việc Agent làm là đúng hay sai. Một câu trả lời ngu ngốc cũng có thể được "ký nhận" gọn gàng y như một câu trả lời chính xác.
2. **Tính tuân thủ (Policy compliance):** Biên lai ghi lại việc đã làm, chứ không khẳng định hành động đó có tuân theo pháp luật hay nội quy công ty hay không.
3. **Danh tính ngoài Khóa (Identity):** Biên lai chỉ nói "Khóa A đã ký văn bản B". Việc khóa A đó thuộc về một Hacker hay thuộc về nhân viên chính thức thì biên lai không kiểm tra.
4. **Độ trung thực của dữ liệu đầu vào:** Nếu Agent bị tấn công Prompt Injection và làm theo một lệnh ác ý, biên lai vẫn sẽ trung thực ghi lại việc thực hiện hành động ác ý đó. Biên lai không thể chống lại đầu vào rác.

Hiểu được ranh giới này giúp bạn sử dụng Biên lai đúng mục đích: Biến hành vi của Agent thành thứ có thể theo dõi và không thể bị giả mạo.

---
**Bài trước:** [Lesson 15 - Browser Use](../10-browser-use/README.md)

## 💻 Thực hành xuyên suốt với Web Agent

Khái niệm **Securing AI** không chỉ nằm ở lý thuyết. Trong dự án `my-practice/web-agent/`, chúng tôi áp dụng chiến lược **Least Privilege (Quyền hạn tối thiểu)** và **Guardrails**.

1. **Giới hạn Quyền Công Cụ (RBAC cho Database):**
   - Mở file `my-practice/web-agent/skills/sql_skill.py`.
   - Để ngăn chặn thảm họa SQL Injection hoặc Agent "tự tiện" ra lệnh xóa Database, Tool truy vấn đã được cấu hình chặt chẽ: `if not query.upper().startswith("SELECT"): return "Lỗi: Agent chỉ được phép thực thi lệnh SELECT."`

2. **Lớp khiên Input Guardrails:**
   - Mở file `my-practice/web-agent/guardrails.py` để xem cách hệ thống chặn đứng mọi nỗ lực Jailbreak từ phía người dùng (thông qua Blacklist regex) trước khi chúng kịp chạm tới não bộ của AI Model.
