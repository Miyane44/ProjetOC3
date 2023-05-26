let modal = null;
    
constructModalForGalleryPhotos();
construcModalToAddWork();

const buttonPrevious = document.querySelector('.button-previous');
buttonPrevious.addEventListener('click', goBackToPreviousModal);

const formElement = document.querySelector('.form-add-photo');
formElement.addEventListener('change', enabledSubmitButton);
formElement.addEventListener('submit', addWork);

document.querySelectorAll(".js-edit-modal").forEach( a => {
    a.addEventListener('click', openModal)
});

document.querySelector(".add-photo").addEventListener('click', changeModalToAdd);

const input = document.querySelector("#image");

input.addEventListener('change', function() {
    if (input.files.length === 0) { return; }

    const file = input.files[0];
    const maxSize = 4 * 1024 * 1024;

    const errorImg = document.querySelector('.error-image');

    if (file && file.type.startsWith('image/')) {

        if (file.size > maxSize) {
            console.log('fichier trop volumineux');
            errorImg.style.display = null;
            return;
        }

        errorImg.style.display = "none";

        const addPhoto = document.querySelector('.div-add-photo');
        addPhoto.style.display = "none";

        const uploadedPhoto = document.querySelector('.div-uploaded-photo');
        uploadedPhoto.style.display = "flex";

        const imgElement = document.querySelector('.image');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (event) => {
            imgElement.src = event.target.result;
        });
    } 
});

function enabledSubmitButton() {
    const buttonSubmit = document.querySelector('.validate-button');

    const formElement = document.querySelector('.form-add-photo');

    const isValid = Array.of(...formElement).every((item) => !!item.value);

    isValid ? buttonSubmit.classList.remove('disabled') : buttonSubmit.classList.add('disabled');
}

function constructModalForGalleryPhotos() {
    const modalProjets = document.querySelector(".modal-wrapper");

    const divElement = document.createElement("div");
    divElement.className = "modal-div-gallery";

    const galleryModal = `<h3 class="title-modal">Galerie photo</h3>
    <div id="gallery-photos" class="gallery-photos"></div>
    <input type="submit" value="Ajouter une photo" class="add-photo modal-input clickable">
    <span class="delete-all-aworks">Supprimer la galerie</span>`;

    divElement.innerHTML = galleryModal;

    modalProjets.appendChild(divElement);
}

function construcModalToAddWork() {
    const modalProjets = document.querySelector(".modal-wrapper");

    const divElement = document.createElement("div");
    divElement.className = "modal-div-add-photo";

    const addModal = `<h3 class="title-modal">Ajout photo</h3>
    <form id="add-photo" name="add-photo" class="form-add-photo flex-column" style="position: relative;">
    <div class="div-add-photo flex-center flex-column">
    <i class="file-icon fa-sharp fa-regular fa-image"></i>
    <label for="image" class="button-add-label clickable">+ Ajouter photo</label>
    <input class="input-add-photo" type="file" id="image" name="image" accept=".jpg, .jpeg, .png" hidden="">
    <span class="files-accepted">jpg, png : 4mo max</span>
    </div>
    <div class="div-uploaded-photo flex-center flex-column">
    <img class="image"></div>
    <label for="title" class="form-label">Titre</label>
    <input type="text" name="title" class="add-title-input modal-input" value="">
    <label for="category" class="form-label">Catégorie</label>
    <select name="category" class="select-categories width-100">
    <option value=""></option>
    <option value="1" class="select-category">Objets</option>
    <option value="2" class="select-category">Appartements</option>
    <option value="3" class="select-category">Hotels &amp; restaurants</option>
    </select>
    <input class="validate-button disabled" name="validate-button" type="submit" value="Valider" style="position: absolute; bottom: -92px; left: 91.5px;">
    <span class="error error-image one flex-center padding-top-20" style="display: none;">Votre image est trop volumineuse</span>
    <span class="error error-inputs one flex-center padding-top-20" style="display: none;">Merci de renseigner la totalité des champs</span>
    </form>`;

    divElement.innerHTML = addModal;

    modalProjets.appendChild(divElement);
}

function changeModalToAdd() {
    const modalGallery = document.querySelector(".modal-div-gallery");
    modalGallery.style.display = "none";

    const modalAdd = document.querySelector(".modal-div-add-photo");
    modalAdd.style.display = "flex";

    const addPhoto = document.querySelector('.div-add-photo');
    addPhoto.style.display = "flex";
    
    const uploadedPhoto = document.querySelector('.div-uploaded-photo');
    uploadedPhoto.style.display = "none";

    const buttonsModal = document.querySelector('.buttons-modal');
    buttonsModal.style.justifyContent = "space-between";

    const buttonPrevious = document.querySelector('.button-previous');
    buttonPrevious.style.display = "flex";

    const errorDelete = document.querySelector('.error-delete');
    errorDelete.style.display = "none";
}

function goBackToPreviousModal() {
    const image = document.querySelector(".input-add-photo");
    image.value = "";
    const titre = document.querySelector(".add-title-input");
    titre.value = "";
    const category = document.querySelector(".select-categories");
    category.value = "";

    const errorInputs = document.querySelector('.error-inputs');
    errorInputs.style.display = "none";

    const modalGallery = document.querySelector(".modal-div-gallery");
    modalGallery.style.display = "flex";

    const modalAdd = document.querySelector(".modal-div-add-photo");
    modalAdd.style.display = "none";

    const buttonsModal = document.querySelector('.buttons-modal');
    buttonsModal.style.justifyContent = "flex-end";

    const buttonPrevious = document.querySelector('.button-previous');
    buttonPrevious.style.display = "none";
}

