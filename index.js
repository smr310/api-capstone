var loadquote = function() {
    $.ajax({
            type: "GET",
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1",
            data: {},
            dataType: 'json',
            success: function(data) {
            $("#quote-text").html(data.quote);
            $("#quote-author").html(data.author);  
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
