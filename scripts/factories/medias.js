/* eslint-disable no-redeclare */


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

class Media {
    constructor(media) {
        this.media = media
        this.likes = media.likes;
        this.title = media.title;
        this.id = media.id;
    }

    createMediaWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('medias_card');

    const mediaWrapper =
        `
        <div class="medias_card-up">${this.displayMedia()}</div>
        <div class="medias_card-down">
            <div class="medias_card-down--title">
                <p>${this.media.title}</p>
            </div>
            <div class="medias_card-down--likes">
                <p class="likes-value">${this.likes}</p>             
                <button class="like">
                    <i class="far fa-heart" tabindex="0" aria-label="Aimer le media"></i> 
                </button>  
            </div>
        </div>
        `;

    wrapper.innerHTML = mediaWrapper;
    return wrapper;
    } 
}

class Image extends Media {
    constructor(media) {
        super(media);
    }

    displayMedia() {
        return `<img alt="${this.media.title}" class="displayMedia" id="image" src="assets/media/${this.media.image}" tabindex="0">`;
    }
}

class Video extends Media {
    constructor(media) {
        super(media); // appel du constructeur parent
    }

    displayMedia() {
        return `<video alt="${this.media.title}" class="displayMedia" id="image" autoplay src="assets/media/${this.media.video}" type="video/mp4" tabindex="0"></video>`;
    }
}


class MediaFactory {
    static create(media){
        if(media.image){
            return new Image(media);
        }
        else if(media.video) {
            return new Video(media);
        }
        else{
            throw 'Unknown media';
        }
    }
}

function displayMedia(mediaFilter){
    const MediasWrapper = document.querySelector('.medias');
    
    mediaFilter.forEach((media) => {   
        MediasWrapper.appendChild(media.createMediaWrapper());  
    });   
}



function initLikes(mediaFilter){
    let totaldeLikes = 0  
    mediaFilter.forEach((media) => {          
        totaldeLikes = totaldeLikes += media.likes    
        document.querySelector(".likes_bloc-total").innerHTML = `${totaldeLikes}<i class="fas fa-heart"></i>`;
    }); 
    
    addLikes()
}

function addLikes() {
    let totalOfLikes = parseInt(document.querySelector('.likes_bloc-total').innerText);
    let likesArray = Array.from(document.querySelectorAll('.like')); 
    likesArray.forEach((like) => { 
        let liked = false;
        like.addEventListener('click', () => {               
            if (!liked) {
                like.firstElementChild.classList.add("fas")
                like.previousElementSibling.innerText = parseInt(like.previousElementSibling.innerText) + 1;
                totalOfLikes += 1;
                document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}<i class="fas fa-heart"></i></h1>`;
                liked = true;               
            }
            else {
                like.firstElementChild.classList.remove("fas")
                like.previousElementSibling.innerText = parseInt(like.previousElementSibling.innerText) - 1;
                totalOfLikes -= 1;
                document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}<i class="fas fa-heart"></i></h1>`;
                liked = false;          
            }
        });
    });   
}

async function init() {
    const res = await getData();
    const mediasData = res.media;
    const photographerUrl = window.location.search;
    const urlParams = new URLSearchParams(photographerUrl);
    const photographerId = urlParams.get('id');
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
    mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video
    displayMedia(mediaFilter)
    initLikes(mediaFilter)
}
  
init()







