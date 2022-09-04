async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); 
        var data = await response.json()
        data.photographers.forEach((photographer =>{
            document.getElementById("photographer_section").innerHTML +=
            `<article>
                <a /*href="photographer.html?id=${photographer.id}"*/ alt="${photographer.name}">
                    <img src="assets/photographers/${photographer.portrait}">
                    <h2>${photographer.name}</h2>
                </a>
                <div>
                    <p class="city">${photographer.city}, ${photographer.country}</p>
                    <p class="tagline">${photographer.tagline}</p>
                    <p class="price">${photographer.price}€/jour</p>
                </div>
            </article>`
        }))

        

        let coucou = document.querySelectorAll("a")
        for(i = 0 ; i < coucou.length ; i++){        
            coucou[i].addEventListener('click', () => {
         
            })    
        }

        

        
    }
    catch(e){
        console.log(e)
    }    
}

fetchData()







/*
var city = document.querySelectorAll("input[type=radio]");

function isCityValid(){
  const formField = document.getElementById("fieldset-checkbox");

  // on fait une boucle qui parcourt l'ensemble des boutons radio
  for( i = 0; i < city.length; i++){
    if(city[i].checked){
      formField.setAttribute('data-error-visible', 'false');
      formField.removeAttribute('data-error');
      return true; // stoppe l'exécution de la 
    }    
  }
   
  // attention : dans une boucle, on ne met pas de else, on met le reste de la condition en dehors de la boucle.
  formField.setAttribute('data-error', 'Veuillez cocher au moins une ville.');
  formField.setAttribute('data-error-visible', 'true');
  return false;
}
    */        
