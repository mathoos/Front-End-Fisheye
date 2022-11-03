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

// Variables
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get('id');

const modal = document.querySelector(".contact_modal");
const header = document.querySelector("header")
const photographerHeader = document.querySelector(".photographer_header")
const mediasSort = document.querySelector(".medias-sort")
const medias = document.querySelector(".medias")
const likes = document.querySelector(".likes")



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
            <button class="contact_button" id="contact_button" alt="Contact Me" aria-label="Ouvrir la modale">Contactez-moi</button>
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
  const photographersHeader = document.querySelector('.photographer_header');
  photographerFilter.forEach((photographer) => {
      photographersHeader.appendChild(new Photographers(photographer).createPhotographerHeader()
      )
  })
}

function displayTotalLikes(photographerFilter){
  const MediasBottom = document.querySelector('.likes');
  photographerFilter.forEach((price) => {
    MediasBottom.appendChild(new Photographers(price).createTotalLikes()
    )
  })
}

function displayForm(){
  let boutonForm = document.getElementById("contact_button");
  let closeForm = document.getElementById("closeForm")
  boutonForm.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", false)
    header.setAttribute("aria-hidden", true)
    photographerHeader.setAttribute("aria-hidden", true)
    mediasSort.setAttribute("aria-hidden", true)
    medias.setAttribute("aria-hidden", true)
    likes.setAttribute("aria-hidden", true)
  })
  closeForm.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true)
    header.setAttribute("aria-hidden", false)
    photographerHeader.setAttribute("aria-hidden", false)
    mediasSort.setAttribute("aria-hidden", false)
    medias.setAttribute("aria-hidden", false)
    likes.setAttribute("aria-hidden", false)
  })
}

function displayFormName(photographerFilter){
  const namePhotographer = document.querySelector('.name');
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
  displayForm()
  displayFormName(photographerFilter)
}




init()



