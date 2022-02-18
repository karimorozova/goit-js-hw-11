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



async function onFormSubmit(e) {
    e.preventDefault();
    clearGallery();
    const { elements: { searchQuery } } = e.currentTarget;
   
    imgApi.searchQuery = searchQuery.value;
    if(imgApi.query === '') {
        refs.loadMoreBtn.style.opacity = 0;
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    refs.loadMoreBtn.style.opacity = 0;
    imgApi.resetPage();
    
    e.currentTarget.reset();
    await getDataFromServer();
    
    
}

function renderGallery({webformatURL, tags, likes, views, comments, downloads}) {
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate({webformatURL, tags, likes, views, comments, downloads}));
}
function clearGallery() {
    refs.gallery.innerHTML = "";
}
async function getDataFromServer() {

    try {
        const {totalHits, hits} = await imgApi.getImgs();
       

       const totalPages = totalHits / imgApi.per_page;
       
         if(hits.length === 0) {
            
             throw new Error; 
        }
        if(imgApi.page === 2) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`); 
        }

        hits.map(renderGallery);
        refs.loadMoreBtn.style.opacity = 1;
        if(imgApi.page > totalPages + 1) {
           
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                refs.loadMoreBtn.style.opacity = 0;
                return;
           }
    } catch (error) {
        clearGallery();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        refs.loadMoreBtn.style.opacity = 0;
    }

}


