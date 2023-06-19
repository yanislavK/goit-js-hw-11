import { fetchPhotos } from './photo-api.js';

let inputValue = null;

const form = document.querySelector('#search-form');
const submitButton = document.querySelector('button[type="submit"]');
const input = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector(`.gallery`);

async function onFormSubmit(evt) {
  evt.preventDefault();
  inputValue = input.value;

    const hits = await fetchPhotos(inputValue);

  renderPhotoCards(hits);
}

submitButton.addEventListener('click', onFormSubmit);

function renderPhotoCards(hits) {
  
  gallery.innerHTML = '';

    hits.forEach(hit => {
    const card = document.createElement('div');
    card.classList.add('photo-card');

    // Create and set image
    const img = document.createElement('img');
    img.src = hit.previewURL;
    img.alt = hit.tags;
    img.loading = 'lazy';
    card.appendChild(img);

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

    gallery.appendChild(card);
  });
}
