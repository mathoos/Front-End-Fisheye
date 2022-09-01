async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); // Le await est une alternative à .then  (on ne peut l'utiliser que dans une function asynchrone)
        console.log(response)  
        var data = await response.json()
        console.log(data)
        data.photographers.forEach((photographer =>{
            document.getElementById("photographer_section").innerHTML +=
            `<article>
                <a href="photographer.html?id=+${photographer.id}" alt="${photographer.name}" class="id">
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
        
    }
    catch(e){
        console.log(e)
    }    
}

fetchData()