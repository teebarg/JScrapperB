var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.render('email/test');
  } catch (error) {
  }
});

module.exports = router;
