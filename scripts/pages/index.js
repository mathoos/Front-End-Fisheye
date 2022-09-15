class Api {
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log('an error occurs', err))
    }
}


class PhotographersApi extends Api {
    /**
     * 
     * @param {string} url 
     */

    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get()
    }
}


class Photographers{
    constructor(photographers){
        this.name = photographers.name
        this.id =photographers.id
        this.city = photographers.city
        this.country = photographers.country
        this.tagline = photographers.tagline
        this.price = photographers.price
        this.portrait = photographers.portrait     
    }
    get portrait() {
        return `assets/photographers/${this.portrait}`
    }
}



class photographersCard {
    constructor(card) {
        this.card = card
    }

    createPhotographerCard() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('photographer-card-wrapper')

        const photographerCard = 
        `<article>
            <a href="photographer.html?id=${this.card.id}" alt="${this.card.name}">
                <img src="assets/photographers/${this.card.portrait}">
                <h2>${this.card.name}</h2>
            </a>
            <div>
                <p class="city">${this.card.city}, ${this.card.country}</p>
                <p class="tagline">${this.card.tagline}</p>
                <p class="price">${this.card.price}€/jour</p>
            </div>
        </article>`
        
        wrapper.innerHTML = photographerCard
        return wrapper
    }
}


class App {
    constructor() {
        this.photographersWrapper = document.querySelector('.photograph_header')
        this.photographersApi = new PhotographersApi('data/photographers.json')
    }

    async main() {
        // Ici je récupère mes films de mon fichier old-movie-data.json
        const photographersData = await this.photographersApi.getPhotographers()
        console.log(photographersData)

        
        photographersData
            // Ici, je transforme mon tableau de données en un tableau de classe Movie
            .map(data => new Photographers(data))
            .forEach(card => {
                const Template = new photographersCard(card)
                this.photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                )
            })
    }
}

const app = new App()
app.main()












// Récupérer les données json
/*async function getData(){
    try{
        var response = await fetch('data/photographers.json');    
        var data = await response.json();
        return data;       
    }
    catch(e){
        console.log(e)
    }    
}

getData()
*/



// CODE A REPLACER EN HAUT 
/* async function displayData() {
    var response = await fetch('data/photographers.json'); 
    var data = await response.json();
    var photographers = await data.photographers;

    photographers.forEach((photographer =>{
        document.getElementById("photographer_section").innerHTML +=
        `<article>
            <a href="photographer.html?id=${photographer.id}" alt="${photographer.name}">
                <img src="assets/photographers/${photographer.portrait}">
                <h2>${photographer.name}</h2>
            </a>
            <div>
                <p class="city">${photographer.city}, ${photographer.country}</p>
                <p class="tagline">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>
            </div>
        </article>`
    }))   
}

displayData()
*/