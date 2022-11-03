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


class PhotographerFactory {
    constructor(photographers) {
        this.photographers = photographers
    }

    createPhotographerCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('photographers_card')
        wrapper.setAttribute("aria-label", "Bloc relatif à un photographe")

        const photographerCard = 
        `
            <a class="photographers_card-up" href="photographer.html?id=${this.photographers.id}" title="${this.photographers.name}">
                <img src="assets/photographers/${this.photographers.portrait}" alt="${this.photographers.name}">
                <h2>${this.photographers.name}</h2>
            </a>
            <div class="photographers_card-down" aria-label="Informations relatives au photographe">
                <p class="city" aria-label="Pays et ville du photographe">${this.photographers.city}, ${this.photographers.country}</p>
                <p class="tagline" aria-label="Citation du photographe">${this.photographers.tagline}</p>
                <p class="price" aria-label="Prix du photographe">${this.photographers.price}€/jour</p>
            </div>
        `
        wrapper.innerHTML = photographerCard
        return wrapper
    }
}


function displayData(photographers) {
    const photographersWrapper = document.querySelector('.photographers')
    photographers.forEach((photographer) => {
        photographersWrapper.appendChild(new PhotographerFactory(photographer).createPhotographerCard())
    }) 
}



async function init() {
    const res = await getData();
    displayData(res.photographers);

}



init();