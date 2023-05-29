// Récupération des travaux via l'API
const worksReponse = await fetch("http://localhost:5678/api/works");
export const works = await worksReponse.json();

export function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        
        const figure = works[i];

        const gallery = document.querySelector(".gallery");

        const workElement = document.createElement("figure");
        workElement.id = figure.id;

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
        
    const categoriesElement = document.querySelector(".categories");
    
    const filterAll = document.createElement("button");
        filterAll.innerText = "Tous";
        filterAll.className = "category-button one category-all active";
        filterAll.setAttribute("data-id", 0);

        categoriesElement.appendChild(filterAll);

    for (let i = 0; i < categories.length; i++) {
        
        const category = categories[i];
        
        const filter = document.createElement("button");
        filter.innerText = category.name;
        filter.className = "category-button clickable category-" + category.id;
        filter.setAttribute("data-id", category.id);
        
        categoriesElement.appendChild(filter);
        
    }    
}

generateFilters(categories);

/// Gestion des filtres
function filterSelection(categorieId) {
    if (categorieId === '0') {
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(works);
        return;
    }
    const filteredWorks = works.filter(function (work) {
        return work.categoryId.toString() === categorieId;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
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

const filters = document.querySelectorAll('.category-button');

filters.forEach(filter => filter.addEventListener("click", function () {
    const categoryId = filter.getAttribute('data-id');
    toggleSelectedClass(categoryId);
    filterSelection(categoryId);
}))