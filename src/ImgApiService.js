import axios from "axios";

const BASE_URL = 'https://pixabay.com/api'
const ACCESS_KEY = '25701061-595d2fe4965b481dc05c5d7ff';
const IMAGE_TYPE = 'photo';
const IMG_ORIENTATION = 'horizontal';
const SAFE_SEARCH = true;
// const per_page = 40;

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
        
        // const response = await axios.get(url).then(({data: {totalHits, hits}}) => {
        //     this.incrementPage();
        // return {totalHits, hits}});

    //     const BASE_URL = 'https://pixabay.com/api';
    // const API_KEY = '12565678-dacc4bb7fef27484506aaaffc';
    // const SEARCH_OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

    // try {
    //   const response = await axios.get(
    //     `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_OPTIONS}&page=${this.page}&per_page=40`,
    //   );
    //   this.incrementPage();
    //   return await response.data;
    // } catch (error) {}
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


  