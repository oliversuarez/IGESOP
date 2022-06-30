
btnAceptar.onclick = function () {
    var usuario = txtUsuario.value;
    var clave = txtClave.value;

    if (Validacion.ValidarRequeridos("R") == 0) return;


digestMessage(clave)
    .then(
        digestHex => Http.get("Sistema/validarUsuario?data=" + usuario + "|" + digestHex, mostrarRptaLogin)
        );

}

function mostrarRptaLogin(rpta) {
    if (validaResponseData(rpta)) {
        sessionStorage.setItem("menu", rpta);
        var url = hdfRaiz.value + 'Sistema/Principal';
        window.location.href = url;
       
    }
    
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}
