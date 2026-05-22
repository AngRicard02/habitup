const API_BASE = "https://habitup-8ho1.onrender.com";
const usuarioId = localStorage.getItem("usuarioId");
const nombre = localStorage.getItem("nombre");

document.getElementById("nombreUsuario").textContent = nombre || "Usuario";

const listaHabitos = document.getElementById("listaHabitos");
const fecha = new Date();

document.getElementById("fechaActual").textContent =
fecha.toLocaleDateString();

let habitosGlobal = [];

async function obtenerHabitos() {
    try {
        const respuesta = await fetch(`${API_BASE}/api/habitos/${usuarioId}`);
        habitosGlobal = await respuesta.json();
        filtrarHabitos("Mañana");
    } catch (error) {
        listaHabitos.innerHTML = "<p>No se pudo conectar con el servidor</p>";
    }
}

function filtrarHabitos(tipo){
    listaHabitos.innerHTML = "";

    const filtrados = habitosGlobal.filter(
        habito => habito.horario === tipo
    );

    if(filtrados.length === 0){
        listaHabitos.innerHTML = "<p>No hay hábitos en este horario.</p>";
        return;
    }

    filtrados.forEach(habito => {
        listaHabitos.innerHTML += `
            <div class="habito">
                <input 
                    type="checkbox"
                    ${habito.completado ? "checked" : ""}
                    onchange="completarHabito('${habito._id}')"
                >

                <div class="contenido-habito">
                    <strong>${habito.nombre}</strong>
                    <p>${habito.meta || ""}</p>
                    <small>${habito.estado || "Pendiente"}</small>
                </div>

                <button class="btn-eliminar" onclick="eliminarHabito('${habito._id}')">
                    <img src="img/cancel.png" class="icono-eliminar">
                </button>
            </div>
        `;
    });
}

async function completarHabito(id){
    try {
        await fetch(`${API_BASE}/api/habitos/completar/${id}`, {
            method:"PUT"
        });

        obtenerHabitos();
    } catch (error) {
        alert("No se pudo actualizar el hábito");
    }
}

async function eliminarHabito(id){
    const confirmar = confirm("¿Eliminar hábito?");

    if(!confirmar) return;

    try {
        await fetch(`${API_BASE}/api/habitos/eliminar/${id}`, {
            method:"DELETE"
        });

        obtenerHabitos();
    } catch (error) {
        alert("No se pudo eliminar el hábito");
    }
}

obtenerHabitos();