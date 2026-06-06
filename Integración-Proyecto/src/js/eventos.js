"use strict";
const eventos = document.querySelectorAll(".evento");
const botones = document.querySelectorAll("#paginacion button");
let paginaActual = 1;
const eventosPorPagina = 3;
function mostrarPagina(pagina) {
    paginaActual = pagina;
    eventos.forEach((evento, index) => {
        const inicio = (paginaActual - 1) * eventosPorPagina;
        const fin = inicio + eventosPorPagina;
        if (index >= inicio && index < fin) {
            evento.style.display = "block";
        }
        else {
            evento.style.display = "none";
        }
    });
}
botones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        mostrarPagina(index + 1);
    });
});
mostrarPagina(1);
