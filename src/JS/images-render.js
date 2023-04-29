const imageModalEl = document.querySelector("[data-image-modal]");
const largeImageEl = document.querySelector("[data-large-image]");
const loader = document.querySelector("[data-img-loader]");
const galleryEl = document.querySelector(".gallery");

function handleLoader() {
  loader.style.display = "none";
  largeImageEl.style.display = "flex";
}

function escapeCloseModal(e) {
  if (e.code === "Escape") {
    imageModalEl.classList.add("image-modal-hidden");
    largeImageEl.removeEventListener("load", handleLoader);
    imageModalEl.removeEventListener("click", handleCloseModal);
    document.removeEventListener("keydown", escapeCloseModal);
  }
}

function handleCloseModal() {
  imageModalEl.classList.add("image-modal-hidden");
  largeImageEl.removeEventListener("load", handleLoader);
  imageModalEl.removeEventListener("click", handleCloseModal);
}

function handleOpenModal(e) {
  e.preventDefault();
  largeImageEl.addEventListener("load", handleLoader);
  loader.style.display = "flex";
  largeImageEl.style.display = "none";
  imageModalEl.addEventListener("click", handleCloseModal);
  imageModalEl.classList.remove("image-modal-hidden");
  largeImageEl.setAttribute("src", e.currentTarget.href);
  document.addEventListener("keydown", escapeCloseModal);
}

export function renderData(data) {
  const markup = marking(data);

  galleryEl.innerHTML = markup;

  const openBtnEl = document.querySelectorAll("[data-open-image-modal]");
  openBtnEl.forEach((element) => {
    element.removeEventListener("click", handleOpenModal);
  });

  openBtnEl.forEach((element) => {
    element.addEventListener("click", handleOpenModal);
  });
}

export function renderMore(data) {
  const markup = marking(data);

  galleryEl.insertAdjacentHTML("beforeend", markup);

  const openBtnEl = document.querySelectorAll("[data-open-image-modal]");
  openBtnEl.forEach((element) => {
    element.removeEventListener("click", handleOpenModal);
  });
  openBtnEl.forEach((element) => {
    element.addEventListener("click", handleOpenModal);
  });
}

function marking(data) {
  const markup = data
    .map((el) => {
      return `
    <a class="large-image" href="${el.largeImageURL}" data-open-image-modal>
      <img class="image" width="100%" src="${el.webformatURL}" alt="${el.user}" loading="lazy" />
    </a>
  `;
    })
    .join("");

  return markup;
}
