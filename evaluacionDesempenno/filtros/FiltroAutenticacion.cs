
using System.Web.Mvc;

namespace evaluacionDesempenno.filtros
{
    public class FiltroAutenticacion : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            object tokenHeader = filterContext.HttpContext.Request.Headers["token"];
            object tokenURL = filterContext.HttpContext.Request.QueryString["token"];
            string token = "";
            if (tokenHeader != null || tokenURL != null)
            {
                if (tokenHeader != null) token = tokenHeader.ToString();
                if (tokenURL != null) token = tokenURL.ToString();
                if (filterContext.HttpContext.Session[token + "Usuario"] == null)
                {
                    filterContext.Result = new RedirectResult("~/Sistema/Index");
                }
            }
            else filterContext.Result = new RedirectResult("~/Sistema/Index");

        }
    }
}