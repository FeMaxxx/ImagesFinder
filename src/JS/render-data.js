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
  <div class="photo-card">
    <a class="large-image" href="${el.largeImageURL}">
      <img class="image" width="100%" src="${el.webformatURL}" alt="${el.user}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>likes</b>
          ${el.likes}
        </p>
        <p class="info-item">
          <b>views</b>
          ${el.views}
        </p>
        <p class="info-item">
          <b>comments</b>
          ${el.comments}
        </p>
        <p class="info-item">
          <b>downloads</b>
          ${el.downloads}
        </p>
      </div>
    </a>
  </div>
  `;
    })
    .join("");

  return markup;
}
