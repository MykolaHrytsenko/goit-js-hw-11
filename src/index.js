import './sass/main.scss';
import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more__btn')
}

// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more__btn');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);


function onSearchForm(evt) {
    evt.preventDefault();
    page = 1;
    query = evt.currentTarget.searchQuery.value.trim();
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');

    if (query === '') {
        Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
        return;
    };

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

                if (data.totalHits > perPage) {
                    refs.loadMoreBtn.classList.remove('is-hidden');
                }
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            refs.searchForm.reset();
        });
};

function onLoadMoreBtn() {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page > totalPages) {
                refs.loadMoreBtn.classList.add('is-hidden');
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        })
        .catch(error => console.log(error));
};
