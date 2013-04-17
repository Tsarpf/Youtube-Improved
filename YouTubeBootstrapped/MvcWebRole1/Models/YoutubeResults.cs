using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YOUTUBEiMPROVED.Models
{
    public class YoutubeResults
	{
        public List<string> titles {get; set;}
		public List<string> videoIDs { get; set; }
		public List<string> thumbnailURLs { get; set; }
		public List<string> descriptions { get; set; }
		public string normalSearchString { get; set; }
		public string artistSearchString { get; set; }

		public string username { get; set; }
		public string password { get; set; }
		public bool correct { get; set; }
		public string loginMessage { get; set; }

		public enum SEARCHTYPE
		{
            NORMAL,
            ARTIST
		}
	}
}