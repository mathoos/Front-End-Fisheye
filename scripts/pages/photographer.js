//Obtenir l'id de l'url
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");

async function getPhotographers() {
    try{
        var response = await fetch('data/photographers.json');    
        var data = await response.json();
        const photographersData = await data.photographers;
        return photographersData
        
    }
    catch(e){
        console.log(e)
    }   
}

async function getMedias() {
    try{
        var response = await fetch('data/photographers.json');    
        var data = await response.json();
        const mediasData = await data.media;
        return mediasData
        
    }
    catch(e){
        console.log(e)
    }   
}


class photographersHeader {
    constructor(header) {
        this.header = header
    }

    createPhotographerHeader() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('photographers_header')

        const photographerHeader = 
        `
        <div class="photographers_header--bloc">
            <h1>${this.header.name}</h1>
            <p class="city">${this.header.city}, ${this.header.country}</p>
            <p class="tagline">${this.header.tagline}</p>
        </div>
        <div class="photographers_header--bloc">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>  
        <div class="photographers_header--bloc">
            <img src="assets/photographers/${this.header.portrait}">
        </div>
        `

        document.getElementById("likes").innerHTML +=
        `<p>${this.header.price}€/jour</p>` 

        wrapper.innerHTML = photographerHeader
        return wrapper
    }
}


class App {
    constructor() {
        this.photographersWrapper = document.querySelector('.photograph_header')
    }

    async main() {
        const photographersData = await getPhotographers()  
        const photographerFilter = photographersData.filter((photographer) => photographer.id == photographerId);
        photographerFilter             
            .forEach((header) => {
                const Template = new photographersHeader(header)
                this.photographersWrapper.appendChild(
                Template.createPhotographerHeader()
            )
        })         
    }
}

const app = new App()
app.main()


// MEDIA

class Media {
    constructor(media) {
        this.id = media.id
        this.photographerId = media.photographerId
        this.title = media.title
        this.likes = media.likes
        this.date = media.date
        this.price = media.price
    }  
}

class MediaWrapper {
    constructor(mediaWrapper) {
        this.media = mediaWrapper
    }

    createMediaWrapper() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('media-wrapper')

        const mediaWrapper = 
        `
        <div class="media-wrapper_up">${this.media.displayMedia()}         
        </div>
        <div class="media-wrapper_down">
            <div class="media-wrapper_down--title">
                <p>${this.media.title}</p>
            </div>
            <div class="media-wrapper_down--likes">
                <p>${this.media.likes}</p>
                <p class="jaime">J'aime</p>
            </div>
        </div>
        `
        
        wrapper.innerHTML = mediaWrapper
        return wrapper
    }
}


class AppMedia {
    constructor() {
        this.MediasWrapper = document.querySelector('.medias')
    }

    async mainMedia() {
        const mediasData = await getMedias()
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media))

        // AFFICHER MEDIAS             
        mediaFilter.forEach((mediaWrapper) => {               
            const template = new MediaWrapper(mediaWrapper)
                this.MediasWrapper.appendChild(
                template.createMediaWrapper()
                
            )
        })     

        // TRIER PAR POPULARITE
        const popularityButton = document.getElementById("popularityButton");
        popularityButton.addEventListener("click", () => {
            const mediaPopulaire = mediaFilter.sort(popularityFilter);
            function popularityFilter(a, b) {
                if (a.likes > b.likes) {
                return -1;
                }
                if (a.likes < b.likes) {
                return 1;
                }
                return 0;
            }
            document.querySelector(".medias").innerHTML = "";
            mediaPopulaire
            .forEach((mediaWrapper) => {
                const Template = new MediaWrapper(mediaWrapper)
                    this.MediasWrapper.appendChild(
                    Template.createMediaWrapper()
                )
            })               
        });

        // TRIER PAR TITRE
        const titleButton = document.getElementById("titleButton");
        titleButton.addEventListener("click", () => {
            const mediaTitre = mediaFilter.sort(titleFilter); 
            console.log(mediaTitre)
            function titleFilter(a, b) {
                if (a.title < b.title) {
                return -1;
                }
                if (a.title > b.title) {
                return 1;
                }
                return 0;
            }
            document.querySelector(".medias").innerHTML = "";
            mediaTitre
            .forEach((mediaWrapper) => {
                const Template = new MediaWrapper(mediaWrapper)
                    this.MediasWrapper.appendChild(
                    Template.createMediaWrapper()
                )
            })       
        }) 
    }
}

const appMedia = new AppMedia()
appMedia.mainMedia()


// AFFICHER LE TOTAL DE LIKES

async function totalLikes(){
    const mediasData = await getMedias()
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);


    var likes = mediaFilter.map(total => total.likes)
    const initialValue = 0;
    const totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    document.getElementById("likes").innerHTML +=
    `<h1 id="total-likes">${totalLikes}</h1>
    ` 

    // INCREMENTE NOMBRE DE LIKES AU CLICK
    let totalOfLikes = parseInt(document.getElementById("total-likes").innerText);
    const likesArray = Array.from(document.querySelectorAll(".jaime")); // Créé un tableau de tous les <p class="jaime"></p>
    likesArray.forEach((jaime) => { // boucle à travers chaque .jaime
        let liked = false;
        jaime.addEventListener("click", () => {
            jaime.classList.toggle("red")
            if(!liked){
                jaime.previousElementSibling.innerText =
                parseInt(jaime.previousElementSibling.innerText) + 1;
                totalOfLikes += 1;
                document.getElementById("total-likes").innerText = `${totalOfLikes}`;
                liked = true;
            }
            else{
                jaime.previousElementSibling.innerText =
                parseInt(jaime.previousElementSibling.innerText) - 1;
                totalOfLikes -= 1;
                document.getElementById("total-likes").innerText = `${totalOfLikes}`;
                liked = false;
            }
        })
    })
}

totalLikes() 

