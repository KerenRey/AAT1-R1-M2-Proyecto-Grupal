function mostrarMenu(){

    let menu = document.getElementById("navMenu");

    if(menu){

        if(menu.style.display == "block"){
            menu.style.display = "none";
        }else{
            menu.style.display = "block";
        }

    }

}

function enviar(){

    let correo = document.getElementById("correo").value;

    if(correo == ""){

        Swal.fire({
            title: "Campo vacío",
            text: "Por favor ingresa tu correo electrónico.",
            icon: "warning"
        });

    }else if(correo.includes("@") == false || correo.includes(".") == false){

        Swal.fire({
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido.",
            icon: "error"
        });

    }else{

        Swal.fire({
            title: "¡Suscripción exitosa!",
            text: "Gracias por unirte a nuestra comunidad.",
            icon: "success"
        });

        document.getElementById("correo").value = "";

    }

}