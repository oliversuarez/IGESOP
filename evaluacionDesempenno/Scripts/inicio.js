window.onload = function() {
    Http.get("evaluacion/cargar", mostrarRpt);
}

function mostrarRpt(rpta) {
    alert(rpta);
}