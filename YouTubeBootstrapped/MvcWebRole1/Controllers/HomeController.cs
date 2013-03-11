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

namespace YOUTUBEiMPROVED.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(YoutubeResults results)
        {
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

        //here be dragons!
    }


        
}
