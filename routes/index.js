var express = require('express');
var router = express.Router();
var Scan = require('../models/scan');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index');
});

module.exports = router;