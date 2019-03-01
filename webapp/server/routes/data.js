var express = require('express');
var router = express.Router();

//Get marker data - placeholder.
router.get('/fetchMarkers', function(req, res, next) {
    res.send('Fetched markers!');
});

module.exports = router;
