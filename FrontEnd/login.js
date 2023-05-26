const formulaire = document.querySelector(".formulaire-login");

formulaire.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    let user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };

    try {
        // Envoi des informations de connexion
        const authData = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (authData.status === 200) {
            const reponse = await authData.json();
            
            window.localStorage.setItem("token", reponse.token);
            
            if (reponse != undefined) {
                document.location.href = "index.html";
            }
        
        } else {
            throw new Error("Erreur dans l'identifiant ou le mot de passe");
        }
    } catch (error) {
        const formElement = document.querySelector(".formulaire-login");

        const loginError = document.querySelector('.error-login');

        if (!loginError) {
            const erreur = document.createElement("span");
            erreur.innerText = error.message;
            erreur.className = "error error-login flex-center one";

        formElement.appendChild(erreur);
        }
    }
});