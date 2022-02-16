// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardTemplate from './templates/card-template';
// console.log(cardTemplate);

// fetch('https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=iphone&image_type=photo').then(res=>res.json()).catch(console.log)

const axios = require('axios');

// axios.get('https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=iphones&image_type=photo')

// async function getUser() {
//     try {
//       const response = await axios.get('https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=iphone&image_type=photo');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getUser()

const BASE_URL = 'https://pixabay.com/api'
const ACCESS_KEY = '25701061-595d2fe4965b481dc05c5d7ff';
const IMAGE_TYPE = 'photo';
const IMG_ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;
let page = 1;


const refs = {
    formData: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

refs.formData.addEventListener('submit', onFormSubmit);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);



function onFormSubmit(e) {
    e.preventDefault();
    const { elements: { searchQuery } } = e.currentTarget;
    console.log(searchQuery);

    getDataFromServer(searchQuery.value)

    // axios.get("https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=yellow+flowers&image_type=photo").map(renderGallery)
    // fetch(`${BASE_URL}/?key=${ACCESS_KEY}&q=${searchQuery.value}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}`).then(res=>res.json()).then(({hits}) => hits.map(renderGallery))
}

function renderGallery({webformatURL, tags, likes, views, comments, downloads}) {
    refs.gallery.insertAdjacentHTML('beforebegin', cardTemplate({webformatURL, tags, likes, views, comments, downloads}));
}

function getDataFromServer(value) {
    let page = 1;
const per_page = 40;
// const totalHits = 500;
// const totalPages = totalHits / per_page;
// console.log(totalPages);
    const promise = axios.get(`${BASE_URL}/?key=${ACCESS_KEY}&q=${value}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${page}&per_page=${per_page}`);
   promise.then(({data}) => {
    //    page += 1;
       const totalPages = data.totalHits / per_page;
       if(page === totalPages) {
        refs.loadMoreBtn.style.opacity = 0;
           alert('Poka');
           return;
       }
       refs.loadMoreBtn.style.opacity = 1;
       console.log(data.totalHits)});
       refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
    //    return axios.get(`${BASE_URL}/?key=${ACCESS_KEY}&q=${value}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${page}&per_page=${per_page}`);
}

function onLoadMoreClick() {
    page += 1;
    getDataFromServer();
}

/*
key - твой уникальный ключ доступа к API.
q - термин для поиска. То, что будет вводить пользователь.
image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
orientation - ориентация фотографии. Задай значение horizontal.
safesearch - фильтр по возрасту. Задай значение true.
*/

/*
webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок.
*/

// fetch('https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=yellow+flowers&image_type=photo').then(res=>res.json())
