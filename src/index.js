import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery')
}

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
    evt.preventDefault();

    const value = evt.target.value.trim();

    // if (!value) {
    //     return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
    // };

    // fetchImages(value)
    //     .then(name => {
    //         refs.countryList.innerHTML = '';
    //         refs.countryInfo.innerHTML = '';

    //         if (name.length === 1) {
    //             renderCountryInfo(name)
    //             return
    //         }

    //         if (name.length >= 10) {
    //             Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    //             return
    //         }

    //         else {
    //             renderCountryList(name);
    //         };
    //     }).catch(onError);

};