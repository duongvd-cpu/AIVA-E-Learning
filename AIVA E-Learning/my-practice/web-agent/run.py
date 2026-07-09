if __name__ == "__main__":
    import uvicorn
    # Sử dụng port 8899 để phù hợp cho lĩnh vực giáo dục
    print("🚀 Khởi động Web Agent tại http://localhost:8899")
    uvicorn.run("main:app", host="127.0.0.1", port=8899, reload=True)
