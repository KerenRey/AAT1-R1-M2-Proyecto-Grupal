Informacion = []

function GuardarDatos() {
    nombre = document.getElementById("Nombre").value,
        telefono = document.getElementById("Telefono").value,
        correo = document.getElementById("Email").value,

        TipoEvento = document.getElementById("Carrera");
        valor_TipoEvento = TipoEvento.value;
        texto_TipoEvento = TipoEvento.options[TipoEvento.selectedIndex].text;

        Identificacion = document.getElementById("ID").value,
        Fecha_Inicio = document.getElementById("Fecha-Inicio").value,
        Fecha_Finalizacion = document.getElementById("Fecha-Finalizacion").value,
        Informacion_Requerida = document.getElementById("Info").value

    Datos = {
        Nombre: nombre,
        Telefono: telefono,
        Correo: correo,
        TEXT: texto_TipoEvento,
        identificacion: Identificacion,
        fecha_incio: Fecha_Inicio,
        fecha_finalizacion: Fecha_Finalizacion,
        informacion_requerida: Informacion_Requerida
    };

    Informacion.push(Datos);

    localStorage.setItem('Inscripcion', JSON.stringify(Informacion))

    $("#Inscripcion").submit(function (e) {
        e.preventDefault();
        if (nombre === "" || telefono === "" || correo === "" || texto_TipoEvento === "" || Identificacion === "" || Fecha_Inicio === "" || Fecha_Finalizacion === "") {
            Swal.fire({
                icon: `error`,
                tittle: `Campos vacios`,
                text: `Por favor complete todos los campos`
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                tittle: `Inscrito Exitosamente`,
                text: `Sus datos fueron guardados correctamente`
            })
        }

    })

    document.getElementById("Inscripcion").reset();
}

