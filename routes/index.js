var express = require('express');
var redis = require('redis');
var router = express.Router();
var currVal;

//var client = redis.createClient(6379, '192.168.99.100');
var client = redis.createClient(6379, 'redis');

client.on("error", function (err) {
    console.log('redis error: ' + err);
});

// initialize hits
client.get('hits', function(err, reply) {
    currVal = reply || 0;
});

router.get('/', function (req, res, next) {
    client.incr('hits', function (err, reply){
        currVal = reply;
    });
    var hits = parseInt(currVal, 10) + 1
    res.render('index', { title: 'Visual Studio Code', hits: hits });
});

module.exports = router;