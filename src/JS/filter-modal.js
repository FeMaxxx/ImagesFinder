const modalFilterEl = document.querySelector("[data-modal-filter]");
const openBtnEl = document.querySelector("[data-open-modal]");
const closeBtnEl = document.querySelector("[data-close-modal]");

const imageTypeBtnList = document.querySelector("[data-image-type]");
const imageOrderBtnList = document.querySelector("[data-image-order]");
const imageEditorsChoiceBtnList = document.querySelector(
  "[data-image-editors-choice]"
);
const imageSafesearchBtnList = document.querySelector(
  "[data-image-safesearch]"
);

openBtnEl.addEventListener("click", openModal);

function openModal() {
  modalFilterEl.classList.remove("modal-hidden");

  modalFilterEl.addEventListener("mousedown", handleClickOnModal);
  document.addEventListener("keydown", escapeCloseModal);
  closeBtnEl.addEventListener("click", closeModal);
  document.addEventListener("mousedown", aroundCloseModal);

  imageTypeBtnList.addEventListener("click", choiceType);
  imageOrderBtnList.addEventListener("click", choiceOrder);
  imageEditorsChoiceBtnList.addEventListener("click", choiceEditorsChoice);
  imageSafesearchBtnList.addEventListener("click", choiceSafesearch);
}

function closeModal() {
  removeEventListenersAndCloseModal();
}

function escapeCloseModal(e) {
  if (e.code === "Escape") {
    removeEventListenersAndCloseModal();
  }
}

function aroundCloseModal(e) {
  if (e.target.classList.contains("modal-filter")) {
    return;
  }

  removeEventListenersAndCloseModal();
}

function handleClickOnModal(e) {
  e.stopPropagation();
}

function removeEventListenersAndCloseModal() {
  modalFilterEl.removeEventListener("mousedown", handleClickOnModal);
  closeBtnEl.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", escapeCloseModal);
  document.removeEventListener("mousedown", aroundCloseModal);

  imageTypeBtnList.removeEventListener("click", choiceType);
  imageOrderBtnList.removeEventListener("click", choiceOrder);
  imageEditorsChoiceBtnList.removeEventListener("click", choiceEditorsChoice);
  imageSafesearchBtnList.removeEventListener("click", choiceSafesearch);

  modalFilterEl.classList.add("modal-hidden");
}

let imageType = "all";
let order = "popular";
let editorsChoice = false;
let safesearch = true;

let typeButtonSelected = imageTypeBtnList.children.all;
let orderButtonSelected = imageOrderBtnList.children.popular;
let editorsChoiceButtonSelected = imageEditorsChoiceBtnList.children.falce;
let safesearchButtonSelected = imageSafesearchBtnList.children.true;

if (localStorage.getItem("imageType")) {
  imageType = localStorage.getItem("imageType");

  typeButtonSelected = imageTypeBtnList.querySelector(
    `button[name="${imageType}"]`
  );
}

if (localStorage.getItem("order")) {
  order = localStorage.getItem("order");

  orderButtonSelected = imageOrderBtnList.querySelector(
    `button[name="${order}"]`
  );
}

if (localStorage.getItem("editorsChoice")) {
  editorsChoice = localStorage.getItem("editorsChoice");

  editorsChoiceButtonSelected = imageEditorsChoiceBtnList.querySelector(
    `button[name="${editorsChoice}"]`
  );
}

if (localStorage.getItem("safesearch")) {
  safesearch = localStorage.getItem("safesearch");

  safesearchButtonSelected = imageSafesearchBtnList.querySelector(
    `button[name="${safesearch}"]`
  );
}

typeButtonSelected.classList.add("active");
orderButtonSelected.classList.add("active");
editorsChoiceButtonSelected.classList.add("active");
safesearchButtonSelected.classList.add("active");

function choiceType(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  typeButtonSelected.classList.remove("active");

  e.target.classList.add("active");

  typeButtonSelected = e.target;

  imageType = typeButtonSelected.attributes.name.value;

  localStorage.setItem("imageType", imageType);
}

function choiceOrder(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  orderButtonSelected.classList.remove("active");

  e.target.classList.add("active");

  orderButtonSelected = e.target;

  order = orderButtonSelected.attributes.name.value;

  localStorage.setItem("order", order);
}

function choiceEditorsChoice(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  editorsChoiceButtonSelected.classList.remove("active");

  e.target.classList.add("active");

  editorsChoiceButtonSelected = e.target;

  editorsChoice = editorsChoiceButtonSelected.attributes.name.value;

  localStorage.setItem("editorsChoice", editorsChoice);
}

function choiceSafesearch(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  safesearchButtonSelected.classList.remove("active");

  e.target.classList.add("active");

  safesearchButtonSelected = e.target;

  safesearch = safesearchButtonSelected.attributes.name.value;

  localStorage.setItem("safesearch", safesearch);
}

export { imageType, order, editorsChoice, safesearch };
