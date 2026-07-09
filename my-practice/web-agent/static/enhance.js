/**
 * enhance.js — [ADR-005] Lớp "giàu tính education": thanh % đọc từng bài,
 * toast động viên, và tinh chỉnh icon Tabler. Không sửa file lõi.
 */
(function () {
    var KEY = 'lessonProgress';
    function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
    function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
    var prog = load();

    function pct(slug) { return Math.round(prog[slug] || 0); }

    // ── Chèn thanh % vào từng lesson-item ──
    function ensureBar(item) {
        if (item.querySelector('.lp-track')) { updateBar(item); return; }
        var slug = item.dataset.slug; if (!slug) return;
        var t = document.createElement('div'); t.className = 'lp-track';
        var f = document.createElement('div'); f.className = 'lp-fill';
        t.appendChild(f); item.appendChild(t);
        f.style.width = pct(slug) + '%';
    }
    function updateBar(item) {
        var slug = item.dataset.slug; var f = item.querySelector('.lp-fill');
        if (slug && f) f.style.width = pct(slug) + '%';
    }

    // ── Đổi emoji tiêu đề nhóm sang icon Tabler ──
    function iconizeHeadings() {
        document.querySelectorAll('.section-title').forEach(function (el) {
            if (el.dataset.iconized) return;
            if (el.innerHTML.indexOf('🌱') >= 0) { el.innerHTML = el.innerHTML.replace('🌱', '<i class="ti ti-route"></i>'); el.dataset.iconized = '1'; }
            else if (el.innerHTML.indexOf('🚀') >= 0) { el.innerHTML = el.innerHTML.replace('🚀', '<i class="ti ti-rocket"></i>'); el.dataset.iconized = '1'; }
        });
    }

    function decorate() {
        document.querySelectorAll('.lesson-item').forEach(ensureBar);
        iconizeHeadings();
    }

    var list = document.getElementById('lesson-list');
    if (list) {
        var mo = new MutationObserver(function () { decorate(); });
        mo.observe(list, { childList: true, subtree: true });
    }
    document.addEventListener('DOMContentLoaded', decorate);
    setTimeout(decorate, 1200);

    // ── Theo dõi % đọc theo scroll ──
    var wrap = document.getElementById('lesson-content-wrapper');
    if (wrap) {
        wrap.addEventListener('scroll', function () {
            var slug = window.currentLessonSlug; if (!slug) return;
            var max = wrap.scrollHeight - wrap.clientHeight; if (max <= 40) return;
            var p = Math.min(100, Math.round(wrap.scrollTop / max * 100));
            if (p > (prog[slug] || 0)) {
                prog[slug] = p; save(prog);
                var item = document.querySelector('.lesson-item[data-slug="' + slug + '"]');
                if (item) updateBar(item);
                if (p >= 95) toast('ti-circle-check', 'Bạn đã đọc xong bài này. Làm tốt lắm!');
                else if (p >= 50 && !prog['_half_' + slug]) { prog['_half_' + slug] = 1; save(prog); toast('ti-flame', 'Được nửa chặng rồi, cố lên!'); }
            }
        }, { passive: true });
    }

    // ── Toast động viên ──
    var last = 0;
    function toast(icon, msg) {
        var now = Date.now(); if (now - last < 6000) return; last = now;
        var el = document.createElement('div'); el.className = 'edu-toast';
        el.innerHTML = '<i class="ti ' + icon + '"></i><span>' + msg + '</span>';
        document.body.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('show'); });
        setTimeout(function () { el.classList.remove('show'); setTimeout(function () { el.remove(); }, 400); }, 3000);
    }
})();
