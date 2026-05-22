const API_URL = "https://habitup-8ho1.onrender.com/api/usuarios/login";

const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    mensaje.className = "mensaje";
    mensaje.textContent = "";

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            mensaje.classList.add("exito");
            mensaje.textContent = "Inicio de sesión correcto";

            localStorage.setItem("usuarioId", datos.usuarioId);
            localStorage.setItem("nombre", datos.nombre);

            setTimeout(() => {
                window.location.href = "habitos.html";
            }, 1000);
        } else {
            mensaje.classList.add("error");
            mensaje.textContent = datos.mensaje || "Datos incorrectos";
        }

    } catch (error) {
        mensaje.classList.add("error");
        mensaje.textContent = "No se pudo conectar con el servidor";
    }
});