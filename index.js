$(load)

function load() {
    $(".button").on("click", function() {
        loadquote();
        $(".button")
            .prop("disabled", true)
            .addClass("disabled");
    });
}


//api that returns random famous movie quote
function loadquote() {
    $.ajax({
        type: "GET",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1",
        data: {},
        dataType: 'json',
        success: function(data) {
            //if ajax call returns broken movie, call loadquote function again
            if(data.author === "On Golden Pond") {
                console.log("caught broken movie: On Golden Pond", data);
                loadquote();
            } else {
                let movieQuote = data.quote;
                let movieName = data.author;
                movieInfoCall(movieQuote, movieName); 
                
                //console.log for reference 
                console.log("get quote API success", data);
            };
        },
        error: function(err) { 
            console.error("random quote", err); 
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "ryB0q5KlGGmshFp7gYxbKmNNlYwZp1VR487jsnByzMIGHEKhc3");
        }
    });
};

//api that returns movie details 
function movieInfoCall(movieQuote, movieName) {
    const OMDB_REQUEST_URL = 'https://www.omdbapi.com/?apikey=26e9994f&t='+ movieName;

    $.ajax({
        type: "GET",
        url: OMDB_REQUEST_URL,
        data: {},
        dataType: 'jsonp',
        success: showResultsOMDB.bind(this, movieQuote, movieName),
        error: function(err) {
            console.log("error OMDB", err);
            loadquote();    
        },
        beforeSend: function(xhr) {}
    });

}


function showResultsOMDB(movieQuote, movieName, data) {
    //console.logs for reference 
    console.log("get movie info API success", data);
    console.log(data.Year);
    
    if (data.Response === "False") {        
        loadquote();

    } else {
        const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
        const query = {
            q: `${movieQuote} ${movieName} movie scene`,
            per_page: 1,
            part: 'snippet',
            key: "AIzaSyDW01WDj_JY47WKZmAJ14fj7TXaiM-nOZM"
        }
        //console.log for reference
        console.log("youtube query: ", query.q);

        let youtubeJSON = $.getJSON(YOUTUBE_SEARCH_URL, query, loadYoutubeVideo)
        .always(function(){
            //enable button 
            setTimeout(function(){ 
                $(".button")
                        .prop("disabled", false)
                        .removeClass("disabled");
            }, 1200);
        });

        $(".div-right").html(`<p class="title">${data.Title}</p>`);
        $(".div-right").append(`<p class="property-name">Year: <span class="info-text">${data.Year}</span></p>`);
        $(".div-right").append(`<p class="property-name">Director: <span class="info-text">${data.Director}</span></p>`);
        $(".div-right").append(`<p class="property-name">Cast: <span class="info-text">${data.Actors}</span></p>`);
        $(".div-right").append(`<p class="property-name">Story: <span class="info-text">${data.Plot}</span></p>`);
    };
}

function loadYoutubeVideo(data) {
    for (let i = 0; i < 5; i++) {
        if (
            // data.items[i].snippet.channelTitle !== "Movieclips" &&
            data.items[i].snippet.title !== "AFI's 100 Movie Quotes (Part 1)") {
            $("#video").html(`<div id="video-outer-container"><div class="video-container"><iframe width="500" height="300" src="https://www.youtube.com/embed/${data.items[i].id.videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>`);
            break;
        }   
    }
}