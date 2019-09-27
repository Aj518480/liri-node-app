
//All packages that are needed to run this js file.
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);


//Made a variable for the switchboard  run all the functions needed for Liri
var switchboard = process.argv[2];


//Made a variable to grab all the argvs from the user's input after the second index
var userInput = process.argv.slice(3).join(" ");




//Create a functions for each 1.Concert, 2.Spotify,3.Movie,4.Do what it says

// Concert-this function
function concert(artist) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(queryUrl)
    .then(function (response) {

      var bandData = response.data[0]

      //venue name
      console.log(bandData.venue.name);

      //venue location
      //Am I putting the country or lat & Long???
      console.log(bandData.venue.country)


      //date of event using moment.js
      //Why is it coming back as undefined????
      console.log(bandData.venue.datetime)


    })
    .catch(function (err) {
      console.log(err);
    });

}

// Spotify-this-song function
function spotifyThis(userInput) {

  spotify
    .search({ type: 'track', query: userInput, limit: 1 })
    .then(function (response) {

      console.log(JSON.stringify(response.tracks.items[0], null, 2));
      //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

      //Spotify Artists
      console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
     

      //Spotify Song Name
      console.log();
       

      //Link of Song
      console.log();
      

      //Album of Song
       console.log();

      //If no song is provided by default put "The Sign" by Ace of Base.
      console.log()
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Movie-this function
function movie(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl)
  .then(function (response) {

      //made a variable to hold the information in more of a shorthand
      var movieData = response.data
      

      //title of the movie
      console.log(movieData.Title)

      //Year the movie came out
      console.log(movieData.Year)

      //IMDB rating of Movie
      console.log(movieData.Ratings[0])

      //Rotten Tomatoes Rating of the Movie
      console.log(movieData.Ratings[1])

      //Country where the movie was produced
      console.log(movieData.Country)

      //Plot of the Movie
      console.log(movieData.Plot)

      //Actors in the movie
      console.log(movieData.Actors)
    })
}




// Do-what-it-says function
function doWhatItSays() { 
     // use fs
    //us split sb use the user
    // fs.readFile("do-what-it-says", (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });

}

//Switch with a parameter of switchboard variable- Able to switch in between functions
switch (switchboard) {
  case "movie-this":
    movie(userInput);
    break;

  case "concert-this":
    concert(userInput);
    break;

  case "spotify-this-song":
    spotifyThis(userInput);
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}





// * `do-what-it-says`


