$(function () {
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
    });

    $('#searchLink').click(function () {
        $('#search').dialog('open');
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

    function loadSong(songNumber) {
        var path = 'songs/' + songNumber + '.htm';
        $('#song').attr('src', 'songs/' + songNumber + '.htm');
    };

    function searchSongs(searchTerms) {
        var url = "b.txt";

        var reader = new FileReader();
        reader.readAsText(url);
        
        //if (window.XMLHttpRequest) {
        //    var oReq = new XMLHttpRequest(); 
        //    oReq.open('get', url, false);
        //    oReq.onload = function () {
        //        var dom = new ActiveXObject('Microsoft.XMLDOM'),
        //            HTML = $.parseHTML(oReq.responseText);

        //        dom.async = false;

        //        if (HTML == null || typeof (HTML) == 'undefined') {
        //            HTML = $.parseHTML(data.firstChild.textContent);
        //        }

        //        successCallback(HTML); // internal function
        //    };

        //    oReq.onerror = function () {
        //        _result = false;
        //    };

        //    oReq.send();
        //} else {
        //    $.ajax({
        //        url: "b.html",
        //        crossDomain: true,
        //        dataType: "text/plain",
        //        success: function (data) {
        //            var markup = data;
        //            return markup;
        //        },
        //        error: function (err) {
        //        }
        //    });
        //}
        
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