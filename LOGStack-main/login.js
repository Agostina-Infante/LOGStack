const formulario = document.getElementById("formularioLogin");

formulario.addEventListener("submit", enviarLogin); /* Ejecutar cuando se envía*/

async function enviarLogin(evento) {
    evento.preventDefault();  /*para que no se recargue la pag*/
    const usuarioIngresado = document.getElementById("usuario").value;
    const passwordIngresado = document.getElementById("password").value;
    const datos = {
        usuario: usuarioIngresado,
        password: passwordIngresado
    };
    const respuesta = await fetch("api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(datos) /*transformo datos en json para el server */
    });
    const resultado = await respuesta.json();
    const pRespuesta = document.getElementById("respuesta"); /*para mostrar el mnsj en la página*/
    pRespuesta.innerText = resultado.mensaje;

    if (resultado.exito === true) { /*si login es existos, accede al sistema dsp de 2 seg*/
        pRespuesta.style.color = "green";
        localStorage.setItem("nombreLogueado", resultado.nombreCompleto);
        localStorage.setItem("dptoLogueado", resultado.departamento);
        localStorage.setItem("dniLogueado", resultado.dni || "DNI-000");
        localStorage.setItem("esSoporte", resultado.esSoporte);

        setTimeout(() => {
            if (resultado.departamento === "Soporte" || resultado.departamento === "Administración") {
                window.location.href = "PanelGestTec.html"; /* Envía a user al panel técnico*/
            } else {
                window.location.href = "index.html"; /*Lo envía al formulario de creación*/
            }
        }, 2000);
    } else {
        pRespuesta.style.color = "red";
    }
}