import axios from "axios";

const BACE_URL = "https://pixabay.com/api/";
let pageNumber = 1;
let id = "";
let image_type = "all";

// order "popular" або "latest"
// editors_choice "true" або "false" фотографії які отримали вибір редактора

const buttonsList = document.querySelector(".buttons-list");
const { all } = buttonsList.children;
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

  // e.target.style.backgroundColor = "teal";
  e.target.classList.add("active");

  prevTdEl = e.target;
}

export const getImages = async (find) => {
  id = "";

  const config = {
    baceURL: BACE_URL,
    params: {
      key: "34101690-d1afb1df4c50c6485dfb9e98d",
      id: id,
      q: find,
      image_type: image_type, //або illustration, vector, photo
      orientation: "horizontal",
      safesearch: true,
      per_page: 40,
      page: pageNumber,
    },
  };

  try {
    const images = await axios.get(BACE_URL, config);

    pageNumber += 1;

    return images;
  } catch {
    console.log("Ooops");
  }
};

export function setPageNumber() {
  pageNumber = 1;
}
