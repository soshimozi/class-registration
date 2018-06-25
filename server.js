var http = require('http');
var express = require('express'),
    app = module.exports.app = express(),
    server = http.createServer(app),
    path=require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    port = 8080;

app.use(express.static('./www'));

// configure Express
app.use(cookieParser());
app.use(session({ secret: 'kdasdf8232@#(W*asd9',
    saveUninitialized: true,
    resave: true }));


// app.get('/callback', function(req, res) {
//     console.log('callback:', req.query);
//     res.send("got the callback!");
// });

app.get('/api/company-info', function(req, res) {
    res.send('hello!');
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'www', './index.html'));
});


server.listen(port);  //listen on port 8080
console.log("Listening on port " + port);