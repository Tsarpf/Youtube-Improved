using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YOUTUBEiMPROVED.Models;

namespace MvcWebRole1.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

		[HttpGet]
        public ActionResult Index()
        {
            return View(); //Return the normal view
        }

		[HttpPost]
		public ActionResult Index(LoginData login)
		{
            //TODO: Check if username&password are correct etc
			return View();
		}

    }
}
