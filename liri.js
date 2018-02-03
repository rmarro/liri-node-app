// Set up process.env so keys can be accessed
require("dotenv").config();
var keys = require("./keys.js");

// Save user input as command and request term (optional)
var userCommand = process.argv[2];
var userRequest = process.argv.slice(3).join(" ");

// import the twitter package and set up client
var Twitter = require('twitter');
var clientTwitter = new Twitter(keys.twitter);

// Import the Spotify package and set up client 
var Spotify = require('node-spotify-api');
var clientSpotify = new Spotify(keys.spotify);

// Import the request package for omdb
var request = require("request");

// Possible command cases
switch(userCommand) {
    case "my-tweets":
        getTweets();
    break;
    case "spotify-this-song":
        if (userRequest === "") {
            userRequest = "The Sign Ace of Base";
        };
        getSong();
    break;
    case "movie-this":
        if (userRequest === "") {
            userRequest = "Mr Nobody";
        };
        getMovie();
    break;
    case "do-what-it-says":
    
    break;
};


// Get 20 most recent tweets and console.log timestamp with text
function getTweets() {
    clientTwitter.get('statuses/user_timeline', {screen_name: "liri_app", count: 20}, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + ": " + tweets[i].text);
            };
        };
    });
};

// Search by song name and return artist, song, album, and link
function getSong() {
    clientSpotify.search({type: 'track', query: userRequest, limit: 1}, function(error, data) {
        if (!error) {
            var mainInfo = data.tracks.items[0];
            
            console.log("Artist: " + mainInfo.album.artists[0].name + "\nSong Name: " + mainInfo.name + "\nAlbum: " + mainInfo.album.name + "\nLink: " + mainInfo.external_urls.spotify);
        };
    });     
};

// Search by movie name and return title, year, imdb rating, RT rating, country, language, plot, and actors
function getMovie() {
    request("http://www.omdbapi.com/?t=" + userRequest +"&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var mainInfo = JSON.parse(body);
            console.log("Title: " + mainInfo.Title + "\nYear: " + mainInfo.Year + "\nIMDB Rating: " + mainInfo.imdbRating + "\nRotten Tomatoes Rating: " + mainInfo.Ratings[1].Value + "\nCountry Produced: " + mainInfo.Country + "\nLanguage: " + mainInfo.Language + "\nPlot: " + mainInfo.Plot + "\nActors: " + mainInfo.Actors);
        }
    });
};


// do what it says
// somehow import text from random.txt
// splice or slice or something at comma
// use before as command, after as request


//bonus
// create log.txt
// append each command 
// append each result of data