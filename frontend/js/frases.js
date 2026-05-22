const frases = [
    "Pequeños pasos cada día crean grandes cambios con el tiempo.",
    "La disciplina te lleva a donde la motivación no alcanza.",
    "No necesitas hacerlo perfecto, solo necesitas no rendirte.",
    "Cada hábito que construyes es una promesa cumplida contigo.",
    "Tu versión futura agradecerá lo que haces hoy.",
    "La constancia vence a la intensidad cuando se practica todos los días.",
    "Un mal día no borra todo tu progreso.",
    "Hazlo aunque tengas flojera, ahí empieza la disciplina.",
    "El cambio real comienza cuando decides intentarlo otra vez.",
    "Hoy puedes avanzar, aunque sea un poco.",
    "No subestimes el poder de repetir algo bueno cada día.",
    "Tus hábitos son pequeñas decisiones que forman tu futuro.",
    "La meta no se alcanza corriendo un día, se alcanza caminando diario.",
    "Si hoy fallaste, mañana vuelves. Eso también es progreso.",
    "Crear hábitos es entrenar a tu mente para cuidarte mejor.",
    "Cada día cuenta, incluso los días difíciles.",
    "La fuerza no siempre se nota; a veces solo significa continuar.",
    "No tienes que ganar el día completo, solo dar un paso correcto.",
    "Lo importante no es empezar perfecto, sino seguir constante.",
    "Tu progreso vale más que tu prisa."
];

const hoy = new Date().toLocaleDateString();

const fechaGuardada = localStorage.getItem("fechaFraseVista");

const fraseGuardada = localStorage.getItem("fraseDelDia");

const frasePantalla = document.getElementById("frasePantalla");

const fraseModal = document.getElementById("fraseModal");

const modalFrase = document.getElementById("modalFrase");

let fraseActual = "";

function elegirFrase(){

    if(fraseGuardada){

        fraseActual = fraseGuardada;

    }else{

        const numero = Math.floor(
            Math.random() * frases.length
        );

        fraseActual = frases[numero];

        localStorage.setItem(
            "fraseDelDia",
            fraseActual
        );

    }

}

function revisarFraseDiaria(){

    elegirFrase();

    if(fechaGuardada !== hoy){

        fraseModal.textContent = fraseActual;

        modalFrase.style.display = "flex";

    }else{

        frasePantalla.textContent =
        "Ya viste tu frase de hoy. Vuelve mañana para una nueva.";

    }

}

function aceptarFrase(){

    localStorage.setItem(
        "fechaFraseVista",
        hoy
    );

    frasePantalla.textContent =
    "Ya viste tu frase de hoy. Vuelve mañana para una nueva.";

    modalFrase.style.display = "none";

}

function mostrarFraseManual(){

    if(localStorage.getItem("fechaFraseVista") === hoy){

        alert("Ya viste tu frase de hoy. Vuelve mañana.");

    }else{

        fraseModal.textContent = fraseActual;

        modalFrase.style.display = "flex";

    }

}

revisarFraseDiaria();