window.onload = function () {

   var menu= sessionStorage.getItem("menu");
    mostrarMenus(menu);
    //var list = document.getElementsByClassName("focus_link");
    //for (var i = 0; i < list.length; i++) {
    //    list[i].onclick = function () {
    //        var item = this;
    //        for (var j = 0; j < list.length; j++) {
    //            if (item == list[j]) {
    //                list[j].style.backgroundColor = "white";
    //            } else {
    //                list[j].style.backgroundColor = "#262626";
    //            }
    //        }
    //    };
    //}
};



function mostrarMenus(rpta) {
    if (validaResponseData(rpta)) {
        lista = rpta.split(sepRegistros);
        nregistros = lista.length;
        var campos = [];
        var html = "<h4>";
        /*        html += sessionStorage.getItem("Nombre");*/
        html += "</h4> <ul id='ulMenu'>";
        for (var i = 0; i < nregistros; i++) {
            campos = lista[i].split("|");
            if (campos[3] == "0000") {
                html += "<li data-url='";
                html += campos[2].trim();
                html += "' ";
                if (campos[2].trim() != "") {
                    html += " data-name='";
                    html += campos[1];
                    html += "' ";
                }
                html += ">";
                html += "<img  src='";
                html += hdfRaiz.value;
                html += "Images/menu_iconos/";
                html += campos[4];
                html += "' > ";
                html += "<a href='#'";
                if (campos[2].trim() == "") {
                    html += " onclick='collapser(this)' ";
                }
                html += ">";
                html += campos[1];
                html += "</a>";
                if (campos[2].trim() == "") {
                    html += " <b class='fa fa-angle-up' ></b>";
                }
                html += crearSubmenu(campos[0], campos[1]);
                html += "</li>";
            }
        }
        html += "</ul>";
        html += "<h4 style='text-align: center;margin: 20px;'>";
        /*html += "v";*/
        /*html += hdfVersion.value;*/
        html += "</h4>";
        sidebar.innerHTML = html;
        configurarMenus();
    }
}

function crearSubmenu(idPadre, nombrePadre) {
    var rpta = "";
    var html = "";
    for (var i = 0; i < nregistros; i++) {
        campos = lista[i].split("|");
        if (campos[3] == idPadre) {

            html += "<li data-url='";
            html += campos[2];
            html += "' ";
            if (campos[2].trim()  != "") {
                html += " data-name='";
                html += nombrePadre + "|" + campos[1];
                html += "' ";
            }
            html += ">";
            html += "<img  src='";
            html += hdfRaiz.value;
            html += "Images/menu_iconos/";
            html += campos[4];
            html += "' > ";
            html += "<a class='";
            var submenu = crearSubsubmenu(campos[0], nombrePadre + "|" + campos[1]);
            if (submenu == "") {
                html += "focus_link";
            }

            html += "' href='#'";
            if (campos[2].trim()  == "") {
                html += " onclick='collapser(this)' ";
            }
            html += "> ";
            html += campos[1];
            html += "</a>";
            if (campos[2].trim()  == "") {
                html += " <b class='fa fa-angle-up' ></b>";
            }

            html += submenu;
            html += "</li>";
        }
    }
    if (html != "") {
        rpta += "<ul  style='display: none'>";
        rpta += html;
        rpta += "</ul>";
    }
    return rpta;
}

function crearSubsubmenu(idPadre, nombrePadreSub) {
    var rpta = "";
    var html = "";
    for (var j = 0; j < nregistros; j++) {
        camposS = lista[j].split("|");
        if (camposS[3] == idPadre) {
            html += "<li data-url='";
            html += camposS[2];
            html += "' ";
            if (camposS[2] != "") {
                html += " data-name='";
                html += nombrePadreSub + "|" + camposS[1];
                html += "' ";
            }
            html += ">";
            html += "<img  src='";
            html += hdfRaiz.value;
            html += "Images/menu_iconos/";
            html += camposS[4];
            html += "' > ";
            html += "<a class='focus_link' href='#'>";
            html += camposS[1];
            html += "</a>";
            html += "</li>";
        }
    }
    if (html != "") {
        rpta += "<ul>";
        rpta += html;
        rpta += "</ul>";

    }
    return rpta;
}

function configurarMenus() {
    var ulMenu = document.getElementById("ulMenu");
    ulMenu.onclick = function (event) {
        var liMenu = event.target;
        if (liMenu.childNodes.length > 1) {
            var ulSubMenu = liMenu.childNodes[1];
            if (ulSubMenu.style.display == "" || ulSubMenu.style.display == "block") {
                ulSubMenu.style.display = "none";
            }
            else {
                ulSubMenu.style.display = "block";
            }
        }
        else {
            var padre = liMenu.parentNode;
            //var tabla = padre.innerText;
            var accion = padre.getAttribute("data-url");
            var token = sessionStorage.getItem("token");
            var url = hdfRaiz.value + accion/* + token*/;
            if (accion != "") {
                ifrPagina.src = url;
                /*    clearInterval(sessionActiva);*/
                if (window.innerWidth <= '1281') {
                    box1.click();
                }
            }
            sessionStorage.setItem("navigation_page", padre.getAttribute("data-name"));

        }
    }

    focus_click();
}


function focus_click() {
    var list = document.getElementsByClassName("focus_link");
    for (var i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            var item = this;
            for (var j = 0; j < list.length; j++) {
                if (item == list[j]) {
                    if (item.innerText == "Registro de tiempos") {
                        list[j].style.backgroundColor = "#049A8F";
                    } else {
                        list[j].style.backgroundColor = "var(--color-cpo-amarillo)";
                    }

                    list[j].style.color = "white";
                } else {
                    list[j].style.backgroundColor = "transparent";
                    list[j].style.color = "#666";
                }
            }
        };
    }
}


function collapser(element) {
    var list_ul = element.parentNode.parentNode.getElementsByTagName("ul");
    var icon = element.nextElementSibling;
    var ul_select = icon.nextElementSibling;
    if (ul_select.style.display == "none") {
        for (obj_ul of list_ul) {
            if (obj_ul == ul_select) {
                ul_select.style.display = "block";
                icon.classList.toggle("rotated");
            } else {
                if (obj_ul.style.display == "none") {
                    obj_ul.style.display = "none";

                } else {
                    if (obj_ul.style.display == "block") {
                        obj_ul.style.display = "none";
                        obj_ul.previousElementSibling.classList.toggle("rotated");
                    }
                    else {
                        obj_ul.style.display = "none";
                    }
                }
            }
        }
    } else {
        icon.nextElementSibling.style.display = "none";
        icon.classList.toggle("rotated");
    }
}


user.onclick = function () {
    if (user_menu_nav.className == "user-menu") {
        user_menu_nav.className = "d_none";
    } else {
        user_menu_nav.className = "user-menu";
    }
};

//datos_personales.onclick = function () {
//    iframe.src = "formularios.html";
//};

//exp_laboral.onclick = function () {
//    iframe.src = "experienciaLaboral.html";
//};


full_screen.onclick = function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};
box1.onclick = function () {
    if (document.getElementById("container_menu").className == "container_show") {
        window.setTimeout(function () {
            icon_menu.className = "fas fa-bars";
            container_menu.className = "container_menu";
            nav.className = "nav";
            contenido.className = "content";
            sidebar.classList.toggle("show");
        }, 1);
    } else {
        window.setTimeout(function () {
            container_menu.className = "container_show";
            nav.className = "nav_show";
            contenido.className = "content_show";
            icon_menu.className = "fas fa-times";

            sidebar.classList.toggle("show");
        }, 1);
    }
};


