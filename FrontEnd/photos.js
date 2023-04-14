import { works } from "./works.js";

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

        const divElement = document.createElement("div");
        divElement.style.position = "relative";

        const imgElement = document.createElement("img");
        imgElement.src = figure;
        imgElement.className = "gallery-photo"

        const linkElement = document.createElement("button");
        linkElement.className = "delete-link clickable";
        
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

document.querySelectorAll(".delete-link").forEach( a => {
    a.addEventListener('click', async function(event) {
            event.preventDefault();
            const id = event.target.id;
            console.log(id);
            const token = window.localStorage.getItem('token')
            await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        })
    });