const API_URL = "http://localhost:3000/api/usuarios/registro";

const formRegistro = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensajeRegistro");
const fotoInput = document.getElementById("fotoInput");
const previewFoto = document.getElementById("previewFoto");

fotoInput.addEventListener("change", function() {
    const archivo = fotoInput.files[0];

    if (archivo) {
        const lector = new FileReader();

        lector.onload = function(e) {
            previewFoto.src = e.target.result;
            localStorage.setItem("fotoPerfil", e.target.result);
        };

        lector.readAsDataURL(archivo);
    }
});

formRegistro.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarPassword").value;

    mensaje.className = "mensaje";
    mensaje.textContent = "";

    if (password !== confirmarPassword) {
        mensaje.classList.add("error");
        mensaje.textContent = "Las contraseñas no coinciden";
        return;
    }

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                correo,
                password
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            mensaje.classList.add("exito");
            mensaje.textContent = datos.mensaje;

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } else {
            mensaje.classList.add("error");
            mensaje.textContent = datos.mensaje;
        }

    } catch (error) {
        mensaje.classList.add("error");
        mensaje.textContent = "No se pudo conectar con el servidor";
    }
});