const fotoGuardada = localStorage.getItem("fotoPerfil");
const fotoUsuario = document.getElementById("fotoUsuario");

if(fotoGuardada && fotoUsuario){
    fotoUsuario.src = fotoGuardada;
}