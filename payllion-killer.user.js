// ==UserScript==
// @name         payllion-killer v.2.6
// @namespace    http://tampermonkey.net/
// @version      2.6
// @description  Автокликер Payllion с включением/выключением по Ctrl+B (независимо от раскладки) и звуком
// @author       @Andreaweo
// @match        *://lk.payllion.net/operator*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let enabled = true;

    const clickSound = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1168-pristine.mp3");
    clickSound.volume = 1.0;

    const observer = new MutationObserver(() => {
        if (!enabled) return;

        const btn = document.querySelector('[title="Взять в работу"]');
        if (btn) {
            btn.click();
            clickSound.play().catch(e => console.warn("🔇 Ошибка при воспроизведении звука:", e));
            console.log("✅ Заявка взята автокликером");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('keydown', (e) => {
        // e.code — физическая клавиша, срабатывает независимо от раскладки
        if (e.ctrlKey && e.code === 'KeyB') {
            enabled = !enabled;
            alert(`Автокликер ${enabled ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}`);
            console.log(`🟢 Автокликер ${enabled ? 'включен' : 'выключен'}`);
        }
    });
})();

