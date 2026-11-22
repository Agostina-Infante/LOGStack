const btnHardware = document.getElementById('FalloHardware');
const btnDesarrollo = document.getElementById('TareaDeDesarrollo');
const btnBug = document.getElementById('BugEnProduccion');
const secHardware = document.getElementById('FalloHardwareOpciones');
const secDesarrollo = document.getElementById('TareaDeDesarrolloOpciones');
const secBug = document.getElementById('BugEnProduccionOpciones');
const nombreUsuario = localStorage.getItem("nombreLogueado");
const dptoUsuario = localStorage.getItem("dptoLogueado");

/*Función para ocultar todas las secciones*/
function ocultarTodo() {
    secHardware.style.display = 'none';
    secDesarrollo.style.display = 'none';
    secBug.style.display = 'none';
    btnHardware.classList.remove('activo');
    btnDesarrollo.classList.remove('activo');
    btnBug.classList.remove('activo');
}

btnHardware.addEventListener('click', (event) => {
    event.preventDefault(); /*Va a eviat q la pagina recargue pq en vez de un div o section usamos un form*/
    ocultarTodo(); 
    secHardware.style.display = 'flex'; /*flex por el diseño q ya tenemos*/
    btnHardware.classList.add('activo');
});

btnDesarrollo.addEventListener('click', (event) => {
    event.preventDefault();
    ocultarTodo();
    secDesarrollo.style.display = 'flex';
    btnDesarrollo.classList.add('activo');
});

btnBug.addEventListener('click', (event) => {
    event.preventDefault();
    ocultarTodo();
    secBug.style.display = 'flex';
    btnBug.classList.add('activo');
});

/*Poner el nombre del usuario en el nav */
if (nombreUsuario) {
    document.getElementById("Perfil-Nombre").innerText = nombreUsuario;
    document.getElementById("Perfil-Dpto").innerText = dptoUsuario;
    document.getElementById("Empleado").innerText = nombreUsuario;
    document.getElementById("Departamento").innerText = dptoUsuario;
}
