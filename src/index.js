import { fetchPhotos } from './photo-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let inputValue = null;
const form = document.querySelector('#search-form');
const submitButton = document.querySelector('button[type="submit"]');
const input = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');

async function onFormSubmit(evt) {
  evt.preventDefault();
  inputValue = input.value;
  const hits = await fetchPhotos(inputValue);
  renderPhotoCards(hits);
}

submitButton.addEventListener('click', onFormSubmit);

function renderPhotoCards(hits) {
  gallery.innerHTML = '';

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  hits.forEach(hit => {
    const card = createPhotoCard(hit);
    gallery.appendChild(card);
    lightbox.refresh();
  });

  const images = gallery.querySelectorAll('.img-card');
  images.forEach(image => {
    image.addEventListener('click', () => {
      lightbox.open(image);
    });
  });
}

function createPhotoCard(hit) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const link = document.createElement('a');
  link.href = hit.largeImageURL;

  const img = document.createElement('img');
  img.classList.add('img-card');
  img.src = hit.previewURL;
  img.alt = hit.tags;
  img.loading = 'lazy';
  link.appendChild(img);

  card.appendChild(link);

  const info = document.createElement('div');
  info.classList.add('info');
  card.appendChild(info);

  const infoItems = [
    `Likes ${hit.likes}`,
    `Views ${hit.views}`,
    `Comments ${hit.comments}`,
    `Downloads ${hit.downloads}`,
  ];
  infoItems.forEach(item => {
    const infoItem = document.createElement('p');
    infoItem.classList.add('info-item');
    const b = document.createElement('b');
    b.textContent = item;
    infoItem.appendChild(b);
    info.appendChild(infoItem);
  });

  return card;
}
