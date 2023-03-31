import { works } from "./works.js";

let photos = [];

for (const work of works) {
    let photo = work.imageUrl;
    photos.push(photo);
}

function generatePhotos(photos) {
    for (let i = 0; i < photos.length; i++) {
        
        const figure = photos[i];

        const galleryPhotos = document.querySelector(".gallery-photos");

        const photoElement = document.createElement("figure");

        const divElement = document.createElement("div");
        divElement.style.position = "relative";
        
        const iconElement = document.createElement("i");
        iconElement.style.position = "absolute";
        iconElement.style.textAlign = "center"
        iconElement.style.width = "17px";
        iconElement.style.height = "17px";
        iconElement.style.fontSize = "9px";
        iconElement.style.color = "#FFFFFF";
        iconElement.style.backgroundColor = "#000000";
        iconElement.className = "fa-solid fa-trash-can";

        const imgElement = document.createElement("img");
        imgElement.src = figure;
        imgElement.className = "gallery-photo"

        const caption = document.createElement("figcaption");
        caption.innerText = "éditer";

        galleryPhotos.appendChild(photoElement);
        photoElement.appendChild(divElement);
        divElement.appendChild(iconElement);
        divElement.appendChild(imgElement);
        photoElement.appendChild(caption);
        
    }
}

generatePhotos(photos);