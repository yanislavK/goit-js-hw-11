import axios from 'axios';
export { fetchImages };

async function fetchImages(name, perPage, page) {
  const baseUrl = 'https://pixabay.com/api/';
  const keyApi = '?key=37542595-b41027319bf159dc6d717b48d';
  const searchUrl = '&image_type=photo&orientation=horizontal&safesearch=true';
  const response = await axios.get(
    `${baseUrl}${keyApi}&q=${name}${searchUrl}&per_page=${perPage}&page=${page}`
  );
  console.log(response);
  return response;
}
