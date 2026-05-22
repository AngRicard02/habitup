const sonidoClick = new Audio("sonidos/click.mp3");

function reproducirClick() {
    sonidoClick.currentTime = 0;
    sonidoClick.play().catch(() => {});
}

document.addEventListener("click", function(evento) {
    const elemento = evento.target.closest(
        "button, a, input, select, textarea, label, .tab, .habito, .card"
    );

    if (elemento) {
        reproducirClick();
    }
});