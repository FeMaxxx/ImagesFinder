import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { loadMoreBtnEl } from "../index";

let gallery = new SimpleLightbox(".gallery a", {});

const galleryEl = document.querySelector(".gallery");

export function renderData(data) {
  const markup = marking(data);

  galleryEl.innerHTML = markup;
  gallery.refresh();
  loadMoreBtnEl.classList.remove("is-hidden");
}

export function renderMore(data) {
  const markup = marking(data);

  galleryEl.insertAdjacentHTML("beforeend", markup);

  gallery.refresh();
}

function marking(data) {
  const markup = data
    .map((el) => {
      return `
  <div class="photo-card">
    <a class="large-image" href="${el.largeImageURL}">
      <img class="image" width="100%" src="${el.webformatURL}" alt="${el.user}" loading="lazy" />
    </a>
      <div class="info">
        <p class="info-item">
          <b>likes: ${el.likes}</b>
        </p>
        <p class="info-item">
          <b>views: ${el.views}</b>
        </p>
        <p class="info-item">
          <b>comments: ${el.comments}</b>
        </p>
        <p class="info-item">
          <b>downloads: ${el.downloads}</b>
        </p>
      </div>
  </div>
  `;
    })
    .join("");

  return markup;
}
