var listaEval = [];
var titulo;
var listaCompetencia;
var listaObjetivo;
var listaLeyenda;
var listaUsu;




function mostrarRpt1(rpta) {
    if (validaResponseData(rpta)) {
        listaEval = rpta.split(sepLista);
        titulo = listaEval[0];
        listaCompetencia = listaEval[1].split(sepRegistros);
        listaObjetivo = listaEval[2].split(sepRegistros);
        listaLeyenda = listaEval[3].split(sepRegistros);
        listaUsu = listaEval[4].split(sepRegistros);
        crearEvaluacion1();
        createLegend(listaLeyenda);
    }
}
function crearEvaluacion1() {
    GUI.Combo(usuario, listaUsu);
    titulo_evaluacion.innerHTML = titulo;
    var descripcion = crearSubtitulo(listaCompetencia[0].split(sepCampos)[0], listaCompetencia[0].split(sepCampos)[1]);
    listaCompetencia = ["Competencias|Definición|Peso|A|B|C|D|E|% Final|Feedback", "|||||||||"];
    var ListaOpciones1 = ['A', 'B', 'C', 'D', 'E'];
    var ListaColores1 = ['red', 'black', 'blue', 'green', 'yellow'];
    crearTablaReportes(ListaOpciones1, listaCompetencia, evaluacion_reporte, descripcion, 'Calificación', [3, 4, 5, 6, 7], ListaColores1, listaLeyenda, crearFooterCompetencia());
    var ListaOpciones2 = ['70%', '80%', '100%', '110%', '120%'];
    var ListaColores2 = ['red', 'black', 'blue', 'green', 'yellow'];
    var descripcion2 = crearSubtitulo(listaObjetivo[0].split(sepCampos)[0], listaObjetivo[0].split(sepCampos)[1]);
    listaObjetivo = ['Tipo|Objetivo (SMART)|Criterio de medición|Peso|70%|80%|100%|110%|120%|Resultado Final|% de Cumplim.|Feedback', '|||||||||||'];
    crearTablaReportes(ListaOpciones2, listaObjetivo, objetivo_reporte, descripcion2, 'Meta', [4, 5, 6, 7, 8], ListaColores2, null, crearFooterObjetivos());
}

function crearSubtitulo(titulo, descripcion) {

    var html = "";
    html += "<div class='grid_12 rellenoGPO m5'>";
    html += titulo;
    html += "</div>";
    html += "<div class='grid_12 border m5'>";
    html += descripcion;
    html += "</div>";
    return html;

}

function crearFooterCompetencia() {
    var html = "";
    html += "<tr><td colspan='3'>Total</td><td>100%</td> <td></td> <td></td> <td colspan='3'>Resultado</td> <td>0%</td><td></td></tr>";
    return html;

}
function crearFooterObjetivos() {
    var html = "";
    html += "<tr><td colspan='4'>Total</td><td>100%</td> <td></td> <td></td> <td></td> <td colspan='3'>Resultado</td> <td>0%</td><td></td></tr>";
    return html;
}

function crearTablaReportes(listaOpciones, listaData, div, descripcion, sobrecabecera, RangoSobrecabecera, ListaColores, listaLeyenda,Bloquefooter) {
    var campos = [];
    var nlistaOpciones = listaOpciones.length;
    var html = "";
    var matriz = [];
    var listaCabecera = listaData[0].split(sepCampos);
    var nRangoSobrecabecera = RangoSobrecabecera.length;
    listaData.splice(0, 1);
    var nlistaData = listaData.length;
    var nlistaCabecera = listaCabecera.length;
    var conta = 0;
    html += descripcion;
    if (listaLeyenda) {
        html += createLegend(listaLeyenda);
    }
    html += "<table class='table m5'>";
    html += "<thead class='thead'>";
    html += "<tr>";
    html += "<th rowspan='2' style='border: 1px solid #dee2e6;'>";
    html += "#";
    html += "</th>";

    for (var i = 0; i < nlistaCabecera; i++) {
        if (RangoSobrecabecera.indexOf(i) > -1) {
            if (conta == 0) {
                html += "<th colspan='";
                html += nRangoSobrecabecera;
                html += "' style='border: 1px solid #dee2e6;'>";
                html += sobrecabecera;
                html += "</th>";
                conta++;
            }
           
        } else {
            html += "<th rowspan='2' style='border: 1px solid #dee2e6;'>";
            html += listaCabecera[i];
            html += "</th>";
        }      
    }
    html += "</tr>";
    html += "<tr>";
    for (var i = 0; i < nlistaOpciones; i++) {
        html += "<th style='width:50px;border: 1px solid #dee2e6;' >";
        html += listaOpciones[i].split(sepCampos)[0];
        html += "</th>"

    }

    html += "</tr>";
    html += "</thead>";
    html += "<tbody class='tbody'>";
    for (var i = 0; i < nlistaData; i++) {
        campos = listaData[i].split(sepCampos);
        matriz[i] = [];
        html += "<tr>";
        html += "<td>";
        html += i + 1;
        html += "</td>";
        for (var j = 0; j < nlistaCabecera; j++) {
            matriz[i][j] = campos[j];
            html += "<td>";
            html += campos[j];
            html += "</td>";
        }

        html += "</tr>";


    } if (Bloquefooter) {
        html += Bloquefooter;
    }
    html += "</tbody>";
   
    html += "</table>";
    div.innerHTML = html;
 
}


function createLegend(listaLeyenda) {
    var nlistaLeyenda = listaLeyenda.length;
    var campos = [];
    var html = "";
    html += "<div class='form_basic_horizontal grid_start'>";
    html += "<div class='form_basic_horizontal_permanent '>";
    html += "<div class='texto'>";
    html += "Niveles: ";
    html += "</div>";
    html += "</div>";
    html += "<div class='form_basic_horizontal  grid_center leyend p0'>";

    for (var i = 0; i < nlistaLeyenda; i++) {
        campos = listaLeyenda[i].split(sepCampos);
        html += "<div class='form_basic_horizontal_permanent '>";
        html += "<div class='texto'>";
        html += campos[0];
        html += " =</div>";
        html += "<div class='texto'>";
        html += campos[1];
        html += "</div>";
        html += "</div>";
    }
    html += "</div>";
    html += "</div>";

    return html;
}




