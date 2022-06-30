
btnAceptar.onclick = function () {
    var usuario = txtUsuario.value;
    var clave = txtClave.value;
   

digestMessage(clave)
    .then(
        digestHex => Http.get("Sistema/validarUsuario?data=" + usuario + "|" + digestHex, mostrarRptaLogin)
        );

}

function mostrarRptaLogin(rpta) {
    console.log(rpta);
    //var url = hdfRaiz.value + 'Sistema/Principal';
    //window.location.href = url;
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}
