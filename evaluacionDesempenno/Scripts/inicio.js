window.onload = function() {
    Http.get("evaluacion/cargar", mostrarRpt);

    console.log("subida prueba :diego");
}

function mostrarRpt(rpta) {
    alert(rpta);
}