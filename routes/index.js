var express = require('express');
var router = express.Router();
var Scan = require('../models/scan');

/* GET home page. */
router.get('/', function (req, res, next) {
  // executeFind().then(documents => {
  //   console.log(documents);
  // });
  res.render('index');
});

function findAll() {
  return Scan.find().limit(1000).cursor();
}

async function executeFind() {
  const docCursor = await findAll();
  let docs = [];
  await docCursor.eachAsync(doc => {
    docs.push(doc);
  });
  return docs;
}

module.exports = router;
