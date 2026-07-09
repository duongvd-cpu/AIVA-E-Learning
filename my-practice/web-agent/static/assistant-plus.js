/**
 * assistant-plus.js — Tính năng bổ trợ cho mỗi bài học (additive):
 *   • "Tóm tắt nhanh"  → GET /api/lessons/{slug}/summary  → thẻ tóm tắt.
 *   • "Sơ đồ tư duy"   → GET /api/lessons/{slug}/mindmap   → render Mermaid (fallback flowchart).
 *   • "Thực hành"      → mở Trợ lý AI + tự gửi câu luyện tập (lesson-aware).
 * Dùng event delegation; không sửa file lõi.
 */
(function () {
    const summaryCache = {};
    const mindmapCache = {};
    let mermaidReady = false;

    function initMermaid() {
        if (mermaidReady || !window.mermaid) return;
        try {
            window.mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', mindmap: { padding: 10 } });
            mermaidReady = true;
        } catch (e) { console.warn('[mindmap] mermaid init loi:', e); }
    }

    function currentSlug() {
        const active = document.querySelector('.lesson-item.active');
        return window.currentLessonSlug || (active && active.dataset ? active.dataset.slug : null) || null;
    }
    function sanitize(html) {
        try { return (window.DOMPurify ? DOMPurify.sanitize(html) : html); } catch (e) { return html; }
    }

    // Chèn 3 nút vào thanh meta của bài học (idempotent)
    function ensureButtons() {
        const meta = document.querySelector('#lesson-header .lesson-meta');
        if (!meta) return;
        if (!meta.querySelector('.btn-lesson-summary')) {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'btn-lesson-summary';
            b.innerHTML = '<i class="ti ti-sparkles"></i> Tóm tắt nhanh';
            meta.appendChild(b);
        }
        if (!meta.querySelector('.btn-lesson-mindmap')) {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'btn-lesson-mindmap';
            b.innerHTML = '<i class="ti ti-sitemap"></i> Sơ đồ tư duy';
            meta.appendChild(b);
        }
        if (!meta.querySelector('.btn-lesson-practice')) {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'btn-lesson-practice';
            b.innerHTML = '<i class="ti ti-flask-2"></i> Thực hành';
            meta.appendChild(b);
        }
    }

    // ────────── TÓM TẮT ──────────
    function toggleSummary(btn) {
        const body = document.getElementById('lesson-body');
        if (!body) return;
        const existing = document.getElementById('lesson-summary-card');
        if (existing) { existing.remove(); if (btn) btn.innerHTML = '<i class="ti ti-sparkles"></i> Tóm tắt nhanh'; return; }
        const slug = currentSlug();
        if (!slug) { body.insertAdjacentHTML('afterbegin', '<div id="lesson-summary-card" class="lesson-summary-card"><div class="ls-error">Hãy mở một bài học trước.</div></div>'); return; }
        if (btn) btn.innerHTML = '<i class="ti ti-x"></i> Ẩn tóm tắt';
        const card = document.createElement('div');
        card.id = 'lesson-summary-card'; card.className = 'lesson-summary-card';
        card.innerHTML =
            '<div class="lesson-summary-head"><span class="ls-title"><i class="ti ti-sparkles"></i> Tóm tắt nhanh</span>' +
            '<div class="ls-actions"><button class="ls-refresh" title="Tạo lại"><i class="ti ti-refresh"></i></button>' +
            '<button class="ls-close" title="Đóng"><i class="ti ti-x"></i></button></div></div>' +
            '<div class="lesson-summary-body"><div class="ls-loading"><span class="ls-spinner"></span> Đang gói gọn nội dung bài học…</div></div>';
        body.insertBefore(card, body.firstChild);
        card.querySelector('.ls-close').addEventListener('click', () => toggleSummary(btn));
        card.querySelector('.ls-refresh').addEventListener('click', () => loadSummary(slug, card, true));
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        loadSummary(slug, card, false);
    }
    async function loadSummary(slug, card, refresh) {
        const bodyEl = card.querySelector('.lesson-summary-body');
        if (!refresh && summaryCache[slug]) { bodyEl.innerHTML = renderSummary(summaryCache[slug]); return; }
        bodyEl.innerHTML = '<div class="ls-loading"><span class="ls-spinner"></span> Đang gói gọn nội dung bài học…</div>';
        try {
            const url = '/api/lessons/' + encodeURIComponent(slug) + '/summary' + (refresh ? '?refresh=true' : '');
            const res = await fetch(url);
            if (!res.ok) { let d = ''; try { d = (await res.json()).detail || ''; } catch (e) {} throw new Error('HTTP ' + res.status + (d ? ' — ' + d : '')); }
            const data = await res.json();
            summaryCache[slug] = data.summary_html || '';
            bodyEl.innerHTML = renderSummary(summaryCache[slug]);
        } catch (err) {
            bodyEl.innerHTML = '<div class="ls-error"><i class="ti ti-alert-triangle"></i> Không tạo được tóm tắt (' + err.message + '). Thử lại nhé.</div>';
        }
    }
    function renderSummary(html) {
        return sanitize(html) + '<div class="ls-foot"><i class="ti ti-robot"></i> Tóm tắt bởi Trợ lý AI — hãy đối chiếu với bài gốc khi cần.</div>';
    }

    // ────────── SƠ ĐỒ TƯ DUY ──────────
    function toggleMindmap(btn) {
        const body = document.getElementById('lesson-body');
        if (!body) return;
        const existing = document.getElementById('lesson-mindmap-card');
        if (existing) { existing.remove(); if (btn) btn.innerHTML = '<i class="ti ti-sitemap"></i> Sơ đồ tư duy'; return; }
        const slug = currentSlug();
        if (!slug) { body.insertAdjacentHTML('afterbegin', '<div id="lesson-mindmap-card" class="lesson-summary-card"><div class="ls-error">Hãy mở một bài học trước.</div></div>'); return; }
        if (btn) btn.innerHTML = '<i class="ti ti-x"></i> Ẩn sơ đồ';
        const card = document.createElement('div');
        card.id = 'lesson-mindmap-card'; card.className = 'lesson-summary-card lesson-mindmap-card';
        card.innerHTML =
            '<div class="lesson-summary-head"><span class="ls-title"><i class="ti ti-sitemap"></i> Sơ đồ tư duy</span>' +
            '<div class="ls-actions"><button class="mm-zoom" title="Phóng to"><i class="ti ti-arrows-maximize"></i></button>' +
            '<button class="mm-refresh" title="Tạo lại"><i class="ti ti-refresh"></i></button>' +
            '<button class="mm-close" title="Đóng"><i class="ti ti-x"></i></button></div></div>' +
            '<div class="mm-canvas"><div class="ls-loading"><span class="ls-spinner"></span> Đang vẽ sơ đồ tư duy…</div></div>';
        body.insertBefore(card, body.firstChild);
        card.querySelector('.mm-close').addEventListener('click', () => toggleMindmap(btn));
        card.querySelector('.mm-refresh').addEventListener('click', () => loadMindmap(slug, card, true));
        card.querySelector('.mm-zoom').addEventListener('click', () => openZoom(card));
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        loadMindmap(slug, card, false);
    }
    function stripFences(code) {
        return String(code || '').replace(/```[a-zA-Z]*/g, '').trim();
    }
    // Dự phòng: chuyển mã "mindmap" -> "graph TD" (flowchart) khi mindmap lỗi cú pháp.
    // Dựa vào mức thụt lề để suy ra quan hệ cha–con.
    function mindmapToFlowchart(code) {
        const lines = stripFences(code).split('\n');
        const items = [];
        for (let raw of lines) {
            if (!raw.trim()) continue;
            const expanded = raw.replace(/\t/g, '    ');
            const indent = expanded.length - expanded.replace(/^ +/, '').length;
            let text = expanded.trim();
            if (/^mindmap\b/i.test(text)) continue;
            // Lấy nội dung bên trong shape mindmap: root((x)), (x), [x], {x}
            const shape = text.match(/[\(\[\{]{1,2}\s*([^\)\]\}]*?)\s*[\)\]\}]{1,2}\s*$/);
            if (shape) text = shape[1];
            text = text.replace(/["\[\]{}<>|()]/g, ' ').replace(/\s+/g, ' ').trim();
            if (!text) continue;
            items.push({ indent: indent, text: text });
        }
        if (!items.length) return null;
        let out = 'graph TD\n';
        const stack = [];
        items.forEach(function (it, i) {
            const id = 'n' + i;
            out += '  ' + id + '["' + it.text + '"]\n';
            while (stack.length && stack[stack.length - 1].indent >= it.indent) stack.pop();
            if (stack.length) out += '  ' + stack[stack.length - 1].id + ' --> ' + id + '\n';
            stack.push({ indent: it.indent, id: id });
        });
        return out;
    }
    async function renderMermaid(canvas, code) {
        const id = 'mm-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        const out = await window.mermaid.render(id, code);
        canvas.innerHTML = out.svg;
    }
    async function loadMindmap(slug, card, refresh) {
        const canvas = card.querySelector('.mm-canvas');
        initMermaid();
        canvas.innerHTML = '<div class="ls-loading"><span class="ls-spinner"></span> Đang vẽ sơ đồ tư duy…</div>';
        try {
            let code = (!refresh && mindmapCache[slug]) ? mindmapCache[slug] : null;
            if (!code) {
                const url = '/api/lessons/' + encodeURIComponent(slug) + '/mindmap' + (refresh ? '?refresh=true' : '');
                const res = await fetch(url);
                if (!res.ok) { let d = ''; try { d = (await res.json()).detail || ''; } catch (e) {} throw new Error('HTTP ' + res.status + (d ? ' — ' + d : '')); }
                code = (await res.json()).mermaid || '';
                mindmapCache[slug] = code;
            }
            if (!window.mermaid) throw new Error('Chưa tải được thư viện Mermaid');
            code = stripFences(code);
            try {
                await renderMermaid(canvas, code);
            } catch (mindErr) {
                // Fallback: mindmap lỗi cú pháp -> vẽ dạng sơ đồ khối (flowchart)
                console.warn('[mindmap] loi cu phap mindmap, thu flowchart:', mindErr);
                const fc = mindmapToFlowchart(code);
                if (!fc) throw mindErr;
                await renderMermaid(canvas, fc);
                canvas.insertAdjacentHTML('afterbegin', '<div class="mm-note"><i class="ti ti-info-circle"></i> Sơ đồ mind map bị lỗi cú pháp nên đã hiển thị ở dạng sơ đồ khối.</div>');
            }
        } catch (err) {
            canvas.innerHTML = '<div class="ls-error"><i class="ti ti-alert-triangle"></i> Không vẽ được sơ đồ (' + err.message + '). Bấm tạo lại để thử lần nữa.</div>' +
                '<details class="tool-detail"><summary>Xem mã sơ đồ</summary><pre style="white-space:pre-wrap;font-size:.78rem">' +
                (mindmapCache[slug] ? mindmapCache[slug].replace(/</g, '&lt;') : '') + '</pre></details>';
        }
    }
    function openZoom(card) {
        const svg = card.querySelector('.mm-canvas svg');
        if (!svg) return;
        const ov = document.createElement('div');
        ov.className = 'mm-overlay';
        ov.innerHTML = '<div class="mm-overlay-inner">' + svg.outerHTML + '</div><button class="mm-overlay-close" title="Đóng"><i class="ti ti-x"></i></button>';
        ov.addEventListener('click', () => ov.remove());
        document.body.appendChild(ov);
    }

    // ────────── THỰC HÀNH: mở chat + tự gửi câu luyện tập ──────────
    function focusChat(prefill) {
        const widget = document.getElementById('agent-widget');
        const navToggle = document.getElementById('btn-toggle-agent');
        const fab = document.getElementById('agent-fab');
        // Mở Trợ lý nếu đang đóng
        if (widget && !widget.classList.contains('open')) {
            if (navToggle) navToggle.click(); else if (fab) fab.click();
        }
        const input = document.getElementById('user-input');
        if (input) {
            if (prefill) { input.value = prefill; input.dispatchEvent(new Event('input')); }
            input.focus();
            try { input.setSelectionRange(input.value.length, input.value.length); } catch (e) {}
            input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    function submitChat() {
        const form = document.getElementById('chat-form');
        if (!form) return false;
        if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        return true;
    }
    function startPractice() {
        const prompt = 'Cho mình một bài thực hành ngắn về bài học này, kèm hướng dẫn từng bước và câu hỏi để mình luyện tập.';
        focusChat(prompt);
        // Tự gửi luôn cho đúng tinh thần "thực hành ngay" (chờ Trợ lý mở + input nhận value)
        setTimeout(submitChat, 320);
    }

    // ────────── Event delegation ──────────
    document.addEventListener('click', function (e) {
        if (!e.target.closest) return;
        const s = e.target.closest('.btn-lesson-summary');
        if (s) { e.preventDefault(); toggleSummary(s); return; }
        const m = e.target.closest('.btn-lesson-mindmap');
        if (m) { e.preventDefault(); toggleMindmap(m); return; }
        const pr = e.target.closest('.btn-lesson-practice');
        if (pr) { e.preventDefault(); startPractice(); return; }
    });

    // Theo dõi header: chỉ dọn thẻ khi ĐỔI BÀI (slug khác), tránh tự xóa khi nút đổi nhãn
    let lastSlug = window.currentLessonSlug || null;
    const header = document.getElementById('lesson-header');
    if (header) {
        new MutationObserver(function () {
            const s = window.currentLessonSlug || null;
            if (s !== lastSlug) {
                lastSlug = s;
                ['lesson-summary-card', 'lesson-mindmap-card'].forEach(function (id) {
                    const el = document.getElementById(id); if (el) el.remove();
                });
            }
            ensureButtons();
        }).observe(header, { childList: true, subtree: true });
    }
    document.addEventListener('DOMContentLoaded', function () { initMermaid(); ensureButtons(); });
    initMermaid();
    console.log('[assistant-plus] loaded');
})();
