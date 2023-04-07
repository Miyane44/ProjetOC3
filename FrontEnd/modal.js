import { categories } from "./works.js";

let modal = null;

const constructModalForGalleryPhotos = function() {
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

const construcModalToAddWork = function() {
    const modalProjets = document.querySelector(".modal-wrapper");

    const divElement = document.createElement("div");
    divElement.className = "modal-div-add-photo";

    const h3Element = document.createElement("h3");
    h3Element.className = "title-modal";
    h3Element.innerText = "Ajout photo";

    const formElement = document.createElement("form");
    formElement.id = "add-photo";
    formElement.className = "form-add-photo flex-column";

    const divAddPhoto = document.createElement("div");
    divAddPhoto.className = "div-add-photo flex-center flex-column";

    const iconImage = document.createElement("i");
    iconImage.className = "file-icon fa-sharp fa-regular fa-image";

    const inputAddLabel = document.createElement("label");
    inputAddLabel.htmlFor = "photo";
    inputAddLabel.innerText = "+ Ajouter photo";
    inputAddLabel.className = "button-add-label";

    const inputAdd = document.createElement("input");
    inputAdd.type = "file";
    inputAdd.id = "photo";
    inputAdd.name = "photo";
    inputAdd.accept = ".jpg, .png";
    inputAdd.className = "input-add-photo";

    const inputFilesAccepted = document.createElement("span");
    inputFilesAccepted.innerText = "jpg, png : 4mo max";
    inputFilesAccepted.className = "files-accepted";
    
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Titre";
    titleLabel.htmlFor = "titre";
    titleLabel.className = "form-label";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "titre";
    titleInput.className = "add-photo-input modal-input width-100";

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = "categories";
    selectLabel.innerText = "Catégorie";
    selectLabel.className = "form-label";

    const selectCategories = document.createElement("select");
    selectCategories.name = "categories";
    selectCategories.className = "select-categories width-100";

    const emptyOption = document.createElement("option");
    selectCategories.appendChild(emptyOption);

    for (const category of categories) {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        
        selectCategories.appendChild(option);
    }

    const validateButton = document.createElement("button");
    validateButton.className = "validate-button";
    validateButton.innerText = "Valider";
    
    divAddPhoto.appendChild(iconImage);
    divAddPhoto.appendChild(inputAddLabel);
    divAddPhoto.appendChild(inputAdd);
    divAddPhoto.appendChild(inputFilesAccepted);

    formElement.appendChild(divAddPhoto);
    formElement.appendChild(titleLabel);
    formElement.appendChild(titleInput);
    formElement.appendChild(selectLabel);
    formElement.appendChild(selectCategories);

    divElement.appendChild(h3Element);
    divElement.appendChild(formElement);
    divElement.appendChild(validateButton);

    modalProjets.appendChild(divElement);
}

constructModalForGalleryPhotos();
construcModalToAddWork();

const changeModalToAdd = function () {
    const modalGallery = document.querySelector(".modal-div-gallery");
    modalGallery.style.display = "none";

    const modalAdd = document.querySelector(".modal-div-add-photo");
    modalAdd.style.display = "flex";
}

const openModal = function (e) {
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

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = null;
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".js-edit-modal").forEach( a => {
    a.addEventListener('click', openModal)
});

document.querySelector(".add-photo").addEventListener('click', changeModalToAdd);