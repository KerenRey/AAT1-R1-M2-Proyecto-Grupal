document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("search");
    const filtro = document.getElementById("orden");
    const contenedor = document.querySelector(".contenedor-cards");

    const eventos = Array.from(document.querySelectorAll(".card-evento"));

    //  PAGINACIÓN
    const eventosPorPagina = 6;
    let paginaActual = 1;

    const btnNext = document.getElementById("next");
    const btnPrev = document.getElementById("prev");
    const spanPagina = document.getElementById("pagina-actual");

    function filtrarEventos() {

        const texto = buscador.value.toLowerCase();
        const valorFiltro = filtro.value;

        let filtrados = eventos.filter(evento => {

            const titulo = evento.querySelector(".titulo-evento")?.textContent.toLowerCase() || "";
            const categoria = evento.dataset.categoria;
            const precio = parseFloat(evento.dataset.precio);
            const diplomado = evento.dataset.diplomado === "true";

            let coincideBusqueda = titulo.includes(texto);
            let coincideFiltro = true;

            // CATEGORÍA
            if (["Tecnologia", "Administracion", "Salud"].includes(valorFiltro)) {
                coincideFiltro = categoria === valorFiltro;
            }

            // DIPLOMADO
            if (valorFiltro === "diplomado") {
                coincideFiltro = diplomado;
            }

            return coincideBusqueda && coincideFiltro;
        });

        // ORDENAR
        if (valorFiltro === "precio") {
            filtrados.sort((a, b) => {
                return parseFloat(b.dataset.precio) - parseFloat(a.dataset.precio);
            });
        }

        //  TOTAL DE PÁGINAS
        const totalPaginas = Math.ceil(filtrados.length / eventosPorPagina);

        //  EVITAR PASARSE
        if (paginaActual > totalPaginas) paginaActual = totalPaginas || 1;

        const inicio = (paginaActual - 1) * eventosPorPagina;
        const fin = inicio + eventosPorPagina;

        const eventosPagina = filtrados.slice(inicio, fin);

        // LIMPIAR SOLO CARDS 
        contenedor.innerHTML = "";

        eventosPagina.forEach(evento => {
            contenedor.appendChild(evento);
        });

        // ACTUALIZAR UI
        spanPagina.textContent = paginaActual;

        // DESHABILITAR BOTONES
        btnPrev.disabled = paginaActual === 1;
        btnNext.disabled = paginaActual === totalPaginas;
    }

    //  BUSCADOR
    buscador.addEventListener("input", () => {
        paginaActual = 1;
        filtrarEventos();
    });

    //  FILTRO
    filtro.addEventListener("change", () => {
        paginaActual = 1;
        filtrarEventos();
    });

    //  BOTONES 
    btnNext.addEventListener("click", () => {
        paginaActual++;
        filtrarEventos();
    });

    btnPrev.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            filtrarEventos();
        }
    });

    // PRIMERA CARGA
    filtrarEventos();
});