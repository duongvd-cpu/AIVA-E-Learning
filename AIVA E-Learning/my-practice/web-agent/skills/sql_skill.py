import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "company.db")

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY,
            name TEXT,
            department TEXT,
            salary INTEGER
        )
    ''')
    
    # Check if table is empty
    c.execute("SELECT COUNT(*) FROM employees")
    if c.fetchone()[0] == 0:
        c.execute("INSERT INTO employees (name, department, salary) VALUES ('Nguyen Van A', 'IT', 2000)")
        c.execute("INSERT INTO employees (name, department, salary) VALUES ('Tran Thi B', 'HR', 1500)")
        c.execute("INSERT INTO employees (name, department, salary) VALUES ('Le Van C', 'IT', 2200)")
        c.execute("INSERT INTO employees (name, department, salary) VALUES ('Pham Thi D', 'Marketing', 1800)")
        c.execute("INSERT INTO employees (name, department, salary) VALUES ('Hoang Van E', 'Director', 5000)")
        conn.commit()
    conn.close()

# Tự động tạo DB khi module được load
init_db()

def execute_sql_query(query: str) -> str:
    """
    Thực thi một câu lệnh SQL SELECT trên bảng `employees` (id, name, department, salary).
    CHÚ Ý: Chỉ cho phép các lệnh SELECT (chỉ đọc). Không được dùng UPDATE, DELETE, DROP.
    """
    query = query.strip()
    if not query.upper().startswith("SELECT"):
        return "Lỗi: Agent chỉ được phép thực thi lệnh SELECT."
        
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute(query)
        rows = c.fetchall()
        
        if not rows:
            return "Không tìm thấy kết quả nào."
            
        # Lấy tên cột
        column_names = [description[0] for description in c.description]
        
        # Format kết quả
        result = [dict(zip(column_names, row)) for row in rows]
        conn.close()
        return str(result)
    except Exception as e:
        return f"Lỗi thực thi SQL: {str(e)}"

# Cấu hình Agent (Prompt)
SYSTEM_PROMPT = """Bạn là SQL Data Analyst Agent (Chuyên gia phân tích dữ liệu).
Nhiệm vụ của bạn là trả lời các câu hỏi về nhân sự của công ty.
Bạn có quyền truy cập vào bảng cơ sở dữ liệu `employees` với các cột: 
- `id` (INTEGER)
- `name` (TEXT)
- `department` (TEXT)
- `salary` (INTEGER)

Khi người dùng hỏi (ví dụ: 'có bao nhiêu nhân viên phòng IT?'), hãy:
1. Viết một câu lệnh SQL SELECT tương ứng (ví dụ: SELECT COUNT(*) FROM employees WHERE department='IT').
2. Gọi công cụ `execute_sql_query` và truyền câu lệnh SQL đó vào.
3. Nhận kết quả từ công cụ và trả lời người dùng bằng ngôn ngữ tự nhiên.
"""

TOOLS = [execute_sql_query]
