$(function () {
	
	var songQueue = [];
	var queueCounter = 0;
	
	$( "#items" ).sortable();
    $( "#items" ).disableSelection();

    $('#songInputForm').submit(function (event) {
        try {
            var song = $("input[name='songNumber']").val();
            loadSong(song);
            event.preventDefault();
        } catch (err) {
            alert(err);
        }
    });

    $('#search').dialog({
        autoOpen: false,
        modal: true,
        resize: 'auto',
        minHeight: 550,
        minWidth: 550,
        title: 'Song Search',
        open: function (event, ui) {
            resolveSearchVisibility();
        }
    });

    $('#queue').dialog({
		autoOpen: false,
        modal: true,
        resize: 'auto',
        minHeight: 300,
        minWidth: 300,
        title: 'Song Queue',
		open: function (event, ui) {
        },
		close: function(event, ui) {			
			var nav = $("input[name='songNumber']");
			songQueue = $('#items').sortable('toArray');
			if(songQueue.length > 0) {	
				var song = songQueue[queueCounter];
				nav.val(song);
				loadSong(song);				
			} else {
				loadSong('b');
				$("input[name='songNumber']").val("");
			}
		}
	});

    $('#searchLink').click(function () {
        $('#search').dialog('open');
    });
	
	$('#queueLink').click(function () {
		$('#queue').dialog('open');
	});	

	$('#addToQueue').click(function () {
		var song = $("input[name='queueNumber']").val();
		var items = $('#items');
		items.append('<li id=' + song + ' class="ui-state-default">' + song + '</li>');
		items.sortable('refresh');
		$("input[name='queueNumber']").val("");
	});
	
	$('#clearQueue').click(function () {
		songQueue = [];
		$('#items').html("");
		$("input[name='queueNumber']").val("");
	});
	
	$('#nextButton').click(function () {
		var nav = $("input[name='songNumber']");
		if(songQueue.length > 0) {	
			if (queueCounter < songQueue.length - 1)
					queueCounter++;
			var song = songQueue[queueCounter];
			nav.val(song);
			loadSong(song);							
		}
	});
	
	$('#backButton').click(function () {
		var nav = $("input[name='songNumber']");
		if (queueCounter != 0)
				queueCounter--;	
		if(songQueue.length > 0) {	
			var song = songQueue[queueCounter];
			nav.val(song);
			loadSong(song);						
		}
	});
	
    $('#searchForm').submit(function (event) {
        try {
            event.preventDefault();

            var items = [];
            for (var i = 1; i < 3; i++) {
                items.push(searchSongs(i));
            };
            $('#songAccordion').append(items);
            $('#songAccordion').accordion('refresh');

        } catch (err) {
            alert(err);
        }
    });

    $('#songAccordion').accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });

    $('#songFiles').change(function (event) {
        event.preventDefault();
        resolveSearchVisibility();
    });

    function resolveSearchVisibility(target) {
        if ($('#songFiles').files.length > 0) {
            $('#chooseSongs').hide();
            $('#searchSongs').show();
        } else {
            $('#chooseSongs').show();
            $('#searchSongs').hide();
        }
    };

    function loadSong(songNumber) {
        var path = 'songs/' + songNumber + '.htm';
        $('#song').attr('src', 'songs/' + songNumber + '.htm');
    };

    function searchSongs(searchTerms) {
        var url = "b.txt";

        var reader = new FileReader();
        reader.readAsText(url);
        
        return item;
    };

    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    };
});