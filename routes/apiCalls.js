const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');
const fs = require('fs');

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
    let data = await executeFind('mac', req.params.mac);
    res.send(data);
});

async function executeFind(field, val) {
    var docCursor = Scan.find({ field: val }).sort({ time: 1 }).cursor();
    let docs = [];
    await docCursor.eachAsync(doc => {
        docs.push(doc);
    });
    return docs;
}

router.get('/manufacturers', async (req, res) => {
    let docs = await getAllManufacturers();
    res.send(docs);
});

async function getAllManufacturers() {
    const docs = await Scan.aggregate([
        {
            $group: {
                _id: {
                    'manu': '$manu'
                }
            }
        }
    ]);
    return docs;
}

module.exports = router;