

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
        const imgInput = document.querySelector('#image');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (event) => {
            imgElement.src = event.target.result;
            imgInput.src = event.target.result;
        });
    } 
});

function enabledSubmitButton() {
    const buttonSubmit = document.querySelector('.validate-button');

    const photoInput = document.querySelector('.input-add-photo');
    const titleInput = document.querySelector('.add-title-input');
    const categoryInput = document.querySelector('.select-categories');

    // console.log('photoInput.src', photoInput.src)
    // console.log('titleInput.value', titleInput.value)
    // console.log('categoryInput.value', formElement.category.value)

    // TODO vérifier avec Lucien, la raison pour laquelle src = http://127.0.0.1:5501/index.html
    if (formElement.image.src && formElement.title.value && formElement.category.value) {
        buttonSubmit.classList.remove('disabled');
    } else {
        buttonSubmit.classList.add('disabled');
    }
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
    <form id="add-photo" name="add-photo" enctype="multipart/form-data" class="form-add-photo flex-column" style="position: relative;">
    <div class="div-add-photo flex-center flex-column">
    <i class="file-icon fa-sharp fa-regular fa-image"></i>
    <label for="image" class="button-add-label clickable">+ Ajouter photo</label>
    <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" class="input-add-photo" hidden="" src="">
    <span class="files-accepted">jpg, png : 4mo max</span>
    </div>
    <div class="div-uploaded-photo flex-center flex-column">
    <img class="image" src=""></div>
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
}

function goBackToPreviousModal() {
    const imageInput = document.querySelector('.input-add-photo');
    imageInput.src = "";
    const imageUploaded = document.querySelector('.div-uploaded-photo');
    imageUploaded.src = "";
    const titre = document.querySelector(".add-title-input");
    titre.value = "";
    const category = document.querySelector(".select-categories");
    category.value = "";

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

    const imageInput = document.querySelector('.input-add-photo');
    imageInput.src = "";
    const imageUploaded = document.querySelector('.div-uploaded-photo');
    imageUploaded.src = "";
    const titre = document.querySelector(".add-title-input");
    titre.value = "";
    const category = document.querySelector(".select-categories");
    category.value = "";

    const buttonsModal = document.querySelector('.buttons-modal');
    buttonsModal.style.justifyContent = "flex-end";

    const buttonPrevious = document.querySelector('.button-previous');
    buttonPrevious.style.display = "none";
};

function stopPropagation(e) {
    e.stopPropagation();
};

function validateForm(formData) {
    const uploadedPhoto = formData.get('image');
    const title = formData.get('title');
    const category = formData.get('category');

    const required = [title, category, uploadedPhoto];

    const isValid = required.every(field => field !== null);

    return isValid;
}

async function addWork(event) {
    console.log('addWork');
    event.preventDefault();
    let form = document.querySelector('.form-add-photo');
    let formData = new FormData(form);

    if (!formElement.image.src || !formElement.title.value || !formElement.category.value) {
        console.log('test');
        const errorInputs = document.querySelector('.error-inputs');
        errorInputs.style.display = "flex";
    } else {   
        const errorInputs = document.querySelector('.error-inputs');
        errorInputs.style.display = "none";    
    }
    
    const token = window.localStorage.getItem('token');
    
    if(validateForm(formData) && formData.has('image')) {

        let reponse = await fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });
        if (reponse.status === 201) {
            console.log('Envoyé');              

            const worksReponse = await fetch("http://localhost:5678/api/works");
            const works = await worksReponse.json();
            
            generateNewElementWork(works);
            generateNewElementGallery(works);

            closeModal(event);
        } else {
            console.log("Echec");
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
    figureImg.className = "gallery-photo";

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
    newDiv.appendChild(figureImg);
    newDiv.appendChild(figureButton);
    newFigure.appendChild(newDiv);
    newFigure.appendChild(figcaption);
    galleryDiv.appendChild(newFigure);
}

export async function deleteWork(event) {
    console.log('delete');
    event.preventDefault();
    event.stopPropagation();
    const id = event.target.id;
    const token = window.localStorage.getItem('token');
    try {
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        deleteElementInWorks(id);
        deleteElementInGallery(id);
    } catch (error) {
        console.log(error);
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

