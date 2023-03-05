import { getImages, setPageNumber } from "./JS/create-list-api";
import { renderData, renderMore } from "./JS/render-data";
import throttle from "lodash.throttle";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector("#search-form");
const bodyEl = document.querySelector("body");
const { searchQuery } = formEl.elements;

formEl.addEventListener("submit", findImages);
window.addEventListener("scroll", throttle(findMoreImages, 500));

function findImages(e) {
  e.preventDefault();

  const inputValue = searchQuery.value.trim();

  if (inputValue === "") return;

  setPageNumber();

  getImages(inputValue).then((images) => {
    if (images.data.total === 0) {
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );

      return;
    }

    Notiflix.Notify.success(`We are find ${images.data.totalHits} images`);

    renderData(images.data.hits);
  });
}

function findMoreImages() {
  if (bodyEl.getBoundingClientRect().bottom > 1500) {
    functionPerformed = false;
  }

  if (bodyEl.getBoundingClientRect().bottom < 1500 && !functionPerformed) {
    functionPerformed = true;

    getImages(searchQuery.value).then((images) => {
      renderMore(images.data.hits);
    });
  }
}
