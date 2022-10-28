async function getData(){
  try{
    const res = await fetch('data/photographers.json');
    const ok = await res.json();
    return ok;     
  }
  catch (e) {
    console.log(e);
  }
}

const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id');



async function getMedias() {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const mediasData = await data.media;
    return mediasData;
  }
  catch (e) {
    console.log(e);
  }
}


class Photographers {
  constructor(photographers) {
    this.photographers = photographers;
  }

  createPhotographerHeader() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('photographer');

    const photographerHeader =
        `
        <div class="photographer_info" aria-label="Informations relatives au photographe ${this.photographers.name}">
            <h1>${this.photographers.name}</h1>
            <p class="city">${this.photographers.city}, ${this.photographers.country}</p>
            <p class="tagline">${this.photographers.tagline}</p>
        </div>
        <div class="photographer_contact">
            <button class="contact_button" alt="Contact Me" onclick="displayModal()">Contactez-moi</button>
        </div>  
        <div class="photographer_photo">
            <img src="assets/photographers/${this.photographers.portrait}" alt ="${this.photographers.name}">
        </div>
        `

    wrapper.innerHTML = photographerHeader;
    return wrapper;
  }

  createTotalLikes(){
    const wrapper = document.createElement('div');
    wrapper.classList.add('likes_container');

    const mediaWrapper =
    `
    <h1 class="likes_bloc-total">
    </h1>
    
    <p class="likes_price">${this.photographers.price}€/jour</p>

    `;

    wrapper.innerHTML = mediaWrapper;
    return wrapper;
  }

  createFormName(){
    const wrapper = document.createElement('h2');
    wrapper.classList.add('photographer-name');

    const mediaWrapper =
    `
    <h2>${this.photographers.name}</h2>
    `;

    wrapper.innerHTML = mediaWrapper;
    return wrapper;
  }
}

function displayPhotographerHeader(photographerFilter){
  photographersHeader = document.querySelector('.photographer_header');
  photographerFilter.forEach((photographer) => {
      photographersHeader.appendChild(new Photographers(photographer).createPhotographerHeader()
      )
  })
}

function displayTotalLikes(photographerFilter){
  MediasBottom = document.querySelector('.likes');
  photographerFilter.forEach((price) => {
    MediasBottom.appendChild(new Photographers(price).createTotalLikes()
    )
  })
}

function displayFormName(photographerFilter){
  namePhotographer = document.querySelector('.name');
  photographerFilter.forEach((name) => {
    namePhotographer.appendChild(new Photographers(name).createFormName()
    )
  })
}

async function init() {
  const res = await getData();
  const photographersData = res.photographers
  const photographerFilter = photographersData.filter((photographer) => photographer.id == photographerId);
  displayPhotographerHeader(photographerFilter)
  displayTotalLikes(photographerFilter)
  displayFormName(photographerFilter)
}




init()