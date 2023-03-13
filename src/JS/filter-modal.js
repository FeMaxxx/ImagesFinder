const modalFilterEl = document.querySelector("[data-modal-filter]");
const openBtnEl = document.querySelector("[data-open-modal]");
const closeBtnEl = document.querySelector("[data-close-modal]");

openBtnEl.addEventListener("click", openModal);

function openModal() {
  modalFilterEl.classList.remove("modal-hidden");

  modalFilterEl.addEventListener("mousedown", handleClickOnModal);
  document.addEventListener("keydown", escapeCloseModal);
  closeBtnEl.addEventListener("click", closeModal);
  document.addEventListener("mousedown", aroundCloseModal);
}

function closeModal() {
  removeEventListeners();

  modalFilterEl.classList.add("modal-hidden");
}

function escapeCloseModal(e) {
  if (e.code === "Escape") {
    removeEventListeners();

    modalFilterEl.classList.add("modal-hidden");
  }
}

function aroundCloseModal(e) {
  if (e.target.classList.contains("modal-filter")) {
    return;
  }

  removeEventListeners();

  modalFilterEl.classList.add("modal-hidden");
}

function handleClickOnModal(e) {
  e.stopPropagation();
}

function removeEventListeners() {
  modalFilterEl.removeEventListener("mousedown", handleClickOnModal);
  closeBtnEl.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", escapeCloseModal);
  document.removeEventListener("mousedown", aroundCloseModal);
}
