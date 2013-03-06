$(document).ready(function () {

    //document.getElementById("mainVideoDiv1").style.visibility = "hidden"; //hide the other player
    //$('#mainVideoDiv1').hide();
    //document.getElementById("mainVideoDiv1").style.position = "fixed";

    $('button').button();

    $('.button').button();

    $('.h-slider').slider({
        range: "min",
        min: 0,
        value: 0,
        max: 100,
        slide: function (event, ui) {
            $(this).find('.ui-slider-handle span').text(ui.value);
            var onePercentInSeconds = videoLength / 100;
            mainPlayer.seekTo(ui.value * onePercentInSeconds);
        },
        create: function (event, ui) {
            var txtV = $(this).slider('value');
            $(this).find('.ui-slider-handle').button();
            $(this).find('.ui-slider-handle span').text(txtV);
        }
    });

    $('.v-slider').slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            $(this).find('.ui-slider-handle span').text(ui.value);
            mainPlayer.setVolume(ui.value);
        },
        create: function (event, ui) {
            var txtV = $(this).slider('value');

            $(this).find('.ui-slider-handle').button();
            $(this).find('.ui-slider-handle span').text(txtV);

            $(this).find('.ui-slider-handle').css({
                '-moz-transform': 'rotate(270deg)',
                '-webkit-transform': 'rotate(270deg)',
                '-o-transform': 'rotate(270deg)',
                '-ms-transform': 'rotate(270deg)',
                'position': 'absolute',
                'left': '-14px'
            });
        }
    });
});
