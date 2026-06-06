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