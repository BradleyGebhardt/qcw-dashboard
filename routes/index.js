var express = require('express');
var router = express.Router();
var Scan = require('../models/scan');

/* GET home page. */
router.get('/frameworked', (req, res, next) => {
  res.render('matIndex');
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;