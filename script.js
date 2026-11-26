const btnHardware = document.getElementById('FalloHardware');
const btnDesarrollo = document.getElementById('TareaDeDesarrollo');
const btnBug = document.getElementById('BugEnProduccion');
const secHardware = document.getElementById('FalloHardwareOpciones');
const secDesarrollo = document.getElementById('TareaDeDesarrolloOpciones');
const secBug = document.getElementById('BugEnProduccionOpciones');
const nombreUsuario = localStorage.getItem("nombreLogueado");
const dptoUsuario = localStorage.getItem("dptoLogueado");
let tipoSeleccionado = "Hardware";


/*Foto de perfil */

if (nombreUsuario) {
    document.getElementById("Perfil-Nombre").innerText = nombreUsuario;
    document.getElementById("Perfil-Dpto").innerText = dptoUsuario;
    const avatarPfp = document.getElementById("Pfp");
    if (avatarPfp) {
        const iniciales = nombreUsuario
            .trim()
            .split(" ")
            .map(palabra => palabra.charAt(0).toUpperCase())
            .slice(0, 2)
            .join("");
            
        avatarPfp.innerText = iniciales;
    }
}

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

/*Conectamos la creación de tickets con el panel de gestión técnica */

btnHardware.addEventListener('click', () => { tipoSeleccionado = "Hardware"; });
btnDesarrollo.addEventListener('click', () => { tipoSeleccionado = "Desarrollo"; });
btnBug.addEventListener('click', () => { tipoSeleccionado = "Bugs Producción"; });

const btnRegistrar = document.getElementById("RegistrarTicketBtn");
btnRegistrar.addEventListener("click", registrarTicket);

async function registrarTicket(evento) {
    evento.preventDefault();
    const solicitante = document.getElementById("Empleado").innerText;
    const asunto = document.getElementById("AsuntoInput").value;
    const descripcion = document.getElementById("Desc-Detallada").value;
    let detalleExtra = "General";
    if (tipoSeleccionado === "Hardware") {
        detalleExtra = "Equipo: " + document.getElementById("Equipos").value;
    } else if (tipoSeleccionado === "Desarrollo") {
        detalleExtra = "Proyecto: " + document.getElementById("proyecto-select").value;
    } else if (tipoSeleccionado === "Bugs Producción") {
        detalleExtra = "Stack: " + document.getElementById("Stacks").value;
    }
    const datosTicket = {
        tipo: tipoSeleccionado,
        titulo: asunto,
        descripcion: descripcion,
        solicitante: solicitante,
        detalle: detalleExtra
    };
    const respuesta = await fetch("api/crearTicket.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosTicket)
    });
    const resultado = await respuesta.json();
    alert(resultado.mensaje);
}

/*BOTÓN DE VER TICKETS POR ID (Usuario)-------------------*/

const btnMisTickets = document.getElementById("MisTickets");
const modalMisTickets = document.getElementById("ModalMisTickets");
const btnCerrarMisTickets = document.getElementById("CerrarMisTickets");
const inputBuscadorID = document.getElementById("BuscadorIDTicket");
const btnBuscarID = document.getElementById("BuscarIDBtn");

let misTicketsGuardados = [];

if (btnMisTickets) {
    btnMisTickets.addEventListener("click", abrirMisTickets);
}

if (btnCerrarMisTickets) {
    btnCerrarMisTickets.addEventListener("click", () => {
        modalMisTickets.style.display = "none";
    });
}

if (btnBuscarID) {
    btnBuscarID.addEventListener("click", filtrarPorID);
}

if (inputBuscadorID) {
    inputBuscadorID.addEventListener("input", filtrarPorID);
}

async function abrirMisTickets() {
    modalMisTickets.style.display = "flex";
    const contenedor = document.getElementById("ListaMisTickets");
    contenedor.innerHTML = "<p>Cargando tus tickets...</p>";
    const respuesta = await fetch("api/obtenerTickets.php");
    const todos = await respuesta.json();
    const usuarioActual = nombreUsuario ? nombreUsuario.trim().toLowerCase() : "";
    misTicketsGuardados = todos.filter(t => {
        const esSolicitante = t.solicitante && t.solicitante.trim().toLowerCase() === usuarioActual;
        const esAsignado = t.asignado && t.asignado.trim().toLowerCase() === usuarioActual;
        
        return esSolicitante || esAsignado;
    });

    dibujarMisTickets(misTicketsGuardados);
}

