"use strict";
/* Datos del formulario */
const inscritos = JSON.parse(localStorage.getItem("Inscripcion") || "[]");

/* Cargar la tabla de inscritos */
function cargarTabla() {
    const tabla = document.getElementById("tablaInscritos");
    if (!tabla) return;

    tabla.innerHTML = "";

    inscritos.forEach(inscrito => {
        tabla.innerHTML += `
            <tr>
                <td>${inscrito.Nombre}</td>
                <td>${inscrito.Carrera}</td>
                <td>${inscrito.TEXT}</td>
            </tr>
        `;
    });
}

/* Calcular contadores principales */
function calcularContadores() {
    const totalInscritosEl = document.getElementById("totalInscritos");
    const totalEventosEl = document.getElementById("totalEventos");
    const totalCarrerasEl = document.getElementById("totalCarreras");

    if (totalInscritosEl) {
        totalInscritosEl.innerText = inscritos.length.toString();
    }

    if (totalEventosEl) {
        const eventosUnicos = new Set(inscritos.map(i => i.TEXT).filter(t => t));
        totalEventosEl.innerText = eventosUnicos.size.toString();
    }

    if (totalCarrerasEl) {

        const carrerasUnicas = new Set(
            inscritos
                .map(inscrito => inscrito.Carrera)
                .filter(carrera => carrera)
        );

        totalCarrerasEl.innerText = carrerasUnicas.size.toString();
    }
}

/* Calcular indicadores estadísticos */
function calcularIndicadores() {
    const eventoPopularEl = document.getElementById("eventoPopular");
    const ultimoInscritoEl = document.getElementById("ultimoInscrito");
    const carreraPopularEl = document.getElementById("carreraPopular");
    const promedioInscritosEl = document.getElementById("promedioInscritos");
    const eventoMenosPopularEl = document.getElementById("eventoMenosPopular");
    const primerInscritoEl = document.getElementById("primerInscrito");

    if (inscritos.length === 0) return;

    const eventoCounts = {};
    inscritos.forEach(i => {
        if (i.TEXT) {
            eventoCounts[i.TEXT] = (eventoCounts[i.TEXT] || 0) + 1;
        }
    });

    let maxEvent = "-";
    let maxCount = -1;
    let minEvent = "-";
    let minCount = Infinity;

    Object.keys(eventoCounts).forEach(event => {
        const count = eventoCounts[event];
        if (count > maxCount) {
            maxCount = count;
            maxEvent = event;
        }
        if (count < minCount) {
            minCount = count;
            minEvent = event;
        }
    });

    if (eventoPopularEl) eventoPopularEl.innerText = maxEvent;
    if (eventoMenosPopularEl) eventoMenosPopularEl.innerText = minEvent;

    if (ultimoInscritoEl) {
        const ultimo = inscritos[inscritos.length - 1];
        ultimoInscritoEl.innerText = ultimo ? ultimo.Nombre : "-";
    }

    if (primerInscritoEl) {
        const primero = inscritos[0];
        primerInscritoEl.innerText = primero ? primero.Nombre : "-";
    }

    if (carreraPopularEl) {
        carreraPopularEl.innerText = "N/A";
    }

    if (promedioInscritosEl) {
        const uniqueEventsCount = Object.keys(eventoCounts).length;
        const promedio = uniqueEventsCount > 0 ? (inscritos.length / uniqueEventsCount).toFixed(1) : "0";
        promedioInscritosEl.innerText = promedio;
    }
}

/* Inicializar gráfica con Chart.js */
function inicializarGrafica() {
    const canvas = document.getElementById("graficaEventos");
    if (!canvas) return;

    const eventoCounts = {};
    inscritos.forEach(i => {
        if (i.TEXT) {
            eventoCounts[i.TEXT] = (eventoCounts[i.TEXT] || 0) + 1;
        }
    });

    const labels = Object.keys(eventoCounts);
    const data = Object.values(eventoCounts);

    if (labels.length === 0) return;

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Inscritos por Evento',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
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

/* Ejecutar al cargar la página */
document.addEventListener("DOMContentLoaded", () => {
    cargarTabla();
    calcularContadores();
    calcularIndicadores();
    inicializarGrafica();
});
