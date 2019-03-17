var express = require('express');
var router = express.Router();
var db = require('../connection')

//Get marker data - placeholder.
router.get('/images', function(req, res, next) {
    // var lat = req.query.lat; 
    // var long = req.query.long; 
    var minLat = req.query.minLat;
    var maxLat = req.query.maxLat;
    var minLong = req.query.minLong;
    var maxLong = req.query.maxLong;
    //db.any('SELECT * FROM images')
    db.any('SELECT * from images WHERE latitude >= ' + minLat + ' AND latitude <= ' + maxLat +
            ' AND longitude >= ' + minLong + ' AND longitude <= ' + maxLong)
        .then(function (data) {
            //console.log('DATA: ', data)
            res.send(data)
        })
        .catch(function (error) {
            console.log('Error: ', error)
        });
});

router.post('/images', function(req, res, next) {
    var lat = req.body.lat;
    var long = req.body.long;
    var url = req.body.url; 
    var has_stop_sign = req.body.has_stop_sign;
    var has_street_light = req.body.has_street_light;

    db.none('INSERT INTO images(latitude, longitude, url, has_stop_sign, has_street_light) VALUES ($1, $2, $3, $4, $5)', 
        [lat, long, url, has_stop_sign, has_street_light])
        .then(() => {
            console.log('inserted...');
            res.send(200)
u        })
        .catch(error => {
            console.log(error);
            res.send(500)
        });

});

module.exports = router;
