import cardTemplate from './templates/card-template';
import { ImgApiService } from './ImgApiService';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios');

const imgApi = new ImgApiService();


const refs = {
    formData: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

refs.formData.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', getDataFromServer)



function onFormSubmit(e) {
    e.preventDefault();
    
    const { elements: { searchQuery } } = e.currentTarget;
   
    imgApi.searchQuery = searchQuery.value;
    if(imgApi.query === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    refs.loadMoreBtn.style.opacity = 0;
    imgApi.resetPage();
    clearGallery();
    e.currentTarget.reset();
    getDataFromServer();
    
}

function renderGallery({webformatURL, tags, likes, views, comments, downloads}) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate({webformatURL, tags, likes, views, comments, downloads}));
}
function clearGallery() {
    refs.gallery.innerHTML = "";
}
function getDataFromServer() {

    // if(imgApi.page === 13) {
    //     Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    //   }

    imgApi.getImgs().then(({totalHits, hits}) => {
       const totalPages = totalHits /40;
       console.log(totalPages);
    //    console.log(page> totalPages);
    console.log(page);
    //    if(page > totalPages) {
    //     Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    //     refs.loadMoreBtn.style.opacity = 0;
    //     console.log(page);
    //    }
         if(hits.length === 0) {
            refs.loadMoreBtn.style.opacity = 0;
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;  
        }
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        hits.map(renderGallery);
        refs.loadMoreBtn.style.opacity = 1;
    }).catch(() => {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.style.opacity = 0;

    })
}

