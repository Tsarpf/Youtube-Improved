using System;
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
using YoutubeTesti.Models;
using Google.Apis.Youtube.v3;
using Google.Apis.Youtube.v3.Data;

namespace YoutubeTesti.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        [HttpGet]
        public ActionResult Index()
        {
			//Auth();
			ViewBag.Hello = "Testink testink";
            return View();
        }

		[HttpPost]
		public ViewResult Index(uTubSearchResult uTubsearchResult)
		{
			uTubsearchResult = Search(uTubsearchResult.searchString);

			return View("Index", uTubsearchResult);
		}

        private uTubSearchResult Search(string searchString)
		{
			YoutubeService youtube = new YoutubeService();
			youtube.Key = "AIzaSyCVe9YYpgR4BJ68a8YHweLZFe8tFszFy-A";

			SearchResource.ListRequest listRequest = youtube.Search.List("snippet");
			listRequest.Q = searchString;
			listRequest.Order = SearchResource.Order.Relevance;

			SearchListResponse searchResponse = listRequest.Fetch();

			uTubSearchResult utubSearchResult = new uTubSearchResult();
			utubSearchResult.titles = new List<string>();
			utubSearchResult.URLs = new List<string>();

			foreach (SearchResult searchResult in searchResponse.Items)
			{
				if (searchResult.Id.Kind == "youtube#video")
				{
					utubSearchResult.titles.Add(searchResult.Snippet.Title);
                    utubSearchResult.URLs.Add(searchResult.Snippet.Thumbnails[searchResult.Snippet.Thumbnails.Keys.ToArray()[0]].Url);
				}
			}

			return utubSearchResult;

		}

		private void Auth()
		{
			// Display the header and initialize the sample.
			CommandLine.EnableExceptionHandling();
			CommandLine.DisplayGoogleSampleHeader("Tasks API");

			// Register the authenticator.
			var provider = new NativeApplicationClient(GoogleAuthenticationServer.Description);
			//FullClientCredentials credentials = PromptingClientCredentials.EnsureFullClientCredentials();
			provider.ClientIdentifier = "112812420087-0fgbdn5pjmcbk2fv73ich62q2rotae0m.apps.googleusercontent.com";
			//provider.ClientIdentifier = credentials.ClientId;
			provider.ClientSecret = "cmUkDkAZ6QZjyZDggpcTGB7o";
			//provider.ClientSecret = credentials.ClientSecret;
			var auth = new OAuth2Authenticator<NativeApplicationClient>(provider, GetAuthorization);

			// Create the service.
			var service = new TasksService(auth);
			TaskLists results = service.Tasklists.List().Fetch();
			CommandLine.WriteLine("   ^1Lists:");
			foreach (TaskList list in results.Items)
			{
				CommandLine.WriteLine("     ^2" + list.Title);
			}
			CommandLine.PressAnyKeyToExit();
		}

		private static IAuthorizationState GetAuthorization(NativeApplicationClient arg)
		{
			// Get the auth URL:
			IAuthorizationState state = new AuthorizationState(new[] { TasksService.Scopes.Tasks.GetStringValue() });
			state.Callback = new Uri(NativeApplicationClient.OutOfBandCallbackUrl);
			Uri authUri = arg.RequestUserAuthorization(state);

			// Request authorization from the user (by opening a browser window):
			Process.Start(authUri.ToString());
			Console.Write("  Authorization Code: ");
			string authCode = Console.ReadLine();
			Console.WriteLine();

			// Retrieve the access token by using the authorization code:
			return arg.ProcessUserAuthorization(authCode, state);
		}

    }
}
