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


function createNewPlayer(index) {

        var params = { allowScriptAccess: "always" };

        //<div id="videoDiv" class="well" style="position: absolute; bottom: 30px; right:30px;top:65px;left:0px;"> Loading....</div>
        var atts = { id: "ytPlayer" + index, style: "position: absolute; bottom: 50px; right:30px;left:0px;" };

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
        player.cueVideoById(videoList.shift(), 0, "highres"); //get video from top of list, start at 0 seconds, maximum available quality
        player.playVideo();
        mainPlayer = player;
        setTimeout("setUp()", 1000);
    }
}


function setUp() {
    if (progressBarInterval)
        clearInterval(progressBarInterval);    {

    }
    if (typeof mainPlayer != 'undefined') { //Video isn't player or something
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

    if (videoList.length > 0) {
        if (progressPercent > 66 && !otherPlayerLoaded) {
            loadSecondPlayer();
            otherPlayerLoaded = true;

            if (videoList.length == 0) {
                playlistFinished = true;
            }
        }
    }

        if (!playlistFinished && !destroyInitiated && (videoLength - mainPlayer.getCurrentTime() <= 5)) {
            destroyInitiated = true;


            hidePlayer(currentPlayer);

            if (currentPlayer == 0) {
                currentPlayer = 1;
            }
            else if (currentPlayer == 1) {
                currentPlayer = 0;
            }

            showPlayer(currentPlayer);

            setTimeout("startNewPlayer()", 3000); //Should be 1-2 seconds less than what the if condition has
        }
}

function startNewPlayer() {
    var player = document.getElementById("ytPlayer" + currentPlayer);
    player.playVideo();
    mainPlayer = document.getElementById("ytPlayer" + currentPlayer); //not sure if could just mainPlayer = player ... asd tired
    destroyInitiated = false;
    setTimeout("setUp()", 1000);
    otherPlayerLoaded = false;
}

function loadSecondPlayer() {
    console.log("current player: " + currentPlayer);

    if (currentPlayer == 0) {
        document.getElementById("ytPlayer1").cueVideoById(videoList.shift(), 0, "highres");
        document.getElementById("ytPlayer1").playVideo();
        document.getElementById("ytPlayer1").pauseVideo();
        document.getElementById("videoTitle1").innerHTML = titleList.shift();
    }
    else if (currentPlayer == 1) {
        document.getElementById("ytPlayer0").cueVideoById(videoList.shift(), 0, "highres");
        document.getElementById("ytPlayer0").playVideo();
        document.getElementById("ytPlayer0").pauseVideo();
        document.getElementById("videoTitle0").innerHTML = titleList.shift();
    }
    else {
        console.log("This shouldn't have happened");
        return;
    }
}

function showPlayer(index) {
    document.getElementById("mainVideoDiv" + index).style.zIndex = 0;
    $("#mainVideoDiv" + index).animate({
        "left": "20px" //,
        //"z-index": "*=-1"       //this is in both showplayer and hideplayer functions because the other is zero so it won't be affected by the multiplication
    }, 3000);
}

function hidePlayer(index) {
    document.getElementById("mainVideoDiv" + index).style.zIndex = 1;
    $("#mainVideoDiv" + index).animate({ //moves at speed "slow" to the target css value
        "left": "-750px" //,
        //"z-index": "*=-1"
    }, 5000);
}
