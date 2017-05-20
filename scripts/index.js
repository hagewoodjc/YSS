$(function () {
    $('#songInputForm').submit(function (event) {
        try {
            var song = $("input[name='songNumber']").val();
            loadSong(song);
            event.preventDefault();
        } catch(err) {
            alert(err);
        }
    });

    function loadSong(songNumber) {
        var path = 'songs/' + songNumber + '.htm';
        $('#song').attr('src', 'songs/' + songNumber + '.htm');
    };
});