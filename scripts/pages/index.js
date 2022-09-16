
class App {
    constructor() {
        this.photographersWrapper = document.querySelector('.photographers_wrapper')
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
                const Template = new photographersCard(card)
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


class photographersCard {
    constructor(card) {
        this.card = card
    }

    createPhotographerCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('photographer-card-wrapper')

        const photographerCard = 
        `
            <a href="photographer.html?id=${this.card.id}" alt="${this.card.name}">
                <img src="assets/photographers/${this.card.portrait}">
                <h2>${this.card.name}</h2>
            </a>
            <div>
                <p class="city">${this.card.city}, ${this.card.country}</p>
                <p class="tagline">${this.card.tagline}</p>
                <p class="price">${this.card.price}€/jour</p>
            </div>
        `
        wrapper.innerHTML = photographerCard
        return wrapper
    }
}















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