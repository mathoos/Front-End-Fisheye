class lightbox{
    static async init(){
        let mediasData = await getMedias() 
        mediasData = Array.from(document.querySelectorAll(".displayMedia")); // tableau de toutes les photos et vidéos d'un photographe
        let images = mediasData.map((image) => image.getAttribute("src")); // tableau du chemin exact de chaque media 
        console.log(images)

        mediasData.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault()
                new lightbox(e.currentTarget.getAttribute("src"), images) // on récupère l'url du media
            })
        })
    }

    constructor(url, images){
        this.element = this.buildDOM(url)
        this.loadImage(url)
        document.body.appendChild(this.element)
        this.images = images  
        this.onKeyUp = this.onKeyUp.bind(this)  
        document.addEventListener("keyup", this.onKeyUp)   
    }

    loadImage(url){
        this.url = url
        const imgExtension = url.split(".").pop();
        const container = this.element.querySelector('.image-container')
        if (imgExtension === "mp4") {
            container.innerHTML = `<video src="${url}" autoplay/>`;
        } 
        else {
            container.innerHTML = `<img src="${url}"/>`;
        }
    }

    onKeyUp(e){
        if(e.key === "Escape"){
            this.close(e)
        }
        else if(e.key === "ArrowLeft"){
            this.prev(e)
        }
        else if(e.key === "ArrowRight"){
            this.next(e)
        }
    }

    close (e){
        e.preventDefault()
        document.querySelector(".lightbox").classList.add("fadeOut")
        window.setTimeout(() => {
            document.querySelector(".lightbox").remove()
        }, 500)
        document.removeEventListener("keyup", this.onKeyUp)
    }

    next(e){
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url) // on récupère l'index de l'image actuelle dans le tableau         
        if(i === this.images.length - 1){ // pour revenir à la première image quand on a parcouri tout le tableau
            i = -1
        }     
        this.loadImage(this.images[i + 1])
    }

    prev(e){
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url) // on récupère l'index de l'image actuelle dans le tableau         
        if(i === 0){ 
            i = this.images.length
        }     
        this.loadImage(this.images[i - 1])
    }

    buildDOM(){    
        const dom = document.createElement("div")
        dom.classList.add("lightbox")
        dom.innerHTML = 
        `  
            <button class="lightbox-prev">Prev</button>
            <div class="image-container"></div>
            <button class="lightbox-next">Next</button>   
            <button class="lightbox-close">Close</button>
        `
        dom.querySelector(".lightbox-close").addEventListener("click", this.close.bind(this))
        dom.querySelector(".lightbox-next").addEventListener("click", this.next.bind(this))
        dom.querySelector(".lightbox-prev").addEventListener("click", this.prev.bind(this))
        
        return dom
    }
}

lightbox.init()




