var express = require('express');
var router = express.Router();

//Get marker data - placeholder.
router.get('/fetchMarkers', function(req, res, next) {
    
    var threshold = 0.5;
    var fs = require('fs');
    var file = fs.readFileSync(__dirname+"/test.json");
    var js = JSON.parse(file);
    var valToLabel = {"stopSign": "stopSign", "streetLight": "stopLight", "fireHydrant": "fireHydrant"};
    var markerObj = [];
    var objs = js.detected;
    for (i = 0; i < objs.length; i++){
        var ob = objs[i]
        var newTypes = ob.objs.reduce((arr, a) => arr.concat(valToLabel[a]), []);
        var marker = {types: newTypes, location: {city: "", latLong: [ob.lat, ob.long]}, visible: true};
        markerObj = markerObj.concat(marker);
    }
    res.send(markerObj);
});

module.exports = router;
