// Récupération des travaux depuis le fichier json
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        
        const figure = works[i];

        const divGallery = document.querySelector(".gallery");

        const workElement = document.createElement("figure");

        const imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        imgElement.alt = figure.title;

        const caption = document.createElement("figcaption");
        caption.innerText = figure.title;

        divGallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(caption);
        
    }
}

generateWorks(works);