"use strict";
/* Datos del formulario */
const inscritos = JSON.parse(localStorage.getItem("inscritos") || "[]");
/* Tabla */
function cargarTabla() {
    const tabla = document.getElementById("tablaInscritos");
    tabla.innerHTML = "";
    inscritos.forEach(inscrito => {
        tabla.innerHTML += `
            <tr>
                <td>${inscrito.nombre}</td>
                <td>${inscrito.carrera}</td>
                <td>${inscrito.evento}</td>
            </tr>
    });
}
