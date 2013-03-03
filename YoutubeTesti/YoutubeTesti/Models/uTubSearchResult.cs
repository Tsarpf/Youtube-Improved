using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YoutubeTesti.Models
{
	public class uTubSearchResult
	{
	    public List<string> titles { get; set; }
		public List<string> videoIDs { get; set; }
		public string searchString
		{
			get;
			set;
		}
	}

}