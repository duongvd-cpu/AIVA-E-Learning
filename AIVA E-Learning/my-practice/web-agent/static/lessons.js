/** lessons.js — Lesson Panel Controller (bản sạch, ADR-005) */

// ═══ GLOBAL STATE ═══
let currentLessonSlug = null;
let lessonsData = null;
let allLessonSlugs = [];
let coreSlugs = [];
let completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');

// ═══ DOM REFERENCES ═══
const lessonPanel = document.getElementById('lesson-panel');
const agentPanel = document.getElementById('agent-panel');
const lessonList = document.getElementById('lesson-list');
const lessonWelcome = document.getElementById('lesson-welcome');
const lessonContent = document.getElementById('lesson-content');
const lessonHeader = document.getElementById('lesson-header');
const lessonBody = document.getElementById('lesson-body');
const lessonContentWrapper = document.getElementById('lesson-content-wrapper');
const panelDivider = document.getElementById('panel-divider');
const btnToggleLessons = document.getElementById('btn-toggle-lessons');
const btnToggleAgent = document.getElementById('btn-toggle-agent');
const askAgentPopup = document.getElementById('ask-agent-popup');

const MODULE_ICONS = { 1: 'ti-flag', 2: 'ti-tools', 3: 'ti-bulb', 4: 'ti-stack-2', 5: 'ti-shield-lock' };
function moduleIcon(mod) { return `<i class="ti ${MODULE_ICONS[mod.id] || 'ti-book'} mod-ic" style="color:${mod.color}"></i>`; }

// ═══ 1. FETCH & RENDER LESSON LIST ═══
async function fetchLessonList() {
    try {
        const res = await fetch('/api/lessons');
        const data = await res.json();
        lessonsData = data;
        allLessonSlugs = [];
        coreSlugs = [];
        const advSlugs = [];
        data.modules.forEach(mod => {
            mod.lessons.forEach(l => {
                if (l.tier === 'advanced') { advSlugs.push(l.slug); }
                else { coreSlugs.push(l.slug); allLessonSlugs.push(l.slug); }
            });
        });
        allLessonSlugs = allLessonSlugs.concat(advSlugs);
        renderLessonSidebar(data.modules);
        updateProgressBar();
        if (!currentLessonSlug) renderDashboard();
    } catch (err) {
        lessonList.innerHTML = '<div class="loading-text" style="color:#ef4444">Lỗi tải danh sách bài</div>';
    }
}

function renderLessonSidebar(modules) {
    lessonList.innerHTML = '';
    const coreSection = document.createElement('div');
    coreSection.className = 'lesson-section core-section';
    let coreCount = 0;
    const advanced = [];
    modules.forEach(mod => {
        const coreLessons = mod.lessons.filter(l => l.tier !== 'advanced');
        mod.lessons.forEach(l => { if (l.tier === 'advanced') advanced.push({ mod, lesson: l }); });
        if (coreLessons.length === 0) return;
        coreSection.appendChild(buildModuleGroup(mod, coreLessons));
        coreCount += coreLessons.length;
    });
    const coreHead = document.createElement('div');
    coreHead.className = 'section-heading';
    coreHead.innerHTML = `<span class="section-title"><i class="ti ti-route"></i> Lộ trình chính</span><span class="section-count">${coreCount} bài</span>`;
    lessonList.appendChild(coreHead);
    lessonList.appendChild(coreSection);
    if (advanced.length > 0) {
        const details = document.createElement('details');
        details.className = 'advanced-section';
        const summary = document.createElement('summary');
        summary.className = 'section-heading advanced-heading';
        summary.innerHTML = `<span class="section-title"><span class="adv-caret"><i class="ti ti-chevron-right"></i></span> <i class="ti ti-rocket"></i> Nâng cao / Đọc thêm</span><span class="section-count">${advanced.length} bài</span>`;
        details.appendChild(summary);
        advanced.forEach(({ mod, lesson }) => details.appendChild(buildLessonItem(mod, lesson)));
        lessonList.appendChild(details);
    }
}

function buildModuleGroup(mod, lessons) {
    const group = document.createElement('div');
    group.className = 'module-group';
    const title = document.createElement('div');
    title.className = 'module-title';
    title.style.color = mod.color;
    title.style.cursor = 'pointer';
    title.innerHTML = `<span class="module-toggle"><i class="ti ti-chevron-down"></i></span> ${moduleIcon(mod)} <span class="module-title-label">${mod.title}</span>`;
    title.addEventListener('click', () => {
        const items = group.querySelectorAll('.lesson-item');
        const isHidden = items[0]?.classList.contains('hidden');
        items.forEach(item => item.classList.toggle('hidden', !isHidden));
        title.querySelector('.module-toggle').classList.toggle('collapsed', !isHidden);
    });
    group.appendChild(title);
    lessons.forEach(lesson => group.appendChild(buildLessonItem(mod, lesson)));
    return group;
}

