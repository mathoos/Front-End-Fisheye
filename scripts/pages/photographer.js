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
  }

  createMediaWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('medias_card');

    const mediaWrapper =
        `
        <div class="medias_card-up">${this.mediaWrapper.displayMedia()}</div>
        <div class="medias_card-down">
            <div class="medias_card-down--title">
                <p>${this.mediaWrapper.title}</p>
            </div>
            <div class="medias_card-down--likes">
                <p>${this.mediaWrapper.likes}</p>
                <button class="like">
                    <i class="visible-heart far fa-heart"></i>
                </button>
            </div>
        </div>
        `;

    wrapper.innerHTML = mediaWrapper;
    return wrapper;
  }
}

class Image extends Media {
  constructor(media) {
    super(media);
  }

  displayMedia() {
    return `<img alt="${this.mediaWrapper.title}" class="displayMedia" id="image" src="assets/media/${this.mediaWrapper.image}">`;
  }
}

class Video extends Media {
  constructor(media) {
    super(media); // appel du constructeur parent
  }

  displayMedia() {
    return `<video class="displayMedia" id="image" autoplay src="assets/media/${this.mediaWrapper.video}" type="video/mp4"></video>`;
  }
}


class MediaFactory {
  static create(media) {
    if (media.image) {
      return new Image(media);
    } else if (media.video) {
      return new Video(media);
    } else {
      throw 'Unknown media';
    }
  }
}


class AppMedia {
  constructor() {
    this.MediasWrapper = document.querySelector('.medias');
  }

  async mainMedia() {
    const mediasData = await getMedias();
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
    mediaFilter = mediaFilter.map((media) => MediaFactory.create(media));

    // AFFICHER MEDIAS
    mediaFilter.forEach((mediaWrapper) => {
      const template = new Media(mediaWrapper);
      this.MediasWrapper.appendChild(
          template.createMediaWrapper(),

      );
    });
  }

  async sort() {
    const mediasData = await getMedias();
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
    mediaFilter = mediaFilter.map((media) => MediaFactory.create(media));

    const select = document.getElementById('sort-select');

    select.addEventListener('change', (e) => {
      e.preventDefault();
      const sortType = select.options[select.selectedIndex].id;

      // TRI PAR DATE
      if (sortType === 'dateButton') {
        console.log('Tri par date');
        mediaFilter.sort(dateFilter);
        document.querySelector('.medias').innerHTML = '';
        mediaFilter.forEach((mediaWrapper) => {
          const template = new Media(mediaWrapper);
          this.MediasWrapper.appendChild(
              template.createMediaWrapper(),

          );
        });
      }

      // TRI PAR POPULARITE
      else if (sortType === 'popularityButton') {
        console.log('tri par popularité');
        mediaFilter.sort(popularityFilter);

        document.querySelector('.medias').innerHTML = '';
        mediaFilter
            .forEach((mediaWrapper) => {
              const Template = new Media(mediaWrapper);
              this.MediasWrapper.appendChild(
                  Template.createMediaWrapper(),
              );
            });
      }

      // TRI PAR TITRE
      else if (sortType === 'titleButton') {
        console.log('tri par titre');
        mediaFilter.sort(titleFilter);

        document.querySelector('.medias').innerHTML = '';
        mediaFilter
            .forEach((mediaWrapper) => {
              const Template = new Media(mediaWrapper);
              this.MediasWrapper.appendChild(
                  Template.createMediaWrapper(),
              );
            });
      }
    });
  }
}
const appMedia = new AppMedia();
appMedia.mainMedia();
appMedia.sort();


// FILTRE


function dateFilter(a, b) {
  if (a.mediaWrapper.date < b.mediaWrapper.date) {
    return -1;
  }
  if (a.mediaWrapper.date > b.mediaWrapper.date) {
    return 1;
  }
  return 0;
}

function popularityFilter(a, b) {
  if (a.mediaWrapper.likes > b.mediaWrapper.likes) {
    return -1;
  }
  if (a.mediaWrapper.likes < b.mediaWrapper.likes) {
    return 1;
  }
  return 0;
}

function titleFilter(a, b) {
  if (a.mediaWrapper.title < b.mediaWrapper.title) {
    return -1;
  }
  if (a.mediaWrapper.title > b.mediaWrapper.title) {
    return 1;
  }
  return 0;
}


// AFFICHER LE TOTAL DE LIKES

async function totalLikes() {
  const mediasData = await getMedias();
  const mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);


  const likes = mediaFilter.map((total) => total.likes);
  const initialValue = 0;
  const totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
  document.querySelector('.likes').innerHTML +=
    `<div class="likes_bloc">
        <h1 class="likes_bloc-total">${totalLikes}</h1>
        <i class="fa-solid fa-heart"></i>
     </div>
    `;

  // INCREMENTE NOMBRE DE LIKES AU CLICK
  let totalOfLikes = parseInt(document.querySelector('.likes_bloc-total').innerText);
  const likesArray = Array.from(document.querySelectorAll('.like')); // Créé un tableau de tous les <p class="jaime"></p>
  likesArray.forEach((jaime) => { // boucle à travers chaque .jaime
    let liked = false;

