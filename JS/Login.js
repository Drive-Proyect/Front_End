async function login(event) {
    event.preventDefault(); 
    const correo = document.getElementById("email");
    const contrasena = document.getElementById("password");

    if (!correo.value || !contrasena.value) {
        showModal('Por favor, complete todos los campos.');
        return;
    }

    let data = {
        email: correo.value,
        password: contrasena.value
    };
    console.log(data);

    try {
        const valor = await fetch("http://localhost:5009/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        console.log(data);

        if (!valor.ok) {
            const errorText = await valor.text();
            throw new Error('Error al iniciar sesión: ' + errorText);
        }
        console.log(valor);
        const responseData = await valor.json(); 

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('userName', responseData.userName);
        localStorage.setItem('email', responseData.email);

        showModal('Te has iniciado sesión correctamente!');
        window.location.href = '../Index.html';
    } catch (error) {
        showModal(error.message);
        console.error('Error:', error);
    }
}

function showModal(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}
