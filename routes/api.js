var express = require('express');
var router = express.Router();
var news = require('./api/news.js');
var fuli = require('./api/fuli.js');
var haoyangmao = require('./api/haoyangmao.js')

router.use('/news',news);
router.use('/fuli',fuli);
router.use('/haoyangmao',haoyangmao)

module.exports = router;