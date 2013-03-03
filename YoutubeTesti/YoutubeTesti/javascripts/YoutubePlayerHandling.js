var createNewPlayer = function ()
{
    var params = { allowScriptAccess: "always" }; //Enables access to players controls from other hosts, not sure if needed...

    var atts = { id: "ytPlayer" + ytplayers.length }; //This is the html id using which we can find the element with getElementById etc

    swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1&playerapiid=player" + ytplayers.length, "player" + ytplayers.length, "480", "295", "9", null, null, params, atts);
}

function onYouTubePlayerReady(playerId) //Is automatically called after youtube player has finished loading itself.
{
    alert("got to utub callback");
    ytplayers.push(document.getElementById("ytPLayer" + ytplayers.length));

    //If we need to do something with the player periodically, we could add a timer here.
    //updatePlayerInfo is just a function we could make and name it anything we want...
    //setInterval(updatePlayerInfo, 250); 
    //updatePlayerInfo();

    //onStateChange and onError are players own events, and if we need to do something of our own when they occurr, add an event listener here
    //ytplayers[ytplayers.length - 1].addEventListener("onStateChange", "onPlayerStateChange"); //onPlayerStateChange should be replaced with our own function's name
    //ytplayers[ytplayers.length - 1].addEventListener("onError", "onPlayerError");             //onPlayerError should be replaced with our own function's name

    //This starts to play the video with the given id
    ytplayers[ytplayers.length - 1].cueVideoById(videoList.shift()); //shift() Removes the first item of the array, and returns that item.

}