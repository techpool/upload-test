var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {

    var username = req.body.name;
    res.send({
    	username: username,
    	image: req.file.buffer.toString('base64')
    })
});

module.exports = router;
