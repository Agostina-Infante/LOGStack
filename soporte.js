const nombreUsuario = localStorage.getItem("nombreLogueado");
const dptoUsuario = localStorage.getItem("dptoLogueado");
const esSoporte = localStorage.getItem("esSoporte") === "true";

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

let todosLosTickets = [];
let soloEstancados = false;

const selectTipo = document.getElementById("Lista-Tipo-Problema");
const selectEstado = document.getElementById("Lista-Estado");
const btnVerEstancados = document.getElementById("Ver-Estancados");

const modalGestion = document.getElementById("Modal-Gestion");
const formGestion = document.getElementById("Form-Gestion");
const btnCerrarModal = document.getElementById("Cerrar-Modal");
const btnCancelarGestion = document.getElementById("Cancelar-Gestion");

selectTipo.addEventListener("change", aplicarFiltros);
selectEstado.addEventListener("change", aplicarFiltros);

btnVerEstancados.addEventListener("click", () => {
    soloEstancados = !soloEstancados;
    btnVerEstancados.innerText = soloEstancados ? "Ver todos" : "Ver estancados";
    aplicarFiltros();
});

btnCerrarModal.addEventListener("click", () => modalGestion.style.display = "none");
btnCancelarGestion.addEventListener("click", () => modalGestion.style.display = "none");

cargarTickets();

async function cargarTickets() {
    const respuesta = await fetch("api/obtenerTickets.php");
    todosLosTickets = await respuesta.json();
    
    const cantidadEstancados = todosLosTickets.filter(t => t.estancado === true).length;
    const avisoBanner = document.getElementById("Cont-Aviso-TE");
    if (cantidadEstancados > 0) {
        avisoBanner.querySelector("p").innerText = `Existen ${cantidadEstancados} ticket(s) estancados sin avance desde hace más de 3 días.`;
    } else {
        avisoBanner.style.display = "none";
    }

    aplicarFiltros();
}
cargarTickets();
cargarTecnicos();

async function cargarTecnicos() {
    const selectAsignado = document.getElementById("Gestion-Asignado");
    if (!selectAsignado) return;

    try {
        const respuesta = await fetch("api/obtenerTecnicos.php");
        const empleados = await respuesta.json();

        selectAsignado.innerHTML = `<option value="Sin asignar">Sin asignar</option>`;

        empleados.forEach(emp => {
            if (emp.Nom_E.toLowerCase() !== "sin asignar") {
                const option = document.createElement("option");
                option.value = emp.Nom_E;
                option.textContent = emp.Nom_E;
                selectAsignado.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error al cargar técnicos:", error);
    }
}

function aplicarFiltros() {
    const tipoElegido = selectTipo.value;
    const estadoElegido = selectEstado.value;

    const ticketsFiltrados = todosLosTickets.filter(ticket => {
        const coincideTipo = (tipoElegido === "Todos") || (ticket.tipo === tipoElegido);
        const coincideEstado = (estadoElegido === "Todos") || (ticket.estado === estadoElegido);
        const coincideEstancado = (!soloEstancados) || (ticket.estancado === true);

        return coincideTipo && coincideEstado && coincideEstancado;
    });

    renderizarTickets(ticketsFiltrados);
}

function renderizarTickets(listaTickets) {
    const contenedorTickets = document.getElementById("Tickets");
    const textoContador = document.querySelector("#Filtro-T p");
    
    textoContador.innerText = `Mostrando ${listaTickets.length} tickets`;
    contenedorTickets.innerHTML = "";

    if (listaTickets.length === 0) {
        contenedorTickets.innerHTML = `<p style="padding: 20px;">No se encontraron tickets con los filtros seleccionados.</p>`;
        return;
    }

    listaTickets.forEach(ticket => {
        let avisoEstancado = "";
        if (ticket.estancado === true) {
            avisoEstancado = `<p class="Estancado-Sin-Cambios-Por"><span class="material-symbols-outlined">schedule</span>¡Estancado! Sin cambios por &gt;3 días</p>`;
        }

        const urgenciaActual = ticket.urgencia || "Bajo";

        /* Si es soporte muestra el botón Gestionar; si es Administración muestra "Modo lectura"*/
        const botonGestionarHTML = esSoporte
            ? `<button type="button" onclick="abrirModalGestion('${ticket.id}')">
                   <span class="material-symbols-outlined">contract_edit</span>Gestionar
               </button>`
            : `<span style="font-size: 13px; color: grey; font-style: italic;">Modo lectura</span>`;

        const tarjetaHTML = `
            <div class="Ticket">
                <div class="Encabezado-Ticket">
                    <h4>${ticket.id} - Urgencia: ${urgenciaActual}</h4>
                    <div class="Ticket-Tipo-Problema">${ticket.tipo}</div>
                </div>
                <div class="Titulo-Problema-Ticket">
                    <h3>${ticket.titulo}</h3>
                    <p>${ticket.descripcion}</p>
                </div>
                <div class="Ticket-Info-Empleado">
                    <div class="Datos-Ticket-Info-Empleado">
                        <h5>Solicitante:</h5>
                        <p>${ticket.solicitante}</p>
                    </div>
                    <div class="Datos-Ticket-Info-Empleado">
                        <h5>Asignado:</h5>
                        <p>${ticket.asignado}</p>
                    </div>
                    <div class="Datos-Ticket-Info-Empleado">
                        <h5>Detalle / Activo:</h5>
                        <p>${ticket.detalle}</p>
                    </div>
                </div>
                ${avisoEstancado}
                <hr>
                <div class="Parte-Inf-Ticket">
                    <h5>${ticket.estado}</h5>
                    ${botonGestionarHTML}
                </div>
            </div>
        `;
        contenedorTickets.innerHTML += tarjetaHTML;
    });
}

function abrirModalGestion(idTicket) {
    const ticket = todosLosTickets.find(t => String(t.id) === String(idTicket));
    if (!ticket) return;

    document.getElementById("Modal-Titulo").innerText = `Gestionar ${ticket.id}`;
    document.getElementById("Gestion-ID-Ticket").value = ticket.id;
    document.getElementById("Gestion-Estado").value = ticket.estado || "Pendiente";
    document.getElementById("Gestion-Urgencia").value = ticket.urgencia || "Bajo";
    document.getElementById("Gestion-Asignado").value = ticket.asignado || "Sin asignar";

    modalGestion.style.display = "flex";
}

formGestion.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const datosModificacion = {
        id: document.getElementById("Gestion-ID-Ticket").value,
        estado: document.getElementById("Gestion-Estado").value,
        urgencia: document.getElementById("Gestion-Urgencia").value,
        asignado: document.getElementById("Gestion-Asignado").value,
        dniTecnico: localStorage.getItem("dniLogueado") || "DNI-SOPORTE-01"
    };

    const respuesta = await fetch("api/gestionarTicket.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosModificacion)
    });

    const resultado = await respuesta.json();
    alert(resultado.mensaje);
    
    modalGestion.style.display = "none";
    cargarTickets();
});
const btnCerrarSesion = document.getElementById("Btn-Cerrar-Sesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("nombreLogueado");
        localStorage.removeItem("dptoLogueado");
        localStorage.removeItem("dniLogueado");
        localStorage.removeItem("esSoporte");
        window.location.href = "inicio.html";
    });
}