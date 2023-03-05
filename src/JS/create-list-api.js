import axios from "axios";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";

const BACE_URL = "https://pixabay.com/api/";
const buttonsList = document.querySelector(".buttons-list");
const { all } = buttonsList.children;

export const perPage = 40;
let pageNumber = 1;
let imageType = "all";
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

    imageType = prevTdEl.attributes.name.value;

    return;
  }

  imageType = e.target.attributes.name.value;

  e.target.classList.add("active");

  prevTdEl = e.target;
}

export const getImages = async (find) => {
  const config = {
    baceURL: BACE_URL,
    params: {
      key: "34101690-d1afb1df4c50c6485dfb9e98d",
      q: find,
      image_type: imageType,
      orientation: "horizontal",
      safesearch: true,
      per_page: perPage,
      page: pageNumber,
    },
  };

  try {
    const images = await axios.get(BACE_URL, config);

    return images;
  } catch {
    console.log("Ooops");
  }
};

export function setPageNumber() {
  pageNumber = 1;
}

export function plusPageNumber() {
  pageNumber += 1;
}

export function getPageNumber() {
  return pageNumber;
}
