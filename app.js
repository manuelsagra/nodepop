var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require("i18n");

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database setup
require('./mongodb/mongoConnection');

// Internationalization setup
i18n.configure({
    locales:['en', 'es'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    directory: path.join(__dirname, 'locales')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use('/', require('./routes/index'));
app.use('/apiv1/ads', require('./routes/apiv1/ads'));
app.use('/apiv1/users', require('./routes/apiv1/users'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    if (isAPI(req)) {
        res.json({
            success: false, 
            error: err.message 
        });
        return;
    }

    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.render('error');
});

function isAPI(req) {
    return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
