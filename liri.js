require("dotenv").config();

var keys = require("./keys.js");

var spotify = keys.spotify;
var client = keys.twitter;

var userCommand = process.argv[2];
var userRequest = process.argv[3];

switch(userCommand) {
    case "my-tweets":
       console.log("tweets will show here");

        break;
    case "spotify-this-song":


        break;
    case "movie-this":
       

        break;
    case "do-what-it-says":
    

    break;
};