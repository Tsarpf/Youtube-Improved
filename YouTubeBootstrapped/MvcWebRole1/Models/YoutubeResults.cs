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
		public string searchString { get; set; }

		public enum SEARCHTYPE
		{
            VIDEO,
            PLAYLIST,
            ALL
		}
	}
}