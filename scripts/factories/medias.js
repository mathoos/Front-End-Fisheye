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
                <button class="like">
                    <i class="visible-heart far fa-heart"></i>
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



    static async sortMedia(){
        const mediasData = await getMedias();
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video

        /*let selectButton  = document.querySelector(".select_button")
        let selectOptions  = document.querySelector(".select_options")
        selectButton.addEventListener("click", () => {
            selectOptions.classList.toggle("active")
        })

        const popularityButton = document.getElementById("popularityButton");
        popularityButton.addEventListener("click", () => {
            mediaFilter.sort(popularityFilter);
            selectOptions.classList.toggle("active");
            selectButton.innerText = popularityButton.innerText
            popularityButton.classList.toggle("active")

            document.querySelector('.medias').innerHTML = '';
            mediaFilter.forEach((media) => {
                MediasWrapper.appendChild(media.createMediaWrapper());
                Lightbox.init()                   
            });    
        });

        const titleButton = document.getElementById("titleButton");
        titleButton.addEventListener("click", () => {
            mediaFilter.sort(titleFilter); 
            selectOptions.classList.toggle("active")
            selectButton.innerText = titleButton.innerText
           
            document.querySelector('.medias').innerHTML = '';
            mediaFilter.forEach((media) => {
                MediasWrapper.appendChild(media.createMediaWrapper());
                Lightbox.init()                   
            });        
        }) 

        const dateButton = document.getElementById("dateButton");
        dateButton.addEventListener("click", () => {
            mediaFilter.sort(dateFilter); 
            selectOptions.classList.toggle("active")
            selectButton.innerText = dateButton.innerText
           
            document.querySelector('.medias').innerHTML = '';
            mediaFilter.forEach((media) => {
                MediasWrapper.appendChild(media.createMediaWrapper());
                Lightbox.init()                   
            });        
        }) */


    
        const select = document.getElementById('sort-select');

        select.addEventListener("click", (e) =>  {
            e.preventDefault(e)
            let selectedOption = select.options[select.selectedIndex]

                if(selectedOption){                  
                    selectedOption.style.display = "none"
                }
                else{
                    selectedOption.style.display = "block"
                }

            


        })
        

        
    
        select.addEventListener('change', (e) => {
            e.preventDefault();
            const sortType = select.options[select.selectedIndex].id;
    
            // TRI PAR DATE
            if (sortType === 'dateButton') {
                mediaFilter.sort(dateFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());
                    Lightbox.init()                   
                });
            }

            
    
            // TRI PAR POPULARITE
            else if (sortType === 'popularityButton') {
                mediaFilter.sort(popularityFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());
                    Lightbox.init()
                });
            }
    
            // TRI PAR TITRE
            else if (sortType === 'titleButton') {
                mediaFilter.sort(titleFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());
                    Lightbox.init()
                });
            }
        });
    }

    static async mainTotalLikes() {
        const mediasData = await getMedias();
        const mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);

        // Tableau qui regroupe tous les likes
        let likes = mediaFilter.map((total) => total.likes); 
        const initialValue = 0;
        let totalLikes = likes.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
        document.querySelector('.likes').innerHTML +=
        `<div class="likes_bloc">
            <h1 class="likes_bloc-total">${totalLikes}</h1>
            <i class="fa-solid fa-heart"></i>
        </div>
        `
    
        // INCREMENTE NOMBRE DE LIKES AU CLICK
        let totalOfLikes = parseInt(document.querySelector('.likes_bloc-total').innerText);
        let likesArray = Array.from(document.querySelectorAll('.like')); // Créé un tableau de tous les <p class="jaime"></p>
        likesArray.forEach((jaime) => { // boucle à travers chaque .jaime
            let liked = false;
            jaime.addEventListener('click', () => {
                jaime.classList.add("active")
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
    
 
}

DisplayMedia.mainMedia()
DisplayMedia.sortMedia()
DisplayMedia.mainTotalLikes()




function dateFilter(a, b) {
    if (a.media.date < b.media.date) {
        return -1;
    }
    if (a.media.date > b.media.date) {
        return 1;
    }
    return 0;
}

function popularityFilter(a, b) {
    if (a.media.likes > b.media.likes) {
        return -1;
    }
    if (a.media.likes < b.media.likes) {
        return 1;
    }
    return 0;
}

function titleFilter(a, b) {
    if (a.media.title < b.media.title) {
        return -1;
    }
    if (a.media.title > b.media.title) {
        return 1;
    }
    return 0;
}