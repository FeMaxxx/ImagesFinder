import {
  getImages,
  setPageNumber,
  plusPageNumber,
  perPage,
  getPageNumber,
} from "./JS/create-list-api";
import { renderData, renderMore } from "./JS/render-data";
import throttle from "lodash.throttle";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector("#search-form");
const bodyEl = document.querySelector("body");
const { searchQuery } = formEl.elements;

let totalPages = 0;

let functionPerformed = true;

const throttleFindMoreImages = throttle(findMoreImages, 500);

formEl.addEventListener("submit", findImages);

function findImages(e) {
  e.preventDefault();

  const inputValue = searchQuery.value.trim();

  if (inputValue === "") return;

  setPageNumber();

  getImages(inputValue).then((images) => {
    const totalHits = images.data.totalHits;
    totalPages = Math.ceil(totalHits / perPage);

    document.addEventListener("scroll", throttleFindMoreImages);

    if (images.data.total === 0) {
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
    Notiflix.Notify.info("Sorry we have no more images on this topic");
    document.removeEventListener("scroll", throttleFindMoreImages);

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
