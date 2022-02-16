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

    async getImgs() {
        const url = `${BASE_URL}/?key=${ACCESS_KEY}&q=${this.query}&image-type=${IMAGE_TYPE}&orientation=${IMG_ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${this.page}&per_page=${per_page}`;
        
        const response = await axios.get(url).then(({data: {totalHits, hits}}) => {
            this.incrementPage();
        return {totalHits, hits}});
        // console.log(response);

    
        // const responseData = await response.then(({data: {totalHits, hits}}) => {
        //     this.incrementPage();
        // return {totalHits, hits}})

        return response;
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


  