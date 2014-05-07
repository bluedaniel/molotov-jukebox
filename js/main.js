$(function() {

    var tourTable = $('table#tourTable tbody');

    $.ajax({
        url: 'tourDates.txt',
    }).done(function(data) {

        var tourTableHtml = [],
            dates = data.split('\n');

        $.each(dates, function(i, o) {
            if (o.length) {
                var tourDate = o.split('//'),
                    tdate = tourDate[0].trim(),
                    tplace = tourDate[1].trim(),
                    country = tourDate[2].trim(),
                    tourTableRow = [];

                tourTableRow.push(tdate);
                tourTableRow.push(tplace + ', <span class="country">' + country + '</span>');

                tourTableHtml.push('<td>' + tourTableRow.join('</td><td>') + '</td>');
            }
        });

        tourTable.append('<tr>' + tourTableHtml.join('</tr><tr>') + '</tr>');
    });
});

// https://dev.twitter.com/docs/intents#follow-intent
(function() {
    if (window.__twitterIntentHandler) return;
    var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
        windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        width = 550,
        height = 420,
        winHeight = screen.height,
        winWidth = screen.width;

    function handleIntent(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            m, left, top;

        while (target && target.nodeName.toLowerCase() !== 'a') {
            target = target.parentNode;
        }

        if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
            m = target.href.match(intentRegex);
            if (m) {
                left = Math.round((winWidth / 2) - (width / 2));
                top = 0;

                if (winHeight > height) {
                    top = Math.round((winHeight / 2) - (height / 2));
                }

                window.open(target.href, 'intent', windowOptions + ',width=' + width +
                    ',height=' + height + ',left=' + left + ',top=' + top);
                e.returnValue = false;
                e.preventDefault && e.preventDefault();
            }
        }
    }

    if (document.addEventListener) {
        document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
        document.attachEvent('onclick', handleIntent);
    }
    window.__twitterIntentHandler = true;
}());
