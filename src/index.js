import { getImages, setPageNumber } from "./JS/create-list-api";
import { renderData, renderMore } from "./JS/render-data";

import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector("#search-form");
export const loadMoreBtnEl = document.querySelector(".load-more");

const { searchQuery } = formEl.elements;

formEl.addEventListener("submit", findImages);
loadMoreBtnEl.addEventListener("click", findMoreImages);

function findImages(e) {
  e.preventDefault();

  const inputValue = searchQuery.value.trim();

  if (inputValue === "") return;

  setPageNumber();

  getImages(inputValue).then((images) => {
    if (images.data.total === 0) {
      console.log("no images");
      return;
    }

    console.log(`We are find ${images.data.totalHits} images`);

    renderData(images.data.hits);
  });
}

function findMoreImages() {
  getImages(searchQuery.value).then((images) => {
    renderMore(images.data.hits);
  });
}
