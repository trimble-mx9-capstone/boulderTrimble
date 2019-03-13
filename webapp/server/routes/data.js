var express = require('express');
var router = express.Router();
var db = require('../connection')

//Get marker data - placeholder.
router.get('/images', function(req, res, next) {
    var lat = req.query.lat; 
    var long = req.query.long; 
    db.any('SELECT * FROM images')
        .then(function (data) {
            console.log('DATA: ', data)
            res.send(data)
        })
        .catch(function (error) {
            console.log('Error: ', error)
        });
    /*
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
    }*/
    //res.send(markerObj);
});

router.post('/images', function(req, res, next) {
    console.log(req)
});

module.exports = router;
