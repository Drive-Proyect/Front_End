document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId'); // Asegúrate de tener el userId almacenado en localStorage
    const username = localStorage.getItem('userName');
    const email = localStorage.getItem('email');

    document.getElementById('username').innerText = username;
    document.getElementById('email').innerText = email;

    // Fetch folders from the backend
    fetch("http://localhost:5009/api/folders")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching folders');
            }
            return response.json();
        })
        .then(folders => {
            const folderContainer = document.getElementById('folderContainer');
            folderContainer.innerHTML = ''; // Clear any existing folders

            folders.forEach(folder => {
                const folderCard = document.createElement('div');
                folderCard.classList.add('col-md-4', 'mb-3');
                folderCard.innerHTML = `
                    <div class="card jscss" style="height: 55px; border: none">
                        <div class="card-body" style="display: flex; justify-content: space-between">
                            <h5 style="font-size: 15px">
                                <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                    <path fill="#000000" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/>
                                </svg> ${folder.Name}
                            </h5>
                            <a style="cursor: pointer;">
                                <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                                    <path fill="#000000" d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                `;
                folderContainer.appendChild(folderCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally show an error message to the user
        });
});

document.getElementById('createFolderForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const folderName = document.getElementById("folderName").value;
    const creationDate = document.getElementById("creationDate").value;
    const updateDate = document.getElementById("updateDate").value;
    const locationSpace = document.getElementById("locationSpace").value;
    const capacityMemory = document.getElementById("capacityMemory").value;
    const status = "Active";
    const parentFolderId = document.getElementById("parentFolderId").value;
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem('userId'));

    if (!folderName || !creationDate || !updateDate || !locationSpace) {
        showModal('Por favor, complete todos los campos obligatorios.');
        return;
    }

    let data = {
        name: folderName,
        creationDate: new Date(creationDate).toISOString(),
        updateDate: new Date(updateDate).toISOString(),
        locationSpace: locationSpace,
        capacityMemory: capacityMemory ? parseFloat(capacityMemory) : null,
        status: status,
        userId: userId,
        parentFolderId: parentFolderId ? parseInt(parentFolderId) : null
    };

    try {
        const response = await fetch("http://localhost:5009/api/Folders/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Error al crear la carpeta: ' + errorText);
        }

        showModal('Carpeta creada exitosamente!');
    } catch (error) {
        showModal(error.message);
        console.error('Error:', error);
    }
});

function showModal(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}