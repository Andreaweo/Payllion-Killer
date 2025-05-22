// ==UserScript==
// @name         payllion-killer v.2.7
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  Убийца Payllion с Ctrl+B для вкл/выкл и звуком
// @author       @Andreaweo
// @match        *://lk.payllion.net/operator*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let enabled = true;
    let observer = null;

    const clickSound = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1168-pristine.mp3");
    clickSound.volume = 1.0;

    function startObserver() {
        if (observer) return;

        observer = new MutationObserver(() => {
            if (!enabled) return;

            const cells = document.querySelectorAll('.cell-default__body');
            for (const cell of cells) {
                const text = cell.textContent.replace(/\s|₽|,/g, '').trim();
                const amount = parseInt(text);
                if (!isNaN(amount) && amount >= 8000) {
                    const btn = cell.closest('tr')?.querySelector('[title="Взять в работу"]');
                    if (btn) {
                        btn.click();
                        clickSound.play().catch(() => {});
                        console.log(`✅ Взята заявка на ${amount} ₽`);
                        break;
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function stopObserver() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    // Горячая клавиша Ctrl+B
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
            enabled = !enabled;
            if (enabled) {
                startObserver();
                console.log('🟢 Автокликер включен');
            } else {
                stopObserver();
                console.log('🔴 Автокликер выключен');
            }
        }
    });

    // Запускаем изначально
    startObserver();
})();


