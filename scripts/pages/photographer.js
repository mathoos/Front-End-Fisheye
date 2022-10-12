// Obtenir l'id de l'url

const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id');


async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const photographersData = await data.photographers;
    return photographersData;
  } catch (e) {
    console.log(e);
  }
}

async function getMedias() {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const mediasData = await data.media;
    return mediasData;
  } catch (e) {
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
        <div class="photographer_info">
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

  createBottomWrapper(){
    const wrapper = document.createElement('div');
    wrapper.classList.add('likes_container');

    const mediaWrapper =
    `
    <p class="likes_price">${this.photographers.price}€/jour</p>

    `;

    wrapper.innerHTML = mediaWrapper;
    return wrapper;
  }
}


class PhotographerHeader {
  constructor() {
    this.photographersHeader = document.querySelector('.photographer_header');
  }

  async main() {
    const photographersData = await getPhotographers();
    const photographerFilter = photographersData.filter((photographer) => photographer.id == photographerId);
    photographerFilter.forEach((header) => {
        this.photographersHeader.appendChild(new Photographers(header).createPhotographerHeader()
        )
    })
  }
}

class WrapperBottom{
  constructor() {
    this.MediasBottom = document.querySelector('.likes');
  }
   async main() {
    const photographersData = await getPhotographers();
    const photographerFilter = photographersData.filter((photographer) => photographer.id == photographerId);

    photographerFilter.forEach((price) => {
        this.MediasBottom.appendChild(new Photographers(price).createBottomWrapper()
        )
    })
  }
}

new PhotographerHeader().main()
new WrapperBottom().main()


