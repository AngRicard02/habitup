const usuarioId = localStorage.getItem("usuarioId");

let datosHabito = null;

function seleccionarHorario(horario) {
    document.getElementById("horario").value = horario;
}

document.getElementById("formHabito").addEventListener("submit", function(evento) {
    evento.preventDefault();

    datosHabito = {
        usuarioId: usuarioId,
        nombre: document.getElementById("nombre").value,
        horario: document.getElementById("horario").value,
        estado: document.getElementById("estado").value,
        meta: document.getElementById("meta").value,
        color: document.getElementById("color").value
    };

    document.getElementById("modalConfirmar").style.display = "flex";
});

function cerrarModal() {
    document.getElementById("modalConfirmar").style.display = "none";
}

async function guardarHabito() {
    const mensaje = document.getElementById("mensajeHabito");

    try {
        const respuesta = await fetch("http://localhost:3000/api/habitos/crear", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(datosHabito)
        });

        const datos = await respuesta.json();

        document.getElementById("modalConfirmar").style.display = "none";

        if(respuesta.ok){
            mensaje.className = "mensaje exito";
            mensaje.textContent = "Hábito guardado correctamente";

            setTimeout(() => {
                window.location.href = "habitos.html";
            }, 1200);
        }else{
            mensaje.className = "mensaje error";
            mensaje.textContent = datos.mensaje;
        }

    } catch(error) {
        document.getElementById("modalConfirmar").style.display = "none";
        mensaje.className = "mensaje error";
        mensaje.textContent = "No se pudo conectar con el servidor";
    }
}