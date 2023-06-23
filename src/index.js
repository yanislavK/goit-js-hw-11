import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './photo-api';

const galleryEl = document.querySelector('.gallery');
const fromEl = document.querySelector('#search-form');
const buttonEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
let nameImages = '';
let page = 0;
let perPage = 40;
fromEl.addEventListener('submit', create);
buttonEl.addEventListener('click', loadMore);

function create(event) {
  nameImages = '';
  page = 0;
  galleryEl.innerHTML = '';
  buttonEl.classList.remove('block');
  event.preventDefault();
  if ((event.action = inputEl.value === '')) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  nameImages = event.action = inputEl.value;
  page += 1;
  fetchImages(nameImages, perPage, page)
    .then(response => {
      if (!response.data.hits.length > 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return (
          createCards(response),
          buttonEl.classList.add('block'),
          (buttonEl.disabled = false)
        );
      }
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function loadMore(event) {
  event.preventDefault();
  page += 1;
  fetchImages(nameImages, perPage, page)
    .then(response => {
      if (!response.data.hits.length > 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return (
          createCards(response), hidingBtnLoadMore(response.data.totalHits)
        );
      }
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
function createCards(arr) {
  const object = arr.data.hits;
  const card = object
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "300" height="250"/>
    </a>
    <div class="info">
    <p class="info-item">
    <b>Likes</b>
    ${likes}
    </p>
    <p class="info-item">
    <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
    <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
    ${downloads}
    </p>
    </div>
    </div> `;
      }
    )
    .join('');
  return (
    galleryEl.insertAdjacentHTML('beforeend', card),
    new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionsDelay: 250,
      disableScroll: false,
    }).refresh()
  );
}

function hidingBtnLoadMore(total) {
  const remainingImages = total - page * perPage;
  if (remainingImages <= 0) {
    buttonEl.style.display = 'none';
    Notify.failure(
      "We're sorry, but you've reached the end of the search results."
    );
  } else {
    buttonEl.style.display = 'block';
  }
}
