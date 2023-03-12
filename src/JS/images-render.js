import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = new SimpleLightbox(".gallery a");

const galleryEl = document.querySelector(".gallery");

export function renderData(data) {
  const markup = marking(data);

  galleryEl.innerHTML = markup;
  gallery.refresh();
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
    <a class="large-image" href="${el.largeImageURL}">
      <img class="image" width="100%" src="${el.webformatURL}" alt="${el.user}" loading="lazy" />
    </a>
  `;
    })
    .join("");

  return markup;
}
