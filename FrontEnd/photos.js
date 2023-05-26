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
        divElement.className = "work"

        const imgElement = document.createElement("img");
        imgElement.src = figure;
        imgElement.className = "work-photo";

        const moveButton = document.createElement("button");
        moveButton.className = "move-button clickable";
        
        const moveIcon = document.createElement("img");
        moveIcon.className = "move-icon";
        moveIcon.src = "assets/icons/arrow.png";

        const deleteButton = document.createElement("button");
        deleteButton.id = work.id;
        deleteButton.className = "delete-link clickable";

        deleteButton.addEventListener('click', deleteWork);
        
        const deleteIcon = document.createElement("i");
        deleteIcon.id = work.id;
        deleteIcon.className = "icon-delete fa-solid fa-trash-can";

        const caption = document.createElement("figcaption");
        caption.innerText = "éditer";

        galleryPhotos.appendChild(photoElement);
        photoElement.appendChild(divElement);
        moveButton.appendChild(moveIcon);
        deleteButton.appendChild(deleteIcon);
        divElement.appendChild(imgElement);
        divElement.appendChild(moveButton);
        divElement.appendChild(deleteButton);
        photoElement.appendChild(caption);

    }
}

generatePhotos(works);