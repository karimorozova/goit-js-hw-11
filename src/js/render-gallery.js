import { refs } from "./refs";
import cardTemplate from "../templates/card-template"

export const renderGallery = ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
   
    refs.gallery.insertAdjacentHTML('beforeend', cardTemplate({webformatURL, largeImageURL, tags, likes, views, comments, downloads}));
}