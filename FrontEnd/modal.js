const logButton = document.querySelector(".log");

logButton.addEventListener("click", function () {
    if (logButton.innerText === 'login') {
        document.location.href = "login.html";
    } else {
        document.location.href = "index.html";
        window.localStorage.removeItem("token");
    }
});

if (window.localStorage.getItem("token") != undefined) {
    const logElement = document.querySelector(".log");
    logElement.innerText = "logout";

    document.getElementById('modal').style.display = "flex";
    document.getElementById('categories').style.display = "none";
    document.querySelector('.projets').className = "projets margin-t-100";
    document.querySelector('.gallery').className = "gallery margin-t-100";
} else {
    const logElement = document.querySelector(".log");
    logElement.innerText = "login";

    document.getElementById('modal').style.display = "none";
    document.getElementById('categories').style.display = "flex";
}