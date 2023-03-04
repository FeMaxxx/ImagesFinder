import axios from "axios";

const BACE_URL = "https://pixabay.com/api/";
let pageNumber = 1;
let id = "";
// order "popular" або "latest"
// editors_choice "true" або "false" фотографії які отримали вибір редактора

export const getImages = async (find) => {
  id = "";

  try {
    const config = {
      baceURL: BACE_URL,
      params: {
        key: "34101690-d1afb1df4c50c6485dfb9e98d",
        id: id,
        q: find,
        image_type: "photo", //або illustration, vector
        orientation: "horizontal",
        safesearch: true,
        per_page: 4,
        page: pageNumber,
      },
    };

    const images = await axios.get(BACE_URL, config);

    pageNumber += 1;

    return images;
  } catch {
    console.log("Ooops");
  }
};

function setPageNumber() {
  pageNumber = 1;
}

export { setPageNumber };
