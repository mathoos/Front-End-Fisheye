class App {
    constructor() {
        this.photographersWrapper = document.querySelector('.photographers')
    }

    async main() {
        try{
            var response = await fetch('data/photographers.json');    
            var data = await response.json();
            const photographersData = await data.photographers
            photographersData
            // Ici, je transforme mon tableau de données en un tableau de classe Movie
            .map(photographers => new Photographers(photographers))
            .forEach(card => {
                const Template = new PhotographersCard(card)
                this.photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                )
            })           
        }

        catch(e){
            console.log(e)
        }   
    }
}

const app = new App()
app.main()



class Photographers{
    constructor(photographers){
        this.name = photographers.name
        this.id = photographers.id
        this.city = photographers.city
        this.country = photographers.country
        this.tagline = photographers.tagline
        this.price = photographers.price
        this.portrait = photographers.portrait     
    }
}


class PhotographersCard {
    constructor(card) {
        this.card = card
    }

    createPhotographerCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('photographers_card')

        const photographerCard = 
        `
            <a class="photographers_card-up" href="photographer.html?id=${this.card.id}" alt="${this.card.name}">
                <img src="assets/photographers/${this.card.portrait}">
                <h2>${this.card.name}</h2>
            </a>
            <div class="photographers_card-down">
                <p class="city">${this.card.city}, ${this.card.country}</p>
                <p class="tagline">${this.card.tagline}</p>
                <p class="price">${this.card.price}€/jour</p>
            </div>
        `
        wrapper.innerHTML = photographerCard
        return wrapper
    }
}


