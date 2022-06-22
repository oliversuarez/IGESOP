var listaEval=[];
window.onload = function () {
    Http.get("evaluacion/cargar", mostrarRpt);

    console.log("subida prueba :diego");
}

function mostrarRpt(rpta) {
    if (validaResponseData(rpta)) {
        listaEval = rpta.split(sepLista)
    }     
}