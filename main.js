(()=>{"use strict";var e,t=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},n=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n},r=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var o=t.submitter,c=o.textContent;n(!0,o,c,r),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){n(!1,o,c)}))},o=function(e,n){return fetch(e,n).then(t)},c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"9c0a15bf-0357-41c7-b509-b74fdde8315e","Content-Type":"application/json"}},u=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),a=document.querySelectorAll(".popup"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),d=document.querySelector(".popup_type_image"),f=document.querySelector(".popup_type_update-avatar"),p=document.querySelector(".popup_type_confirm-delete"),m=document.querySelector(".popup__image"),v=document.querySelector(".popup__caption"),h=document.querySelector(".profile__image"),y=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),b=document.forms["edit-profile"],S=b.elements.name,g=b.elements.description,k=document.forms["new-place"],E=k.elements["place-name"],q=k.elements.link,C=document.forms["update-avatar"],L=C.elements.link,x=document.forms["confirm-delete"],A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},w=document.querySelector(".places__list"),U=function(e,t){return e.likes.some((function(e){return e._id===t}))},j=function(e,t,n,r){U(t,n)?function(e,t,n){var r;(r=t._id,o("".concat(c.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:c.headers})).then((function(e){return t.likes=e.likes})).then((function(e){return n.textContent=e.length})).then((function(){return e.target.classList.remove("card__like-button_is-active")})).catch((function(e){return console.log("Не удалось убрать лайк: ".concat(e))}))}(e,t,r):function(e,t,n){var r;(r=t._id,o("".concat(c.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:c.headers})).then((function(e){return t.likes=e.likes})).then((function(e){return n.textContent=e.length})).then((function(){return e.target.classList.add("card__like-button_is-active")})).catch((function(e){return console.log("Не удалось поставить лайк: ".concat(e))}))}(e,t,r)},T=function(e){w.prepend(e)},O=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),a=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter"),l=c.querySelector(".card__delete-button");return i.textContent=e.name,u.src=e.link,u.alt=e.name,s.textContent=e.likes.length,u.addEventListener("click",(function(){return r(i.textContent,u.src)})),a.addEventListener("click",(function(t){return n(t,e,o,s)})),l.addEventListener("click",(function(){return t(e,c)})),e.owner._id!==o&&l.remove(),U(e,o)&&a.classList.add("card__like-button_is-active"),c},P=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");D(t)}},B=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",P)},D=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",P)},I=function(e,t,n){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},M=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},N=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.inactiveButtonClass),e.disabled=!1}(e,n):M(e,n)},J=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){I(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);M(n,t)};function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var V={id:"",el:""},z=function(e,t){V.id=e._id,V.el=t.closest(".card"),B(p)};u.addEventListener("click",(function(){J(b,A),B(s),S.value=y.textContent,g.value=_.textContent})),i.addEventListener("click",(function(){J(k,A),B(l)})),h.addEventListener("click",(function(){J(C,A),B(f)})),a.forEach((function(e){e.addEventListener("click",(function(t){return function(e,t){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&D(t)}(t,e)}))}));var $=function(e,t){m.src=t,m.alt=e,v.textContent=e,B(d)},F=function(t){h.style.backgroundImage="url(".concat(t.avatar,")"),y.textContent=t.name,_.textContent=t.about,e=t._id},G=new Promise((function(e,t){fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(n){n.ok&&e(n.json()),t("Ошибка: ".concat(n.status))}))})),K=new Promise((function(e,t){fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(n){n.ok&&e(n.json()),t("Ошибка: ".concat(n.status))}))}));b.addEventListener("submit",(function(e){var t=S.value,n=g.value;r((function(){return function(e,t){return o("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})})}(t,n).then((function(e){return F(e)})).then((function(){return D(s)}))}),e)})),k.addEventListener("submit",(function(t){var n=E.value,u=q.value;r((function(){return function(e,t){return o("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:e,link:t})})}(n,u).then((function(t){return T(O(t,z,j,$,e))})).then((function(){return D(l)}))}),t,"Создание...")})),C.addEventListener("submit",(function(e){var t=L.value;r((function(){return function(e){return o("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})})}(t).then((function(e){return F(e)})).then((function(){return D(f)}))}),e)})),x.addEventListener("submit",(function(e){r((function(){return(e=V.id,o("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers})).then((function(){V.el.remove(),D(p),V.id="",V.el=""}));var e}),e,"Удаление...")})),Promise.all([G,K]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];F(c),function(t){t.forEach((function(t){T(O(t,z,j,$,e))}))}(u)})).catch(console.error),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);N(r,n,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?I(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),N(r,n,t)}))}))}(t,e)}))}(A)})();