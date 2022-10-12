class Image extends Media {   
    constructor(media) {
        super(media)
        this.image = media.image
        this.title = media.title
    }

    displayMedia(){  
        console.log(this.title)  
        return `<img alt="${this.title}" class="displayMedia" id="image" src="assets/media/${this.image}">`   
    }

}

class Video extends Media {
    constructor(media) {
        super(media) // appel du constructeur parent
        this.video = media.video
    }
    
    displayMedia(){
        return  `<video class="displayMedia" id="image" autoplay src="assets/media/${this.video}" type="video/mp4"></video>` 
    }   
}


class MediaFactory {
    static create(media) {
        if (media.image) {
            return new Image(media)
        } else if (media.video) {
            return new Video(media)
        } else {
            throw 'Unknown media'
        }
    }
}

