import axios from 'axios';

export async function fetchPhotos(inputValue) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '37542595-b41027319bf159dc6d717b48d',
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    return response.data.hits; // Return the hits data
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of error
  }
}

