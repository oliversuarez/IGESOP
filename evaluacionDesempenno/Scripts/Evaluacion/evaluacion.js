var listaEval = [];
var titulo;
var listaCompetencia;
var listaObjetivo;
var listaLeyenda;
var listaUsu;

var competencia;
var objetivo;

window.onload = function () {
    Http.get("Trabajador/cargar", mostrarRpt);
    Http.get("Trabajador/cargar", mostrarRpt1);
    console.log("subida prueba :diego");
}

function mostrarRpt(rpta) {
    if (validaResponseData(rpta)) {
        listaEval = rpta.split(sepLista);
        titulo = listaEval[0];
        listaCompetencia = listaEval[1].split(sepRegistros);
        listaObjetivo = listaEval[2].split(sepRegistros);
        listaLeyenda = listaEval[3].split(sepRegistros);
        listaUsu = listaEval[4].split(sepRegistros);
        crearEvaluacion2();
        createLegend(listaLeyenda);
    }     
}
function crearEvaluacion2() {
    GUI.Combo(usuario,listaUsu);
    titulo_evaluacion.innerHTML = titulo;
    var descripcion= crearSubtituloResena(listaCompetencia[0].split(sepCampos)[0], listaCompetencia[0].split(sepCampos)[1]);
    listaCompetencia.splice(0, 1);
    var ListaOpciones1 = ['A', 'B', 'C', 'D', 'E'];
    var ListaColores1= ['red', 'black', 'blue', 'green', 'yellow'];
    competencia= new crearTablaOpcionMultiple(ListaOpciones1, listaCompetencia, evaluacion_evaluacion, descripcion, true, ListaColores1, listaLeyenda);
    var ListaOpciones2 = ['70%', '80%', '100%', '110%', '120%'];
    var ListaColores2 = ['red', 'black', 'blue', 'green', 'yellow'];
    var descripcion2 = crearSubtituloResena(listaObjetivo[0].split(sepCampos)[0], listaObjetivo[0].split(sepCampos)[1]);
    listaObjetivo.splice(0, 1);
    objetivo= new crearTablaOpcionMultiple(ListaOpciones2, listaObjetivo, objetivo_evaluacion, descripcion2, true, ListaColores2);
}


guardarDesenpeno.onclick = function () {
    competencia.validarCheckOpciones();
  /*  objetivo.validarCheckOpciones();*/
}

function crearSubtituloResena(titulo,descripcion) {

    var html = "";
    html += "<div class='title'>";
    html += titulo;
    html += "</div>";
    html += "<div class='texto'>";
    html += descripcion;
    html += "</div>";
    return html;
    
}

function crearTablaOpcionMultiple(listaOpciones, listaData, div, descripcion, tieneComentario, ListaColores, listaLeyenda) {
    var campos = [];
    var opCampos = [];
    var nlistaOpciones = listaOpciones.length;
    var html = "";
    var matriz = [];
    var nMatriz = 0;
    var listaCabecera = listaData[0].split(sepCampos);
    listaData.splice(0, 1);
    var nlistaData = listaData.length;
    var nlistaCabecera = listaCabecera.length;
    html += descripcion;

    if (listaLeyenda) {
        html += createLegend(listaLeyenda);
    }
  html += "<table class='table'>";

    html += "<table class='table' >";
   html += "<thead class='thead'>";
    html += "<tr>";
    html += "<th>";
    html += "#";
    html += "</th>";

    for (var i = 0; i < nlistaCabecera; i++) {
        html += "<th>";
        html += listaCabecera[i];
        html += "</th>";
    }
   
    for (var i = 0; i < nlistaOpciones; i++) {
        html += "<th style='width:50px;'>";
        html += listaOpciones[i].split(sepCampos)[0];
        html += "</th>"

    }
    if (tieneComentario) {
        html += "<th>";
        html += "Feedback";
        html += "</th>";

    }

      html += "</tr>";
    html += "</thead>";
    html += "<tbody class='tbody' id='tbData";
    html += div.id;
    html +="'>";
    for (var i = 0; i < nlistaData; i++) {
        campos = listaData[i].split(sepCampos);
        matriz[i] = [];
        html += "<tr>";
        html += "<td>";
        html += i+1;
        html += "</td>";
        for (var j = 0; j < nlistaCabecera; j++) {
            matriz[i][j] = campos[j];
            html += "<td>";
            html += campos[j];
            html += "</td>";
        }

        for (var j = 0; j < nlistaOpciones; j++) {
            opCampos = listaOpciones[j].split(sepCampos);
            matriz[i][nlistaCabecera + j] = [];
            matriz[i][nlistaCabecera + j][0] = opCampos[0];
            matriz[i][nlistaCabecera + j][1] = false;
            matriz[i][nlistaCabecera + j][2] = false;
            html += "<td class='";
            html += campos[0];
            html+="opcionCheck' data-valor='";
            html += opCampos[0];
            html += "' data-opcion='";
            html += j;
            html += "' data-row='";
            html += i;
            html += "' data-col='";
            html += j + nlistaCabecera;
            html+="'></td>";
        }
        if (tieneComentario) {
            matriz[i][nlistaCabecera + nlistaOpciones] = "";
            html += "<td >";
            html += "<input type='text' class='m0' style='background-color: transparent; border: none;' />"
            html += "</td>";

        }
        html += "</tr>";

      
    }
    html += "</tbody>";
    html += "</table>";
    div.innerHTML = html;
    console.log(matriz);
    nMatriz = matriz.length;
    configurarCheck();
    function configurarCheck() {
       
        var campos = [];
        for (var i = 0; i < nlistaData; i++) {
            var adm = null;
            campos = listaData[i].split(sepCampos);

            adm = new asignarCheck(campos[0] + "opcionCheck");
        }
      
    }

    function asignarCheck(clase) {
        var anterior = null;
        var listaControl = [];
        listaControl = div.getElementsByClassName(clase);
        nlistaControl = listaControl.length;
        for (var j = 0; j < nlistaControl; j++) {
            listaControl[j].onclick = function () {
                if (anterior == null) {
                    anterior = this;
                  
                    var opcion = this.getAttribute("data-opcion");
                    var fila = this.getAttribute("data-row");
                    var columna = this.getAttribute("data-col");
                    matriz[fila][columna][1] = true;
                    this.style.backgroundColor = ListaColores[opcion];
                } else {
                    anterior.innerHTML = "";
                    anterior.style.backgroundColor = "transparent";
                    var fila = anterior.getAttribute("data-row");
                    var columna = anterior.getAttribute("data-col");
                    matriz[fila][columna][1] = false;
                    anterior = this;
                    var opcion = this.getAttribute("data-opcion");
                     fila = this.getAttribute("data-row");
                     columna = this.getAttribute("data-col");
                    matriz[fila][columna][1] = true;
                    this.style.backgroundColor = ListaColores[opcion];
                }

                console.log(matriz);
            }
        }
    }
   
    var concatenador = ['#'];
    var cabeceraResponsive = listaCabecera.concat(listaOpciones);

    if (tieneComentario) {
        cabeceraResponsive.push('feedBack');
    }
    crearResponsiveTable(concatenador.concat(cabeceraResponsive), div.id, false);

    this.validarCheckOpciones = function () {
        var valido = true;
        var  listaOp = nlistaCabecera + nlistaOpciones;
        for (var i = 0; i < nMatriz; i++) {
            for (var j = nlistaCabecera; j < listaOp; j++) {
                if (matriz[i][j][1] == true) {
                    valido = true;
                    break;
                } else {
                    valido = false;
                }
            }
        }
        if (!valido) {
            alert("falta completar el formulario");
        }
    }
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




