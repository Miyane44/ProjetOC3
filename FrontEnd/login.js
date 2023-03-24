const formulaire = document.querySelector(".formulaire-login");
formulaire.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password").value
    };
    
    const authData = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const reponse = await authData.json();

    window.localStorage.setItem("token", reponse.token);

    if (reponse.token != undefined) {
        document.location.href = "index.html";
    }
    
});



