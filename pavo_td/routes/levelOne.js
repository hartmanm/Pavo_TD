var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/levelOne', function(req, res, next) {
  res.send('levelOne');
});

module.exports = router;
