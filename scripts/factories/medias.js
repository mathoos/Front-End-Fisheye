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
        this.url = new URL(document.location);
    }
    

    static async mainMedia() {
        const mediasData = await getMedias();
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video

        

        mediaFilter.forEach((media) => {
            MediasWrapper.appendChild(media.createMediaWrapper());
            
        });

        //let sorter = this.getSorterFromURL();
        const sorting = new Sorter(mediaFilter);
        sorting.displaySorter();
        const params = this.url.searchParams;
        console.log(params)


        
    } 


      



    /*static async sortMedia(){
        const mediasData = await getMedias();
        let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
        mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video

        
    
        const select = document.getElementById('sort-select');

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
    }*/


    
      

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
/*DisplayMedia.sortMedia()*/
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





class Sorter {
  // create a sorter
  constructor(media, sorter) {
    this.media = media;
    this.sorter = sorter;
    this.$sorterWrapper = document.getElementsByName('sorter');
  }

  // mediaSorted returns a object array based on the sorter value
  mediaSorted() {
    if (this.sorter === 'like') {
      return Array.from(this.media).sort((a, b) => b.likes - a.likes);
    }
    if (this.sorter === 'date') {
      return Array.from(this.media).sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    }
    if (this.sorter === 'title') {
      return Array.from(this.media).sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }
    return null;
  }

  // getSorterName returns the name of the sort
  getSorterName() {
    let sorterText;

    switch (this.sorter) {
      case 'like':
        sorterText = 'Popularité';
        break;
      case 'date':
        sorterText = 'Date';
        break;
      case 'title':
        sorterText = 'Titre';
        break;
      default:
        sorterText = '';
    }
    return sorterText;
  }

  // loadButton the DOM of the sort
  loadButton() {
    const url = new URL(document.location);
    const sorterName = this.getSorterName(this.sorter);
    const btnSelectedSorter = document.querySelector('.sorter__selected');
    const listSorter = document.querySelector('.sorter__list');

    // load the name of the sort
    btnSelectedSorter.innerText = sorterName;
    listSorter.setAttribute('aria-activedescendant', this.sorter);

    btnSelectedSorter.addEventListener('click', (e) => {
      e.target.style.display = 'none'; // hide the button
      e.target.setAttribute('aria-expanded', 'true');
      listSorter.style.display = 'block'; // show the list of sort
      document.getElementById('like').focus(); // focus the first elt of the list
    });
    this.$sorterWrapper.forEach((element) => {
      // select the active sorter
      if (element.id === this.sorter) {
        element.setAttribute('aria-selected', 'true');
      } else {
        element.setAttribute('aria-selected', 'false');
      }

      // when sorter is selected, media are sorted
      // change sorting's params url and refresh the DOM
      element.addEventListener('click', (e) => {
        this.sorter = e.target.id;
        this.media = this.mediaSorted();

        url.searchParams.set('sorting', this.sorter);
        window.history.pushState({}, '', url);

        // hide the list and show the button
        listSorter.style.display = 'none';
        btnSelectedSorter.style.display = 'block';
        btnSelectedSorter.setAttribute('aria-expanded', 'false');
        btnSelectedSorter.focus();

        this.displaySorter();
      });
    });
  }

  // display sorter and gallery media sorted
  displaySorter() {
    this.loadButton();
    DisplayMedia.mainMedia(this.mediaSorted());
  }
}


