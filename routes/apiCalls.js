const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');

router.get('/mac', async (req, res) => {
    const docs = await Scan.aggregate([
        {
            $group: {
                _id: {
                    'mac': '$mac'
                }
            }
        }
    ]);
    res.send(docs);
});

router.get('/mac/:mac', async (req, res) => {
    let data = await executeFind(req.params.mac);
    res.send(data);
});

async function executeFind(mac) {
    var docCursor = Scan.find({ mac: mac }).sort({ time: 1 }).cursor();
    let docs = [];
    await docCursor.eachAsync(doc => {
        docs.push(doc);
    });
    return docs;
}

module.exports = router;