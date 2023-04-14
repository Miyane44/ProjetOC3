// Récupération des travaux via l'API
export const worksReponse = await fetch("http://localhost:5678/api/works");
export const works = await worksReponse.json();

export function generateWorks(works) {
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
export const categories = await categoriesReponse.json();

function generateFilters(categories) {
    
    const filterAll = document.createElement("button");
        filterAll.innerText = "Tous";
        filterAll.className = "category-button one category-all active";

    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = document.querySelector(".categories");
        
        const category = categories[i];
        
        const filter = document.createElement("button");
        filter.innerText = category.name;
        filter.className = "category-button clickable category-" + category.id;
        
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

const filters = {
    filterAll : document.querySelector(".category-all"),
    objetsFilter : document.querySelector(".category-1"),
    appartementsFilter : document.querySelector(".category-2"),
    hotelsFilter : document.querySelector(".category-3")
}

const toggleSelectedClass = (element) => {
    Object.entries(filters).forEach(([key, value]) => {
        if (element === key) {
            value.classList.remove("clickable");
            value.classList.add("active");
        } else {
            value.classList.remove("active");
            value.classList.add("clickable");
        }
    });
}

filters.filterAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    toggleSelectedClass("filterAll");
    generateWorks(works);
});

filters.objetsFilter.addEventListener("click", function () {
    filterSelection(1);
    toggleSelectedClass("objetsFilter");
});

filters.appartementsFilter.addEventListener("click", function () {
    filterSelection(2);
    toggleSelectedClass("appartementsFilter");
});

filters.hotelsFilter.addEventListener("click", function () {
    filterSelection(3);
    toggleSelectedClass("hotelsFilter");
});