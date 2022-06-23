btnAceptar.onclick = function () {
    var url = hdfRaiz.value + 'Sistema/Principal';
    window.location.href = url;
    var text = txtUsuario.value;
    digestMessage(text)
        .then(digestHex => console.log(digestHex));

}



async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);           
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}
