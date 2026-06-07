"use strict";
const inscritos = JSON.parse(localStorage.getItem("Inscripcion") ?? "[]");
/*    CARGAR TABLA */
function cargarTabla() {
    const tabla = document.getElementById("tablaInscritos");
    if (!tabla)
        return;
    tabla.innerHTML = "";
    inscritos.forEach(inscrito => {
        tabla.innerHTML += `
            <tr>
                <td>${inscrito.Nombre}</td>
                <td>${inscrito.Correo}</td>
                <td>${inscrito.TEXT}</td>
            </tr>
        `;
    });
}
/*    CONTADORES */
function calcularContadores() {
    const totalInscritos = document.getElementById("totalInscritos");
    const totalEventos = document.getElementById("totalEventos");
    const eventosDiferentes = document.getElementById("eventosDiferentes");
    if (totalInscritos) {
        totalInscritos.innerText =
            inscritos.length.toString();
    }
    const eventosUnicos = new Set(inscritos.map(i => i.TEXT));
    if (totalEventos) {
        totalEventos.innerText =
            eventosUnicos.size.toString();
    }
    if (eventosDiferentes) {
        eventosDiferentes.innerText =
            eventosUnicos.size.toString();
    }
}
/* INDICADORES */
function calcularIndicadores() {
    if (inscritos.length === 0)
        return;
    const eventoPopular = document.getElementById("eventoPopular");
    const ultimoInscrito = document.getElementById("ultimoInscrito");
    const promedioInscritos = document.getElementById("promedioInscritos");
    const eventoMenosPopular = document.getElementById("eventoMenosPopular");
    const primerInscrito = document.getElementById("primerInscrito");
    const contadorEventos = {};
    inscritos.forEach(inscrito => {
        if (contadorEventos[inscrito.TEXT]) {
            contadorEventos[inscrito.TEXT]++;
        }
        else {
            contadorEventos[inscrito.TEXT] = 1;
        }
    });
    let eventoMayor = "";
    let cantidadMayor = 0;
    let eventoMenor = "";
    let cantidadMenor = Infinity;
    for (const evento in contadorEventos) {
        if (contadorEventos[evento] >
            cantidadMayor) {
            cantidadMayor =
                contadorEventos[evento];
            eventoMayor = evento;
        }
        if (contadorEventos[evento] <
            cantidadMenor) {
            cantidadMenor =
                contadorEventos[evento];
            eventoMenor = evento;
        }
    }
    if (eventoPopular) {
        eventoPopular.innerText =
            eventoMayor;
    }
    if (eventoMenosPopular) {
        eventoMenosPopular.innerText =
            eventoMenor;
    }
    if (primerInscrito) {
        primerInscrito.innerText =
            inscritos[0].Nombre;
    }
    if (ultimoInscrito) {
        ultimoInscrito.innerText =
            inscritos[inscritos.length - 1].Nombre;
    }
    if (promedioInscritos) {
        const promedio = inscritos.length /
            Object.keys(contadorEventos).length;
        promedioInscritos.innerText =
            promedio.toFixed(1);
    }
}
/* GRÁFICA CHART.JS */
function inicializarGrafica() {
    const canvas = document.getElementById("graficaEventos");
    if (!canvas)
        return;
    const contadorEventos = {};
    inscritos.forEach(inscrito => {
        if (contadorEventos[inscrito.TEXT]) {
            contadorEventos[inscrito.TEXT]++;
        }
        else {
            contadorEventos[inscrito.TEXT] = 1;
        }
    });
    const etiquetas = Object.keys(contadorEventos);
    const datos = Object.values(contadorEventos);
    if (etiquetas.length === 0)
        return;
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: "Inscritos por Evento",
                    data: datos,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
/* MENÚ HAMBURGUESA */
function mostrarMenu() {
    const menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.toggle("activo");
    }
}
/* INICIAR DASHBOARD */
document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
    calcularContadores();
    calcularIndicadores();
    inicializarGrafica();
});
