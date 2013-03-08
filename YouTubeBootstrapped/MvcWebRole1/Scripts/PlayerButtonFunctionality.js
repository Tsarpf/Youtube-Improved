function buttonPlayClicked() {
    //
    mainPlayer.playVideo();
}

function buttonPauseClicked() {
    //
    mainPlayer.pauseVideo();
}

function buttonNextClicked() {

    alert("next clicked");
    if (playlistFinished) {
        return;
    }


}

function buttonPrevClicked(){
    //
    alert("prev clicked");
}

function buttonStopClicked() {
    //
    mainPlayer.stopVideo();
}