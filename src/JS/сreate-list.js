import { ImagesApi } from "./сreate-list-api";
import { renderData } from "./render-data";
import { renderMore } from "./render-data";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const formEl = document.querySelector("#search-form");
export const loadMoreBtnEl = document.querySelector(".load-more");

const { searchQuery } = formEl.elements;

const imagesApi = new ImagesApi();

formEl.addEventListener("submit", findImages);
loadMoreBtnEl.addEventListener("click", findMoreImages);

function findImages(e) {
  e.preventDefault();

  const inputValue = searchQuery.value.trim();

  if (inputValue === "") return;

  imagesApi.setPageNumber();

  imagesApi.getImages(inputValue).then((images) => {
    if (images.data.total === 0) {
      console.log("no images");
      return;
    }

    console.log(`We are find ${images.data.totalHits} images`);

    renderData(images.data.hits);
  });
}

function findMoreImages() {
  imagesApi.getImages(searchQuery.value).then((images) => {
    renderMore(images.data.hits);
  });
}
