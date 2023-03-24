// Récupération des travaux via l'API
const worksReponse = await fetch("http://localhost:5678/api/works");
const works = await worksReponse.json();

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        
        const figure = works[i];

        const gallery = document.querySelector(".gallery");

        const workElement = document.createElement("figure");

        const imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        imgElement.alt = figure.title;

        const caption = document.createElement("figcaption");
        caption.innerText = figure.title;

        gallery.appendChild(workElement);
        workElement.appendChild(imgElement);
        workElement.appendChild(caption);
        
    }
}

generateWorks(works);

// Récupération des catégories via l'API
const categoriesReponse = await fetch("http://localhost:5678/api/categories")
const categories = await categoriesReponse.json();

function generateFilters(categories) {
    
    const filterAll = document.createElement("button");
        filterAll.innerText = "Tous";
        filterAll.className = "category-button one category-all";

    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = document.querySelector(".categories");
        
        const category = categories[i];
        
        const filter = document.createElement("button");
        filter.innerText = category.name;
        filter.className = "category-button category-" + category.id;
        
        categoriesElement.appendChild(filterAll);
        categoriesElement.appendChild(filter);
        
    }    
}

generateFilters(categories);

/// Gestion des filtres
function filterSelection(categorieId) {
    const filteredWorks = works.filter(function (work) {
        return work.categoryId === categorieId;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
}

const filterAll = document.querySelector(".category-all");
const objetsFilter = document.querySelector(".category-1");
const appartementsFilter = document.querySelector(".category-2");
const hotelsFilter = document.querySelector(".category-3");

filterAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
});

objetsFilter.addEventListener("click", function () {
    filterSelection(1);
});

appartementsFilter.addEventListener("click", function () {
    filterSelection(2);
});

hotelsFilter.addEventListener("click", function () {
    filterSelection(3);
});