var express = require('express');
var router = express.Router();

//Get marker data - placeholder.
router.get('/fetchMarkers', function(req, res, next) {
    
    var threshold = 0.5;
    var fs = require('fs');
    var file = fs.readFileSync(__dirname+"/test.json");
    var js = JSON.parse(file);
    var markerObj = [];
    var objs = js.detected;
    for (i = 0; i < objs.length; i++){
        var ob = objs[i]
        var marker = {types: ob.objs, location: {city: "", latLong: [ob.lat, ob.long]}, visible: true};
        markerObj = markerObj.concat(marker);
    }
    res.send(markerObj);
});

module.exports = router;
