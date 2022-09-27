
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


            // AFFICHER MEDIAS
                   
            mediaFilter.forEach((mediaWrapper) => {               
                const Template = new MediaWrapper(mediaWrapper)
                    this.MediasWrapper.appendChild(
                    Template.createMediaWrapper()
                )
            }) 
            const instanceMedia = mediaFilter.map((media) => MediaFactory.create(media))
            instanceMedia.forEach((instance) => instance.displayIdentity())
            

            // TRIER PAR POPULARITE
            const popularityButton = document.getElementById("popularityButton");
            popularityButton.addEventListener("click", () => {
                const mediaPopulaire = mediaFilter.sort(popularityFilter);
                console.log(mediaPopulaire)
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


            // AFFICHER LE TOTAL DE LIKES

            function totalLikes(){
                var likes = mediaFilter.map(total => total.likes)
                const initialValue = 0;
                const totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
                document.getElementById("likes").innerHTML +=
                `<h1 id="total-likes">${totalLikes}</h1>
                ` 

                // INCREMENTE NOMBRE DE LIKES AU CLICK
                let totalOfLikes = parseInt(document.getElementById("total-likes").innerText);
                console.log(totalOfLikes)
                const likesArray = Array.from(document.querySelectorAll(".jaime")); // Créé un tableau de tous les <p class="jaime"></p>
                console.log(likesArray)
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
        }
        catch(e){
            console.log(e)
        }   
    }
}

const appMedia = new AppMedia()
appMedia.mainMedia()


class Video extends Media {
    constructor(media) {
        super(media) // appel du constructeur parent
        this.video = media.video
    }
    
    displayIdentity(){

        const wrapper = document.createElement('div')
        wrapper.classList.add('media-wrapper_up')

        const mediaWrapper = 
        `<video src="assets/media/${this.video}"></video>`
        
        wrapper.innerHTML = mediaWrapper
        console.log(mediaWrapper)
        return wrapper

        /*console.log(this.image)
        const coucou = document.querySelectorAll(".media-wrapper_up")

        coucou.forEach((coucou) => {
            coucou.innerHTML +=
            `<video src="assets/media/${this.video}"></video>`   
        })*/
    }
    
}

class Image extends Media {   
    constructor(media) {
        super(media)
        this.image = media.image
    }
    displayIdentity(){

        const wrapper = document.createElement('div')
        wrapper.classList.add('media-wrapper_up')

        const mediaWrapper = 
       `<img src="assets/media/${this.image}">`
        
        wrapper.innerHTML = mediaWrapper
        console.log(mediaWrapper)
        return wrapper

        /*console.log(this.image)
        const coucou = document.querySelectorAll(".media-wrapper_up")

        coucou.forEach((coucou) => {
            coucou.innerHTML +=
            `<img src="assets/media/${this.image}">`   
        })*/
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




// LIGHTBOX 


function displayLightbox(imageURL) {
    const lightbox = document.getElementById("lightbox");
    const imgExtension = imageURL.split(".").pop();


    var imageContainer = document.querySelector(".image-container");
    console.log(imageContainer)
  
    // display video or img, depending on image extension
    if (imgExtension === "mp4") {
      imageContainer.innerHTML = `<video id="image" src="${imageURL}" alt="${imageAlt} " class="image-lightbox" controls/>`;
    } else {
      imageContainer.innerHTML = `<img id="image" src="${imageURL}" alt="${imageAlt}" class="image-lightbox" />`;
    }
    const imageLightboxTitle = document.createElement("p");
    imageLightboxTitle.classList.add("image-lightbox-title");
    imageLightboxTitle.innerText = `${imageAlt}`;
    imageContainer.appendChild(imageLightboxTitle);
    lightbox.style.display = "block";
  }



  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
  }
  
  function nextImage() {
    const images = Array.from(document.querySelectorAll(".sample-image"));
    const gallery = images.map((image) => image.getAttribute("src"));
    const currentImage = document.getElementById("image");
  
    let imgIndex = gallery.findIndex(
      (img) => img === currentImage.getAttribute("src")
    );
    if (imgIndex === gallery.length - 1) {
      imgIndex = -1;
    }
  
    const nextImageAlt = images[imgIndex + 1]
      .getAttribute("alt")
      .split(",")
      .slice(0, 1);
  
    displayLightbox(gallery[imgIndex + 1], nextImageAlt);
  }
  
  function prevImage() {
    const images = Array.from(document.querySelectorAll(".sample-image"));
    const gallery = images.map((image) => image.getAttribute("src"));
    const currentImage = document.getElementById("image");
  
    let imgIndex = gallery.findIndex(
      (img) => img === currentImage.getAttribute("src")
    );
  
    if (imgIndex === 0) {
      const prevImageAlt = images[images.length - 1]
        .getAttribute("alt")
        .split(",")
        .slice(0, 1);
      displayLightbox(gallery[gallery.length - 1], prevImageAlt);
    } else {
      const prevImageAlt = images[imgIndex - 1]
        .getAttribute("alt")
        .split(",")
        .slice(0, 1);
      displayLightbox(gallery[imgIndex - 1], prevImageAlt);
    }
  }
  
  function globalLightboxListeners() {
    // display lightbox on click
    const images = Array.from(document.querySelectorAll(".sample-image"));
    const imgLink = Array.from(document.querySelectorAll(".media-link"));
  
    images.forEach((image) =>
      image.addEventListener("click", (e) => {
        e.preventDefault();
  
        const imageURL = image.getAttribute("src");
        const imageAlt = image.getAttribute("alt").split(",").slice(0, 1);
  
        displayLightbox(imageURL, imageAlt);
      })
    );
    }  