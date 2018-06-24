var topics = ["Cat", "Dog", "Bird", "Frog", "Rabbit", "Chicken", "Llama", "Tiger", "Bear", "Cow", "Fish", "Kangaroo"];

// Loads animal buttons from array on initial page load
jQuery.each(topics, function (index, value) {
    console.log("index:", index, "value:", value);
    $("#animalButtons").append(`<button type="button" class="btn btn-primary newBtn">${value}</button>`);
});

// Adds new animal button when you click ADD
//$(document).on("click", "button", function (event) {
$("#animalSearchButton").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animalSearch").val().trim();
    topics.push(animal);
    $("#animalButtons").empty();

    jQuery.each(topics, function (index, value) {
        console.log("index:", index, "value:", value);
        $("#animalButtons").append(`<button type="button" class="btn btn-primary newBtn">${value}</button>`);
    });
});

// Generates 10 animal GIFs when you click on an animal button
$("#animalButtons").on("click", ".newBtn", function () {
    var thisAnimal = $(this).text();
    console.log(thisAnimal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&api_key=AhtOGOPB87SS072FEnmn1cFX6x3U9Kd9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            $("#animalGifs").empty();
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
                // Storing the result item's rating
                var rating = results[i].rating;
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
                // Creating an image tag
                var animalStatic = $("<img>");
                // Giving the image tag an src attribute of a property pulled off the results item;
                animalStatic.attr({
                    src: results[i].images.fixed_height_still.url,
                    still: results[i].images.fixed_height_still.url,
                    animate: results[i].images.fixed_height.url,
                    state: "still",
                    class: "gif"
                });
                //console.log(results[i].images);
                // Appending the paragraph and animal gif to the "gifDiv" div
                gifDiv.append(p);
                gifDiv.append(animalStatic);
                gifDiv.append("<br>");
                gifDiv.append("<br>");
                // Prepending the gifDiv to the "#animalGifs" div in the HTML
                $("#animalGifs").prepend(gifDiv);
            }
            // Adding pause/play functionality
            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("animate"));
                    $(this).attr("state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("state", "still");
                }
            });
        });
});