﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YOUTUBEiMPROVED.Models;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;

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

			SqlConnection connection = null;

            SqlConnectionStringBuilder csBuilder = null;

			string serverPassword = @"!!!!!!!!(/)Q&)(/&¤";
            string givenPassword = "";
			try
			{
				//csBuilder = new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
				csBuilder = new SqlConnectionStringBuilder(ConfigurationManager.AppSettings["DBConnectionString"]);
				//
				csBuilder.IntegratedSecurity = false;
			}
			catch (Exception e)
			{
				login.loginMessage = "builder fail: " + e.Message;
				return View("Login", login);
			}
            try
			{
				connection = new SqlConnection(csBuilder.ToString());
				connection.Open();
			}
			catch (Exception e)
			{
				login.loginMessage = "connection fail: " + e.Message;
				return View("Login", login);
			}
			try
			{
				SqlDataReader reader = null;

				givenPassword = login.password;
				string tinyBitSaferUsername = login.username.Replace("'", "''"); //Weak protection from SQL injections

				SqlCommand command = new SqlCommand("SELECT Password FROM UserTable WHERE UserName = '"
					+ tinyBitSaferUsername + "'"
					, connection);
				reader = command.ExecuteReader();

				while (reader.Read())
				{
					IDataRecord asd = (IDataRecord)reader;
                    if(asd[0].ToString().Length > 0)
					    serverPassword = asd[0].ToString();
				}
			}
			catch (Exception e)
			{
				login.correct = false;
				login.loginMessage = "Invalid username or password";
			}

			connection.Close();

			if (serverPassword == givenPassword)
			{
				login.correct = true;
				login.loginMessage = "Login succesful";
			}
			else
			{
				login.correct = false;
				login.loginMessage = "Invalid username or password";
			}


			return View("Login", login);
		}

    }
}
