import cardTemplate from './templates/card-template';
import { ImgApiService } from './js/ImgApiService';
import { renderGallery } from './js/render-gallery';
import { clearGallery } from './js/clear-gallery';
import { smoothScroll } from './js/smooth-scroll';
import { refs } from './js/refs';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgApi = new ImgApiService();

refs.formData.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', getDataFromServer);
refs.gallery.addEventListener('click', onGalleryClick);

// intersectionObserver();


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
    refs.loadMoreBtn.classList.add('is-hidden');
    await getDataFromServer();
   
   
}
async function getDataFromServer() {

    try {
        const {totalHits, hits} = await imgApi.getImgs();
       const totalPages = totalHits / imgApi.per_page;

       hits.map(renderGallery);
       
         if(hits.length === 0) {
            
             throw new Error; 
        }
        if(imgApi.page === 2) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`); 
        }
        if(imgApi.page > totalPages + 1) {

            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('is-hidden');
                return;
           }

           refs.loadMoreBtn.classList.remove('is-hidden');
        
        const gallerySimple = new SimpleLightbox('.gallery-item');
        gallerySimple.on('show.simplelightbox');
        gallerySimple.refresh();

        smoothScroll();
    } catch (error) {
        clearGallery();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        refs.loadMoreBtn.classList.add('is-hidden');
    }

}

function onGalleryClick(e) {
e.preventDefault();
}

function intersectionObserver() {
    const options = {
        rootMargin: '300px',
    }
    const observer = new IntersectionObserver(onEntry, options);
    observer.observe(refs.scrollEl);

    function onEntry(entries) {
    entries.forEach(fetchEntriesForScroll);
    }

    async function fetchEntriesForScroll(value) {
    if(value.isIntersecting && imgApi.query !== "") {
        
        try {
            const {hits, totalHits} =  await imgApi.getImgs();
            const totalPages = totalHits / imgApi.per_page;
            refs.loadMoreBtn.classList.add('is-hidden');

        hits.map(renderGallery);

          if(imgApi.page > totalPages + 2) {
           Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
           }

        const gallerySimple = new SimpleLightbox('.gallery-item');
        gallerySimple.on('show.simplelightbox');
        } catch (error) {
            clearGallery();
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
  
}
}
}
