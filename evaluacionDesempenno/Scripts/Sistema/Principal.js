window.onload = function () {
    var list = document.getElementsByClassName("focus_link");
    for (var i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            var item = this;
            for (var j = 0; j < list.length; j++) {
                if (item == list[j]) {
                    list[j].style.backgroundColor = "white";
                } else {
                    list[j].style.backgroundColor = "#262626";
                }
            }
        };
    }
};

function collapser(element) {
    var list_ul = element.parentNode.parentNode.getElementsByTagName("ul");
    var ul_select = element.nextElementSibling;
    if (ul_select.style.display == "none") {
        for (obj_ul of list_ul) {
            if (obj_ul == ul_select) {
                ul_select.style.display = "block";
                element.classList.toggle("rotated");
            } else {
                obj_ul.style.display = "none";
            }
        }
    } else {
        element.nextElementSibling.style.display = "none";
        element.classList.toggle("rotated");
    }
}


user.onclick = function () {
    if (user_menu_nav.className == "user-menu") {
        user_menu_nav.className = "d_none";
    } else {
        user_menu_nav.className = "user-menu";
    }
};

datos_personales.onclick = function () {
    iframe.src = "formularios.html";
};

exp_laboral.onclick = function () {
    iframe.src = "experienciaLaboral.html";
};


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
    if (document.getElementById("container").className == "container_show") {
        window.setTimeout(function () {
            icon_menu.className = "fas fa-bars";
            container.className = "container";
            nav.className = "nav";
            content.className = "content";
            sidebar.classList.toggle("show");
        }, 1);
    } else {
        window.setTimeout(function () {
            container.className = "container_show";
            nav.className = "nav_show";
            content.className = "content_show";
            icon_menu.className = "fas fa-times";

            sidebar.classList.toggle("show");
        }, 1);
    }
};