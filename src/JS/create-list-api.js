import axios from "axios";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const BACE_URL = "https://pixabay.com/api/";
const buttonsList = document.querySelector(".buttons-list");
const { all } = buttonsList.children;

const per_page = 40;
let pageNumber = 1;
let image_type = "all";
let prevTdEl = all;

buttonsList.addEventListener("click", photoBtnCheck);

function photoBtnCheck(e) {
  if (e.target.nodeName === "DIV") {
    return;
  }

  if (prevTdEl) {
    prevTdEl.classList.remove("active");
  }

  if (e.target.nodeName === "SPAN") {
    prevTdEl = e.target.parentNode;
    prevTdEl.classList.add("active");

    image_type = prevTdEl.attributes.name.value;

    return;
  }

  image_type = e.target.attributes.name.value;

  e.target.classList.add("active");

  prevTdEl = e.target;
}

export const getImages = async (find) => {
  const config = {
    baceURL: BACE_URL,
    params: {
      key: "34101690-d1afb1df4c50c6485dfb9e98d",
      q: find,
      image_type: image_type,
      orientation: "horizontal",
      safesearch: true,
      per_page: per_page,
      page: pageNumber,
    },
  };

  const images = await axios.get(BACE_URL, config);
  let totalPages = Math.ceil(images.data.totalHits / per_page);

  if (pageNumber > totalPages) {
    Notiflix.Notify.info("Sorry we have no more images on this topic");

    return;
  }

  try {
    pageNumber += 1;

    return images;
  } catch {
    console.log("Ooops");
  }
};

export function setPageNumber() {
  pageNumber = 1;
}
