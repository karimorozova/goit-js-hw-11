// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardTemplate from './templates/card-template';
import { ImgApiService } from './ImgApiService';

const imgApi = new ImgApiService();
console.log(imgApi);

const axios = require('axios');



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
        return alert('not ok');
    }
    refs.loadMoreBtn.style.opacity = 1;
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

    if(imgApi.page === 13) {
        refs.loadMoreBtn.style.opacity = 0;
      }

    imgApi.getImgs().then(imgs => {
        imgs.map(renderGallery);
      
    })
}

// function onLoadMoreClick() {
//     imgApi.incrementPage();
    
//     imgApi.getImgs().then(({data}) => {
//     data.hits.map(renderGallery);
//     console.log(data);
    
//     })
   
// }

// function fetchArticles() {
//     loadMoreBtn.disable();
//     newsApiService.fetchArticles().then(articles => {
//       appendArticlesMarkup(articles);
//       loadMoreBtn.enable();
//     });
//   }

