var listaEval = [];
var titulo;
var listaCompetencia;
var listaObjetivo;
var listaLeyenda;
var listaUsu;


window.onload = function () {
    Http.get("evaluacion/cargar", mostrarRpt);

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
        crearEvaluacion();
    }     
}
function crearEvaluacion() {
    GUI.Combo(usuario,listaUsu);
    titulo_evaluacion.innerHTML = titulo;
    var descripcion= crearSubtituloResena(listaCompetencia[0].split(sepCampos)[0], listaCompetencia[0].split(sepCampos)[1]);
    listaCompetencia.splice(0, 1);
    crearTablaOpcionMultiple(listaLeyenda, listaCompetencia, evaluacion_evaluacion, descripcion);
    var ListaOpciones = ['70%', '80%', '100%', '110%', '120%','150%'];
    var descripcion2 = crearSubtituloResena(listaObjetivo[0].split(sepCampos)[0], listaObjetivo[0].split(sepCampos)[1]);
    listaObjetivo.splice(0, 1);
    crearTablaOpcionMultiple(ListaOpciones, listaObjetivo, objetivo_evaluacion, descripcion2);
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

function crearTablaOpcionMultiple(listaOpciones,listaData,div,descripcion) {
    var campos = [];
    var opCampos = [];
    var nlistaData = listaData.length;
    var nlistaOpciones = listaOpciones.length;
    var html = "";
    var matriz = [];
    var listaCabecera = listaData[0].split(sepCampos);
    var nlistaCabecera = listaCabecera.length;
    html += descripcion;
  html += "<table class='table'>";
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
      html += "</tr>";
    html += "</thead>";
    html += "<tbody class='tbody'>";
    for (var i = 1; i < nlistaData; i++) {
        campos = listaData[i].split(sepCampos);
       /* matriz[i] = "";*/
        html += "<tr>";
        html += "<td>";
        html += i+1;
        html += "</td>";
        for (var j = 0; j < nlistaCabecera; j++) {
            html += "<td>";
            html += campos[j];
            html += "</td>";
        }
       
 
        //matriz[i][0] = campos[0];
        //matriz[i][1] = campos[1];
        //matriz[i][2] = campos[2];
        for (var j = 0; j < nlistaOpciones; j++) {
            opCampos = listaOpciones[j].split(sepCampos);
      /*      matriz[i][nlistaData + j] = [];*/
            html += "<td class='";
            html += campos[0];
            html+="opcionCheck' data-valor='";
            html += opCampos[0];
            html +="'>";
  
            html += "</td>"
            //matriz[i][nlistaData + j][0] = opCampos[0];
            //matriz[i][nlistaData + j][1] = false;
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    div.innerHTML = html;
    configurarCheck();
    function configurarCheck() {
       
        var campos = [];
        for (var i = 1; i < nlistaData; i++) {
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
                    this.innerHTML = "X";
                } else {
                    anterior.innerHTML = "";
                    anterior = this;
                    this.innerHTML = "X";
                }
            }
        }
    }
}




