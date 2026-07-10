[![Khám phá các AI Agent Frameworks](../../../translated_images/vi/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Nhấp vào hình ảnh ở trên để xem video của bài học này)_

# Khám phá AI Agent Frameworks

AI Agent Frameworks là các nền tảng phần mềm được thiết kế để đơn giản hóa việc tạo, triển khai và quản lý các AI Agents. Các framework này cung cấp cho các nhà phát triển các thành phần, tính trừu tượng và công cụ dựng sẵn giúp hợp lý hóa việc phát triển các hệ thống AI phức tạp.

Các framework này giúp các nhà phát triển tập trung vào những khía cạnh độc đáo của ứng dụng bằng cách cung cấp các phương pháp chuẩn hóa cho những thách thức phổ biến trong phát triển AI Agent. Chúng nâng cao khả năng mở rộng, khả năng tiếp cận và hiệu quả trong việc xây dựng hệ thống AI.

## Giới thiệu 

Bài học này sẽ bao gồm:

- AI Agent Frameworks là gì và chúng cho phép các nhà phát triển đạt được điều gì?
- Các nhóm có thể sử dụng chúng như thế nào để nhanh chóng tạo nguyên mẫu, lặp và cải thiện khả năng của Agent?
- Sự khác biệt giữa các framework và công cụ do Microsoft tạo ra ( <a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Azure AI Agent Service</a> và <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) là gì?
- Tôi có thể tích hợp trực tiếp các công cụ trong hệ sinh thái Azure hiện có hay tôi cần các giải pháp độc lập?
- Dịch vụ Azure AI Agents là gì và điều này giúp gì cho tôi?

## Mục tiêu học tập

Mục tiêu của bài học này là giúp bạn hiểu:

- Vai trò của AI Agent Frameworks trong phát triển AI.
- Cách tận dụng AI Agent Frameworks để xây dựng các Agent thông minh.
- Các khả năng chính được kích hoạt bởi AI Agent Frameworks.
- Sự khác biệt giữa Microsoft Agent Framework và Azure AI Agent Service.

---

## 🛠 Thực hành Xuyên suốt Khóa học (Web Agent)

> [!TIP]
> **Tại sao dự án thực hành của chúng ta lại "Code từ đầu" (Build from scratch)?**  
> Trong thư mục `my-practice/web-agent/`, bạn sẽ thấy chúng ta KHÔNG sử dụng các Framework đồ sộ như AutoGen hay LangChain. Thay vào đó, chúng ta xây dựng Hệ điều hành Agent bằng thư viện Google GenAI SDK thuần túy. 
> Việc này có mục đích giáo dục rất rõ ràng: Thay vì phụ thuộc vào các "hộp đen" (black-box) của Framework, việc tự tay xây dựng Orchestrator, cấu hình System Prompts và viết Tools sẽ giúp bạn hiểu sâu sắc **bản chất cốt lõi** của bất kỳ Agent Framework nào.

---

## AI Agent Frameworks là gì và chúng giúp nhà phát triển làm được những gì?

Các AI Framework truyền thống có thể giúp bạn tích hợp AI vào ứng dụng và làm cho các ứng dụng này tốt hơn theo những cách sau:

- **Cá nhân hóa**: AI có thể phân tích hành vi và sở thích người dùng để cung cấp các đề xuất, nội dung và trải nghiệm được cá nhân hóa.
*Ví dụ: Các dịch vụ phát trực tuyến như Netflix sử dụng AI để đề xuất phim và chương trình dựa trên lịch sử xem, tăng cường sự gắn kết và hài lòng của người dùng.*
- **Tự động hóa và Hiệu quả**: AI có thể tự động hóa các tác vụ lặp đi lặp lại, tinh gọn quy trình làm việc và cải thiện hiệu quả vận hành.
*Ví dụ: Các ứng dụng dịch vụ khách hàng sử dụng chatbot AI để xử lý các yêu cầu phổ biến, giảm thời gian phản hồi và giải phóng nhân sự cho các vấn đề phức tạp hơn.*
- **Cải thiện Trải nghiệm Người dùng**: AI có thể nâng cao trải nghiệm người dùng tổng thể bằng cách cung cấp các tính năng thông minh như nhận diện giọng nói, xử lý ngôn ngữ tự nhiên và gõ dự đoán.
*Ví dụ: Trợ lý ảo như Siri và Google Assistant sử dụng AI để hiểu và phản hồi lại các lệnh bằng giọng nói, giúp người dùng tương tác với thiết bị dễ dàng hơn.*

### Nghe có vẻ tuyệt vời, vậy tại sao chúng ta cần AI Agent Framework?

AI Agent frameworks đại diện cho điều gì đó nhiều hơn là chỉ các AI Framework. Chúng được thiết kế để cho phép tạo ra các Agent thông minh có thể tương tác với người dùng, các Agent khác và môi trường để đạt được các mục tiêu cụ thể. Các Agent này có thể thể hiện hành vi tự chủ, đưa ra quyết định và thích ứng với các điều kiện thay đổi. Hãy xem một số khả năng chính được kích hoạt bởi AI Agent Frameworks:

- **Hợp tác và Phối hợp giữa các Agent**: Cho phép tạo nhiều AI Agent có thể làm việc cùng nhau, giao tiếp và phối hợp để giải quyết các nhiệm vụ phức tạp.
- **Tự động hóa và Quản lý Tác vụ**: Cung cấp cơ chế để tự động hóa các luồng công việc nhiều bước, phân công nhiệm vụ và quản lý nhiệm vụ động giữa các Agent.
- **Hiểu bối cảnh và Thích ứng**: Trang bị cho các Agent khả năng hiểu bối cảnh, thích ứng với môi trường thay đổi và đưa ra quyết định dựa trên thông tin thời gian thực.

Tóm lại, các Agent cho phép bạn làm được nhiều hơn, nâng khả năng tự động hóa lên một tầm cao mới, tạo ra các hệ thống thông minh hơn có thể thích nghi và học hỏi từ môi trường của chúng.

## Làm thế nào để nhanh chóng tạo nguyên mẫu, lặp và cải thiện khả năng của Agent?

Đây là một lĩnh vực phát triển nhanh, nhưng có một số điểm chung trên hầu hết AI Agent Frameworks có thể giúp bạn nhanh chóng tạo nguyên mẫu và lặp lại, cụ thể là các thành phần mô-đun, công cụ hợp tác và học theo thời gian thực. Hãy đào sâu vào những điều này:

- **Sử dụng các Thành phần Mô-đun**: AI SDKs cung cấp các thành phần dựng sẵn như kết nối AI và Bộ nhớ, gọi hàm bằng ngôn ngữ tự nhiên hoặc plugin mã, mẫu prompt, và nhiều hơn nữa.
- **Tận dụng Công cụ Hợp tác**: Thiết kế các Agent với vai trò và nhiệm vụ cụ thể, cho phép họ thử nghiệm và hoàn thiện quy trình làm việc hợp tác.
- **Học theo Thời gian thực**: Thực hiện các vòng phản hồi nơi các Agent học từ các tương tác và điều chỉnh hành vi của chúng một cách động.

### Sử dụng các Thành phần Mô-đun

SDKs như Microsoft Agent Framework cung cấp các thành phần dựng sẵn như kết nối AI, định nghĩa công cụ và quản lý Agent.

**Cách các nhóm có thể sử dụng chúng**: Các nhóm có thể nhanh chóng lắp ráp các thành phần này để tạo nguyên mẫu chức năng mà không cần bắt đầu từ đầu, cho phép thử nghiệm và lặp nhanh.

**Cách hoạt động trong thực tế**: Bạn có thể sử dụng một trình phân tích dựng sẵn để trích xuất thông tin từ đầu vào người dùng, một mô-đun bộ nhớ để lưu trữ và truy xuất dữ liệu, và một bộ tạo prompt để tương tác với người dùng, tất cả đều không cần phải xây dựng các thành phần này từ đầu.

**Mã mẫu**. Hãy xem ví dụ về cách bạn có thể sử dụng Microsoft Agent Framework với `AzureAIProjectAgentProvider` để khiến mô hình phản hồi đầu vào người dùng với cơ chế gọi công cụ (tool calling):


``` python
# Ví dụ về Khung công tác Microsoft Agent bằng Python

import asyncio
import os
from typing import Annotated

from agent_framework.azure import AzureAIProjectAgentProvider
from azure.identity import AzureCliCredential


# Định nghĩa một hàm công cụ mẫu để đặt chuyến đi
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = AzureAIProjectAgentProvider(credential=AzureCliCredential())
    agent = await provider.create_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Ví dụ đầu ra: Chuyến bay của bạn đến New York vào ngày 1 tháng 1 năm 2025 đã được đặt thành công. Chúc bạn đi đường bình an! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Những gì bạn có thể thấy từ ví dụ này là cách bạn tận dụng một trình phân tích dựng sẵn để trích xuất thông tin chính từ đầu vào người dùng, chẳng hạn như điểm đi, điểm đến và ngày đặt chuyến bay. Cách tiếp cận mô-đun này cho phép bạn tập trung vào logic cấp cao.

### Tận dụng Công cụ Hợp tác

Các Framework như Microsoft Agent Framework tạo điều kiện thuận lợi cho việc tạo nhiều Agent có thể làm việc cùng nhau.

**Cách các nhóm có thể sử dụng chúng**: Các nhóm có thể thiết kế các Agent với vai trò và nhiệm vụ cụ thể, cho phép chúng thử nghiệm, hoàn thiện quy trình làm việc hợp tác và cải thiện hiệu quả hệ thống tổng thể.

**Cách hoạt động trong thực tế**: Bạn có thể tạo một nhóm Agent trong đó mỗi Agent có một chức năng chuyên biệt, chẳng hạn như truy xuất dữ liệu, phân tích hoặc đưa ra quyết định. Các Agent này có thể giao tiếp và chia sẻ thông tin để đạt được một mục tiêu chung, chẳng hạn như trả lời câu hỏi của người dùng hoặc hoàn thành một nhiệm vụ.

**Mã mẫu (Microsoft Agent Framework)**:


```python
# Tạo nhiều tác nhân làm việc cùng nhau sử dụng Microsoft Agent Framework

import os
from agent_framework.azure import AzureAIProjectAgentProvider
from azure.identity import AzureCliCredential

provider = AzureAIProjectAgentProvider(credential=AzureCliCredential())

# Tác nhân truy xuất dữ liệu
agent_retrieve = await provider.create_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Tác nhân phân tích dữ liệu
agent_analyze = await provider.create_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Chạy các tác nhân theo thứ tự trên một nhiệm vụ
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Những gì bạn thấy trong mã trước đó là cách bạn tạo một tác vụ liên quan đến nhiều Agent làm việc cùng nhau để phân tích dữ liệu. Mỗi Agent thực hiện một chức năng cụ thể và tác vụ được thực thi bằng cách điều phối các Agent để đạt được kết quả mong muốn. Bằng cách tạo các Agent chuyên biệt với vai trò riêng, bạn có thể cải thiện hiệu quả và hiệu suất của tác vụ.

### Học hỏi theo Thời gian thực

Các framework tiên tiến cung cấp các khả năng hiểu bối cảnh và thích ứng theo thời gian thực.

**Cách các nhóm có thể sử dụng chúng**: Các nhóm có thể triển khai các vòng phản hồi nơi các Agent học từ các tương tác và điều chỉnh hành vi của chúng một cách động, dẫn đến cải tiến liên tục và hoàn thiện năng lực.

**Cách hoạt động trong thực tế**: Các Agent có thể phân tích phản hồi của người dùng, dữ liệu môi trường và kết quả nhiệm vụ để cập nhật cơ sở tri thức của chúng, điều chỉnh các thuật toán ra quyết định và cải thiện hiệu suất theo thời gian. Quá trình học lặp này cho phép các Agent thích ứng với điều kiện thay đổi và sở thích người dùng, nâng cao hiệu quả tổng thể của hệ thống.

## Sự khác biệt giữa Microsoft Agent Framework và Azure AI Agent Service là gì?

Có nhiều cách để so sánh các phương pháp này, nhưng hãy xem một số khác biệt chính về thiết kế, khả năng và các trường hợp sử dụng mục tiêu:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework cung cấp một SDK tinh gọn để xây dựng Agent AI sử dụng `AzureAIProjectAgentProvider`. Nó cho phép các nhà phát triển tạo các Agent tận dụng các mô hình Azure OpenAI với khả năng gọi công cụ tích hợp, quản lý hội thoại và bảo mật cấp doanh nghiệp thông qua định danh Azure.

**Trường hợp sử dụng**: Xây dựng các Agent AI sẵn sàng cho sản xuất với sử dụng công cụ, các luồng công việc nhiều bước và các kịch bản tích hợp doanh nghiệp.

Dưới đây là một số khái niệm cốt lõi quan trọng của Microsoft Agent Framework:

- **Agents**. Một Agent được tạo thông qua `AzureAIProjectAgentProvider` và được cấu hình với tên, hướng dẫn và các công cụ. Agent có thể:
  - **Xử lý tin nhắn người dùng** và tạo phản hồi sử dụng các mô hình Azure OpenAI.
  - **Gọi các công cụ** tự động dựa trên ngữ cảnh hội thoại.
  - **Duy trì trạng thái hội thoại** qua nhiều tương tác.

  Dưới đây là đoạn mã minh họa cách tạo một Agent:

    ```python
    import os
    from agent_framework.azure import AzureAIProjectAgentProvider
    from azure.identity import AzureCliCredential

    provider = AzureAIProjectAgentProvider(credential=AzureCliCredential())
    agent = await provider.create_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Công cụ (Tools)**. Framework hỗ trợ định nghĩa các công cụ như các hàm Python mà Agent có thể gọi tự động. Các công cụ được đăng ký khi tạo Agent:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = await provider.create_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Phối hợp Nhiều Agent**. Bạn có thể tạo nhiều Agent với các chuyên môn khác nhau và phối hợp công việc của họ:

    ```python
    planner = await provider.create_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = await provider.create_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Tích hợp Định danh Azure**. Framework sử dụng `AzureCliCredential` (hoặc `DefaultAzureCredential`) để xác thực an toàn không cần khóa, loại bỏ nhu cầu quản lý khóa API trực tiếp.

## Azure AI Agent Service

Azure AI Agent Service là một bổ sung gần đây, được giới thiệu tại Microsoft Ignite 2024. Nó cho phép phát triển và triển khai các Agent AI với các mô hình linh hoạt hơn, chẳng hạn như gọi trực tiếp các LLM mã nguồn mở như Llama 3, Mistral và Cohere.

Azure AI Agent Service cung cấp các cơ chế bảo mật doanh nghiệp mạnh mẽ hơn và các phương thức lưu trữ dữ liệu, khiến nó phù hợp cho các ứng dụng doanh nghiệp.

Nó hoạt động ngay lập tức với Microsoft Agent Framework để xây dựng và triển khai các Agent.

Dịch vụ này hiện đang ở Public Preview và hỗ trợ Python và C# để xây dựng các Agent.

Sử dụng SDK Python của Azure AI Agent Service, chúng ta có thể tạo một Agent với một công cụ do người dùng định nghĩa:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Định nghĩa các hàm công cụ
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4o-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Các khái niệm cốt lõi

Azure AI Agent Service có các khái niệm cốt lõi sau:

- **Agent**. Azure AI Agent Service tích hợp với Microsoft Foundry. Trong AI Foundry, một AI Agent hoạt động như một “microservice” thông minh có thể được sử dụng để trả lời câu hỏi (RAG), thực hiện hành động hoặc tự động hóa hoàn toàn các luồng công việc. Nó đạt được điều này bằng cách kết hợp sức mạnh của các mô hình sinh ngôn ngữ với các công cụ cho phép nó truy cập và tương tác với các nguồn dữ liệu thực tế. Đây là một ví dụ về một Agent:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4o-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Trong ví dụ này, một Agent được tạo với mô hình `gpt-4o-mini`, tên là `my-agent`, và hướng dẫn `You are helpful agent`. Agent được trang bị các công cụ và tài nguyên để thực hiện tác vụ giải thích mã (code interpretation).

- **Thread và messages**. Thread là một khái niệm quan trọng khác. Nó đại diện cho một cuộc hội thoại hoặc tương tác giữa một Agent và một người dùng. Threads có thể được sử dụng để theo dõi tiến trình của một cuộc hội thoại, lưu trữ thông tin bối cảnh và quản lý trạng thái của tương tác. Đây là một ví dụ về một thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Yêu cầu Agent thực hiện công việc trên thread
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Lấy và ghi log tất cả các messages để xem phản hồi của Agent
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Trong đoạn mã trên, một thread được tạo. Sau đó, một tin nhắn được gửi vào thread. Bằng cách gọi `create_and_process_run`, Agent được yêu cầu thực hiện công việc trên thread. Cuối cùng, các tin nhắn được lấy về và hiển thị để xem phản hồi của Agent. Các tin nhắn thể hiện tiến trình hội thoại giữa người dùng và Agent. Cũng cần hiểu rằng các tin nhắn có thể ở nhiều định dạng khác nhau như văn bản, hình ảnh hoặc tệp (ví dụ công việc của Agent tạo ra một hình ảnh hoặc văn bản). Với tư cách nhà phát triển, bạn có thể sử dụng thông tin này để xử lý tiếp phản hồi hoặc trình bày cho người dùng.

- **Tích hợp với Microsoft Agent Framework**. Azure AI Agent Service hoạt động liền mạch với Microsoft Agent Framework, có nghĩa là bạn có thể xây dựng Agent sử dụng `AzureAIProjectAgentProvider` và triển khai chúng thông qua Agent Service cho các kịch bản sản xuất.

**Trường hợp sử dụng**: Azure AI Agent Service được thiết kế cho các ứng dụng doanh nghiệp cần triển khai Agent AI an toàn, có thể mở rộng và linh hoạt.

## Điểm khác biệt giữa hai cách tiếp cận này là gì?
 
Nghe có vẻ như có sự chồng chéo, nhưng có một số khác biệt chính về thiết kế, khả năng và các trường hợp sử dụng mục tiêu:
 
- **Microsoft Agent Framework (MAF)**: Là một SDK sẵn sàng cho sản xuất để xây dựng các Agent AI. Nó cung cấp một API tinh gọn để tạo Agent với khả năng gọi công cụ, quản lý hội thoại và tích hợp định danh Azure.
- **Azure AI Agent Service**: Là một nền tảng và dịch vụ triển khai trong Azure Foundry cho các Agent. Nó cung cấp kết nối tích hợp sẵn tới các dịch vụ như Azure OpenAI, Azure AI Search, Bing Search và thực thi mã.
 
Vẫn chưa chắc chọn cái nào?

### Use Cases
 
Hãy xem liệu chúng tôi có thể giúp bạn bằng cách đi qua một số trường hợp sử dụng phổ biến:
 
> Q: Tôi đang xây dựng các ứng dụng tác nhân AI cho sản xuất và muốn bắt đầu nhanh
>

>A: Microsoft Agent Framework là một lựa chọn tuyệt vời. Nó cung cấp một API đơn giản, mang phong cách Python thông qua `AzureAIProjectAgentProvider` cho phép bạn định nghĩa các tác nhân với công cụ và hướng dẫn chỉ trong vài dòng mã.

>Q: Tôi cần triển khai cấp doanh nghiệp với tích hợp Azure như Search và thực thi mã
>
> A: Azure AI Agent Service là phù hợp nhất. Đó là một dịch vụ nền tảng cung cấp các khả năng tích hợp sẵn cho nhiều mô hình, Azure AI Search, Bing Search và Azure Functions. Nó giúp bạn dễ dàng xây dựng các tác nhân trong Foundry Portal và triển khai chúng ở quy mô.
 
> Q: Tôi vẫn bối rối, chỉ cho tôi một lựa chọn thôi
>
> A: Bắt đầu với Microsoft Agent Framework để xây dựng các tác nhân của bạn, và sau đó sử dụng Azure AI Agent Service khi bạn cần triển khai và mở rộng chúng trong sản xuất. Cách tiếp cận này cho phép bạn lặp nhanh trên logic tác nhân của mình trong khi có một lộ trình rõ ràng tới triển khai doanh nghiệp.
 
Let's summarize the key differences in a table:

| Framework | Focus | Core Concepts | Use Cases |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Streamlined agent SDK with tool calling | Agents, Tools, Azure Identity | Building AI agents, tool use, multi-step workflows |
| Azure AI Agent Service | Flexible models, enterprise security, Code generation, Tool calling | Modularity, Collaboration, Process Orchestration | Secure, scalable, and flexible AI agent deployment |

## Can I integrate my existing Azure ecosystem tools directly, or do I need standalone solutions?
Câu trả lời là có — bạn có thể tích hợp trực tiếp các công cụ trong hệ sinh thái Azure hiện có của mình với Azure AI Agent Service, vì dịch vụ này được xây dựng để hoạt động liền mạch với các dịch vụ Azure khác. Ví dụ, bạn có thể tích hợp Bing, Azure AI Search và Azure Functions. Ngoài ra còn có sự tích hợp sâu với Microsoft Foundry.

Microsoft Agent Framework cũng tích hợp với các dịch vụ Azure thông qua `AzureAIProjectAgentProvider` và Azure identity, cho phép bạn gọi trực tiếp các dịch vụ Azure từ các công cụ tác nhân của mình.

## Mã mẫu

- Python: [Agent Framework](./code_samples/02-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Còn thắc mắc về AI Agent Frameworks?

Tham gia [Discord Microsoft Foundry](https://aka.ms/ai-agents/discord) để gặp gỡ những người học khác, tham dự giờ hỗ trợ và nhận câu trả lời cho các câu hỏi về AI Agents của bạn.

## Tham khảo

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Dịch vụ Azure Agent</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Phản hồi Azure OpenAI</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Dịch vụ Azure AI Agent</a>

## Bài học trước

[Giới thiệu về AI Agents và các trường hợp sử dụng](../02-intro-to-ai-agents/README.md)

## Bài học tiếp theo

[Hiểu các Mẫu thiết kế Agentic](../04-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Miễn trừ trách nhiệm:

Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI Co-op Translator (https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng các bản dịch tự động có thể chứa lỗi hoặc không chính xác. Văn bản gốc bằng ngôn ngữ ban đầu nên được coi là nguồn chính thức. Đối với các thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm đối với bất kỳ sự hiểu nhầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->