require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// need to handle the command using a switch to pick 
// which one to grab from below
// could use inquirer too..

// This is for OMDB
var request = require("request");
var nodeArgs = process.argv;
var movieName = "";

for (var i = 2; i < nodeArgs.length; i++){
    if (i > 2 && i < nodeArgs.length){
        movieName += "+" + nodeArgs[i];
    } else{
        movieName += nodeArgs[i];
    }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function(error, response, body){
    if(error){
        console.log(error);
    }
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).Rated);
    console.log(JSON.parse(body).Genre);
    console.log(JSON.parse(body).Runtime);
    console.log(JSON.parse(body).Plot);
});

// This is for Twitter

var params = {screen_name: "AJ_Pnil"};
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (!error) {
      for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].text + tweets[i].created_at);
      }
  }
});

// This is for spotify

