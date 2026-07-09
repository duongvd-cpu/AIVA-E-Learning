/**
 * onboarding.js — [ADR-005] Huong dan nguoi dung khi bat dau
 * - Modal chao mung lan dau (localStorage: onboarding_seen)
 * - Tour 4 buoc: nen mo (spotlight) + vung sang noi bat + coach-mark
 * - Nut "Huong dan" (#btn-guide) de xem lai bat cu luc nao
 * Khong dung backend.
 */
(function () {
    const STEPS = [
        { sel: '#lesson-sidebar', title: 'Lộ trình học của bạn', desc: '16 bài nền tảng, học lần lượt từ trên xuống. Các bài chuyên sâu nằm trong nhóm "Nâng cao / Đọc thêm".' },
        { sel: '#lesson-content-wrapper', title: 'Đọc bài ở đây', desc: 'Nội dung bài hiển thị ở khung giữa, kèm video và hình minh hoạ. Bên phải có Mục lục để nhảy nhanh giữa các phần.' },
        { sel: '#agent-widget:not([aria-hidden="true"]), #agent-fab, #btn-toggle-agent', title: 'Trợ lý AI luôn ở đây', desc: 'Bấm bong bóng góc dưới bên phải (hoặc nút "Trợ lý AI" trên thanh trên) để mở Trợ lý AI và hỏi bất cứ lúc nào.' },
        { sel: '#lesson-content-wrapper', title: 'Bôi đen để hỏi nhanh', desc: 'Chọn một đoạn khó trong bài rồi bấm nút "Hỏi Agent" để được giải thích ngay đoạn đó.' }
    ];

    let idx = 0;
    let backdrop, modal, card, tourBg, highlighted, prevInlinePos;

    function el(tag, cls, html) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html != null) e.innerHTML = html;
        return e;
    }

    function isVisible(node) {
        if (!node) return false;
        if (node.offsetParent === null && getComputedStyle(node).position !== 'fixed') return false;
        const r = node.getBoundingClientRect();
        return r.width > 2 && r.height > 2;
    }

    function resolveTarget(sel) {
        const list = sel.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        for (var i = 0; i < list.length; i++) {
            var node = document.querySelector(list[i]);
            if (node && isVisible(node)) return node;
        }
        for (var j = 0; j < list.length; j++) {
            var n2 = document.querySelector(list[j]);
            if (n2) return n2;
        }
        return null;
    }

    function ensureNodes() {
        if (card) return;

        tourBg = el('div', 'ob-tour-backdrop');
        document.body.appendChild(tourBg);

        card = el('div', 'ob-card');
        card.innerHTML = ''
            + '<div class="ob-card-head">'
            + '  <span class="ob-step" id="ob-step">Bước 1/' + STEPS.length + '</span>'
            + '  <button class="ob-skip" id="ob-skip">Bỏ qua</button>'
            + '</div>'
            + '<div class="ob-title" id="ob-title"></div>'
            + '<div class="ob-desc" id="ob-desc"></div>'
            + '<div class="ob-foot">'
            + '  <div class="ob-dots" id="ob-dots"></div>'
            + '  <div class="ob-nav">'
            + '    <button class="ob-btn" id="ob-prev">Quay lại</button>'
            + '    <button class="ob-btn ob-btn-primary" id="ob-next">Tiếp</button>'
            + '  </div>'
            + '</div>';
        document.body.appendChild(card);

        var dots = card.querySelector('#ob-dots');
        STEPS.forEach(function () { dots.appendChild(el('span', 'ob-dot')); });

        card.querySelector('#ob-skip').onclick = finish;
        card.querySelector('#ob-prev').onclick = function () { if (idx > 0) { idx--; render(); } };
        card.querySelector('#ob-next').onclick = function () {
            if (idx < STEPS.length - 1) { idx++; render(); } else { finish(); }
        };
    }

    function clearHighlight() {
        if (highlighted) {
            highlighted.classList.remove('onboarding-highlight');
            if (prevInlinePos !== undefined) {
                highlighted.style.position = prevInlinePos;
                prevInlinePos = undefined;
            }
            highlighted = null;
        }
    }

    function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }

    function placeCard(target) {
        var r = target.getBoundingClientRect();
        var cw = card.offsetWidth || 320;
        var ch = card.offsetHeight || 190;
        var vw = window.innerWidth, vh = window.innerHeight, m = 14;
        var top, left;
        if (r.right + cw + m < vw) { left = r.right + m; top = clamp(r.top, m, vh - ch - m); }
        else if (r.left - cw - m > 0) { left = r.left - cw - m; top = clamp(r.top, m, vh - ch - m); }
        else if (r.bottom + ch + m < vh) { top = r.bottom + m; left = clamp(r.left, m, vw - cw - m); }
        else if (r.top - ch - m > 0) { top = r.top - ch - m; left = clamp(r.left, m, vw - cw - m); }
        else { top = (vh - ch) / 2; left = clamp(r.left, m, vw - cw - m); }
        card.style.top = top + 'px';
        card.style.left = left + 'px';
    }

    function render() {
        clearHighlight();
        var step = STEPS[idx];
        var target = resolveTarget(step.sel);

        card.querySelector('#ob-step').textContent = 'Bước ' + (idx + 1) + '/' + STEPS.length;
        card.querySelector('#ob-title').textContent = step.title;
        card.querySelector('#ob-desc').textContent = step.desc;
        card.querySelector('#ob-prev').style.visibility = idx === 0 ? 'hidden' : 'visible';
        card.querySelector('#ob-next').textContent = (idx === STEPS.length - 1) ? 'Xong' : 'Tiếp';
        Array.prototype.forEach.call(card.querySelectorAll('.ob-dot'), function (d, k) { d.classList.toggle('on', k === idx); });

        if (tourBg) tourBg.classList.add('show');
        card.style.display = 'block';
        card.style.transform = '';

        if (target && isVisible(target)) {
            var pos = getComputedStyle(target).position;
            if (pos === 'static') {
                prevInlinePos = target.style.position || '';
                target.style.position = 'relative';
            }
            target.classList.add('onboarding-highlight');
            highlighted = target;
            try { target.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
            setTimeout(function () { placeCard(target); }, 130);
        } else {
            card.style.top = '50%';
            card.style.left = '50%';
            card.style.transform = 'translate(-50%,-50%)';
        }
    }

    function startTour() {
        hideWelcome();
        ensureNodes();
        idx = 0;
        render();
    }

    function finish() {
        clearHighlight();
        if (card) card.style.display = 'none';
        if (tourBg) tourBg.classList.remove('show');
        hideWelcome();
        try { localStorage.setItem('onboarding_seen', '1'); } catch (e) {}
    }

    function showWelcome() {
        backdrop = el('div', 'ob-backdrop');
        modal = el('div', 'ob-modal', ''
            + '<div class="ob-welcome-icon">🎓</div>'
            + '<h2>Chào mừng đến Trung tâm Đào tạo AI Agents</h2>'
            + '<p>Đây là nơi bạn học cách xây dựng và làm chủ AI Agent — theo một lộ trình 16 bài từ cơ bản đến vận dụng.</p>'
            + '<p class="ob-welcome-sub">Mất 30 giây để xem cách dùng trang này nhé?</p>'
            + '<div class="ob-welcome-actions">'
            + '  <button class="ob-btn" id="ob-welcome-skip">Để sau</button>'
            + '  <button class="ob-btn ob-btn-primary" id="ob-welcome-start">Bắt đầu hướng dẫn</button>'
            + '</div>');
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);
        modal.querySelector('#ob-welcome-start').onclick = startTour;
        modal.querySelector('#ob-welcome-skip').onclick = finish;
    }

    function hideWelcome() {
        if (backdrop) { backdrop.remove(); backdrop = null; modal = null; }
    }

    window.addEventListener('resize', function () {
        if (card && card.style.display === 'block' && highlighted) placeCard(highlighted);
    });

    document.addEventListener('DOMContentLoaded', function () {
        var guideBtn = document.getElementById('btn-guide');
        if (guideBtn) guideBtn.addEventListener('click', startTour);

        var seen = false;
        try { seen = localStorage.getItem('onboarding_seen') === '1'; } catch (e) {}
        if (!seen) setTimeout(showWelcome, 900);
    });
})();
