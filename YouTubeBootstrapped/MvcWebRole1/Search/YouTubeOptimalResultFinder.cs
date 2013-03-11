using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YOUTUBEiMPROVED.Models;
using Google.Apis.Youtube.v3;
using Google.Apis.Youtube.v3.Data;

namespace YOUTUBEiMPROVED.Search
{
	static public class YouTubeOptimalResultFinder
	{

        public static YoutubeResults getResultsForList(List<SongStruct> songs)
		{
			YoutubeService youtube = new YoutubeService();
			youtube.Key = "AIzaSyCVe9YYpgR4BJ68a8YHweLZFe8tFszFy-A";

            YoutubeResults searchResults = new YoutubeResults();
            searchResults.titles = new List<string>();
            searchResults.videoIDs = new List<string>();
            searchResults.thumbnailURLs = new List<string>();
			searchResults.descriptions = new List<string>();

			for (int i = 0; i < songs.Count; i++)
			{
				string artist = songs[i].artist;
				string song = songs[i].title;
				//int duration = songs[i].duration;


				string searchString = artist + " " + song;


				SearchResource.ListRequest listRequest = youtube.Search.List("snippet");
				listRequest.Q = searchString;
				listRequest.Order = SearchResource.Order.Relevance;
				listRequest.MaxResults = 1;
				listRequest.Type = "video";

				SearchListResponse searchResponse = listRequest.Fetch();

				SearchResult searchResult = searchResponse.Items[0];

                searchResults.titles.Add(searchResult.Snippet.Title);

                searchResults.thumbnailURLs.Add(searchResult.Snippet.Thumbnails[searchResult.Snippet.Thumbnails.Keys.ToArray()[0]].Url);
                searchResults.videoIDs.Add(searchResult.Id.VideoId);
				searchResults.descriptions.Add(searchResult.Snippet.Description);
			}
            
			
			return searchResults;
		}

		public static YoutubeResults NormalSearch(string searchString) //default argument
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
			searchResults.descriptions = new List<string>();

            foreach (SearchResult searchResult in searchResponse.Items)
            {
                if (searchResult.Id.Kind == "youtube#video")
                {
                    searchResults.titles.Add(searchResult.Snippet.Title);

                    searchResults.thumbnailURLs.Add(searchResult.Snippet.Thumbnails[searchResult.Snippet.Thumbnails.Keys.ToArray()[0]].Url);
                    searchResults.videoIDs.Add(searchResult.Id.VideoId);

					searchResults.descriptions.Add(searchResult.Snippet.Description);
                }
            }

			return searchResults;
		}


		/*
private static void getVideoSetFromYouTube()
{

}

class FoundVideosForSearch
{
	string searchTerms;
	List<
}

class VideoDetails
{
	string ID;
	bool highDef;
	int viewC
}
		//Google.Apis.Youtube.v3.VideosResource
		//VideosResource.ListRequest listRequest = youtube.Videos.List("<joku video id>", "contentDetails,statistics");
                
		//listVideo.FieldsMask = "items(contentDetails(duration,definition), statistics(viewCount,likeCount,dislikeCount))";

		//VideoListResponse searchResponse = listRequest.Fetch();
*/
	}
}