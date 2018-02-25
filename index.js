var loadquote = function() {
    $.ajax({
        type: "GET",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1",
        data: {},
        dataType: 'json',
        success: function(data) {
            youtubeCall(data.quote, data.author);
        },
        error: function(err) { alert("Internet Disconnected!"); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "ryB0q5KlGGmshFp7gYxbKmNNlYwZp1VR487jsnByzMIGHEKhc3");
        }
    });
};

$(".button").on("click", function() {
    loadquote();
});


function movieInfoCall(movieName) {
    const OMDB_REQUEST_URL = 'http://www.omdbapi.com/?apikey=26e9994f&';
    const query = {
        t: `${movieName}`, 
    }
    $.getJSON(OMDB_REQUEST_URL, query, showResultsOMDB); 
}

function showResultsOMDB(data) {
    console.log(data)
    console.log(data.Year)
    $(".div-right").html(`<p class="title">${data.Title}</p>`);
    $(".div-right").append(`<p class="property-name">Year: <span class="info-text">${data.Year}</span></p>`);
    $(".div-right").append(`<p class="property-name">Director: <span class="info-text">${data.Director}</span></p>`);
    $(".div-right").append(`<p class="property-name">Cast: <span class="info-text">${data.Actors}</span></p>`);
    $(".div-right").append(`<p class="property-name">Story: <span class="info-text">${data.Plot}</span></p>`);


}

function youtubeCall(quote, movie) {
    const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

    const query = {
        q: `${quote} ${movie} movie scene`,
        per_page: 1,
        part: 'snippet',
        key: "AIzaSyDW01WDj_JY47WKZmAJ14fj7TXaiM-nOZM"

    }
    

    if(
        quote !== brokenVids.a && 
        quote !== brokenVids.b &&
        quote !== brokenVids.c &&
        quote !== brokenVids.d &&
        quote !== brokenVids.e &&
        quote !== brokenVids.f &&
        quote !== brokenVids.g &&
        quote !== brokenVids.h &&
        quote !== brokenVids.i &&
        quote !== brokenVids.j &&
        quote !== brokenVids.k &&
        quote !== brokenVids.l &&
        quote !== brokenVids.m &&
        quote !== brokenVids.n &&
        quote !== brokenVids.o &&
        quote !== brokenVids.p &&
        quote !== brokenVids.q

    ) {
        $.getJSON(YOUTUBE_SEARCH_URL, query, getJSONCB);
        movieInfoCall(movie);
        console.log(quote);
        console.log(query.q);
    } else {
        loadquote(); 
    }
}

function getJSONCB(data) {
    for (let i = 0; i < 5; i++) {
        if (data.items[i].snippet.channelTitle !== "Movieclips" &&
            data.items[i].snippet.title !== "AFI's 100 Movie Quotes (Part 1)") {
            $("#video").html(
                `<div id="video-outer-container"><div class="video-container"><iframe width="500" height="300" src="https://www.youtube.com/embed/${data.items[i].id.videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>`
            );
            console.log(data);
            console.log(data.items[0].snippet.channelTitle);
            console.log(data.items[1].snippet.channelTitle);
            console.log(data.items[2].snippet.channelTitle);
            console.log(data.items[3].snippet.channelTitle);
            console.log(data.items[4].snippet.channelTitle);
            break;
        }   
    }

}

const brokenVids = {
    a: "What we've got here is failure to communicate.",
    b: "Why don't you come up sometime and see me?",
    c: "Do, or do not. There is no 'try'.",
    d: "If you build it, he will come.",
    e: "Elementary, my dear Watson.",
    f: "You're gonna need a bigger boat.",
    g: "A boy's best friend is his mother.",
    h: "I'm walking here! I'm walking here!",
    i: "Say hello to my little friend!",
    j: "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
    k: "Of all the gin joints in all the towns in all the world, she walks into mine.",
    l: "Houston, we have a problem.",
    m: "I see dead people.",
    n: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
    o: "Play it, Sam. Play 'As Time Goes By.'",
    p: "Nobody puts Baby in a corner.",
    q: "E.T. phone home.",



}
//key for omdb api: 26e9994f