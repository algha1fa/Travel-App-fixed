var API_KEY = '19538340-a16415b9540a7644122c7182c';
var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent('red roses');
$.getJSON(URL, function(data) {
    if (parseInt(data.totalHits) > 0)
        $.each(data.hits, function(i, hit) { console.log(hit.pageURL); });
    else
        console.log('No hits');
});