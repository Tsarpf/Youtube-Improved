function buttonPlayClicked() {
    mainPlayer.playVideo();
}

function buttonPauseClicked() {
    mainPlayer.pauseVideo();
}

function buttonNextClicked() {
    if (playlistFinished || destroyInitiated || currentVideoIdx + 1 >= videoList.length) {
        return; //Either there is no video after this one, or we're already in the process of changing to an other one
    }

    mainPlayer.stopVideo();
    loadSecondPlayer(); //Defined in YouTubeHandler..js
    goToNextPlayer();
}

function buttonPrevClicked(){
    if (currentVideoIdx - 1 < 0 || destroyInitiated) {
        console.log("Couldn't go backwards");
        return; 
    }

    playlistFinished = false; //Remember to put this somewhere
    loadSecondPlayer("backward");
    mainPlayer.stopVideo();
    goToNextPlayer();
}

function buttonStopClicked() {
    mainPlayer.stopVideo();
}


