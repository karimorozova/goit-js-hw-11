import { refs } from "./refs";

export  const smoothScroll = () => {
   
    const { height: cardHeight} = refs.gallery.firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    })
}