function filtrarPorID() {
    const textoID = inputBuscadorID.value.trim().toLowerCase();
    if (textoID === "") {
        dibujarMisTickets(misTicketsGuardados);
        return;
    }

    const filtrados = misTicketsGuardados.filter(t => 
        String(t.id).toLowerCase().includes(textoID)
    );
    dibujarMisTickets(filtrados);
}

function dibujarMisTickets(lista) {
    const contenedor = document.getElementById("ListaMisTickets");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron tickets creados ni asignados a tu usuario.</p>";
        return;
    }

    const usuarioActual = nombreUsuario ? nombreUsuario.trim().toLowerCase() : "";

    lista.forEach(ticket => {
        const esMio = ticket.solicitante && ticket.solicitante.trim().toLowerCase() === usuarioActual;
        const esAsignado = ticket.asignado && ticket.asignado.trim().toLowerCase() === usuarioActual;

        let etiquetaRelacion = "";
        if (esMio && esAsignado) {
            etiquetaRelacion = `<span style="background-color: #e3f2fd; color: #0d47a1; padding: 2px 6px; border-radius: 5px; font-size: 11px;">Creado y Asignado a ti</span>`;
        } else if (esAsignado) {
            etiquetaRelacion = `<span style="background-color: #e8f5e9; color: #1b5e20; padding: 2px 6px; border-radius: 5px; font-size: 11px;">Asignado a ti</span>`;
        } else {
            etiquetaRelacion = `<span style="background-color: #f3e5f5; color: #4a148c; padding: 2px 6px; border-radius: 5px; font-size: 11px;">Creado por ti</span>`;
        }

        const tarjeta = `
            <div style="border: 1px solid rgb(199, 189, 122); border-left: 5px solid rgb(177, 125, 30); border-radius: 10px; padding: 12px; background-color: white;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <div>
                        <strong>ID: ${ticket.id} (${ticket.tipo})</strong>
                        ${etiquetaRelacion}
                    </div>
                    <span style="background-color: rgb(255, 255, 181); border: 1px solid rgb(255, 255, 86); padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: bold;">
                        ${ticket.estado}
                    </span>
                </div>
                <h4 style="margin: 6px 0 4px 0;">${ticket.titulo}</h4>
                <p style="margin: 0; font-size: 13px;">${ticket.descripcion}</p>
                <p style="margin: 6px 0 0 0; font-size: 12px; color: black;">
                    <strong>Solicitante:</strong> ${ticket.solicitante} | <strong>Asignado a:</strong> ${ticket.asignado} | <strong>Urgencia:</strong> ${ticket.urgencia || "Bajo"}
                </p>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

/* LIMPIAR FORMULARIO SIN RECARGAR LA PÁGINA --------------- */

const btnNuevoTicket = document.getElementById("NuevoTicket");

if (btnNuevoTicket) {
    btnNuevoTicket.addEventListener("click", limpiarFormularioTicket);
}

function limpiarFormularioTicket() {
    const formulario = document.getElementById("Formulario");

    tipoSeleccionado = "Hardware";
    document.querySelectorAll("#Botones button").forEach(btn => btn.classList.remove("activo"));
    if (btnHardware) btnHardware.classList.add("activo");
    if (secHardware) secHardware.style.display = "flex";
    if (secDesarrollo) secDesarrollo.style.display = "none";
    if (secBug) secBug.style.display = "none";
    if (nombreUsuario) {
        const campoSolicitante = document.getElementById("Solicitante") || document.getElementById("Nombre-Empleado");
        const campoDpto = document.getElementById("Departamento") || document.getElementById("Dpto-Empleado");
        if (campoSolicitante) campoSolicitante.value = nombreUsuario;
        if (campoDpto) campoDpto.value = dptoUsuario;
    }

    const mensajeRespuesta = document.getElementById("Mensaje-Respuesta");
    if (mensajeRespuesta) {
        mensajeRespuesta.innerText = "";
        mensajeRespuesta.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById('proyecto-select');
    if (!select) return;

    fetch('api/obtenerProyectos.php')
        .then(response => response.json())
        .then(data => {
            select.innerHTML = '<option value="">Seleccione un proyecto...</option>';
            data.forEach(proyecto => {
                let option = document.createElement('option');
                option.value = proyecto.ID_P;
                option.textContent = proyecto.Nom_P;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los proyectos:', error);
            select.innerHTML = '<option value="">Error al cargar proyectos</option>';
        });
});

const btnCerrarSesion = document.getElementById("CerrarSesionBtn");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("nombreLogueado");
        localStorage.removeItem("dptoLogueado");
        localStorage.removeItem("dniLogueado");
        localStorage.removeItem("esSoporte");
        window.location.href = "inicio.html";
    });
}
