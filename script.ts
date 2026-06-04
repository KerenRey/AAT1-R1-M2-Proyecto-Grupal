const eventos = document.querySelectorAll(".evento");
const botones = document.querySelectorAll("#paginacion button");

let paginaActual: number = 1;
const eventosPorPagina: number = 3;

function mostrarPagina(pagina: number): void {
    paginaActual = pagina;

    eventos.forEach((evento, index) => {
        const inicio = (paginaActual - 1) * eventosPorPagina;
        const fin = inicio + eventosPorPagina;

        if (index >= inicio && index < fin) {
            (evento as HTMLElement).style.display = "block";
        } else {
            (evento as HTMLElement).style.display = "none";
        }
    });
}

botones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        mostrarPagina(index + 1);
    });
});

mostrarPagina(1);