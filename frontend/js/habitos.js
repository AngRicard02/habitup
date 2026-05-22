const usuarioId = localStorage.getItem("usuarioId");

const nombre = localStorage.getItem("nombre");

document.getElementById("nombreUsuario")
.textContent = nombre;

const listaHabitos =
document.getElementById("listaHabitos");

const fecha = new Date();

document.getElementById("fechaActual")
.textContent =
fecha.toLocaleDateString();

let habitosGlobal = [];

async function obtenerHabitos() {

    const respuesta = await fetch(
        `http://localhost:3000/api/habitos/${usuarioId}`
    );

    habitosGlobal = await respuesta.json();

    filtrarHabitos("Mañana");

}

function filtrarHabitos(tipo){

    listaHabitos.innerHTML = "";

    const filtrados =
    habitosGlobal.filter(
        habito => habito.horario === tipo
    );

    filtrados.forEach(habito => {

        listaHabitos.innerHTML += `

        <div class="habito">

            <input 
                type="checkbox"
                ${habito.completado ? "checked" : ""}
            >

            <div class="contenido-habito">

                <strong>
                    ${habito.nombre}
                </strong>

                <p>
                    ${habito.meta || ""}
                </p>

            </div>

            <button 
                class="btn-eliminar"
                onclick="eliminarHabito('${habito._id}')"
            >

                <img 
                    src="img/cancel.png"
                    class="icono-eliminar"
                >

            </button>

        </div>

        `;

    });

}

async function eliminarHabito(id){

    const confirmar =
    confirm("¿Eliminar hábito?");

    if(!confirmar) return;

    await fetch(
        `http://localhost:3000/api/habitos/eliminar/${id}`,
        {
            method:"DELETE"
        }
    );

    obtenerHabitos();

}

obtenerHabitos();