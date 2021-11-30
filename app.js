"use strict";

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const bgBlurMobile = document.querySelector(".bgBlur-mobile");
const bgBlurDesktop = document.querySelector(".bgBlur-desktop");
const close = document.getElementById("close");

const mainSlider = document.querySelector(".slider");
const mainSlides = document.querySelectorAll(".slide");
const mainButtonLeft = document.querySelector(".slider .button-left");
const mainButtonRight = document.querySelector(".slider .button-right");
const mainThumbnailContainer = document.querySelector(".thumbnail-container");

const lightboxSlides = document.querySelectorAll(".lightbox-slide");
const lightboxButtonLeft = document.querySelector(".lightbox-button-left");
const lightboxButtonRight = document.querySelector(".lightbox-button-right");
const lightboxThumbnailContainer = document.querySelector(
	".lightbox-thumbnail-container"
);

const closeLightbox = document.querySelector(".button-close-lightbox");
const lightboxModal = document.querySelector(".lightbox-modal");

let currentSlide = 0;

/////////////////////////////////////////////////
// handles hamburger toggle
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

/////////////////////////////////////////////////
// define functions used by the sliders
// slider -> slides parent element, which is the container for the slides
// slides -> elements that should move
// there are two slides: mainSlides and lightboxSlides
const goToSlide = function (slides) {
	slides.forEach(
		(slide, index) =>
			(slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
	);
};

const showSelectedThumbnail = thumbnailContainer => {
	thumbnailContainer
		.querySelectorAll(".thumbnail")
		.forEach(thumbnail => thumbnail.classList.remove("thumbnail-selected"));
	thumbnailContainer
		.querySelector(`.thumbnail[data-thumb="${currentSlide}"]`)
		.classList.add("thumbnail-selected");
};

const moveSlides = slides => {
	goToSlide(slides);
	showSelectedThumbnail(
		slides[0].parentElement.parentElement.querySelector(".thumb-cont")
	);
};

const goToNextSlide = function (slides) {
	currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
	moveSlides(slides);
};

const goToPreviousSlide = function (slides) {
	currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
	moveSlides(slides);
};

/////////////////////////////////////////////////
// initiate main slider
moveSlides(mainSlides);

/////////////////////////////////////////////////
// Event handlers for buttons from main
mainButtonRight.addEventListener("click", () => goToNextSlide(mainSlides));
mainButtonLeft.addEventListener("click", () => goToPreviousSlide(mainSlides));

mainThumbnailContainer.addEventListener("click", event => {
	if (!event.target.classList.contains("thumbnail")) return;

	currentSlide = +event.target.dataset.thumb;
	// currentSlide needs to be updated first
	// so that showSelectedThumbnail() works properly

	moveSlides(mainSlides);
});

/////////////////////////////////////////////////
// handles correct lightbox slide display after clicking on a slide from main
mainSlider.addEventListener("click", event => {
	// prevent lightbox to appear in mobile screen size
	if (getComputedStyle(hamburger).display !== "none") return;

	bgBlurDesktop.classList.toggle("show-bg");
	lightboxModal.classList.toggle("show-lightbox-modal");

	currentSlide = +event.target.closest(".slide").dataset.slide;
	// update currentSlide to the slide clicked

	moveSlides(lightboxSlides);

	lightboxButtonRight.addEventListener("click", () =>
		goToNextSlide(lightboxSlides)
	);
	lightboxButtonLeft.addEventListener("click", () =>
		goToPreviousSlide(lightboxSlides)
	);

	lightboxThumbnailContainer.addEventListener("click", event => {
		if (!event.target.classList.contains("thumbnail")) return;

		currentSlide = +event.target.dataset.thumb;
		// currentSlide needs to be updated first
		// so that showSelectedThumbnail() works properly

		moveSlides(lightboxSlides);
	});
});

/////////////////////////////////////////////////
// handles keyboard navigation
const defineSlidesToWork = (slides, event) => {
	if (event.key === "ArrowRight") goToNextSlide(slides);
	if (event.key === "ArrowLeft") goToPreviousSlide(slides);
};

document.addEventListener("keydown", event => {
	if (lightboxModal.classList.contains("show-lightbox-modal")) {
		// if the lightbox modal is active, handles keyboard navigation on the lightbox modal
		defineSlidesToWork(lightboxSlides, event);
	} else {
		// else (in this case the lightbox is inactive), handles keyboard navigation on the main slides
		defineSlidesToWork(mainSlides, event);
	}
});

/////////////////////////////////////////////////
// handles lightbox modal closing 
const toggleLightboxModal = () => {
	bgBlurDesktop.classList.toggle("show-bg");
	lightboxModal.classList.toggle("show-lightbox-modal");

	// update main slides
	moveSlides(mainSlides);
};

bgBlurDesktop.addEventListener("click", () => toggleLightboxModal());

closeLightbox.addEventListener("click", () => {
	toggleLightboxModal();
});

document.addEventListener("keydown", event => {
	if (!lightboxModal.classList.contains("show-lightbox-modal")) return;

	if (event.key === "Escape") toggleLightboxModal();
});
