"use strict";

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const bgBlurMobile = document.querySelector(".bgBlur-mobile");
const close = document.getElementById("close");

hamburger.addEventListener("click", () => {
	navMenu.classList.toggle("nav-menu-active");
	bgBlurMobile.classList.toggle("show-bg");
});
close.addEventListener("click", () => {
	navMenu.classList.toggle("nav-menu-active");
	bgBlurMobile.classList.toggle("show-bg");
});
