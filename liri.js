// Set up process.env so keys can be accessed
require("dotenv").config();
var keys = require("./keys.js");

// Save user input as the command and optional request term
var userCommand = process.argv[2];
var userRequest = process.argv.slice(3).join(" ");

// import the twitter package and set up client
var Twitter = require('twitter');
var clientTwitter = new Twitter(keys.twitter);

// Import the Spotify package and set up client 
var Spotify = require('node-spotify-api');
var clientSpotify = new Spotify(keys.spotify);

// Possible command cases
switch(userCommand) {
    case "my-tweets":
        getTweets();
    break;
    case "spotify-this-song":
        getSong();
    break;
    case "movie-this":
    
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
            var main = data.tracks.items[0];

            console.log("Artist: " + main.album.artists[0].name + "\nSong Name: " + main.name + "\nAlbum: " + main.album.name + "\nLink: " + main.external_urls.spotify);
        }
    })     
}