interface Inscrito {
    nombre: string;
    carrera: string;
    evento: string;
}

/* Datos del formulario */

const inscritos: Inscrito[] =
    JSON.parse(localStorage.getItem("inscritos") || "[]");


/* Tabla */

function cargarTabla(): void {

    const tabla = document.getElementById(
        "tablaInscritos"
    ) as HTMLTableSectionElement;

    tabla.innerHTML = "";

    inscritos.forEach(inscrito => {

        tabla.innerHTML += `
            <tr>
                <td>${inscrito.nombre}</td>
                <td>${inscrito.carrera}</td>
                <td>${inscrito.evento}</td>
            </tr>
        `;

    });

}