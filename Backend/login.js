const formulaire = document.querySelector(".formulaire-login");
formulaire.addEventListener("submit", function (event) {
    
    const user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password").value
    };
    
    const authData = fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const reponse = authData.json();
    console.log(reponse);
    
});



