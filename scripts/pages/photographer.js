//Mettre le code JavaScript lié à la page photographer.html

const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");
console.log(photographerId)




