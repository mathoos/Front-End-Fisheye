async function getPhotographers() {
    try {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      const photographersData = await data.photographers;
      console.log(photographersData)
      return photographersData;
      
    }
    catch (e) {
      console.log(e);
    }
}


class Photographers{
    constructor(photographers){
        this.photographers = photographers   
    }

    createPhotographerCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('photographers_card')

        const photographerCard = 
        `
            <a class="photographers_card-up" href="photographer.html?id=${this.photographers.id}" alt="${this.photographers.name}">
                <img src="assets/photographers/${this.photographers.portrait}">
                <h2>${this.photographers.name}</h2>
            </a>
            <div class="photographers_card-down">
                <p class="city">${this.photographers.city}, ${this.photographers.country}</p>
                <p class="tagline">${this.photographers.tagline}</p>
                <p class="price">${this.photographers.price}€/jour</p>
            </div>
        `
        wrapper.innerHTML = photographerCard
        return wrapper
    }
}

class PhotographersCards {
    constructor() {
        this.photographersWrapper = document.querySelector('.photographers')
    }

    async main() {
        const photographersData = await getPhotographers();
        photographersData.forEach((card) => {
            this.photographersWrapper.appendChild(new Photographers(card).createPhotographerCard())
        })  
    }
}

new PhotographersCards().main()