var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://gaetanbloch:onlov3000@ds133004.mlab.com:33004/mycv", ['parts']);

// Get all parts
router.get('/parts', function (req, res, next) {
    db.parts.find(function (err, parts) {
        if (err) {
            res.send(err);
        }
        res.json(parts);
    });
});

// Get single part

module.exports = router;