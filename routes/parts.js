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
router.get('/part/id', function (req, res, next) {
    db.parts.findOne({_id: mongojs.ObjectID(req.params.id)},function (err, part) {
        if (err) {
            res.send(err);
        }
        res.json(part);
    });
});

// Save part
router.post('/part', function (red, res, next) {
    var part = req.body;
    if(!part.title || part.isDone + '') {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.parts.save(part, function (err, part) {
            if(err){
                res.send(err);
            }
            res.json(part);
        })
    }
});


// Delete a part
router.delete('/part/id', function (req, res, next) {
    db.parts.remove({_id: mongojs.ObjectID(req.params.id)},function (err, part) {
        if (err) {
            res.send(err);
        }
        res.json(part);
    });
});


// Update a part
router.put('/part/id', function (req, res, next) {
    var part = req.body;
    var updPart = {};

    if (part.isDone) {
        updPart.isDone = part.isDone;
    }

    if (part.title) {
        updPart.title = part.title;
    }

    if (!updPart) {
        res.status(400);
        res.json({
            "error": "bad data"
        });
    } else {
        db.parts.update({_id: mongojs.ObjectID(req.params.id)}, updPart, {}, function (err, part) {
            if (err) {
                res.send(err);
            }
            res.json(part);
        });
    }
});

module.exports = router;