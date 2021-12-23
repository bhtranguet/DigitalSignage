var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var screenRouter = require('./router/ScreenRouter');
var presentationRouter = require('./router/PresentationRouter');
var authenRouter = require('./router/AuthenRouter');
var canvasRouter = require('./router/CanvasRouter');
var panelRouter = require('./router/PanelRouter');
var frameRouter = require('./router/FrameRouter');
var mediaRouter = require('./router/MediaRouter');
var captionRouter = require('./router/CaptionRouter');

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
app.use('/uploads', express.static('uploads'));

// add controller
app.use('/api/screen', screenRouter);
app.use('/api/canvas', canvasRouter);
app.use('/api/panel', panelRouter);
app.use('/api/frame', frameRouter);
app.use('/api/media', mediaRouter);
app.use('/api/caption', captionRouter);
app.use('/api/presentation', presentationRouter);
app.use('/api/authen', authenRouter);

// run server
var server = app.listen('8000', function () {
    console.log('server is running at ' + server.address().port);
})