"use strict";

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const bgBlurMobile = document.querySelector(".bgBlur-mobile");
const bgBlurDesktop = document.querySelector(".bgBlur-desktop");
const close = document.getElementById("close");

const mainSlider = document.querySelector("main .slider");
const mainSlides = document.querySelectorAll(".slide");
const slideButtonLeft = document.querySelector(".slider .button-left");
const slideButtonRight = document.querySelector(".slider .button-right");
const slideThumbnailContainer = document.querySelector(".thumbnail-container");

const lightboxSlides = document.querySelectorAll(".lightbox-slide");
const lightboxButtonLeft = document.querySelector(".lightbox-button-left");
const lightboxButtonRight = document.querySelector(".lightbox-button-right");
const lightboxThumbnailContainer = document.querySelector(
	".lightbox-thumbnail-container"
);
const closeLightbox = document.querySelector(".button-close-lightbox");

const lightboxModal = document.querySelector(".lightbox-modal");

let currentSlide = 0;

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

const showSelectedThumbnail = thumbnailContainer => {
	thumbnailContainer
		.querySelectorAll(".thumbnail")
		.forEach(thumbnail => thumbnail.classList.remove("thumbnail-selected"));
	thumbnailContainer
		.querySelector(`.thumbnail[data-thumb="${currentSlide}"]`)
		.classList.add("thumbnail-selected");
};

showSelectedThumbnail(slideThumbnailContainer);

// prettier-ignore
const slider = function (allSlides, buttonLeft, buttonRight, thumbnailContainer) {

	const maxSlide = allSlides.length;

	const goToSlide = function (slideToShow) {
		allSlides.forEach(
			(slide, index) =>
				(slide.style.transform = `translateX(${100 * (index - slideToShow)}%)`)
		);
	};	

	const goToNextSlide = function () {
		currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;
		goToSlide(currentSlide);
		showSelectedThumbnail(thumbnailContainer);
	};

	const goToPreviousSlide = function () {
		currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;
		goToSlide(currentSlide);
		showSelectedThumbnail(thumbnailContainer);
	};

	const init = function () {
		goToSlide(currentSlide);
		showSelectedThumbnail(thumbnailContainer);
	};

	init();

	// Event handlers
	buttonRight.addEventListener("click", goToNextSlide);
	buttonLeft.addEventListener("click", goToPreviousSlide);

	document.addEventListener("keydown", function (event) {
		if (event.key === "ArrowRight") {
			goToNextSlide();
			showSelectedThumbnail(thumbnailContainer);
		}

		if (event.key === "ArrowLeft") {
			goToPreviousSlide();
			showSelectedThumbnail(thumbnailContainer);
		}
	});

	thumbnailContainer.addEventListener("click", event => {
		if (!event.target.classList.contains("thumbnail")) return;

		currentSlide = event.target.dataset.thumb; // currentSlide needs to be updated first
		// so that showSelectedThumbnail() works properly

		goToSlide(currentSlide);

		showSelectedThumbnail(thumbnailContainer);
	});
};

slider(mainSlides, slideButtonLeft, slideButtonRight, slideThumbnailContainer);

mainSlider.addEventListener("click", event => {
	
	bgBlurDesktop.classList.toggle("show-bg");
	lightboxModal.classList.toggle("show-lightbox-modal");

	currentSlide = event.target.closest(".slide").dataset.slide;

	slider(
		lightboxSlides,
		lightboxButtonLeft,
		lightboxButtonRight,
		lightboxThumbnailContainer
	);
});

closeLightbox.addEventListener("click", () => {
	bgBlurDesktop.classList.toggle("show-bg");
	lightboxModal.classList.toggle("show-lightbox-modal");
});
