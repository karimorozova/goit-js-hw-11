import cardTemplate from './templates/card-template';
import { ImgApiService } from './js/ImgApiService';
import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { renderGallery } from './js/render-gallery';
import { clearGallery } from './js/clear-gallery';
import { smoothScroll } from './js/smooth-scroll';
import { refs } from './js/refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgApi = new ImgApiService();
// console.log(document.querySelector('.gallery__item'));
// const gallerySimple = new SimpleLightbox('.gallery__item');
// gallerySimple.on('show.simplelightbox');

refs.formData.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', getDataFromServer);
refs.gallery.addEventListener('click', onGalleryClick);


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

    imgApi.resetPage();
    e.currentTarget.reset();
    refs.loadMoreBtn.style.opacity = 0;
    await getDataFromServer();
    
}
async function getDataFromServer() {

    try {
        const {totalHits, hits} = await imgApi.getImgs();
       
       const totalPages = totalHits / imgApi.per_page;
       console.log(imgApi.page);
       
         if(hits.length === 0) {
            
             throw new Error; 
        }
        if(imgApi.page === 2) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`); 
        }
        if(imgApi.page > totalPages + 1) {
           
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                refs.loadMoreBtn.style.opacity = 0;
                return;
           }

        refs.loadMoreBtn.style.opacity = 1;
         hits.map(renderGallery);
        
        const gallerySimple = new SimpleLightbox('.gallery-item');
        gallerySimple.on('show.simplelightbox');
        gallerySimple.refresh();

        smoothScroll();
    } catch (error) {
        clearGallery();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        refs.loadMoreBtn.style.opacity = 0;
    }

}

function onGalleryClick(e) {
e.preventDefault();
}
