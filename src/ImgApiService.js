import axios from "axios";

const BASE_URL = 'https://pixabay.com/api'
const ACCESS_KEY = '25701061-595d2fe4965b481dc05c5d7ff';
const IMAGE_TYPE = 'photo';
const IMG_ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;
const per_page = 40;

export class ImgApiService {
    constructor() {
        this.query = "";
        this.page = 1;
    }

    getImgs() {
        const url = `${BASE_URL}/?key=${ACCESS_KEY}&q=${this.query}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${this.page}&per_page=${per_page}`;
        return axios.get(url).then(({data}) => {
            this.incrementPage();
           
        return data.hits})
        }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    get searchQuery() {
        return this.query;
    }

    set searchQuery(newQuery) {
        this.query = newQuery;
    }
}

//   fetchArticles() {
//     const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

//     return fetch(url, options)
//       .then(response => response.json())
//       .then(({ articles }) => {
//         this.incrementPage();
//         return articles;
//       });
//   }

  