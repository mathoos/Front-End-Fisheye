let mediaFilter = [];

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
                <i role="button" class="far fa-heart like" data-id="${this.media.id}" tabindex="0"></i>   
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
        return `<img alt="${this.media.title}" class="displayMedia" id="image" src="assets/media/${this.media.image}">`;
    }
}

class Video extends Media {
    constructor(media) {
        super(media); // appel du constructeur parent
    }

    displayMedia() {
        return `<video alt="${this.media.title}" class="displayMedia" id="image" autoplay src="assets/media/${this.media.video}" type="video/mp4"></video>`;
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

MediasWrapper = document.querySelector('.medias');

function displayMedia(mediaFilter){
    MediasWrapper = document.querySelector('.medias');
    
    mediaFilter.forEach((media) => {   
        MediasWrapper.appendChild(media.createMediaWrapper());  
    });   
}

function createSortList() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('sort');

    const mediaWrapper =
        `
        <div class="sort_section">
            <label>Trier par</label>
        </div>

        <div class="sort_list">
            <button class="selected">Populaire
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="options hidden">  
                <button class="optDate">Date</button>
                <button class="optTitle">Titre</button>
            </div>
        </div>
        `;

    wrapper.innerHTML = mediaWrapper;
    document.querySelector(".medias-sort").appendChild(wrapper)      
}

function initLikes(mediaFilter){
    let totaldeLikes = 0  
    mediaFilter.forEach((media) => {          
        totaldeLikes = totaldeLikes += media.likes    
        document.querySelector(".likes_bloc-total").innerHTML = `${totaldeLikes}<i class="fas fa-heart"></i></h1>`;
    }); 
    
    addLikes()
}

function addLikes() {
    let totalOfLikes = parseInt(document.querySelector('.likes_bloc-total').innerText);
    let likesArray = Array.from(document.querySelectorAll('.like')); 
    likesArray.forEach((jaime) => { 
        let liked = false;
        jaime.addEventListener('click', (e) => {     
            
            const id = e.target.getAttribute('data-id')
            console.log(id)
            let mediaFound = mediaFilter.find((media) => media.id == id )
            mediaFound.likes +=1
            console.log(mediaFound.likes)

            if (!liked) {
                jaime.classList.add("fas")
                jaime.previousElementSibling.innerText =
                parseInt(jaime.previousElementSibling.innerText) + 1;
                totalOfLikes += 1;
                document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}<i class="fas fa-heart"></i></h1>`;
                liked = true;
                mediaFound.likes +=1
                
            }
            else {
                jaime.classList.remove("fas")
                jaime.previousElementSibling.innerText =
                parseInt(jaime.previousElementSibling.innerText) - 1;
                totalOfLikes -= 1;
                document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}<i class="fas fa-heart"></i></h1>`;
                liked = false;
                mediaFound.likes -=1
                
            }
        });
    });   
}





async function init() {
    const res = await getData();
    const mediasData = res.media;
    mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
    mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video
    displayMedia(mediaFilter)
    initLikes(mediaFilter)
    createSortList()
    
}
  
init()







