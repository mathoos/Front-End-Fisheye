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
            <button class="contact_button" alt="Contact Me" onclick="displayModal()">Contactez-moi</button>
        </div>  
        <div class="photographers_header--bloc">
            <img src="assets/photographers/${this.header.portrait}" alt ="${this.header.name}">
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
        <div class="media-wrapper_up">${this.media.displayMedia()}</div>
        <div class="media-wrapper_down">
            <div class="media-wrapper_down--title">
                <p>${this.media.title}</p>
            </div>
            <div class="media-wrapper_down--likes">
                <p>${this.media.likes}</p>
                <button class="jaime"><i class="fa-regular fa-heart"></i></button>
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
    }
}
const appMedia = new AppMedia()
appMedia.mainMedia()

class Sort{
    constructor() {
        this.MediasWrapper = document.querySelector('.medias')
    }
    async sort(){

        const mediasData = await getMedias()
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media))
        const select = document.getElementById("sort-select");
    
        select.addEventListener("change", (e) => {
            e.preventDefault()
            let sortType = select.options[select.selectedIndex].id;
    
            // TRI PAR DATE
            if(sortType === "dateButton"){
                console.log("Tri par date")
                mediaFilter.sort(dateFilter);          
                document.querySelector(".medias").innerHTML = "";
                mediaFilter
                .forEach((mediaWrapper) => {
                    const Template = new MediaWrapper(mediaWrapper)
                        this.MediasWrapper.appendChild(
                        Template.createMediaWrapper()
                    )
                })                             
            }
    
            // TRI PAR POPULARITE
            else if(sortType === "popularityButton"){
                console.log("tri par popularité")
                mediaFilter.sort(popularityFilter);
                
                document.querySelector(".medias").innerHTML = "";
                mediaFilter
                .forEach((mediaWrapper) => {
                    const Template = new MediaWrapper(mediaWrapper)
                        this.MediasWrapper.appendChild(
                        Template.createMediaWrapper()
                    )
                })               
            }
    
            // TRI PAR TITRE
            else if(sortType === "titleButton"){
                console.log("tri par titre")
                mediaFilter.sort(titleFilter); 
                
                document.querySelector(".medias").innerHTML = "";
                mediaFilter
                .forEach((mediaWrapper) => {
                    const Template = new MediaWrapper(mediaWrapper)
                        this.MediasWrapper.appendChild(
                        Template.createMediaWrapper()
                    )
                })       
            }
        })
    }
}

const appSort = new Sort()
appSort.sort()


function dateFilter(a, b) {
    if (a.date < b.date) {
    return -1;
    }
    if (a.date > b.date) {
    return 1;
    }
    return 0;
}
function popularityFilter(a, b) {
    if (a.likes > b.likes) {
    return -1;
    }
    if (a.likes < b.likes) {
    return 1;
    }
    return 0;
}
function titleFilter(a, b) {
    if (a.title < b.title) {
    return -1;
    }
    if (a.title > b.title) {
    return 1;
    }
    return 0;
}
// AFFICHER LE TOTAL DE LIKES

async function totalLikes(){
    const mediasData = await getMedias()
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);


    var likes = mediaFilter.map(total => total.likes)
    const initialValue = 0;
    const totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    document.getElementById("likes").innerHTML +=
    `<h1 id="total-likes">${totalLikes}<i class="fa-solid fa-heart"></i></h1>
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
                document.getElementById("total-likes").innerHTML = `${totalOfLikes}<i class="fa-solid fa-heart"></i>`;
                liked = true;
            }
            else{
                jaime.previousElementSibling.innerText =
                parseInt(jaime.previousElementSibling.innerText) - 1;
                totalOfLikes -= 1;
                document.getElementById("total-likes").innerHTML = `${totalOfLikes}<i class="fa-solid fa-heart"></i>`;
                liked = false;
            }
        })
    })
}

totalLikes() 

