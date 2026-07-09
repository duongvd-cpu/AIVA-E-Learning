/** widget.js — Trợ lý AI: mặc định GẮN CẠNH bài học (docked) trên desktop,
 *  vẫn hỗ trợ dạng bong bóng nổi trên màn hình hẹp. */
(function () {
    const fab = document.getElementById('agent-fab');
    const widget = document.getElementById('agent-widget');
    const closeBtn = document.getElementById('agent-close');
    const navToggle = document.getElementById('btn-toggle-agent');
    const archToggle = document.getElementById('aw-arch-toggle');
    const archSection = document.getElementById('system-section');
    const userInput = document.getElementById('user-input');
    if (!widget || !fab) return;

    const WIDE = () => window.matchMedia('(min-width: 1025px)').matches;
    let dockPref = localStorage.getItem('assistantDock');
    if (dockPref === null) dockPref = 'on';

    function applyDockState() {
        const docked = WIDE() && dockPref === 'on';
        widget.classList.toggle('docked', docked);
        document.body.classList.toggle('assistant-docked', docked && widget.classList.contains('open'));
    }

    function open() {
        widget.classList.add('open');
        widget.setAttribute('aria-hidden', 'false');
        fab.classList.add('hidden');
        applyDockState();
        if (navToggle) { navToggle.classList.remove('toggle-off'); navToggle.setAttribute('aria-pressed', 'true'); }
        setTimeout(() => { if (userInput) userInput.focus(); }, 150);
    }
    function close() {
        widget.classList.remove('open');
        widget.setAttribute('aria-hidden', 'true');
        fab.classList.remove('hidden');
        document.body.classList.remove('assistant-docked');
        if (navToggle) { navToggle.classList.add('toggle-off'); navToggle.setAttribute('aria-pressed', 'false'); }
    }
    function toggle() { widget.classList.contains('open') ? close() : open(); }

    fab.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (navToggle) navToggle.addEventListener('click', toggle);

    // Nút gắn/thả panel (thêm động vào header)
    const dockBtn = document.createElement('button');
    dockBtn.className = 'aw-icon-btn aw-dock-btn';
    dockBtn.title = 'Gắn cạnh / Thả nổi khung chat';
    dockBtn.innerHTML = '<i class="ti ti-layout-sidebar-right"></i>';
    dockBtn.addEventListener('click', () => {
        dockPref = (dockPref === 'on') ? 'off' : 'on';
        localStorage.setItem('assistantDock', dockPref);
        applyDockState();
    });
    const awActions = document.querySelector('.aw-actions');
    if (awActions) awActions.insertBefore(dockBtn, awActions.firstChild);

    if (archToggle && archSection) {
        archToggle.addEventListener('click', () => {
            const show = archSection.style.display === 'none' || !archSection.style.display;
            archSection.style.display = show ? 'block' : 'none';
            archToggle.classList.toggle('on', show);
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && widget.classList.contains('open') && !widget.classList.contains('docked')) close();
    });

    const askBtn = document.getElementById('btn-ask-agent');
    if (askBtn) askBtn.addEventListener('click', () => open());

    window.addEventListener('resize', () => { if (widget.classList.contains('open')) applyDockState(); });

    // Trạng thái ban đầu: desktop mở sẵn dạng gắn cạnh; màn hình hẹp giữ bong bóng.
    if (WIDE() && dockPref === 'on') {
        open();
    } else {
        if (navToggle) { navToggle.classList.add('toggle-off'); navToggle.setAttribute('aria-pressed', 'false'); }
    }
})();
