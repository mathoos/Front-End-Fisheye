async function sortList() {
    const mediasData = await getMedias();
    let mediaFilter = mediasData.filter((media) => media.photographerId == photographerId);
    mediaFilter = mediaFilter.map((media) => MediaFactory.create(media)); // Afficher image ou video
    const selectElement = document.querySelector(".selected");
    const options = document.querySelector(".options");
    const optDate = document.querySelector(".optDate");
    const optTitle = document.querySelector(".optTitle");
    const optPopular = document.querySelector(".optPopular");  
    
    selectElement.addEventListener("click", () => {
        document.querySelector(".fa-chevron-down").classList.toggle("chevron-up");
        options.classList.toggle("hidden");
    });

    if(optDate) {
        optDate.addEventListener("click", () => {
            mediaFilter.sort(dateFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());  
                            
            });
            refreshSortList("date");

        });
    }
    if(optTitle) {
        optTitle.addEventListener("click", () => {

            mediaFilter.sort(titleFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());  
                  
            });
            refreshSortList("title");
        });
    }
    if (optPopular) {
        optPopular.addEventListener("click", () => {
            mediaFilter.sort(popularityFilter);
                document.querySelector('.medias').innerHTML = '';
                mediaFilter.forEach((media) => {
                    MediasWrapper.appendChild(media.createMediaWrapper());   
                      
            });
            refreshSortList("popular");
        });
    }
}

function manageSortList(opt){
    const divSortList = document.querySelector(".sort_list");
    divSortList.innerHTML = " ";
    if (opt == "popular") {
        divSortList.innerHTML = 
       `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox" aria-label="Populaire">Populaire<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optDate" role="option" aria-label="Date">Date</button>
           <button class="optTitle" role="option" aria-label="Titre">Titre</button>
       </div>`;
    } else if (opt == "date") {
        divSortList.innerHTML = 
       `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox" aria-label="Date">Date<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optPopular" role="option" aria-label="Populaire">Populaire</button>
           <button class="optTitle" role="option" aria-label="Titre">Titre</button>
       </div>`;
    } else if (opt == "title") {
        divSortList.innerHTML = 
     `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox" aria-label="Titre">Titre<i class="fas fa-chevron-down"></i></button>
       <div class="options hidden">  
           <button class="optPopular" role="option" aria-label="Populaire">Populaire</button>
           <button class="optDate" role="option" aria-label="Date">Date</button>
       </div>`;
    }
}

function refreshSortList(opt) {
    manageSortList(opt);
    Lightbox.init()   
    sortList();
}

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

sortList();