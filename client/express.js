'use strict';

const express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    compressor = require('compression'),
    expressStaticGzip = require('express-static-gzip');

const port = process.env.PORT || 3001;


app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, 'fonts')));
app.use(express.static(path.resolve(__dirname, 'build/static')));
app.use(expressStaticGzip('build'));
app.use(compressor());
app.use(function(req, res, next) {
    res.renderHTML = function(file) {
        res.sendFile(path.resolve(__dirname, './build/' + file + '.html'));
    };
    next();
});

app.get('*', function(req, res) {
    res.renderHTML('index');
});


app.listen(port, function() {
    console.log("client server", port);
});
