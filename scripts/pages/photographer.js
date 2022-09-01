//Mettre le code JavaScript lié à la page photographer.html

const photographerUrl = window.location.search;
console.log(photographerUrl)
const urlParams = new URLSearchParams(photographerUrl);
console.log(urlParams)
const photographerId = urlParams.get("id");
console.log(photographerId)


async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); // Le await est une alternative à .then  (on ne peut l'utiliser que dans une function asynchrone)
        console.log(response)  
        var data = await response.json()
        console.log(data)       
    }
    catch(e){
        console.log(e)
    }    
}


