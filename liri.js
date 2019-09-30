
//All packages that are needed to run this js file.
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var fs = require("fs")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);


//Made a variable for the switchboard  run all the functions needed for Liri
var switchBoard = process.argv[2];


//Made a variable to grab all the argvs from the user's input after the second index
var userInput = process.argv.slice(3).join(" ");


//Create a functions for each 1.Concert, 2.Spotify,3.Movie,4.Do what it says

// Concert-this function
function concert(artist) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(queryUrl)
    .then(function (response){
      
      var bandData = response.data;
      
    
      for (let i = 0; i < bandData.length; i++) {
      
       storedData=bandData[i]
       
       
        //Venue location
      console.log(storedData.venue.name);
      

       //venue location
      console.log(storedData.venue.country)
      

       // date of event using moment.js
    
      var showTime=moment(storedData.datetime).format("MM/DD/YYYY")
       console.log(showTime)
        console.log("\n.........................\n")
      
    
       };


      })
      .catch(function (err) {
        console.log(err);
      });
  }


  


// Spotify-this-song function
function spotifyThis(song) {
//conditinal of check for empty string to default song
console.log(song)

var song = song

if(!song) {
  console.log("help us")

var song="Ace of base the sign";
console.log(song)
 
}

console.log(song)

  spotify
    .search({ type: 'track', query: song, limit: 10 })
    .then(function (response) {
        
        var songData =response.tracks.items
        console.log(response.tracks.items.length)
      
       for (let i = 0; i < songData.length; i++) {
         
          
        
      // console.log(JSON.stringify(response.tracks.items[0], null, 2));
      // console.log("\n..........................\n")

      // Spotify Artists
       console.log(response.tracks.items[0].artists[0].name);
       console.log("\n..........................\n")
     

      //Spotify Song Name
       console.log(response.tracks.items[0].name);
      console.log("\n..........................\n") 

      // Link of Song
       console.log(response.tracks.items[0].preview_url);
      console.log("\n..........................\n")

      // Album of Song
       console.log(response.tracks.items[0].album.name);
       console.log("\n..........................\n")

      // If no song is provided by default put "The Sign" by Ace of Base.
      // console.log()
      }


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

      console.log("\n..........................\n")
      console.log("Movie Name: ")
      console.log(movieData.Title)
      //Year the movie came out
      console.log(" Year:")
      console.log(movieData.Year)
      

      //IMDB rating of Movie
      console.log("Movie rating on IMDB: ")
      console.log(movieData.Ratings[0])

      

      //Rotten Tomatoes Rating of the Movie
      console.log("Movie rating on Rotten Tomatoes: ")
      console.log(movieData.Ratings[1])
      

      //Country where the movie was produced
      console.log("Country the movie was made in: ")
      console.log(movieData.Country)
      

      //Plot of the Movie
      console.log("Movie Plot: ")
      console.log(movieData.Plot)
      

      //Actors in the movie
      console.log("Actors in the film: ")
      console.log(movieData.Actors)
      console.log("\n..........................\n")
    })
}




// Do-what-it-says function
function doWhatItSays() { 

     fs.readFile("random.txt", "utf8", (err, data) => {

      if (err) {
        return console.log(err);
      }
      dataArr = data.split(",");
    console.log(dataArr)
    runner(dataArr[0],dataArr[1])
  
    });
    
  }
  
var runner = function(switchBoard,userInput){


//Switch with a parameter of switchboard variable- Able to switch in between functions
switch (switchBoard) {
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

}
runner(switchBoard,userInput)

