// The below code fills in the first row of the table
// array of topics
var topics = ["devil may cry 4", "assassin's creed", "legend of zelda", "overwatch", "metal gear solid", "persona 5", "tekken 7", "little big planet", "front mission"]
// var set for user input
var input

// -----------------
// Code below is create new buttons
// -----------------
function createButtons(){
 // clear out the existing buttons to avoid repeat
  $("#gameButtons").empty();
  // create buttons and append them to id gameButtons
  // The for loop creates a button for each element in the array
  for(var i=0; i<topics.length; i++){
    // each button is assigned a data-name equal to an element in the array
    $("#gameButtons").append(`<button type='button' class='btn btn-default' data-name = \"${topics[i]}\" id='gameName'>${topics[i]}</button`)
  };
  
  // make the buttons pull up gifs via click
  $("button").click(function(){

    // clear out the old gifs
    $('#videogames').empty();

    // assign var name to the button's data-name when clicked
    var name = $(this).attr("data-name");
    // combine name with the rest of the URL and make sure the limit is 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+name+"&limit=10&api_key=dc6zaTOxFJmzC";
      // Creating an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response)
      {
        var results = response.data;
      
        for (var l = 0; l < results.length; l++) {
          var gifDiv = $("<div class='col'>");

          var rating = results[l].rating;

          var p = $("<p>").text("Rating: " + rating);

          // holds the still gif
          var still = results[l].images.fixed_height_still.url
          // holds the animated gif
          var animate = results[l].images.fixed_height.url

          var gameImage = $("<img>");
          // have the gif load in on the still state
          gameImage.attr("src", still);
          // assign data attributes for still and animate
          gameImage.attr("data-still", still);
          gameImage.attr("data-animate", animate);
          // set the state at still when page first loads
          gameImage.attr("data-state", "still");
          gameImage.addClass("gif");
          // append both the image and the rating to the created div
          
          gifDiv.prepend(gameImage);
          gifDiv.prepend(p);

          $("#videogames").prepend(gifDiv);
        };


        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
    });
};


// when submit is clicked add another button to the list
$("#submit").on("click", function(event){
  // keeps the form from trying to submit itself
  event.preventDefault();
  // store what is typed into the input box as a var
  input = $("#game").val().trim();
  
  // create buttons for each element in the array
  if(topics.indexOf(input) == -1){
    // add the new string to the end of the array if it doesn't exist in it
    topics.push(input);
    // generate the new button
    createButtons();
    };
})

// generate the buttons already in the array
createButtons();
