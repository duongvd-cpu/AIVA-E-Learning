document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatHistory = document.getElementById('chat-history');
    const typingIndicator = document.getElementById('typing-indicator');
    const btnReset = document.getElementById('btn-reset');

    // Tải cấu trúc Hệ thống
    async function fetchSystemStatus() {
        try {
            const res = await fetch('/api/system_status');
            const data = await res.json();
            
            const treeContainer = document.getElementById('system-tree');
            treeContainer.innerHTML = '';

            // 1. Orchestrator
            let orchHTML = `
                <div class="tree-node agent-node">
                    <div class="node-title"><i class="ti ti-hierarchy-2"></i> ${data.orchestrator.name} <span class="badge" style="background:#3b82f6">Lõi</span></div>
                    <ul class="tool-list">
                        ${data.orchestrator.tools.map(t => `<li id="tool-${t.name}" title="${t.description}"><i class="ti ti-tool"></i> ${t.name}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            // 2. Sub-agents (Skills)
            let skillsHTML = data.skills.map(s => `
                <div class="tree-node sub-agent-node" id="agent-${s.id}">
                    <div class="node-title" title="${s.description}"><i class="ti ti-robot"></i> ${s.name}</div>
                    <ul class="tool-list">
                        ${s.tools.map(t => `<li id="tool-${t.name}" title="${t.description}"><i class="ti ti-point-filled"></i> ${t.name}</li>`).join('')}
                    </ul>
                </div>
            `).join('');

            // 3. Knowledge Bases
            let kbHTML = `
                <div class="tree-node kb-node">
                    <div class="node-title"><i class="ti ti-books"></i> Thư viện Tri thức</div>
                    <ul class="tool-list">
                        ${data.knowledge_bases.map(kb => `<li><i class="ti ti-database"></i> ${kb.name} <small style="color:#6b7280">(${kb.type})</small></li>`).join('')}
                    </ul>
                </div>
            `;

            treeContainer.innerHTML = orchHTML + skillsHTML + kbHTML;
        } catch (error) {
            document.getElementById('system-tree').innerHTML = '<div class="loading-text" style="color: #ef4444;">Lỗi tải System Status</div>';
        }
    }

    fetchSystemStatus();

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.value === '') {
            this.style.height = 'auto';
        }
    });

    // Handle Enter key (Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // Reset Chat
    btnReset.addEventListener('click', async () => {
        if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?')) {
            await fetch('/reset', { method: 'POST' });
            
            // Xóa tất cả tin nhắn trừ Welcome message
            const welcomeMsg = chatHistory.firstElementChild;
            chatHistory.innerHTML = '';
            if (welcomeMsg) chatHistory.appendChild(welcomeMsg);
        }
    });

    // Render markdown to HTML safely
    function renderMarkdown(text) {
        const rawHtml = marked.parse(text);
        return DOMPurify.sanitize(rawHtml);
    }

    function scrollToBottom() {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function appendMessage(role, contentHtml) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-message`;
        
        const avatar = role === 'user' ? '<i class="ti ti-user"></i>' : '<i class="ti ti-robot"></i>';
        
        msgDiv.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div class="message-content">${contentHtml}</div>
        `;
        
        chatHistory.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    }

    // [ADR-005] Chế độ thân thiện: dịch tên tool kỹ thuật sang trạng thái dễ hiểu
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function friendlyToolLabel(toolName) {
        const t = (toolName || '').toLowerCase();
        if (t.includes('vector') || t.includes('rag')) return 'Đang tra cứu kho tri thức…';
        if (t.includes('sql')) return 'Đang truy vấn dữ liệu nhân sự…';
        if (t.includes('webpage') || t.includes('read_web')) return 'Đang đọc nội dung trang web…';
        if (t.includes('knowledge_base') || t.includes('company_document') || t.includes('researcher')) return 'Đang tìm trong tài liệu…';
        if (t.includes('weather') || t.includes('time')) return 'Đang lấy thông tin thời tiết / thời gian…';
        if (t.includes('memory')) return 'Đang xử lý bộ nhớ…';
        if (t.includes('plan')) return 'Đang lập kế hoạch…';
        if (t.includes('think') || t.includes('reflect')) return 'Đang suy ngẫm…';
        if (t.includes('scan_system')) return 'Đang kiểm tra hệ thống…';
        if (t.includes('note') || t.includes('scratchpad')) return 'Đang ghi chú…';
        if (t.includes('calculate')) return 'Đang tính toán…';
        if (t.includes('delegate') || t.includes('orchestrator') || t.includes('gọi')) return 'Đang giao việc cho trợ lý chuyên trách…';
        return 'Đang xử lý…';
    }

    function friendlyToolDone(toolName) {
        return friendlyToolLabel(toolName).replace('Đang', 'Đã').replace('…', '.');
    }

    function appendToolEvent(toolName, args) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'tool-event';
        eventDiv.id = `tool-event-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

        let argsStr = '';
        try { argsStr = JSON.stringify(args); } catch (e) { argsStr = String(args); }

        eventDiv.innerHTML = `
            <div class="spinner"></div>
            <span class="tool-friendly">${friendlyToolLabel(toolName)}</span>
            <details class="tool-detail">
                <summary>Xem chi tiết kỹ thuật</summary>
                <code>${escapeHtml(toolName)}(${escapeHtml(argsStr.slice(0, 300))})</code>
            </details>
        `;

        chatHistory.appendChild(eventDiv);
        scrollToBottom();
        return eventDiv.id;
    }

    function updateToolEventResult(eventId, toolName, result) {
        const eventDiv = document.getElementById(eventId);
        if (!eventDiv) return;
        eventDiv.className = 'tool-event tool-result';
        const resStr = (typeof result === 'string') ? result : JSON.stringify(result);
        eventDiv.innerHTML = `
            <span class="tool-friendly"><i class="ti ti-circle-check"></i> ${friendlyToolDone(toolName)}</span>
            <details class="tool-detail">
                <summary>Xem chi tiết kỹ thuật</summary>
                <code>${escapeHtml(toolName)} → ${escapeHtml((resStr || '').slice(0, 500))}</code>
            </details>
        `;
        scrollToBottom();
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;

        // Reset input
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Disable input while processing
        userInput.disabled = true;
        
        // Show user message
        appendMessage('user', DOMPurify.sanitize(message).replace(/\n/g, '<br>'));
        
        // Prepare for agent message
        typingIndicator.classList.remove('hidden');
        scrollToBottom();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: message,
                    lesson_slug: window.currentLessonSlug || null  // Sprint 5: Lesson-Aware
                })
            });

            if (!response.body) throw new Error('ReadableStream not supported');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let agentMessageDiv = null;
            let agentContentDiv = null;
            let fullText = '';
            
            // Dùng map lưu trữ event ID để update khi có result
            let activeToolEvents = {};

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6);
                        if (!dataStr) continue;
                        
                        try {
                            const data = JSON.parse(dataStr);
                            
                            if (data.type === 'tool_call') {
                                // Ẩn typing
                                typingIndicator.classList.add('hidden');
                                // Hiển thị tool event trong chat
                                const eventId = appendToolEvent(data.tool, data.args);
                                activeToolEvents[data.tool] = eventId;
                                
                                // Bật sáng UI Sidebar Tree
                                const toolElement = document.getElementById(`tool-${data.tool}`);
                                if (toolElement) {
                                    toolElement.classList.add('active-highlight', 'active-tool');
                                    // Highlight Parent Node
                                    const parentNode = toolElement.closest('.tree-node');
                                    if (parentNode) parentNode.style.borderColor = '#7fd603';
                                }
                            } 
                            else if (data.type === 'tool_result') {
                                const eventId = activeToolEvents[data.tool];
                                if (eventId) {
                                    updateToolEventResult(eventId, data.tool, data.result);
                                }
                                
                                // Tắt sáng UI Sidebar Tree sau 1.5s
                                const toolElement = document.getElementById(`tool-${data.tool}`);
                                if (toolElement) {
                                    setTimeout(() => {
                                        toolElement.classList.remove('active-highlight', 'active-tool');
                                        const parentNode = toolElement.closest('.tree-node');
                                        if (parentNode) parentNode.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    }, 1500);
                                }

                                typingIndicator.classList.remove('hidden');
                                scrollToBottom();
                            }
                            else if (data.type === 'text') {
                                typingIndicator.classList.add('hidden');
                                
                                if (!agentMessageDiv) {
                                    agentMessageDiv = appendMessage('agent', '');
                                    agentContentDiv = agentMessageDiv.querySelector('.message-content');
                                }
                                
                                fullText += data.content;
                                agentContentDiv.innerHTML = renderMarkdown(fullText);
                                scrollToBottom();
                            }
                            else if (data.type === 'error') {
                                typingIndicator.classList.add('hidden');
                                appendMessage('agent', `<span style="color: #ef4444;">Lỗi: ${data.message}</span>`);
                            }
                        } catch (e) {
                            console.error('Error parsing stream data:', e, dataStr);
                        }
                    }
                }
            }
            
        } catch (error) {
            console.error('Fetch error:', error);
            typingIndicator.classList.add('hidden');
            appendMessage('agent', '<span style="color: #ef4444;">Lỗi kết nối tới server. Vui lòng thử lại.</span>');
        } finally {
            typingIndicator.classList.add('hidden');
            userInput.disabled = false;
            userInput.focus();
        }
    });
});
