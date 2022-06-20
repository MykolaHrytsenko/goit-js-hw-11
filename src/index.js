import './sass/main.scss';
import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.btn-load-more');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
// loadMoreBtn.addEventListener('click', onLoadMoreBtn);


function onSearchForm(evt) {
    evt.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = evt.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    // loadMoreBtn.classList.add('is-hidden');

    if (query === '') {
        Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
        return;
    }

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

                // if (data.totalHits > perPage) {
                //     // loadMoreBtn.classList.remove('is-hidden');
                //     smoothScroll();
                // }
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            searchForm.reset();
        });
}

const infiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
        setTimeout(uploadMore, 1000);
    }
};
// async function onScroll(evt) {
//     if (
//         document.documentElement.scrollHeight - document.documentElement.scrollTop <=
//         document.documentElement.clientHeight + 1
//     ) {
//         fetchImages.currentPage += 1;
//         try {
//             const pics = await fetchImages;
//             const picsOk = await isPicturesOver(pics);
//             showPictures(picsOk);
//             smoothScroll();
//         } catch (error) {
//             if (error?.response?.status === 400) {
//                 Notiflix.Notify.failure('Page is out of valid range');
//                 picturesApiService.currentPage -= 1;
//             };

//             if (error?.data?.hits?.length === 0) {
//                 Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
//                 picturesApiService.currentPage -= 1;
//             };
//         };
//     };
// };

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};


const handleScroll = () => {
    infiniteScroll();
};

const uploadMore = () => {
    fetchImages(searchForm.searchQuery.value, page)
        .then(data => {
            renderGallery(data);
            scrollPage();
            page += 1;
        })
        .catch(() => {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        });
    console.log(fetchImages())
};



// async function isPicturesOver(response) {
//     if (response.data.hits.length === 0) {
//         throw response;
//     }
//     return response;
// };

// function onLoadMoreBtn() {
//     page += 1;
//     simpleLightBox.destroy();

//     fetchImages(query, page, perPage)
//         .then(({ data }) => {
//             renderGallery(data.hits);
//             simpleLightBox = new SimpleLightbox('.gallery a').refresh();

//             const totalPages = Math.ceil(data.totalHits / perPage);

//             if (page > totalPages) {
//                 loadMoreBtn.classList.add('is-hidden');
//                 Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//             }
//         })
//         .catch(error => console.log(error));
// }

window.addEventListener('scroll', handleScroll);