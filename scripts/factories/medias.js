class Media {
    constructor(media) {
        this.media = media
        this.likes = media.likes;
        this.title = media.title;
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
                <p>${this.media.likes}</p>
                <button class="like" data-id="${this.media.id}">
                    <i class="like far fa-heart"></i>
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


class DisplayMedia {
    constructor() {
    }

    static async mainMedia() {
        const mediasData = await getMedias();
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video  

        mediaFilter.forEach((media) => {
            MediasWrapper.appendChild(media.createMediaWrapper());         
        }); 
    } 

    static createSortList() {

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
}




async function mainTotalLikes() {

    const mediasData = await getMedias();
    const mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);

    // Tableau qui regroupe tous les likes
    let likes = mediaFilter.map((total) => total.likes); 
    const initialValue = 0;
    let totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    document.querySelector('.likes_bloc-total').innerHTML = totalLikes
    
    

    // INCREMENTE NOMBRE DE LIKES AU CLICK
    let totalOfLikes = parseInt(document.querySelector('.likes_bloc-total').innerText);
    let likesArray = Array.from(document.querySelectorAll('.like')); // Créé un tableau de tous les <p class="jaime"></p>
    likesArray.forEach((jaime) => { // boucle à travers chaque .jaime
        let liked = false;
        jaime.addEventListener('click', (e) => {
            //const id = e.target.getAttribute('data-id')
            //const mediaFound = mediaFilter.find((media) => media.id == id )
            //mediaFound.likes +=1
            jaime.classList.toggle("fas")
            if (!liked) {
            jaime.previousElementSibling.innerText =
            parseInt(jaime.previousElementSibling.innerText) + 1;
            totalOfLikes += 1;
            document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}`;
            liked = true;
            }
            else {
            jaime.previousElementSibling.innerText =
            parseInt(jaime.previousElementSibling.innerText) - 1;
            totalOfLikes -= 1;
            document.querySelector('.likes_bloc-total').innerHTML = `${totalOfLikes}`;
            liked = false;
            }
        });
    });
}

DisplayMedia.mainMedia()
DisplayMedia.createSortList()
mainTotalLikes()



