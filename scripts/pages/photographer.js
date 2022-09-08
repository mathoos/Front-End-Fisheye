// Obtenir l'id de l'url
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");


async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); 
        var data = await response.json();
        const photographers = await data.photographers;
        const photographerFiltered = photographers.filter((photographer) => photographer.id == photographerId);
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
        return photographerFiltered
    }
    catch(e){
        console.log(e)
    }    
}

fetchData()

