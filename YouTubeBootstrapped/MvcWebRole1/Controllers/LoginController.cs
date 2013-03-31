using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YOUTUBEiMPROVED.Models;

namespace YOUTUBEiMPROVED.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

		[HttpGet]
        public ActionResult Login()
        {
            return View(); //Return the normal view
        }

		[HttpPost]
		public ActionResult Login(LoginData login)
		{
            //TODO: Check if username&password are correct etc
			return View();
		}

    }
}
