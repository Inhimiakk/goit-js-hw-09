!function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");e.addEventListener("click",(function(){t||(t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(t),e.disabled=!1,t=null}))}();
//# sourceMappingURL=01-color-switcher.726bcef7.js.map