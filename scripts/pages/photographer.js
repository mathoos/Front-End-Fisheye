/*
Obtenir l'id de l'url
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");


async function getData(){
    try{
        await fetch('data/photographers.json');    
    }
    catch(e){
        console.log(e)
    }    
}

async function displayData() {
    var response = await fetch('data/photographers.json'); 
    var data = await response.json();
    var photographers = await data.photographers;
    const photographerFilter = photographers.filter((photographer) => photographer.id == photographerId);
    photographerFilter.forEach((photographer) => {
        console.log(photographerFilter)
        document.getElementById("photograph_header").innerHTML +=
        `<div class="photograph_header--bloc">
            <h1>${photographer.name}</h1>
            <p class="city">${photographer.city}, ${photographer.country}</p>
            <p class="tagline">${photographer.tagline}</p>
            </div>
            <div class="photograph_header--bloc">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            </div>  
            <div class="photograph_header--bloc">
            <img src="assets/photographers/${photographer.portrait}">
        </div>
        `
    }) 
}


displayData()



class Media {
    constructor(media) {
        this.id = media.id
        this.title = media.title
        this.likes = media.likes
        this.date = media.date
        this.price = media.price
    }  
}

class Video extends Media {
    constructor(media) {
        super(media) // appel du constructeur parent
        this.video = media.video
    }

    displayMedia() {
        return `<div class="media">${this.video}</div>`
    }
}

class Image extends Media {   
    constructor(media) {
        super(media)
        this.image = media.image
    }

    displayMedia() { //contenu html
        return `<div class="media">
                    <img src="/assets/${photographerId}$">
                </div>`
                
    }
    
}


class MediaFactory {
    static create(media) {
        if (media.image) {
            return new Image(media)
        } else if (media.video) {
            return new Video(media)
        } else {
            throw 'Unknown media'
        }
    }
}

async function playMedia(){

    const response = await fetch('data/photographers.json')
    var data = await response.json();
    var medias = await data.media;
    const mediaFilter = medias.filter((media) => media.photographerId == photographerId);
    
    mediaFilter.forEach((media) => {
        document.getElementById("media").innerHTML +=
        `<div>
            <h1>${media.title}</h1>
            <p>${media.likes}, ${media.price}€</p>
            <img src="assets/media/Tracy Gallindo/${media.image}">
        </div>
        `
      
    }) 

    /*const instanceMedia = medias.map((media) => MediaFactory.create(media))
    instanceMedia.forEach((media) => {
        document.getElementById("media").innerHTML +=
        `<div>
            <h1>${media.title}</h1>
            <p>${media.likes}, ${media.price}€</p>
        </div>
        `
        media.displayMedia()
    }) */
/*}


playMedia()*/

