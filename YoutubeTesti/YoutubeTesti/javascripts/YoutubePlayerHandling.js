var ytplayers = new Array(); //In an array so the number of youtube players isn't hard coded
var videoList = new Array(); //add video ids here and pop when we've made a player for that video
var videoDivList = new Array();
var videoTitleDivList = new Array();
var currentVideoIdx = 0;
var currentVideoLength = 0;
var videoStateTimer;
var overHalfway = false;

var createNewPlayer = function (count)
{
    var params = { allowScriptAccess: "always" }; //Enables access to player's controls from other hosts, not sure if needed...

    var atts = { id: "ytPlayer" + count }; //This is the html id using which we can find the element with getElementById etc

    var playerApiId = "apiplayer" + count;
    var playerDivId = "playerDiv" + count;
    videoDivList.push("ytPlayer" + count);
    videoTitleDivList.push("videoTitle" + count.toString()); 

    swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1&playerapiid=" + playerApiId,
        playerDivId, "480", "295", "9", null, null, params, atts);

}

function onYouTubePlayerReady() //executed when onYouTubePlayerReady() is, hence the (retarded) name
{
    ytplayers.push(document.getElementById("ytPlayer" + ytplayers.length.toString()));

    //If we need to do something with the player periodically, we could add a timer here.
    //updatePlayerInfo is just a function we could make and name it anything we want...
    //setInterval(updatePlayerInfo, 250); 
    //updatePlayerInfo();

    //onStateChange and onError are players own events, and if we need to do something of our own when they occurr, add an event listener here
    //ytplayers[ytplayers.length - 1].addEventListener("onStateChange", "onPlayerStateChange"); //onPlayerStateChange should be replaced with our own function's name
    //ytplayers[ytplayers.length - 1].addEventListener("onError", "onPlayerError");             //onPlayerError should be replaced with our own function's name

    ytplayers[ytplayers.length - 1].addEventListener("onStateChange", "onPlayerStateChange");
    ytplayers[ytplayers.length - 1].cueVideoById(videoList.shift(), 0, "highres"); //shift() Removes the first item of the array, and returns that item.

}

function startPlaylistMode()
{
    ytplayers[currentVideoIdx].playVideo();

    setTimeout("startVideoCheck()", 2000); //We have to give time for the video's metadata to propagate before we can set currentVideoLength
}

function startVideoCheck() {

    setVideoLength();
    videoStateTimer = setInterval("checkVideoState()", 500);

}

function setVideoLength()
{
    var length = ytplayers[currentVideoIdx].getDuration();
    if (length != 0) {
        currentVideoLength = length;
    }
    else {
        setTimeout("setVideoLength()", 500);
    }
}

function removeLastVideo() {
    if (ytplayers[0].getPlayerState() == 0) {
        var mainDiv = document.getElementById("mainDiv");
        mainDiv.removeChild(document.getElementById(videoDivList.shift())); //remove the div containing the video
        mainDiv.removeChild(document.getElementById(videoTitleDivList.shift())); //remove the title div of the video
        ytplayers.shift(); //remove the player from the player list
        currentVideoIdx--; //because all indices in the player list are moved one backwards, we have to compensate
    }
    else {
        setTimeout("removeLastVideo", 500);
    }

}

function checkVideoState()
{
    if (ytplayers.length - 1 > currentVideoIdx) { //Aka "if there is an another video after this one"
        if (currentVideoLength / 2 < ytplayers[currentVideoIdx].getCurrentTime() && overHalfway == false ) { //Aka "if we're over halfway through the video
            //Start the next video and pause it immediately so it starts buffering
            ytplayers[currentVideoIdx + 1].playVideo();
            ytplayers[currentVideoIdx + 1].pauseVideo();
            overHalfway = true;
        }
        else if (currentVideoLength - ytplayers[currentVideoIdx].getCurrentTime() <= 2) {
            playNextVideo();
        }
    }
    else {
        clearInterval(videoStateTimer);
    }
}

function playNextVideo() {
    currentVideoIdx++;
    ytplayers[currentVideoIdx].playVideo();
    currentVideoLength = 999999;
    setTimeout("setVideoLength()", 500);
    setTimeout("removeLastVideo()", 500);
    overHalfway = false;
}
