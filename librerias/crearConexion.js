function crearConexion() {
    let objeto;
    if (window.XMLHttpRequest) { //Navegador soporta AJAX
        objeto = new XMLHttpRequest(); //crear el vinculo para comunicarse con el server
    } else if (window.ActiveXObject) { //Navegador es un Explorer Viejo
        try {
            objeto = new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e) {
            objeto = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return objeto;
}