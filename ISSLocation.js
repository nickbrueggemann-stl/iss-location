var request = require('request');
var moment = require("moment");

class ISSLocation {
    constructor() {
        this.lastReceivedLocation = null;
        this.lastRequestTime = null;
        this.isFeedRunning = false;
        this.interval = null;
    }

    getISSLocation() {
        this.lastRequestTime = new moment();

        if(this.isFeedRunning === false) {
            this.startISSFeed();
        }

        return this.lastReceivedLocation;
    }

    startISSFeed() {
        console.log("Starting ISS Feed");
        this.isFeedRunning = true;
        this.interval = setInterval(() => {
            var currentTime = new moment();
            var minutes = currentTime.diff(this.lastRequestTime, 'm'); 
            if(minutes >= 1) {
                this.stopISSFeed();
            } else {
                request('https://api.wheretheiss.at/v1/satellites/25544', (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        this.lastReceivedLocation = body;
                    }
                });
            }
            
        }, 3000);
    }

    stopISSFeed() {
        console.log("Stopping ISS Feed");
        this.isFeedRunning = false;
        this.lastReceivedLocation = null;
        clearInterval(this.interval);
    }

} // end class

module.exports = ISSLocation;
