import os
import chromadb
import google.generativeai as genai

# Đường dẫn đến thư mục chứa ChromaDB
CHROMA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "chroma_db")
KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "sconnect_knowledge.txt")

# Khởi tạo ChromaDB Client (Lưu tại local)
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_or_create_collection(name="sconnect_knowledge")

def init_knowledge_base():
    """Đọc file text và lưu vào Vector Database nếu Collection đang trống"""
    if collection.count() == 0:
        print("🛠️ Đang nhúng dữ liệu vào Vector Database (ChromaDB)...")
        if os.path.exists(KNOWLEDGE_FILE):
            with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Chia nhỏ văn bản theo các tiêu đề (đơn giản hóa)
            chunks = content.split("##")
            
            documents = []
            ids = []
            for i, chunk in enumerate(chunks):
                chunk = chunk.strip()
                if chunk:
                    documents.append(chunk)
                    ids.append(f"doc_{i}")
            
            # Đưa vào ChromaDB. Mặc định nó sẽ tự dùng sentence-transformers để embed.
            collection.add(
                documents=documents,
                ids=ids
            )
            print("✅ Đã khởi tạo xong Vector Database!")
        else:
            print("❌ Không tìm thấy file knowledge base.")

# Tự động nạp dữ liệu khi load module
init_knowledge_base()

def search_vector_database(query) -> str:
    """
    Tìm kiếm thông tin trong cơ sở dữ liệu tri thức của công ty bằng Semantic Search (Vector RAG).
    Hàm này lấy thông tin về Tầm nhìn, Sứ mệnh, Sản phẩm (IP), hoặc Khoá học AI của Sconnect.
    """
    # Xử lý ngoại lệ về định dạng của biến query (ép kiểu) để tránh lỗi 'Expected document to be a str'
    if isinstance(query, dict):
        query = query.get("query", str(query))
    elif isinstance(query, list):
        query = " ".join(str(x) for x in query)
    elif not isinstance(query, str):
        query = str(query)
        
    try:
        results = collection.query(
            query_texts=[query],
            n_results=2 # Lấy 2 đoạn văn bản liên quan nhất
        )
        
        # Kết quả trả về là một dictionary chứa mảng documents
        documents = results.get("documents")
        if not documents or not documents[0]:
            return "Không tìm thấy thông tin nào liên quan trong Cơ sở dữ liệu."
            
        # Trả về các đoạn text tìm được
        context = "\n\n---\n\n".join(documents[0])
        return f"Dữ liệu tìm được từ Knowledge Base:\n{context}"
    except Exception as e:
        return f"Lỗi truy vấn Vector DB: {str(e)}"

# Cấu hình Agent (Prompt)
SYSTEM_PROMPT = """Bạn là Researcher Agent (Chuyên gia Tìm kiếm Tri thức).
Nhiệm vụ của bạn là giải đáp các thắc mắc về Công ty Sconnect, các dự án, IP, hoặc kiến thức chuyên môn nội bộ.
Bạn phải LUÔN LUÔN sử dụng công cụ `search_vector_database` để đọc tài liệu trước khi trả lời.
KHÔNG ĐƯỢC tự bịa ra thông tin. Chỉ sử dụng thông tin được công cụ trả về.
"""

TOOLS = [search_vector_database]

# BẮT BUỘC PHẢI CÓ biến FUNCTIONS để Orchestrator trong main.py có thể map tên tool string thành hàm thực thi
FUNCTIONS = {
    "search_vector_database": search_vector_database
}

SCHEMAS = [
    genai.protos.FunctionDeclaration(
        name="search_vector_database",
        description="Tìm kiếm thông tin trong cơ sở dữ liệu tri thức của công ty bằng Semantic Search (Vector RAG).",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "query": genai.protos.Schema(
                    type=genai.protos.Type.STRING,
                    description="Từ khóa để tìm kiếm (vd: 'AI Agents for Beginners', 'Sconnect')."
                )
            },
            required=["query"]
        )
    )
]
