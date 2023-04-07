const loginButton = document.querySelector(".login");
loginButton.addEventListener("click", function () {
    if (loginButton.innerText === 'login') {
        document.location.href = "login.html";
    } else {
        document.location.href = "index.html";
        window.localStorage.removeItem("token");
    }
});

const modalElement = document.querySelector(".modal");
modalElement.style.display = "none";

const token = window.localStorage.getItem("token");

if (token) {
    const loginElement = document.querySelector(".login");
    loginElement.innerText = "logout";
    
    document.getElementById('categories').style.display = "none";
    document.querySelector('.projet-title').className = "projet-title flex-center margin-t-100";
    document.querySelector('.gallery').className = "gallery margin-t-100";
} else {
    const loginElement = document.querySelector(".login");
    loginElement.innerText = "login";
    
    document.getElementById('edit-mode-banniere').style.display = "none";
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".edit-projets").style.display = "none";
}        