
var topics = ["bird", "horse", "dog", "cat"];

function displayGif() {
    var gif = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=fm8MjdU6IHrGUTJVzX5qk2jINM706cal&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //$("#gif-view").text(JSON.stringify(response));
        for (var g = 0; g < 10; g++) {
            var gifDiv = $("<div class = 'gifs'>");
            var rating = response.data[g].rating;
            var pOne = $("<p>").text("Rating: " + rating);

            var stillUrl = response.data[g].images.downsized_still.url;
            var aniUrl = response.data[g].images.downsized.url;

            var img = $("<img>").attr("src", stillUrl);
            img.attr("data-still", stillUrl);
            img.attr("data-animate", aniUrl);

            var dataStateStill = "still";
            var gif = "gif";
            img.attr("data-state", dataStateStill);
            img.attr("class", gif);


            gifDiv.append(pOne);
            gifDiv.append(img);
            $("#gif-view").prepend(gifDiv);

            $(".gif").on("click", function() {
    
                var state = $(this).attr("data-state");
                
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        }
    });
};
//displayGif();
//creates buttons from topics list
function createButtons() {
    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a  = $("<button>");
        a.addClass("btn btn-outline-primary gif-loader");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#gif-buttons").append(a);
    }
}
//Add user input to the array and thus adds a new button
$("#add-gif").on("click", function(event){
    event.preventDefault();

    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    createButtons();
});

$("#gif-buttons").on("click", ".gif-loader", displayGif);

createButtons();
