﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Diagnostics;
using DotNetOpenAuth.OAuth2;
using Google.Apis.Authentication.OAuth2;
using Google.Apis.Authentication.OAuth2.DotNetOpenAuth;
using Google.Apis.Tasks.v1;
using Google.Apis.Tasks.v1.Data;
using Google.Apis.Util;
using Google.Apis.Samples.Helper;
using Google.Apis.Youtube.v3;
using Google.Apis.Youtube.v3.Data;
using YOUTUBEiMPROVED.Models;
using YOUTUBEiMPROVED.Search;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Configuration;


namespace YOUTUBEiMPROVED.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        [HttpGet]
        public ActionResult Index()
        {
            return View(new YoutubeResults());
        }

        [HttpPost]
        public ActionResult Index(YoutubeResults results)
        {
			if (Request.IsAjaxRequest())
			{
				return handleLogin(results);
			}

			if (results.artistSearchString != null)
			{
    			results = YouTubeOptimalResultFinder.getResultsForList(LastFmSongList.getTopTracksForArtist(results.artistSearchString));
			}
			else if (results.normalSearchString != null)
			{
				results = YouTubeOptimalResultFinder.NormalSearch(results.normalSearchString);
			}
			else if (results.artistSearchString == null && results.normalSearchString == null)
			{
				results = YouTubeOptimalResultFinder.NormalSearch("");
			}


            //results = Search(results.searchString);

            return View("Index", results);
        }

		private ActionResult handleLogin(YoutubeResults results)
		{
			if (results.username == null || results.password == null)
			{
				return Content("Empty username/password", "text/html");
			}

            string username = results.username;
            string password = results.password;

            if (loginSuccess(results.username, results.password))
            {
                results.loginMessage = "Success. Logged in as " + results.username;
                results.correct = true;
                results.username = null;
                results.password = null;

				return Content("Success");
            }


            results.loginMessage = "Fail. Invalid username/password";
            results.correct = false;
            results.username = null;
            results.password = null;

			return Content("Invalid username/password");
		}

		private bool loginSuccess(string username, string password)
		{
			SqlConnection connection = null;

			SqlConnectionStringBuilder csBuilder = null;

			string serverPassword = "";

            csBuilder = new SqlConnectionStringBuilder(ConfigurationManager.AppSettings["DBConnectionString"]);
            csBuilder.IntegratedSecurity = false;

            connection = new SqlConnection(csBuilder.ToString());
            connection.Open();

            SqlDataReader reader = null;

            string givenPassword = password;
            string tinyBitSaferUsername = username.Replace("'", "''"); //Weak protection from SQL injections

            SqlCommand command = new SqlCommand("SELECT Password FROM UserTable WHERE UserName = '"
                + tinyBitSaferUsername + "'"
                , connection);
            reader = command.ExecuteReader();

			try
			{
				while (reader.Read())
				{
					IDataRecord asd = (IDataRecord)reader;
					if (asd[0].ToString().Length > 0)
						serverPassword = asd[0].ToString();
				}
			}
			catch (Exception e)
			{
				connection.Close();
				return false;
			}

			connection.Close();



			if (serverPassword == givenPassword && serverPassword != "" && givenPassword != "")
			{
				return true;
			}

			return false;
		}
    }


        
}
