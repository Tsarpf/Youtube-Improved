var videoList = new Array();
var titleList = new Array();
var mainPlayer;
var videoLength = 0;
var progressPercent = 0;
var mainPlayer;
var currentPlayer = 0;
var firstRun = true;
var otherPlayerLoaded = false;
var destroyInitiated = false;
var progressBarInterval;
var playlistFinished = false;
var currentVideoIdx = 0;
var loadedVideoDirection = "forward";

function createNewPlayer(index) {

        var params = { allowScriptAccess: "always" };

        //<div id="videoDiv" class="well" style="position: absolute; bottom: 30px; right:30px;top:65px;left:0px;"> Loading....</div>
        var atts = { id: "ytPlayer" + index, style: "position: absolute; top: 85px; right:30px;left:30px;" };

        var playerApiId = "player" + index;

        var playerDivId = "videoDiv" + index;

        swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1&playerapiid=" + playerApiId,
            playerDivId, "640", "360", "9", null, null, params, atts); //resolution and "9" is minimum flash version
}

function onYouTubePlayerReady()
{
    if (firstRun) {
        firstRun = false;
        var player = document.getElementById("ytPlayer" + currentPlayer);
        player.cueVideoById(videoList[0], 0, "highres"); //get video from top of list, start at 0 seconds, maximum available quality
        player.playVideo();
        mainPlayer = player;
        setTimeout("setUp()", 1000);
    }
}


function setUp() {
    if (progressBarInterval)
        clearInterval(progressBarInterval);    {
    }
    if (typeof mainPlayer != 'undefined') { //Video isn't playing or something
        var length = mainPlayer.getDuration();
        if (length != 0){ //Length is 0 when we've started playing but metadata hasn't propagated yet.
            videoLength = length;
            prepareVolumeBar();
            prepareProgressBar();
            return;
        }
    }

    setTimeout("setUp()", 500);
}

function prepareVolumeBar() {
    mainPlayer.setVolume(50);
    $('.v-slider').slider("value", mainPlayer.getVolume());
    var txtV = $('.v-slider').slider('value');
    $('.v-slider').find('.ui-slider-handle').button();
    $('.v-slider').find('.ui-slider-handle span').text(txtV);
}

function prepareProgressBar() {
    var interval = videoLength / 100;
    if (interval < 100) {
        interval = 100
    }

    progressPercent = (mainPlayer.getCurrentTime() / videoLength) * 100;
    progressBarInterval = setInterval("updateProgressBar()", interval);
}

function updateProgressBar(){
    progressPercent = ((mainPlayer.getCurrentTime() / videoLength) * 100);

    $('.h-slider').slider("value", progressPercent);
    var text = (videoLength - mainPlayer.getCurrentTime()).toFixed(); //+ "s";
    $('.h-slider').find('.ui-slider-handle span').text(text)

    if (currentVideoIdx + 1 < videoList.length) { //aka if there is a next video
        if (progressPercent > 66 && !otherPlayerLoaded) {
            loadSecondPlayer();
        }
    }

    if (!playlistFinished && !destroyInitiated && (videoLength - mainPlayer.getCurrentTime() <= 3)) {
        goToNextPlayer();
    }
}

function goToNextPlayer() {
    destroyInitiated = true;

    if (videoList.length == 0) {
        playlistFinished = true;
    }

    hidePlayer(currentPlayer);

    if(loadedVideoDirection == "forward"){
        currentVideoIdx++;
    }
    else if(loadedVideoDirection == "backward"){
        currentVideoIdx--;
    }

    if (currentPlayer == 0) {
        currentPlayer = 1;
    }
    else if (currentPlayer == 1) {
        currentPlayer = 0;
    }

    showPlayer(currentPlayer);

    setTimeout("startNewPlayer()", 1000); //Should be 1-2 seconds less than what the if condition has
}


function startNewPlayer() {
    otherPlayerLoaded = false;
    var player = document.getElementById("ytPlayer" + currentPlayer);
    player.playVideo();
    mainPlayer = document.getElementById("ytPlayer" + currentPlayer); //not sure if could just mainPlayer = player ... asd tired
    destroyInitiated = false;
    setTimeout("setUp()", 1000);
}

function loadSecondPlayer(direction) {

    if (typeof (direction) === 'undefined') direction = "forward"; //Javascript style default argument (google)

    loadedVideoDirection = direction; 
    
    otherPlayerLoaded = true;

    var video;
    var title;

    if (direction == "forward") {
        video = videoList[currentVideoIdx + 1];
        title = titleList[currentVideoIdx + 1];
    }

    else if (direction == "backward" && currentVideoIdx > 0) {
        video = videoList[currentVideoIdx - 1];
        title = titleList[currentVideoIdx - 1];
    }
    else {
        console.log("Error: cannot go backwards from first video");
        //Can't go backward
        //return;
    }

    var index;

    currentPlayer == 0 ? index = 1 : index = 0; //http://msdn.microsoft.com/en-us/library/ty67wk28(v=vs.80).aspx

    document.getElementById("ytPlayer" + index).cueVideoById(video, 0, "highres");
    document.getElementById("ytPlayer" + index).playVideo();
    document.getElementById("ytPlayer" + index).pauseVideo();
    document.getElementById("videoTitle" + index).innerHTML = title;
}

function showPlayer(index) {
    document.getElementById("mainVideoDiv" + index).style.zIndex = 0;
    $("#mainVideoDiv" + index).animate({
        "left": "20px"
    }, 1000);
}

function hidePlayer(index) {
    document.getElementById("mainVideoDiv" + index).style.zIndex = 1;
    $("#mainVideoDiv" + index).animate({ //moves at speed "slow" to the target css value
        "left": "-750px"
    }, 1000);
}
