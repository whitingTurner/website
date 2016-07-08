var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

///////////////////////////////////////////////////////////////////////////////////////// MIDDLEWARE

var app = express();

// Needed to handle JSON posts
app.use(bodyParser.json());

// Cookie parsing needed for sessions
app.use(cookieParser('notsosecretkey'));

// Session framework
app.use(session({secret: 'notsosecretkey123'}));

// Consider all URLs under /public/ as static files, and return them raw.
app.use(express.static(__dirname + '/public'));

/////////////////////////////////////////////////////////////////////////////////////////// HANDLERS

function getName(req, res) {
    if (req.session.name) {
        return res.json({ name: req.session.name });
    }
    else {
        return res.json({ name: '' });
    }
}

function setName(req, res) {
    if(!req.body.hasOwnProperty('name')) {
        res.statusCode = 400;
        return res.json({ error: 'Invalid message' });
    }
    else {
        req.session.name = req.body.name;
        return res.json({ name: req.body.name });
    }
}

function logout(req, res) {
    req.session = null;
    return res.json({});
}

///////////////////////////////////////////////////////////////////////////////////////////// ROUTES

app.get('/name', getName);
app.post('/name', setName);
app.get('/logout', logout);

////////////////////////////////////////////////////////////////////////////////////// SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () { console.log("Listening on port " + port); });/**
 * Created by Jeevjyot on 7/7/16.
 */
