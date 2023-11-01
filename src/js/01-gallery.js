import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const galleryImages = document.querySelectorAll('.gallery__image');

function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('');
}

gallery.innerHTML = createMarkup(galleryItems);

const lightbox = new SimpleLightbox('.gallery__link', {
  captions: true,
});

gallery.addEventListener('click', openOriginalIMG);
let modalOpen = false;

function openOriginalIMG(e) {
  e.preventDefault();

  const imgOriginal = e.target.closest('.gallery__link');

  lightbox.open({
    items: [
      {
        url: imgOriginal.getAttribute('href'),
        title: 'Image Title',
      },
    ],
  });

  modalOpen = true;
  document.addEventListener('keydown', closeModal);
}

function closeModal(event) {
  if (event.key === 'Escape' && modalOpen) {
    lightbox.close();
    modalOpen = false;
    document.removeEventListener('keydown', closeModal);
  }
}
