function buttonPlayClicked() {
    //
    mainPlayer.playVideo();
}

function buttonPauseClicked() {
    //
    mainPlayer.pauseVideo();
}

function buttonNextClicked() {
    if (otherPlayerLoaded) { //If it's true, it means all checks have been made so we can just jump to the next video
        goToNextPlayer(); //Defined in YouTubeHandler.js
        return;
    }

    //Now we cannot assume that any checks have been done so we have to do them ourselves.

    if (playlistFinished || destroyInitiated || videoList.length == 0) { //not sure if the last one is needed
        return; //Either there is no video after this one, or we're already in the process of changing to an other one
    }

    loadSecondPlayer();

    goToNextPlayer();
    /*
    alert("next clicked");
    if (playlistFinished || destroyInitiated || otherPlayerLoaded) {

        return;
    }
    */

}

function buttonPrevClicked(){
    //
    alert("prev clicked");
}

function buttonStopClicked() {
    //
    mainPlayer.stopVideo();
}