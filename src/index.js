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
    refs.loadMoreBtn.classList.add('is-hidden');
    await getDataFromServer();
    
}
async function getDataFromServer() {

    try {
        const {totalHits, hits} = await imgApi.getImgs();
       
       const totalPages = totalHits / imgApi.per_page;
    //    console.log(imgApi.page);
       
         if(hits.length === 0) {
            
             throw new Error; 
        }
        if(imgApi.page === 2) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`); 
        }
        hits.map(renderGallery);
        if(imgApi.page > totalPages + 1) {
            console.log(imgApi.page > totalPages + 1);
           
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            // refs.loadMoreBtn.classList.add('is-hidden');
                return;
           }

        //    refs.loadMoreBtn.classList.remove('is-hidden');
        
        
        const gallerySimple = new SimpleLightbox('.gallery-item');
        gallerySimple.on('show.simplelightbox');
        gallerySimple.refresh();

        smoothScroll();
    } catch (error) {
        clearGallery();
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        // refs.loadMoreBtn.classList.add('is-hidden');
    }

}

intersectionObserver();

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
    console.log('kolp');
  const {hits, totalHits} =  await imgApi.getImgs();
  const totalPages = totalHits / imgApi.per_page;
    hits.map(renderGallery);
  
    
}

}
}

// function intersectionObserver() {
//     const options = {
//         rootMargin: '300px',
//     }
//     const observer = new IntersectionObserver(onEntry, options);
// observer.observe(refs.scrollEl);

//  function onEntry(entries) {
//     entries.forEach(fetchEntriesForScroll);
// }

// async function fetchEntriesForScroll(value) {
// if(value.isIntersecting&& imgApi.query !== "") {
//     console.log('kolp');
//   const {hits} =  await imgApi.getImgs();
//     hits.map(renderGallery)
// }
// }
// }

// const options = {
//     rootMargin: '300px',
// }


// const observer = new IntersectionObserver(onEntry, options);
// observer.observe(refs.scrollEl);

//  function onEntry(entries) {
//     entries.forEach(fetchEntriesForScroll);
// }

// async function fetchEntriesForScroll(value) {
// if(value.isIntersecting&& imgApi.query !== "") {
//     console.log('kolp');
//   const {hits} =  await imgApi.getImgs();
//     hits.map(renderGallery)
// }
// }
