// ==UserScript==
// @name         payllion-killer
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Мгновенный автоклик по кнопке "Взять в работу", отключается через меню Tampermonkey
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
