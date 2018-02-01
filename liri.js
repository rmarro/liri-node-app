// Set up process.env so keys can be accessed
require("dotenv").config();
var keys = require("./keys.js");

// Save user input as the command and optional request term
var userCommand = process.argv[2];
var userRequest = process.argv[3];

// Set up Twitter client
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

// Set up Spotify 
// var spotify = keys.spotify;

// Possible command cases
switch(userCommand) {
    case "my-tweets":
        getTweets();
    break;
    case "spotify-this-song":
    
    break;
    case "movie-this":
    
    break;
    case "do-what-it-says":
    
    break;
};


// Get tweets (TO DO: add count limit and log all of array not just tweets[0])
function getTweets() {
    client.get('statuses/user_timeline', {screen_name: "liri_app"}, function (error, tweets, response) {
        if (!error) {
            console.log(tweets[0].created_at + ": " + tweets[0].text)
        }
    });
}