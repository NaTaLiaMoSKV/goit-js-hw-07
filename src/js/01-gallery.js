import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

function createGalleryItemsMarkup(items) {
    return items.map( ({preview, original, description}) => {
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    }).join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    evt.preventDefault();
    const originalImageSrc = evt.target.dataset.source;
    createBasicLightBox(originalImageSrc);
}

function createBasicLightBox(source) {
    const instance = basicLightbox.create(
        `<img class="gallery__image" src=${source}></img>`
    )
    instance.show();
    document.addEventListener('keydown', event => {
        if(event.key === 'Escape') {
            instance.close();
        }
    });
}

