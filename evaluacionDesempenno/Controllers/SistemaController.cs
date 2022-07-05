using evaluacionDesempenno.Models;
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


        public ActionResult Principal()
        {
            object tokenHeader = HttpContext.Request.Headers["token"];
            Session[tokenHeader+"usuario"] = new SessionUsuario();
            return View();
        }
    }
}