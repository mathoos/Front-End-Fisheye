async function getPhotographers(){
    try{
        const res = await fetch('data/photographers.json');
        const ok = await res.json();
        return ok;     
    }
    catch (e) {
        console.log(e);
    }
}


class PhotographerFactory {

    constructor(photographers) {
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


async function displayData(photographers) {
    photographersWrapper = document.querySelector('.photographers')
    photographers.forEach((photographer) => {
        photographersWrapper.appendChild(new PhotographerFactory(photographer).createPhotographerCard())
    }) 
}


async function init() {
    const res = await getPhotographers();
    displayData(res.photographers);
}

init();