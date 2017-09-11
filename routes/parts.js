var express = require('express');
var router = express.Router();

router.get('/parts', function (req, res, next) {
    res.send('parts');
});

module.exports = router;