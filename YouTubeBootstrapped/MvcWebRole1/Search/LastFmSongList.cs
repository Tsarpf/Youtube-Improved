using System;
using System.Collections.Generic;
using System.Xml;

namespace YOUTUBEiMPROVED.Search
{
	static public class LastFmSongList
	{
        static const string APIKey = "667ef273abfb5d504de318468e6af79c";

		static public List<SongStruct> getTopTracksForArtist(string artist, int limit = 10)
		{
			string URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +
	artist + "&limit=" + limit + "&api_key=" + APIKey;

			XmlTextReader reader = new XmlTextReader(URL);

			List<SongStruct> songs = new List<SongStruct>();
			SongStruct currentSong = new SongStruct();
			while (reader.Read())
			{
				switch (reader.NodeType)
				{
					case XmlNodeType.Element:
						switch (reader.Name)
						{
							case "name":

								reader.Read(); //Jumps to the content

								if (reader.Depth == 4)
								{
									currentSong.title = reader.Value;
								}
								else if (reader.Depth == 5)
								{
									currentSong.artist = reader.Value;
								}

								break;

							case "duration":

								reader.Read();

								currentSong.duration = Convert.ToInt32(reader.Value);

								break;
						}
						break;

					case XmlNodeType.EndElement:
						if (reader.Name == "track")
						{
							songs.Add(currentSong);
							currentSong = new SongStruct();
						}
						break;
				}
			}

			return songs;

		}
	}
}