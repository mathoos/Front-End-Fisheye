// Obtenir l'id de l'url
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");
console.log(photographerId)


async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); 
        var data = await response.json();
        const photographers = await data.photographers;
        const photographerFiltered = photographers.filter((photographer) => photographer.id == photographerId);
        console.log(photographerFiltered) ;
        photographerFiltered.forEach((photographer) => {
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
    catch(e){
        console.log(e)
    }    
}

fetchData()


//Fonction pour afficher les médias
function mediaFactory() {
    const photographers = data.photographers;
    let name = photographers[0];
    console.log(name)
    name = name.split(" ")[0].replace("-", " ");
    let type = "";
    let source = "";
    if (image) {
      type = "image";
      source = `assets/${name}/${image}`;
    } else {
      type = "video";
      source = `assets/${name}/${video}`;
    }
    
}

