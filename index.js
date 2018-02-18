var loadquote = function() {
    $.ajax({
        type: "GET",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1",
        data: {},
        dataType: 'json',
        success: function(data) {
            $("#quote-text").html(data.quote);
            $("#quote-author").html(data.author);
            youtubeCall(data.quote, data.author);
        },
        error: function(err) { alert("Internet Disconnected!"); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "ryB0q5KlGGmshFp7gYxbKmNNlYwZp1VR487jsnByzMIGHEKhc3");
        }
    });
};

$("#get-quote-button").on("click", function() {
    loadquote();
})

function youtubeCall(quote, movie) {
    const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

    const query = {
        q: `${quote} ${movie} scene`,
        per_page: 1,
        part: 'snippet',
        key: "AIzaSyDW01WDj_JY47WKZmAJ14fj7TXaiM-nOZM"

    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, getJSONCB);
    console.log(query.q);
}

function getJSONCB(data) {
    console.log(data);
    
    $("#video").html(
        `<iframe allowFullScreen="true" webkitallowfullscreen="true" width="420" height="315" src=https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1></iframe>`
    );
    console.log(data);
}

// {/* <iframe width="420" height="315"
// src="https://www.youtube.com/embed/tgbNymZ7vqY">
// </iframe> */}

//this is the link: https://www.youtube.com/watch?v=
// add id after = 
