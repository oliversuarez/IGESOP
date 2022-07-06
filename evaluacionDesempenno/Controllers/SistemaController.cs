
﻿using General.Librerias.AccesoDatos;

﻿using evaluacionDesempenno.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace evaluacionDesempenno.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Index()
        {
            ViewBag.token = Guid.NewGuid().ToString();
            
            return View();
        }


        public string validarUsuario(string data)
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conIGESOP");
            string[] datos = data.Split('|');
            rpta = odaSQL.EjecutarComando("dbo.usp_menuXrolesXusuario", "@data",data);
            if (rpta!="")
            {
                Session["usuario"] = datos[0];

            }

            return rpta;
            
        }


        public ActionResult Principal()
        {
            object tokenHeader = HttpContext.Request.Headers["token"];
            Session[tokenHeader+"usuario"] = new SessionUsuario();
            return View();
        }

        
    }
}