var videoList = new Array();
var mainPlayer;
var videoLength = 0;
var progressPercent = 0;
var mainPlayer;

function createNewPlayer(index) {

    var params = { allowScriptAccess: "always" };

//<div id="videoDiv" class="well" style="position: absolute; bottom: 30px; right:30px;top:65px;left:0px;"> Loading....</div>
    var atts = { id: "ytPlayer" + index, style: "position: absolute; bottom: 50px; right:30px;left:0px;" };

    var playerApiId = "player" + index;

    var playerDivId = "videoDiv" + index;

    swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1&playerapiid=" + playerApiId,
        playerDivId, "640", "360", "9", null, null, params, atts);
}


function onYouTubePlayerReady()
{
    mainPlayer = document.getElementById("ytPlayer0");

    mainPlayer.cueVideoById(videoList.shift(), 0, "highres"); //get video from top of list, start at 0 seconds, maximum available quality
    mainPlayer.playVideo();
    //$('#h-slider').slider(
    setTimeout("setVideoLength()", 1000);
}

function setVideoLength() {
    if (typeof mainPlayer != 'undefined') {
        var length = mainPlayer.getDuration();
        if (length == 0) { //Means video metadata not propagated yet.
            setTimeout("setVideoLength()", 500); //Try again later.
            return;
        }

        videoLength = length;
        prepareProgressBar();
    }
}

function setVideoLength() {
    if (typeof mainPlayer != 'undefined') { //Video isn't player or something
        var length = mainPlayer.getDuration();
        if (length != 0){ //Length is 0 when we've started playing but metadata hasn't propagated yet.
            videoLength = length;
            prepareProgressBar();
            return;
        }
    }

    setTimeout("setVideoLength()", 500);
}


function prepareProgressBar() {
    var interval = videoLength / 100;
    if (interval < 100) {
        interval = 100
    }

    progressPercent = (mainPlayer.getCurrentTime() / videoLength) * 100;
    setInterval("updateProgressBar()", interval);
}

function updateProgressBar(){
    progressPercent =  ((mainPlayer.getCurrentTime() / videoLength) * 100).toFixed();
    $('.h-slider').slider("value", progressPercent);
    var text = (videoLength - mainPlayer.getCurrentTime()).toFixed() + "s";
    $('.h-slider').find('.ui-slider-handle span').text(text)
}

