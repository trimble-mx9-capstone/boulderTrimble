var express = require('express');
var router = express.Router();

//Get marker data - placeholder.
router.get('/fetchMarkers', function(req, res, next) {
    
    var threshold = 0.5;
    var fs = require('fs');
    var file = fs.readFileSync(__dirname + "/../../../../testData/t3.jpg.json.out");
    var js = JSON.parse(file);
    var obj = js.predictions[0];
    var numToVal = {1: "stopLight", 2: "stopSign", 3: "fireHydrant"};
    // Default Latitude
    var latitude = 40.016869;
    // Default Longitude
    var longitude = -105.271966;
    var objectsRecognized = [];
    for (i = 0; i < obj.detection_scores.length; i++){
        if (obj.detection_scores[i] > threshold){
            objectsRecognized = objectsRecognized.concat([numToVal[obj.detection_classes[i]]])
        } else break;
    }
    var markerObj = {types: objectsRecognized, location: {city: "", latLong: [latitude, longitude]}, visible: true};
    res.send(markerObj);
});

module.exports = router;