function buildLessonItem(mod, lesson) {
    const item = document.createElement('div');
    item.className = 'lesson-item';
    item.dataset.slug = lesson.slug;
    item.onclick = () => loadLesson(lesson.slug);
    const isCompleted = completedLessons.includes(lesson.slug);
    const statusIcon = isCompleted ? '<i class="ti ti-circle-check-filled lesson-done"></i>' : '<i class="ti ti-circle lesson-todo"></i>';
    let badges = '';
    if (lesson.has_demo) badges += '<span class="demo-badge">Demo</span>';
    item.innerHTML = `
        <span class="lesson-stat">${statusIcon}</span>
        <span class="lesson-title-text">${truncateTitle(lesson.title, 30)}</span>
        ${badges}
    `;
    item.title = lesson.title;
    return item;
}

function truncateTitle(title, maxLen) {
    if (title.length <= maxLen) return title;
    return title.substring(0, maxLen) + '…';
}

// ═══ 2. LOAD LESSON CONTENT ═══
async function loadLesson(slug) {
    currentLessonSlug = slug;
    window.currentLessonSlug = slug;
    highlightActiveLesson(slug);
    lessonWelcome.classList.add('hidden');
    lessonContent.classList.remove('hidden');
    lessonBody.innerHTML = '<div class="loading-text">Đang tải bài học...</div>';
    lessonHeader.innerHTML = '';
    try {
        const res = await fetch(`/api/lessons/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        let headerHTML = '';
        if (data.youtube && data.youtube.video_id) {
            headerHTML += `<div class="lesson-video"><iframe src="https://www.youtube.com/embed/${data.youtube.video_id}" title="${data.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        }
        headerHTML += `<div class="lesson-meta"><span class="badge" style="background:rgba(127,214,3,0.15);color:#3d7300"><i class="ti ti-clock"></i> ${data.reading_time || '?'} phút đọc</span>${data.has_demo ? '<span class="badge" style="background:rgba(59,130,246,0.15);color:#2563eb"><i class="ti ti-flask-2"></i> Có Demo</span>' : ''}</div>`;
        lessonHeader.innerHTML = headerHTML;
        lessonBody.innerHTML = data.content_html;
        lessonBody.querySelectorAll('pre code').forEach(block => { if (typeof hljs !== 'undefined') hljs.highlightElement(block); });
        lessonBody.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
            img.onerror = function () {
                this.style.display = 'none';
                const ph = document.createElement('div');
                ph.className = 'img-error-placeholder';
                ph.innerHTML = '<i class="ti ti-photo-off"></i> Hình ảnh không tải được';
                this.parentNode.insertBefore(ph, this.nextSibling);
            };
        });
        appendLessonNavigation(slug);
        buildMiniToc();
        lessonContentWrapper.scrollTop = 0;
        markLessonCompleted(slug);
        scrollActiveIntoView(slug);
        fetchSuggestions(slug);
    } catch (err) {
        lessonBody.innerHTML = `<div class="loading-text" style="color:#ef4444">Không thể tải bài học: ${slug}</div>`;
    }
}
window.loadLesson = loadLesson;

