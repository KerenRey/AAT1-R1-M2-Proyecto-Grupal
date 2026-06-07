interface Inscrito {
    Nombre: string;
    Telefono: string;
    Correo: string;
    TEXT: string;
    identificacion: string;
    fecha_incio: string;
    fecha_finalizacion: string;
    informacion_requerida?: string;
}

/* Datos del formulario */
const inscritos: Inscrito[] =
    JSON.parse(
        localStorage.getItem("Inscripcion") ?? "[]"
    );

/* Declaración global para Chart.js */

declare var Chart: any;

/*    Cargar la tabla de inscritos */

function cargarTabla(): void {

    const tabla =
        document.getElementById(
            "tablaInscritos"
        ) as HTMLTableSectionElement;

    if (!tabla) return;

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

/*   Calcular contadores principales  */

function calcularContadores(): void {

    const totalInscritos =
        document.getElementById(
            "totalInscritos"
        );

    const totalEventos =
        document.getElementById(
            "totalEventos"
        );

    const eventosDiferentes =
        document.getElementById(
            "eventosDiferentes"
        );

    if (totalInscritos) {

        totalInscritos.innerText =
            inscritos.length.toString();

    }

    const eventosUnicos =
        new Set(
            inscritos.map(
                i => i.TEXT
            )
        );

    if (totalEventos) {

        totalEventos.innerText =
            eventosUnicos.size.toString();

    }

    if (eventosDiferentes) {

        eventosDiferentes.innerText =
            eventosUnicos.size.toString();

    }

}

/* Calcular indicadores estadisticos */

function calcularIndicadores(): void {

    if (inscritos.length === 0) return;

    const eventoPopular =
        document.getElementById(
            "eventoPopular"
        );

    const ultimoInscrito =
        document.getElementById(
            "ultimoInscrito"
        );

    const promedioInscritos =
        document.getElementById(
            "promedioInscritos"
        );

    const eventoMenosPopular =
        document.getElementById(
            "eventoMenosPopular"
        );

    const primerInscrito =
        document.getElementById(
            "primerInscrito"
        );

    const contadorEventos: {
        [key: string]: number
    } = {};

    inscritos.forEach(inscrito => {

        if (contadorEventos[inscrito.TEXT]) {

            contadorEventos[inscrito.TEXT]++;

        } else {

            contadorEventos[inscrito.TEXT] = 1;

        }

    });

    let eventoMayor = "";
    let cantidadMayor = 0;

    let eventoMenor = "";
    let cantidadMenor = Infinity;

    for (const evento in contadorEventos) {

        if (
            contadorEventos[evento] >
            cantidadMayor
        ) {

            cantidadMayor =
                contadorEventos[evento];

            eventoMayor = evento;

        }

        if (
            contadorEventos[evento] <
            cantidadMenor
        ) {

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
            inscritos[
                inscritos.length - 1
            ].Nombre;

    }

    if (promedioInscritos) {

        const promedio =
            inscritos.length /
            Object.keys(
                contadorEventos
            ).length;

        promedioInscritos.innerText =
            promedio.toFixed(1);

    }

}

/* Inicializar gráfica con CHART.JS */

function inicializarGrafica(): void {

    const canvas =
        document.getElementById(
            "graficaEventos"
        ) as HTMLCanvasElement;

    if (!canvas) return;

    const contadorEventos: {
        [key: string]: number
    } = {};

    inscritos.forEach(inscrito => {

        if (contadorEventos[inscrito.TEXT]) {

            contadorEventos[
                inscrito.TEXT
            ]++;

        } else {

            contadorEventos[
                inscrito.TEXT
            ] = 1;

        }

    });

    const etiquetas =
        Object.keys(
            contadorEventos
        );

    const datos =
        Object.values(
            contadorEventos
        );

    if (etiquetas.length === 0) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: etiquetas,

            datasets: [

                {

                    label:
                        "Inscritos por Evento",

                    data: datos,

                    backgroundColor:
                        "rgba(54, 162, 235, 0.5)",

                    borderColor:
                        "rgba(54, 162, 235, 1)",

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

function mostrarMenu(): void {

    const menu =
        document.getElementById(
            "navMenu"
        );

    if (menu) {

        menu.classList.toggle(
            "activo"
        );

    }

}

/* Ejecutar al carga la página*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarTabla();

        calcularContadores();

        calcularIndicadores();

        inicializarGrafica();

    }
);