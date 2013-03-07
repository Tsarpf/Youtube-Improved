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
			results = Search(results.searchString);

			return View("Index", results);
		}

		private YoutubeResults Search(string searchString, YoutubeResults.SEARCHTYPE searchType = YoutubeResults.SEARCHTYPE.VIDEO) //default argument
		{
			YoutubeService youtube = new YoutubeService();
			youtube.Key = "AIzaSyCVe9YYpgR4BJ68a8YHweLZFe8tFszFy-A";

			SearchResource.ListRequest listRequest = youtube.Search.List("snippet");
			listRequest.Q = searchString;
			listRequest.Order = SearchResource.Order.Relevance;

			SearchListResponse searchResponse = listRequest.Fetch();

			YoutubeResults searchResults = new YoutubeResults();
			searchResults.titles = new List<string>();
			searchResults.videoIDs = new List<string>();
			searchResults.thumbnailURLs = new List<string>();

			switch (searchType)
			{
                case YoutubeResults.SEARCHTYPE.VIDEO:

					foreach (SearchResult searchResult in searchResponse.Items)
					{
						if (searchResult.Id.Kind == "youtube#video")
						{
							searchResults.titles.Add(searchResult.Snippet.Title);

							searchResults.thumbnailURLs.Add(searchResult.Snippet.Thumbnails[searchResult.Snippet.Thumbnails.Keys.ToArray()[0]].Url);
							searchResults.videoIDs.Add(searchResult.Id.VideoId);
						}
					}
                    break;

				case YoutubeResults.SEARCHTYPE.PLAYLIST:
                    //do something else
					break;

				case YoutubeResults.SEARCHTYPE.ALL:
                    //do something else
					break;
			}



			return searchResults;

		}
    }
}