function highlightActiveLesson(slug) {
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.classList.toggle('active', item.dataset.slug === slug);
    });
}
function scrollActiveIntoView(slug) {
    const el = document.querySelector(`.lesson-item[data-slug="${slug}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ═══ 4. LESSON NAVIGATION ═══
function appendLessonNavigation(currentSlug) {
    const idx = allLessonSlugs.indexOf(currentSlug);
    if (idx === -1) return;
    const prevSlug = idx > 0 ? allLessonSlugs[idx - 1] : null;
    const nextSlug = idx < allLessonSlugs.length - 1 ? allLessonSlugs[idx + 1] : null;
    const navHTML = `<div class="lesson-nav">${prevSlug ? `<button class="lesson-nav-btn prev" onclick="loadLesson('${prevSlug}')"><i class="ti ti-arrow-left"></i> Bài trước</button>` : '<div></div>'}${nextSlug ? `<button class="lesson-nav-btn next" onclick="loadLesson('${nextSlug}')">Bài tiếp theo <i class="ti ti-arrow-right"></i></button>` : '<div></div>'}</div>`;
    lessonBody.insertAdjacentHTML('beforeend', navHTML);
}

// ═══ 5. MINI TOC ═══
function buildMiniToc() {
    const headings = lessonBody.querySelectorAll('h2, h3');
    if (headings.length < 2) return;
    let existingToc = document.getElementById('mini-toc');
    if (existingToc) existingToc.remove();
    const toc = document.createElement('div');
    toc.id = 'mini-toc';
    toc.className = 'mini-toc';
    let tocHTML = '<div class="mini-toc-title"><i class="ti ti-list-search"></i> Mục lục</div>';
    headings.forEach((h, i) => {
        const id = `heading-${i}`;
        h.id = id;
        const indent = h.tagName === 'H3' ? 'toc-indent' : '';
        const text = h.textContent.trim().substring(0, 40);
        tocHTML += `<a class="toc-item ${indent}" href="#${id}" data-heading-id="${id}">${text}</a>`;
    });
    toc.innerHTML = tocHTML;
    lessonContentWrapper.insertBefore(toc, lessonContentWrapper.firstChild);
    toc.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(item.dataset.headingId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    initScrollSync(headings);
}
function initScrollSync(headings) {
    if (!headings || headings.length === 0) return;
    lessonContentWrapper.addEventListener('scroll', () => {
        const scrollTop = lessonContentWrapper.scrollTop;
        let activeId = null;
        headings.forEach(h => { if (h.offsetTop - 100 <= scrollTop) activeId = h.id; });
        document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.toggle('toc-active', item.dataset.headingId === activeId);
        });
    });
}

// ═══ 6. PROGRESS ═══
function markLessonCompleted(slug) {
    if (!completedLessons.includes(slug)) {
        completedLessons.push(slug);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        updateProgressBar();
        const item = document.querySelector(`.lesson-item[data-slug="${slug}"]`);
        const stat = item && item.querySelector('.lesson-stat');
        if (stat) stat.innerHTML = '<i class="ti ti-circle-check-filled lesson-done"></i>';
    }
}
function updateProgressBar() {
    const total = coreSlugs.length || 16;
    const done = completedLessons.filter(s => coreSlugs.includes(s)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = `${done}/${total}`;
}

// ═══ 7. RESIZABLE DIVIDER ═══
function initResizableDivider() {
    if (!panelDivider) return;
    let isResizing = false;
    panelDivider.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'none');
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const containerWidth = document.querySelector('.app-container').offsetWidth;
        const newLessonWidth = Math.max(300, Math.min(e.clientX, containerWidth - 400));
        lessonPanel.style.width = `${(newLessonWidth / containerWidth) * 100}%`;
    });
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = '');
        }
    });
}

// ═══ 8. PANEL TOGGLES ═══
function initPanelToggles() {
    const sidebar = document.getElementById('lesson-sidebar');
    const sync = () => { const off = sidebar.classList.contains('collapsed'); btnToggleLessons.classList.toggle('toggle-off', off); btnToggleLessons.setAttribute('aria-pressed', String(!off)); };
    if (btnToggleLessons && sidebar) {
        btnToggleLessons.addEventListener('click', () => { sidebar.classList.toggle('collapsed'); sync(); });
        sync();
    }
}

// ═══ 9. ASK AGENT POPUP ═══
function initAskAgentPopup() {
    if (!lessonContentWrapper || !askAgentPopup) return;
    lessonContentWrapper.addEventListener('mouseup', () => {
        setTimeout(() => {
            const selection = window.getSelection();
            const text = selection.toString().trim();
            if (text.length > 10 && text.length < 2000) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                askAgentPopup.style.top = `${rect.top - 44}px`;
                askAgentPopup.style.left = `${rect.left + rect.width / 2 - 60}px`;
                askAgentPopup.classList.remove('hidden');
                askAgentPopup.dataset.selectedText = text;
            } else {
                askAgentPopup.classList.add('hidden');
            }
        }, 50);
    });
    document.addEventListener('mousedown', (e) => {
        if (!askAgentPopup.contains(e.target) && !e.target.closest('.lesson-content-wrapper')) {
            askAgentPopup.classList.add('hidden');
        }
    });
    document.getElementById('btn-ask-agent').addEventListener('click', () => {
        const text = askAgentPopup.dataset.selectedText || '';
        if (!text) return;
        let lessonTitle = 'bài giảng';
        if (currentLessonSlug && lessonsData) {
            for (const mod of lessonsData.modules) {
                const found = mod.lessons.find(l => l.slug === currentLessonSlug);
                if (found) { lessonTitle = found.title; break; }
            }
        }
        const question = `Giải thích đoạn sau từ bài "${lessonTitle}":\n\n"${text}"`;
        const userInput = document.getElementById('user-input');
        if (userInput) { userInput.value = question; userInput.focus(); userInput.dispatchEvent(new Event('input')); }
        askAgentPopup.classList.add('hidden');
        window.getSelection().removeAllRanges();
    });
}

// ═══ 10. KEYBOARD SHORTCUTS ═══
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        switch (e.key) {
            case 'ArrowLeft': navigateLesson(-1); e.preventDefault(); break;
            case 'ArrowRight': navigateLesson(1); e.preventDefault(); break;
            case 'Escape': askAgentPopup.classList.add('hidden'); break;
            case '1': if (e.ctrlKey || e.metaKey) { btnToggleLessons.click(); e.preventDefault(); } break;
            case '2': if (e.ctrlKey || e.metaKey) { btnToggleAgent.click(); e.preventDefault(); } break;
        }
    });
}
function navigateLesson(direction) {
    if (!currentLessonSlug || allLessonSlugs.length === 0) return;
    const idx = allLessonSlugs.indexOf(currentLessonSlug);
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < allLessonSlugs.length) loadLesson(allLessonSlugs[newIdx]);
}

// ═══ 11. SUGGESTED QUESTIONS ═══
async function fetchSuggestions(slug) {
    try {
        const res = await fetch(`/api/lessons/${slug}/suggestions`);
        if (!res.ok) return;
        const data = await res.json();
        renderSuggestions(data.suggestions);
    } catch (err) {}
}
function renderSuggestions(suggestions) {
    if (!suggestions || suggestions.length === 0) return;
    const chatHistory = document.getElementById('chat-history');
    if (!chatHistory) return;
    const old = chatHistory.querySelector('.suggestion-chips');
    if (old) old.remove();
    const container = document.createElement('div');
    container.className = 'suggestion-chips';
    container.innerHTML = `<div class="suggestion-label">💡 Câu hỏi gợi ý cho bài học này:</div><div class="suggestion-list">${suggestions.map(q => `<button class="suggestion-chip" onclick="askSuggestion(this, '${q.replace(/'/g, "\\'")}')">${q}</button>`).join('')}</div>`;
    chatHistory.appendChild(container);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
window.askSuggestion = function (btn, question) {
    const userInput = document.getElementById('user-input');
    if (userInput) { userInput.value = question; userInput.focus(); userInput.dispatchEvent(new Event('input')); }
    const chips = btn.closest('.suggestion-chips');
    if (chips) chips.remove();
};

// ═══ DASHBOARD (trang chủ học tập) ═══
function renderDashboard() {
    if (!lessonsData || !lessonWelcome) return;
    const total = coreSlugs.length || 16;
    const done = completedLessons.filter(s => coreSlugs.includes(s)).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    const nextSlug = coreSlugs.find(s => !completedLessons.includes(s)) || coreSlugs[0];
    let nextTitle = '';
    if (nextSlug) {
        for (const m of lessonsData.modules) { const f = m.lessons.find(l => l.slug === nextSlug); if (f) { nextTitle = f.title; break; } }
    }
    let cards = '';
    lessonsData.modules.forEach(m => {
        const t = m.lessons.length;
        const d = m.lessons.filter(l => completedLessons.includes(l.slug)).length;
        const p = t ? Math.round(d / t * 100) : 0;
        const first = (m.lessons[0] && m.lessons[0].slug) || '';
        cards += `<button class="dash-module" onclick="loadLesson('${first}')" style="--mc:${m.color}">
            <div class="dash-module-top"><span class="dash-module-icon"><i class="ti ${MODULE_ICONS[m.id] || 'ti-book'}" style="color:${m.color}"></i></span><span class="dash-module-pct">${p}%</span></div>
            <div class="dash-module-title">${m.title}</div>
            <div class="dash-module-bar"><div style="width:${p}%"></div></div>
            <div class="dash-module-count">${d}/${t} bài</div>
        </button>`;
    });
    lessonWelcome.classList.add('has-dashboard');
    lessonWelcome.innerHTML = `
        <div class="dashboard">
            <div class="dash-hero">
                <div class="dash-ring" style="--pct:${pct}">
                    <div class="dash-ring-inner"><span class="dash-ring-pct">${pct}%</span><span class="dash-ring-label">hoàn thành</span></div>
                </div>
                <div class="dash-hero-info">
                    <h2>Chào mừng trở lại</h2>
                    <p>Bạn đã hoàn thành <strong>${done}/${total}</strong> bài trong Lộ trình chính.</p>
                    <button class="dash-continue" onclick="loadLesson('${nextSlug}')"><i class="ti ti-player-play"></i> ${done > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}: ${truncateTitle(nextTitle, 40)}</button>
                </div>
            </div>
            <h3 class="dash-section-title">Các chương</h3>
            <div class="dash-modules">${cards}</div>
        </div>`;
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
    fetchLessonList();
    initResizableDivider();
    initPanelToggles();
    initAskAgentPopup();
    initKeyboardShortcuts();
});
