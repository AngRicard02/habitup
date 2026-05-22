const usuarioId = localStorage.getItem("usuarioId");

let habitosGlobal = [];
let tipoActual = "Mañana";
let habitoSeleccionado = null;
let diaSeleccionado = null;

async function cargarProgreso(){
    const respuesta = await fetch(`http://localhost:3000/api/habitos/${usuarioId}`);
    habitosGlobal = await respuesta.json();

    filtrarProgreso("Mañana");
}

function filtrarProgreso(tipo){
    tipoActual = tipo;

    document.getElementById("tituloTipo").textContent = `Hábitos de ${tipo}`;

    const tabla = document.getElementById("tablaHabitos");
    tabla.innerHTML = "";

    const filtrados = habitosGlobal.filter(habito => habito.horario === tipo);

    filtrados.forEach(habito => {
        const registro = obtenerRegistro(habito._id);

        const cumplidos = Object.values(registro).filter(valor => valor === "cumplido").length;
        const fallados = Object.values(registro).filter(valor => valor === "fallado").length;
        const total = cumplidos + fallados;

        let porcentaje = 0;

        if(total > 0){
            porcentaje = Math.round((cumplidos / total) * 100);
        }

        tabla.innerHTML += `
            <tr>
                <td>${habito.nombre}</td>
                <td class="celda-azul">${cumplidos}</td>
                <td class="celda-roja">${fallados}</td>
                <td class="celda-verde">${porcentaje}%</td>
                <td>
                    <button class="btn-tabla" onclick="abrirCalendario('${habito._id}')">
                        <img src="img/time.png" class="icono-btn">
                    </button>
                </td>
            </tr>
        `;
    });
}

function obtenerRegistro(idHabito){
    const datos = localStorage.getItem(`progreso_${idHabito}`);

    if(datos){
        return JSON.parse(datos);
    }

    return {};
}

function guardarRegistro(idHabito, registro){
    localStorage.setItem(`progreso_${idHabito}`, JSON.stringify(registro));
}

function abrirCalendario(idHabito){
    habitoSeleccionado = idHabito;

    const calendario = document.getElementById("calendarioGrid");
    calendario.innerHTML = "";

    const registro = obtenerRegistro(idHabito);

    for(let i = 1; i <= 31; i++){
        const estado = registro[i] || "";

        calendario.innerHTML += `
            <div class="dia ${estado}" onclick="seleccionarDia(this, ${i})">
                ${i}
            </div>
        `;
    }

    document.getElementById("modalCalendario").style.display = "flex";
}

function seleccionarDia(elemento, dia){
    document.querySelectorAll(".dia").forEach(d => {
        d.classList.remove("dia-seleccionado");
    });

    elemento.classList.add("dia-seleccionado");
    diaSeleccionado = dia;
}

function marcarDia(estado){
    if(!diaSeleccionado){
        return;
    }

    const registro = obtenerRegistro(habitoSeleccionado);

    registro[diaSeleccionado] = estado;

    guardarRegistro(habitoSeleccionado, registro);

    abrirCalendario(habitoSeleccionado);
    filtrarProgreso(tipoActual);
}

function eliminarRegistro(){
    if(!diaSeleccionado){
        return;
    }

    const registro = obtenerRegistro(habitoSeleccionado);

    delete registro[diaSeleccionado];

    guardarRegistro(habitoSeleccionado, registro);

    abrirCalendario(habitoSeleccionado);
    filtrarProgreso(tipoActual);
}

function cerrarCalendario(){
    document.getElementById("modalCalendario").style.display = "none";
    diaSeleccionado = null;
}

cargarProgreso();