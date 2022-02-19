// import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

// export const ias = new InfiniteAjaxScroll('.gallery', {
//   item: '.photo-card',
//   next: nextHandler,
//   pagination: '.pagination'
// });
import { ImgApiService } from "./ImgApiService";
import { refs } from "./refs";
import { renderGallery } from "./render-gallery";

const imgApi = new ImgApiService();

export async function intersectionObserver() {
    const options = {
        rootMargin: '300px',
    }
    const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.scrollEl);

 function onEntry(entries) {
    entries.forEach(fetchEntriesForScroll);
}

async function fetchEntriesForScroll(value) {
if(value.isIntersecting&& imgApi.query !== "") {
    console.log('kolp');
  const {hits} =  await imgApi.getImgs();
    hits.map(renderGallery)
}
}
}

