import axios from "axios";
import { imageType, order, editorsChoice, safesearch } from "./filter-modal";

const BACE_URL = "https://pixabay.com/api/";

const perPage = 40;
let pageNumber = 1;

const getImages = async (find) => {
  const config = {
    baceURL: BACE_URL,
    params: {
      key: "34101690-d1afb1df4c50c6485dfb9e98d",
      q: find,
      orientation: "all",
      image_type: imageType,
      order,
      editors_choice: editorsChoice,
      safesearch,
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

function setPageNumber() {
  pageNumber = 1;
}

function plusPageNumber() {
  pageNumber += 1;
}

function getPageNumber() {
  return pageNumber;
}

export { perPage, getImages, setPageNumber, plusPageNumber, getPageNumber };
