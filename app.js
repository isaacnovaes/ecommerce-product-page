"use strict";

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const bgBlurMobile = document.querySelector(".bgBlur-mobile");
const close = document.getElementById("close");

const toggleMenuNav = () => {
	navMenu.classList.toggle("nav-menu-active");
	bgBlurMobile.classList.toggle("show-bg");
};

hamburger.addEventListener("click", () => {
	toggleMenuNav();
});
close.addEventListener("click", () => {
	toggleMenuNav();
});

const slider = function () {
	const slides = document.querySelectorAll(".slider .slide");
	const buttonLeft = document.querySelector(".button-left");
	const buttonRight = document.querySelector(".button-right");
	const thumbnailContainer = document.querySelector(".thumbnail-container");

	let currentSlide = 0;
	const maxSlide = slides.length;

	const goToSlide = function (slideToShow) {
		slides.forEach(
			(slide, index) =>
				(slide.style.transform = `translateX(${100 * (index - slideToShow)}%)`)
		);
	};

	const init = function () {
		goToSlide(0);
	};

	init();

	const goToNextSlide = function () {
		currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
		goToSlide(currentSlide);
	};

	const goToPreviousSlide = function () {
		currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;
		goToSlide(currentSlide);
	};

	// Event handlers
	buttonRight.addEventListener("click", goToNextSlide);
	buttonLeft.addEventListener("click", goToPreviousSlide);

	document.addEventListener("keydown", function (event) {
		event.key === "ArrowRight" && goToNextSlide();
		event.key === "ArrowLeft" && goToPreviousSlide();
	});

	thumbnailContainer.addEventListener("click", event => {
		if (!event.target.classList.contains("thumbnail")) return;

		const thumbnailSelected = event.target;

		event.currentTarget
			.querySelectorAll(".thumbnail")
			.forEach(thumbnail => thumbnail.classList.remove("thumbnail-selected"));

		thumbnailSelected.classList.add("thumbnail-selected");
		currentSlide = event.target.dataset.thumb;
		goToSlide(currentSlide);
	});
};

slider();
