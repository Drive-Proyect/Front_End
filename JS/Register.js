let username = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let registrarse = document.getElementById("registrarse");

function register(event) {
    event.preventDefault();

    let data = {
        userName: username.value,
        password: password.value,
        email: email.value
    };

    fetch("http://localhost:5009/api/Users/Create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Parsear la respuesta como texto
        } else {
            throw new Error('Error al registrarse');
        }
    })
    .then(data => {
        showModal('Te has registrado correctamente!');
        console.log(data);
    })
    .catch(error => {
        showModal(error.message);
        console.error('Error:', error);
    });
}

registrarse.addEventListener("click", register);

function showModal(message) {
    let modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;

    let confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

function reload()
{
    window.location.reload();
}

let cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", reload);