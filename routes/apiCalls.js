const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');

router.get('/manu', async (req, res) => {
    const docs = await Scan.aggregate([
        {
            $group: {
                _id: {
                    'manufacturer': '$manu'
                }
            }
        }
    ]).limit(20);
    res.send(docs);
});

router.get('/all', async (req, res) => {
    let data = await executeFind(20);
    res.send(data);
});

async function executeFind(num) {
    if (num) {
        var docCursor = Scan.find().limit(num).cursor();
    } else {
        var docCursor = Scan.find().cursor();
    }
    let docs = [];
    await docCursor.eachAsync(doc => {
        docs.push(doc);
    });
    return docs;
}

module.exports = router;