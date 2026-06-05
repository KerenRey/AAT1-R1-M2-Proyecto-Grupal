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

/* Fin paginacion */


/* Inicio Filtros */


// clases de eventos "card-evento"
/*  TIPOS DE EVENTOS:
- data-categoria="Tecnologia" o "ADMINITRACIÓN" o "Salud"
- data-precio="number" 
- data-diplomado="true" o "false"

<h3 class="titulo-evento" > titulo del evento </h3>
*/
document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("search");
    const filtro = document.getElementById("orden");
    const eventos = document.querySelectorAll(".card-evento");

    function filtrarEventos() {      

        const texto = buscador.value.toLowerCase();
        const valorFiltro = filtro.value;

        const contenedor = document.querySelector(".contenedor-cards");
        const eventosArray = Array.from(eventos);

        let filtrados = eventosArray.filter(evento => {

            const tituloElemento = evento.querySelector(".titulo-evento");
            const titulo = tituloElemento
                ? tituloElemento.textContent.toLowerCase()
                : "";

            const categoria = evento.dataset.categoria;
            const precio = parseFloat(evento.dataset.precio);
            const diplomado = evento.dataset.diplomado === "true";

            let coincideBusqueda = titulo.includes(texto);
            let coincideFiltro = true;

            // FILTRO POR CATEGORÍA (DINÁMICO)
            if (
                valorFiltro === "Tecnologia" ||
                valorFiltro === "Administracion" ||
                valorFiltro === "Salud"
            ) {
                coincideFiltro = categoria === valorFiltro;
            }

            // FILTRO POR PRECIO
            if (valorFiltro === "precio") {
                coincideFiltro = true; 
            }

            // FILTRO POR DIPLOMADO
            if (valorFiltro === "diplomado") {
                coincideFiltro = diplomado;
            }

            // TODOS
            if (valorFiltro === "todos") {
                coincideFiltro = true;
            }

            return coincideBusqueda && coincideFiltro;
        });

        if (valorFiltro === "precio") {
            filtrados.sort((a, b) => {
                return parseFloat(b.dataset.precio) - parseFloat(a.dataset.precio);
            });
        }

        contenedor.innerHTML = "";

        filtrados.forEach(evento => {
            contenedor.appendChild(evento);
        });
    }

    buscador.addEventListener("input", filtrarEventos);
    filtro.addEventListener("change", filtrarEventos);

});