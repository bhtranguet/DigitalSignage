var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uploadController = require('./controllers/UploadController');
var screenRouter = require('./router/ScreenRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Middleware
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // Pass to next layer of middleware
    next();
});

// Server static file
app.use('/upload', express.static('upload'));

// add controller
app.use('/api/upload', uploadController);
app.use('/api/screen', screenRouter);

// run server
var server = app.listen('8000', function () {
    console.log('server is running at ' + server.address().port);
})