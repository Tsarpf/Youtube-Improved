function buttonPlayClicked() {
    mainPlayer.playVideo();
}

function buttonPauseClicked() {
    mainPlayer.pauseVideo();
}

function buttonNextClicked() {
    if (otherPlayerLoaded) { //If it's true, it means all checks have been made so we can just jump to the next video
        mainPlayer.stopVideo();
        goToNextPlayer(); //Defined in YouTubeHandler.js
        return;
    }

    //Now we cannot assume that any checks have been done so we have to do them ourselves.

    if (playlistFinished || destroyInitiated || currentVideoIdx + 1 >= videoList.length) {
        return; //Either there is no video after this one, or we're already in the process of changing to an other one
    }

    loadSecondPlayer(); //Both in YouTubeHandler..js
    goToNextPlayer();
    mainPlayer.stopVideo();
}

function buttonPrevClicked(){
    console.log("prev clicked");

}

function buttonStopClicked() {
    mainPlayer.stopVideo();
}