function openModal(e) {
    e.preventDefault();
    
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = "flex";
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    const modalGallery = document.querySelector(".modal-div-gallery");
    modalGallery.style.display = "flex";

    const modalAdd = document.querySelector(".modal-div-add-photo");
    modalAdd.style.display = "none";
};

function closeModal(e) {
    if (modal === null) return;
    e.preventDefault();
    window.setTimeout(function() {
        modal.style.display = "none";
        modal = null;
    }, 500)
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);

    const image = document.querySelector(".input-add-photo");
    image.value = "";
    const titre = document.querySelector(".add-title-input");
    titre.value = "";
    const category = document.querySelector(".select-categories");
    category.value = "";

    const errorInputs = document.querySelector('.error-inputs');
    errorInputs.style.display = "none";

    const errorDelete = document.querySelector('.error-delete');
    errorDelete.style.display = "none";

    const buttonsModal = document.querySelector('.buttons-modal');
    buttonsModal.style.justifyContent = "flex-end";

    const buttonPrevious = document.querySelector('.button-previous');
    buttonPrevious.style.display = "none";
};

function stopPropagation(e) {
    e.stopPropagation();
};

async function addWork(event) {
    event.preventDefault();
    const form = new FormData(formElement);

    const isValid = Array.of(...formElement).every((item) => !!item.value);
    
    const errorInputs = document.querySelector('.error-inputs');

    isValid ? errorInputs.style.display = "none" : errorInputs.style.display = "flex";
    
    const token = window.localStorage.getItem('token');
    
    if(isValid && form.has('image')) {
        try {
            let reponse = await fetch(`http://localhost:5678/api/works`, {
                method: 'POST',
                body: form,
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (reponse.status === 201) {

                const worksReponse = await fetch("http://localhost:5678/api/works");
                const works = await worksReponse.json();
                
                generateNewElementWork(works);
                generateNewElementGallery(works);
                
                closeModal(event);
            }
        } catch(error) {
            console.log(error);
        }
    }
};

function generateNewElementWork(works) {
    const i = works.length - 1;
    
    const worksDiv = document.querySelector('.gallery');
    const newFigure = document.createElement('figure');
    newFigure.id = works[i].id;
    
    const figureImg = document.createElement('img');
    figureImg.src = works[i].imageUrl;
    figureImg.alt = works[i].title;
    
    const figureCaption = document.createElement('figcaption');
    figureCaption.innerText = works[i].title;
    
    newFigure.appendChild(figureImg);
    newFigure.appendChild(figureCaption);
    
    worksDiv.appendChild(newFigure);
}

function generateNewElementGallery(works) {
    const i = works.length - 1;
    
    const galleryDiv = document.querySelector('.gallery-photos');
    const newFigure = document.createElement('figure');
    newFigure.id = works[i].id;

    const newDiv = document.createElement('div');
    newDiv.style.position = 'relative';
    
    const figureImg = document.createElement('img');
    figureImg.src = works[i].imageUrl;
    figureImg.className = "work-photo";

    const moveButton = document.createElement("button");
    moveButton.className = "move-button clickable";
    
    const moveIcon = document.createElement("img");
    moveIcon.className = "move-icon";
    moveIcon.src = "assets/icons/arrow.png";

    const figureButton = document.createElement('button');
    figureButton.id = works[i].id;
    figureButton.className = 'delete-link clickable';

    figureButton.addEventListener('click', deleteWork);

    const iconButton = document.createElement('i');
    iconButton.id = works[i].id;
    iconButton.className = 'icon-delete fa-solid fa-trash-can';

    const figcaption = document.createElement('figcaption');
    figcaption.innerText = 'éditer';
    
    figureButton.appendChild(iconButton);
    moveButton.appendChild(moveIcon);
    newDiv.appendChild(figureImg);
    newDiv.appendChild(figureButton);
    newDiv.appendChild(moveButton);
    newFigure.appendChild(newDiv);
    newFigure.appendChild(figcaption);
    galleryDiv.appendChild(newFigure);
}

export async function deleteWork(event) {
    event.preventDefault();
    event.stopPropagation();
    const id = event.target.id;
    const token = window.localStorage.getItem('token');
    try {
        let reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (reponse.status === 204) {
            deleteElementInWorks(id);
            deleteElementInGallery(id);
        } else {
            throw new Error("Impossible de supprimer le travail, veuilez vous connecter");
        }
    } catch (error) {
        const galleryElement = document.querySelector(".title-modal");

        const deleteError = document.querySelector('.error-delete');

        if (!deleteError) {
            const erreur = document.createElement("span");
            erreur.innerText = error.message;
            erreur.className = "error error-delete one flex-center";

            galleryElement.appendChild(erreur);
        }
    }
}

function deleteElementInGallery(id) {

    const galleryDiv = document.querySelector('.gallery-photos');
    const elementDeleted = document.getElementById(id);

    galleryDiv.removeChild(elementDeleted);
}

function deleteElementInWorks(id) {

    const worksDiv = document.querySelector('.gallery');
    const elementDeleted = document.getElementById(id);

    worksDiv.removeChild(elementDeleted);
}

