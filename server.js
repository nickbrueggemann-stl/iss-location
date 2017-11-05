var express = require("express");
var http = require('http');
var cors = require('cors');
var path    = require("path");
var ISSLocation = require("./ISSLocation");

this.express = express();
this.express.use(cors());

// Create the server
http.createServer(this.express).listen(42314);

var issLocation = new ISSLocation();

this.express.get('/iss-location', function (req, res) {
    var response = issLocation.getISSLocation();
    if(response) {
        res.send(response);
    }
    else {
        res.sendStatus(500);
    }
});

this.express.get('/',function(req,res){
    // Serve up the page that has the map
    res.sendFile(path.join(__dirname+'/index.html'));
});