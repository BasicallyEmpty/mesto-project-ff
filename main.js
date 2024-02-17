(()=>{"use strict";var e=document.querySelector(".profile__edit-button"),t=document.querySelector(".profile__add-button"),n=document.querySelectorAll(".popup"),r=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup_type_new-card"),c=document.querySelector(".popup_type_image"),i=document.querySelector(".popup__image"),u=document.querySelector(".popup__caption"),s=document.querySelector(".profile__title"),a=document.querySelector(".profile__description"),l=document.forms["edit-profile"],d=l.elements.name,p=l.elements.description,m=document.forms["new-place"],f=m.elements["place-name"],v=m.elements.link,_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector(".places__list"),S=function(e){y.prepend(e)},k=function(e){e.target.classList.toggle("card__like-button_is-active")},q=function(e){e.remove()},L=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__title"),s=c.querySelector(".card__like-button"),a=c.querySelector(".card__delete-button");return u.textContent=e,i.src=t,i.alt=e,i.addEventListener("click",(function(){return o(u.textContent,i.src)})),s.addEventListener("click",r),a.addEventListener("click",(function(){return n(c)})),c},E=function(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&C(t)},b=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",E)},C=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",E)},g=function(e,t,n){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},h=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},x=function(e,t,n){var r=e.querySelector(n.submitButtonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.inactiveButtonClass),e.disabled=!1}(r,n):h(r,n)},A=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){g(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);h(n,t)};e.addEventListener("click",(function(){A(l,_),b(r),d.value=s.textContent,p.value=a.textContent})),t.addEventListener("click",(function(){A(m,_),m.reset(),b(o)})),n.forEach((function(e){e.addEventListener("click",(function(t){return function(e,t){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&C(t)}(t,e)}))}));var j=function(e,t){i.src=t,i.alt=e,u.textContent=e,b(c)};l.addEventListener("submit",(function(e){e.preventDefault(),s.textContent=d.value,a.textContent=p.value,C(r)})),m.addEventListener("submit",(function(e){e.preventDefault(),S(L(f.value,v.value,q,k,j)),C(o),m.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){S(L(e.name,e.link,q,k,j))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));x(e,n,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?g(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),x(e,n,t)}))}))}(t,e)}))}(_)})();