import { works } from "./works.js";
import { deleteWork } from "./modal.js";


let photos = [];

function photosToGenerate() {
    for (const work of works) {
        let photo = work.imageUrl;
        photos.push(photo);
    }
}

function generatePhotos(works) {

    photosToGenerate();

    for (const work of works) {
        
        const figure = work.imageUrl;

        const galleryPhotos = document.querySelector(".gallery-photos");

        const photoElement = document.createElement("figure");
        photoElement.id = work.id;

        const divElement = document.createElement("div");
        divElement.style.position = "relative";

        const imgElement = document.createElement("img");
        imgElement.src = figure;
        imgElement.className = "gallery-photo"

        const linkElement = document.createElement("button");
        linkElement.id = work.id;
        linkElement.className = "delete-link clickable";

        linkElement.addEventListener('click', deleteWork);
        
        const iconElement = document.createElement("i");
        iconElement.id = work.id;
        iconElement.className = "icon-delete fa-solid fa-trash-can";

        const caption = document.createElement("figcaption");
        caption.innerText = "éditer";

        galleryPhotos.appendChild(photoElement);
        photoElement.appendChild(divElement);
        linkElement.appendChild(iconElement);
        divElement.appendChild(imgElement);
        divElement.appendChild(linkElement);
        photoElement.appendChild(caption);

    }
}

generatePhotos(works);