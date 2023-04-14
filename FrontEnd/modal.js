import { categories, generateWorks, worksReponse } from "./works.js";

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
    console.log('change');
    const file = input.files[0];
    const maxSize = 4 * 1024 * 1024;

    const errorImg = document.createElement('span');
    errorImg.name = 'errorImg';
    errorImg.className = "error one flex-center padding-top-20";
    errorImg.textContent = "Votre image est trop volumineuse"

    if (file.length === 0) { return; }

    if (file && file.type.startsWith('image/')) {

        if (file.size > maxSize) {
            console.log('fichier trop volumineux');
            formElement.appendChild(errorImg);
            return;
        }

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
    if (formElement.image.src !== '' && formElement.title.value !== '' && formElement.category.value !== '') {
        buttonSubmit.classList.remove('disabled');
        buttonSubmit.disabled = '';
    } else {
        buttonSubmit.classList.add('disabled');
        buttonSubmit.disabled = 'true';
    }
}

function constructModalForGalleryPhotos() {
    const modalProjets = document.querySelector(".modal-wrapper");

    const divElement = document.createElement("div");
    divElement.className = "modal-div-gallery";

    const h3Element = document.createElement("h3");
    h3Element.innerText = "Galerie photo";
    h3Element.className = "title-modal";

    const galleryElement = document.createElement("div");
    galleryElement.id = "gallery-photos";
    galleryElement.className = "gallery-photos";

    const inputElement = document.createElement("input");
    inputElement.type = "submit";
    inputElement.value = "Ajouter une photo";
    inputElement.className = "add-photo modal-input";

    const spanElement = document.createElement("span");
    spanElement.classList = "delete-all-aworks";
    spanElement.innerText = "Supprimer la galerie";
    
    divElement.appendChild(h3Element);
    divElement.appendChild(galleryElement);
    divElement.appendChild(inputElement);
    divElement.appendChild(spanElement);
    modalProjets.appendChild(divElement);
}

function construcModalToAddWork() {
    const modalProjets = document.querySelector(".modal-wrapper");

    const divElement = document.createElement("div");
    divElement.className = "modal-div-add-photo";

    const h3Element = document.createElement("h3");
    h3Element.className = "title-modal";
    h3Element.innerText = "Ajout photo";

    const formElement = document.createElement("form");
    formElement.id = "add-photo";
    formElement.name = "add-photo";
    formElement.enctype = "multipart/form-data";
    formElement.className = "form-add-photo flex-column";
    formElement.style.position = "relative";

    const divAddPhoto = document.createElement("div");
    divAddPhoto.className = "div-add-photo flex-center flex-column";

    const iconImage = document.createElement("i");
    iconImage.className = "file-icon fa-sharp fa-regular fa-image";

    const inputAddLabel = document.createElement("label");
    inputAddLabel.htmlFor = "image";
    inputAddLabel.innerText = "+ Ajouter photo";
    inputAddLabel.className = "button-add-label";

    const inputAdd = document.createElement("input");
    inputAdd.type = "file";
    inputAdd.id = "image";
    inputAdd.name = "image";
    inputAdd.accept = ".jpg, .jpeg, .png";
    inputAdd.required = "true";
    inputAdd.className = "input-add-photo";
    inputAdd.hidden = true;

    const inputFilesAccepted = document.createElement("span");
    inputFilesAccepted.innerText = "jpg, png : 4mo max";
    inputFilesAccepted.className = "files-accepted";
    
    const divUploadedPhoto = document.createElement("div");
    divUploadedPhoto.className = "div-uploaded-photo flex-center flex-column";
    
    const imgElement = document.createElement("img");
    imgElement.className = "image";
    imgElement.src = "";
    
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Titre";
    titleLabel.htmlFor = "title";
    titleLabel.className = "form-label";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = "true";
    titleInput.className = "add-title-input modal-input";
    titleInput.defaultValue = "";

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = "category";
    selectLabel.innerText = "Catégorie";
    selectLabel.className = "form-label";

    const selectCategories = document.createElement("select");
    selectCategories.name = "category";
    selectCategories.required = "true";
    selectCategories.className = "select-categories width-100";

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    selectCategories.defaultValue = emptyOption;
    selectCategories.appendChild(emptyOption);

    for (const category of categories) {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        option.className = "select-category"
        
        selectCategories.appendChild(option);
    }

    const validateButton = document.createElement("input");
    validateButton.className = "validate-button disabled";
    validateButton.name = "validate-button";
    validateButton.type = "submit";
    validateButton.style.position = "absolute";
    validateButton.style.bottom = "-92px";
    validateButton.style.left = "91.5px";
    validateButton.value = "Valider";
    
    divAddPhoto.appendChild(iconImage);
    divAddPhoto.appendChild(inputAddLabel);
    divAddPhoto.appendChild(inputAdd);
    divAddPhoto.appendChild(inputFilesAccepted);
    
    divUploadedPhoto.appendChild(imgElement);
    
    formElement.appendChild(divAddPhoto);
    formElement.appendChild(divUploadedPhoto);
    formElement.appendChild(titleLabel);
    formElement.appendChild(titleInput);
    formElement.appendChild(selectLabel);
    formElement.appendChild(selectCategories);
    formElement.appendChild(validateButton);

    divElement.appendChild(h3Element);
    divElement.appendChild(formElement);

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
    modal.style.display = null;
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;

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
    event.preventDefault();
    let form = document.querySelector('.form-add-photo');
    let formData = new FormData(form);
    
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

            const modalGallery = document.querySelector(".modal-div-gallery");
            modalGallery.style.display = "flex";
            
            const modalAdd = document.querySelector(".modal-div-add-photo");
            modalAdd.style.display = "none";
        } else {
            console.log("Echec");
        }
    }
};