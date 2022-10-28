const modal = document.getElementById("contact_modal");
const header = document.querySelector("header")
const photographerHeader = document.querySelector(".photographer_header")
const mediasSort = document.querySelector(".medias-sort")
const medias = document.querySelector(".medias")
const likes = document.querySelector(".likes")


function displayModal() {   
	modal.style.display = "flex";
    modal.setAttribute("aria-hidden", false)
    header.setAttribute("aria-hidden", true)
    photographerHeader.setAttribute("aria-hidden", true)
    mediasSort.setAttribute("aria-hidden", true)
    medias.setAttribute("aria-hidden", true)
    likes.setAttribute("aria-hidden", true)
}

// Fermer la modale
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true)
    header.setAttribute("aria-hidden", false)
    photographerHeader.setAttribute("aria-hidden", false)
    mediasSort.setAttribute("aria-hidden", false)
    medias.setAttribute("aria-hidden", false)
    likes.setAttribute("aria-hidden", false)
}




// Récupérer prénom

let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let email = document.getElementById("email")
let message = document.getElementById("message")


function recupFirstname(){
    console.log(firstname.value)
}


function recupLastname(){
    console.log(lastname.value)
}


function recupEmail(){
    console.log(email.value)
}


function recupMessage(){
    console.log(message.value)
}


let form = document.querySelector("form");

// On fait un addEventListener sur le form pour passer la fonction de validation du formulaire dès que l'utilisateur clique sur le bouton submit
form.addEventListener("submit", function(event){
  event.preventDefault(); // on retire la fonction par défaut de l'envoie du formulaire
  recupFirstname();
  recupLastname();
  recupEmail();
  recupMessage(); 
})