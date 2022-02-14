// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

fetch('https://pixabay.com/api/?key=25701061-595d2fe4965b481dc05c5d7ff&q=yellow+flowers&image_type=photo').then(res=>res.json())