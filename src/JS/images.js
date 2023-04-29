import {
  getImages,
  setPageNumber,
  plusPageNumber,
  perPage,
  getPageNumber,
} from "./images-create-api";
import { renderData, renderMore } from "./images-render";
import throttle from "lodash.throttle";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector("#search-form");
const bodyEl = document.querySelector("body");
const { searchQuery } = formEl.elements;
const loaderEl = document.querySelector(".loader-box");
const galleryEl = document.querySelector(".gallery");

let totalPages = 0;

let functionPerformed = true;

const throttleFindMoreImages = throttle(findMoreImages, 500);

formEl.addEventListener("submit", findImages);

function findImages(e) {
  galleryEl.style.display = "none";
  galleryEl.innerHTML = "";
  loaderEl.style.display = "flex";

  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const inputValue = searchQuery.value.trim();

  if (inputValue === "") return;

  setPageNumber();

  getImages(inputValue).then((images) => {
    const totalHits = images.data.totalHits;
    totalPages = Math.ceil(totalHits / perPage);
    window.addEventListener("scroll", throttleFindMoreImages);
    galleryEl.style.display = "flex";

    if (totalPages <= getPageNumber()) {
      loaderEl.style.display = "none";

      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );

      return;
    }

    Notiflix.Notify.success(`We are find ${totalHits} images`);

    plusPageNumber();
    renderData(images.data.hits);
  });
}

function findMoreImages() {
  if (
    getPageNumber() - 1 >= totalPages &&
    bodyEl.getBoundingClientRect().bottom < 1500
  ) {
    loaderEl.style.display = "none";

    Notiflix.Notify.info("Sorry we have no more images on this topic");
    window.removeEventListener("scroll", throttleFindMoreImages);

    return;
  }

  if (bodyEl.getBoundingClientRect().bottom > 1500) {
    functionPerformed = false;
  }

  if (bodyEl.getBoundingClientRect().bottom < 1500 && !functionPerformed) {
    functionPerformed = true;

    getImages(searchQuery.value).then((images) => {
      plusPageNumber();
      renderMore(images.data.hits);
    });
  }
}
