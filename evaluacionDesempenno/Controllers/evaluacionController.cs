using System;
using System.Web;
using System.Web.Mvc;
using General.Librerias.AccesoDatos;

namespace evaluacionDesempenno.Controllers
{
    public class TrabajadorController : Controller
    {
        // GET: evaluacion
        public ActionResult EvDesempeno()
        {
            return View();
        }


        public string cargar()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conIGESOP");
            
            rpta = odaSQL.EjecutarComando("dbo.usp_formato_evaDesempenno");
            //rpta = odaSQL.EjecutarComando("dbo.sha512");
            return rpta;
        }


        public ActionResult ReporteDesenpeno()
        {
            return View();
        }

    }
}