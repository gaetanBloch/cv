var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var parts = require('./routes/parts');

var port = 3000;

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Static folder for angular stuff
app.use(express.static(path.join(__dirname, 'client')));

// Body parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api', parts);

app.listen(port, function () {
    console.log('Server started on port ' + port);
});





