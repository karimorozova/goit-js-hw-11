import axios from "axios";

const BASE_URL = 'https://pixabay.com/api'
const ACCESS_KEY = '25701061-595d2fe4965b481dc05c5d7ff';
const IMAGE_TYPE = 'photo';
const IMG_ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;


export class ImgApiService {
    constructor() {
        this.query = "";
        this.page = 1;
        this.per_page = 40
    }

    async getImgs() {
        const url = `${BASE_URL}/?key=${ACCESS_KEY}&q=${this.query}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${this.page}&per_page=${this.per_page}`;
        
            const response = await axios.get(url);
            this.incrementPage();
          
            return response.data;
        
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


  