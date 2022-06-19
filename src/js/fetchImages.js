import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '28149926-6b971f2bd9468f5bcaa1af96d';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    );
    return response;

    // return fetch(`${BASE_URL}/${countrieName}?fields=${URL_PARAM}`).then(
    //     response => {
    //         if (!response.ok || response.status === 404) {
    //             return Promise.reject(new Error());
    //         }
    //         return response.json();
    //     });
};

export { fetchImages };