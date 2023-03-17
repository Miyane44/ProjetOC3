const reponse = await fetch("http://localhost:5678/api/categories")
const categories = await reponse.json();
console.log(categories);

function generateFilters(categories) {
        
    for (let i = 0; i < categories.length; i++) {
        
        const category = categories[i];
        
        const categoriesElement = document.querySelector(".categories");
        
        const filter = document.createElement("button");
        filter.innerText = category.name;
        filter.className = "category-button";
        
        categoriesElement.appendChild(filter);
    }
    
}

generateFilters(categories);