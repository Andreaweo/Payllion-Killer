// ==UserScript==
// @name         payllion-killer
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Парсит наш любимый пейллион
// @author       @Andreaweo
// @match        *://lk.payllion.net/operator/tasks*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){
    'use strict';

    const observer = new MutationObserver(() => {
        const btn = document.querySelector('[title="Взять в работу"]');
        if (btn) btn.click();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
