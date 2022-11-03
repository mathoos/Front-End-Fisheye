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