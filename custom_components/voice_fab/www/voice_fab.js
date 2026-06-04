/** Voice Fab - 全站悬浮语音助手按钮
 * 轻触: 打开 Assist + 按钮上移一行
 * 按住拖动: 移动位置
 * 长按不拖: 隐藏按钮
 * 关闭 Assist: 按钮回到默认位置
 */
(function() {
    'use strict';

    const STORAGE_KEY_ENABLED = 'vf_enabled';
    const STORAGE_KEY_POS = 'vf_pos';
    const DRAG_THRESHOLD = 8;

    // 默认位置：右下角
    const DEFAULT_POS = { right: 24, bottom: 24 };
    // Assist 打开时：右下角上一行
    const ASSIST_POS = { right: 24, bottom: 80 };

    const STYLES = `
        .vf-wrap{
            position:fixed;z-index:999999;
            user-select:none;-webkit-user-select:none;touch-action:none;
            transition:left 0.4s ease,top 0.4s ease,right 0.4s ease,bottom 0.4s ease;
        }
        .vf-wrap.no-transition{transition:none;}
        .vf-btn{
            width:56px;height:56px;border-radius:50%;
            background:linear-gradient(135deg,#6366f1,#8b5cf6);
            color:#fff;border:none;
            box-shadow:0 4px 16px rgba(99,102,241,0.35);
            cursor:pointer;font-size:24px;
            display:flex;align-items:center;justify-content:center;
            transition:transform 0.2s,opacity 0.3s;
        }
        .vf-btn:active{transform:scale(0.92);}
        .vf-btn.dragging{opacity:0.8;transform:scale(1.05);transition:none;}
        .vf-btn.hiding{opacity:0;transform:scale(0.3);pointer-events:none;}
        .vf-btn.showing{animation:vf-pop-in 0.3s ease-out;}
        @keyframes vf-pop-in{0%{opacity:0;transform:scale(0.3);}100%{opacity:1;transform:scale(1);}}
        /* 右上角恢复小图标 */
        .vf-restore{
            position:fixed;top:60px;right:16px;z-index:999998;
            width:36px;height:36px;border-radius:50%;
            background:rgba(99,102,241,0.15);border:1.5px solid rgba(99,102,241,0.3);
            cursor:pointer;display:none;align-items:center;justify-content:center;
            font-size:16px;transition:all 0.3s;
        }
        .vf-restore.show{display:flex;}
        .vf-restore:hover{background:rgba(99,102,241,0.3);border-color:rgba(99,102,241,0.6);transform:scale(1.1);}
    `;

    let wrap, btn, restoreBtn;
    let isHidden = localStorage.getItem(STORAGE_KEY_ENABLED) === 'false';
    let isAssistOpen = false;

    // 指针状态
    let pointerId = null;
    let startX, startY, wrapStartX, wrapStartY;
    let isDragging = false;
    let hasMoved = false;
    let pressTimer = null;

    function loadPos() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY_POS) || '{}'); }
        catch { return {}; }
    }
    function savePos(x, y) { localStorage.setItem(STORAGE_KEY_POS, JSON.stringify({x, y})); }

    function getRootEl() {
        return document.querySelector('home-assistant');
    }

    function openAssistDialog() {
        const rootEl = getRootEl();
        if (!rootEl) return;
        rootEl.dispatchEvent(new CustomEvent('hass-action', {
            bubbles: true, composed: true,
            detail: {
                config: { tap_action: { action: 'assist', pipeline_id: 'last_used', start_listening: false } },
                action: 'tap'
            }
        }));
    }

    function setDefaultPos() {
        wrap.classList.remove('no-transition');
        const pos = loadPos();
        if (pos.x !== undefined && pos.y !== undefined) {
            wrap.style.right = 'auto'; wrap.style.bottom = 'auto';
            wrap.style.left = pos.x + 'px'; wrap.style.top = pos.y + 'px';
        } else {
            wrap.style.left = 'auto'; wrap.style.top = 'auto';
            wrap.style.right = DEFAULT_POS.right + 'px';
            wrap.style.bottom = DEFAULT_POS.bottom + 'px';
        }
    }

    function moveToAssistPos() {
        wrap.classList.remove('no-transition');
        const pos = loadPos();
        if (pos.x !== undefined && pos.y !== undefined) {
            // 有自定义位置时，上移56px
            wrap.style.top = (pos.y - 56) + 'px';
        } else {
            wrap.style.left = 'auto'; wrap.style.top = 'auto';
            wrap.style.right = ASSIST_POS.right + 'px';
            wrap.style.bottom = ASSIST_POS.bottom + 'px';
        }
    }

    function hide(animate) {
        isHidden = true;
        localStorage.setItem(STORAGE_KEY_ENABLED, 'false');
        if (animate !== false) {
            btn.classList.add('hiding');
            setTimeout(() => { btn.style.display = 'none'; btn.classList.remove('hiding'); }, 300);
        } else {
            btn.style.display = 'none';
        }
        restoreBtn.classList.add('show');
    }

    function show() {
        isHidden = false;
        localStorage.setItem(STORAGE_KEY_ENABLED, 'true');
        btn.style.display = 'flex';
        btn.classList.add('showing');
        setTimeout(() => btn.classList.remove('showing'), 300);
        restoreBtn.classList.remove('show');
    }

    function onPointerDown(e) {
        if (e.button !== 0) return;
        e.preventDefault();

        pointerId = e.pointerId;
        btn.setPointerCapture(e.pointerId);

        startX = e.clientX;
        startY = e.clientY;
        const rect = wrap.getBoundingClientRect();
        wrapStartX = rect.left;
        wrapStartY = rect.top;
        isDragging = false;
        hasMoved = false;

        // 长按计时（不拖动则隐藏）
        pressTimer = setTimeout(() => {
            if (!hasMoved) {
                hide(true);
            }
        }, 800);
    }

    function onPointerMove(e) {
        if (e.pointerId !== pointerId) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > DRAG_THRESHOLD) {
            hasMoved = true;
            if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }

            if (!isDragging) {
                isDragging = true;
                btn.classList.add('dragging');
                wrap.classList.add('no-transition');
                wrap.style.right = 'auto';
                wrap.style.bottom = 'auto';
                wrap.style.left = wrapStartX + 'px';
                wrap.style.top = wrapStartY + 'px';
            }

            wrap.style.left = (wrapStartX + dx) + 'px';
            wrap.style.top = (wrapStartY + dy) + 'px';
        }
    }

    function onPointerUp(e) {
        if (e.pointerId !== pointerId) return;

        if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
        btn.classList.remove('dragging');
        wrap.classList.remove('no-transition');

        if (isDragging) {
            // 拖动结束，保存位置
            const rect = wrap.getBoundingClientRect();
            savePos(rect.left, rect.top);
        } else if (!hasMoved && !isHidden) {
            // 轻触：打开 Assist + 上移一行
            openAssistDialog();
            isAssistOpen = true;
            setTimeout(() => moveToAssistPos(), 100);
        }

        pointerId = null;
        isDragging = false;
        hasMoved = false;
    }

    function init() {
        if (document.getElementById('vf-wrap')) return;

        // 注入样式
        const s = document.createElement('style');
        s.textContent = STYLES;
        document.head.appendChild(s);

        // 创建按钮
        wrap = document.createElement('div');
        wrap.className = 'vf-wrap';
        wrap.id = 'vf-wrap';
        btn = document.createElement('button');
        btn.className = 'vf-btn';
        btn.id = 'vf-btn';
        btn.title = '轻触: 语音助手 | 按住拖动: 移动 | 长按: 隐藏';
        btn.innerHTML = '🎤';
        wrap.appendChild(btn);
        document.body.appendChild(wrap);

        // 创建恢复按钮
        restoreBtn = document.createElement('div');
        restoreBtn.className = 'vf-restore';
        restoreBtn.id = 'vf-restore';
        restoreBtn.title = '恢复语音助手按钮';
        restoreBtn.innerHTML = '🎤';
        document.body.appendChild(restoreBtn);

        // 设置默认位置
        setDefaultPos();

        // 初始隐藏状态
        if (isHidden) {
            btn.style.display = 'none';
            restoreBtn.classList.add('show');
        }

        // 指针事件
        btn.addEventListener('pointerdown', onPointerDown);
        btn.addEventListener('pointermove', onPointerMove);
        btn.addEventListener('pointerup', onPointerUp);
        btn.addEventListener('pointercancel', onPointerUp);

        // 恢复按钮
        restoreBtn.addEventListener('click', () => {
            show();
            setDefaultPos();
        });

        // 监听 Assist dialog 关闭事件，按钮回到默认位置
        document.addEventListener('dialog-closed', (e) => {
            const detail = e.detail || {};
            if (detail.dialog === 'ha-voice-command-dialog') {
                if (isHidden) {
                    show();
                }
                isAssistOpen = false;
                setDefaultPos();
            }
        });

        // 全局事件
        window.addEventListener('vf-toggle', () => isHidden ? (show(), setDefaultPos()) : hide(true));
        window.addEventListener('vf-show', () => { show(); setDefaultPos(); });
        window.addEventListener('vf-hide', () => hide(true));
    }

    // 等待 HA 加载
    if (document.readyState === 'complete') setTimeout(init, 800);
    else window.addEventListener('load', () => setTimeout(init, 800));
    setTimeout(init, 2000);
})();