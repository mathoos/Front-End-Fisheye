async function fetchData(){
    try{
        var response = await fetch('data/photographers.json'); 
        var data = await response.json();
        var photographers = await data.photographers;
        photographers.forEach((photographer =>{
            document.getElementById("photographer_section").innerHTML +=
            `<article>
                <a href="photographer.html?id=${photographer.id}" alt="${photographer.name}">
                    <img src="assets/photographers/${photographer.portrait}">
                    <h2>${photographer.name}</h2>
                </a>
                <div>
                    <p class="city">${photographer.city}, ${photographer.country}</p>
                    <p class="tagline">${photographer.tagline}</p>
                    <p class="price">${photographer.price}€/jour</p>
                </div>
            </article>`
            console.log(photographers)
        }))   
    }
    catch(e){
        console.log(e)
    }    
}

fetchData()



