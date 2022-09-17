
//Obtenir l'id de l'url
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");



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
        wrapper.innerHTML = photographerHeader
        return wrapper
    }
}


class App {
    constructor() {
        this.photographersWrapper = document.querySelector('.photograph_header')
    }

    async main() {
        try{
            var response = await fetch('data/photographers.json');    
            var data = await response.json();
            const photographersData = await data.photographers;
            const photographerFilter = photographersData.filter((photographer) => photographer.id == photographerId);
            photographerFilter             
                .forEach((header) => {
                    const Template = new photographersHeader(header)
                    this.photographersWrapper.appendChild(
                    Template.createPhotographerHeader()
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
        this.mediaWrapper = mediaWrapper
    }

    createMediaWrapper() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('media-wrapper')

        const mediaWrapper = 
        `
        <div class="media-wrapper_up">     
            <img src="assets/media/${this.mediaWrapper.image}">
            <video src="assets/media/${this.mediaWrapper.video}"></video>          
        </div>
        <div class="media-wrapper_down">
            <div class="media-wrapper_down--title">
                <p>${this.mediaWrapper.title}</p>
            </div>
            <div class="media-wrapper_down--likes">
                <p>${this.mediaWrapper.likes}</p>
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
        try{
            var response = await fetch('data/photographers.json');    
            var data = await response.json();
            const mediasData = await data.media;
            const mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
            mediaFilter
            .map((media) => MediaFactory.create(media))
            .forEach((mediaWrapper) => {
                const Template = new MediaWrapper(mediaWrapper)
                    this.MediasWrapper.appendChild(
                    Template.createMediaWrapper()

                )
            })     
        }
        catch(e){
            console.log(e)
        }   
    }
}

const appMedia = new AppMedia()
appMedia.mainMedia()




class AppLikes {
    constructor() {
        this.LikesWrapper = document.querySelector('.likes')
    }

    async mainLikes() {
        try{
            var response = await fetch('data/photographers.json');    
            var data = await response.json();
            const mediasData = await data.media;
            const mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);

            // TOTAL DE LIKES
            var likes = mediaFilter.map(total => total.likes)   
            likes.forEach((element) => {
                console.log(element)
            })


            const initialValue = 0;
            const sumWithInitial = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
            console.log(sumWithInitial);
            document.getElementById("likes").innerHTML +=
                `<div class="photograph_header--bloc">
                    <h1>${sumWithInitial}</h1>
                </div>
                ` 
        }
        catch(e){
            console.log(e)
        }   
    }
}

const appLikes = new AppLikes()
appLikes.mainLikes()




class Video extends Media {
    constructor(media) {
        super(media) // appel du constructeur parent
        this.video = media.video
    }
}

class Image extends Media {   
    constructor(media) {
        super(media)
        this.image = media.image
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




/*async function displayData() {
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
}*/