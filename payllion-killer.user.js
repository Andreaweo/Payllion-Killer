// ==UserScript==
// @name         payllion-killer v.2.9
// @namespace    http://tampermonkey.net/
// @version      2.9
// @description  Хола Амигос, это убийца Payllion с включением/выключением по Ctrl+B и корректной инициализацией звука через пользовательский ввод
// @author       @Andreaweo
// @match        *://lk.payllion.net/operator*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let enabled = true;

    const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    clickSound.volume = 1.0;

    // Разрешение звука после первого клика (иначе браузер может блокировать)
    window.addEventListener('click', () => {
        clickSound.play().catch(() => {});
    }, { once: true });

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
        if (e.ctrlKey && e.code === 'KeyB') {
            enabled = !enabled;
            alert(`Автокликер ${enabled ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}`);
            console.log(`🟢 Автокликер ${enabled ? 'включен' : 'выключен'}`);
        }
    });
})();


