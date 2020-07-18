var express = require('express');
var router = express.Router();
const scrapeController = require('../controllers/scrapeController');

/* Get Categories */
router.post('/', scrapeController.scrape);

/* Subscribe */
router.post('/subscribe', scrapeController.subscribe);

/* Contact */
router.post('/contact', scrapeController.contact);

module.exports = router;