const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');

/*
    Generecised Route used to query the dwell time
*/
router.get('/dwellTimes/:period', async (req, res) => {
    let data = await Scan.aggregate([
        {
            $group: {
                _id: {
                    period: {
                        $dateToString: {
                            format: req.params.period,
                            date: '$time'
                        }
                    },
                    mac: '$mac'
                },
                min: {
                    $min: '$time'
                },
                max: {
                    $max: '$time'
                }
            }
        },
        {
            $group: {
                _id: {
                    period: '$_id.period'
                },
                dwellTime: {
                    $avg: {
                        $divide: [{
                            $subtract: [
                                '$max',
                                '$min'
                            ]
                        },
                            60000
                        ]
                    }
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]).allowDiskUse(true);
    res.send(data);
})

// /*
//     A route that accepts a period in the form of a date format
//     in order to genericise the quering of similar data
// */
router.get('/numberOfDevices/:period', async (req, res) => {
    let data = await Scan.aggregate([
        {
            $group: {
                _id: {
                    day: {
                        $dateToString: {
                            format: `${req.params.period}`,
                            date: '$time'
                        }
                    },
                    mac: '$mac'
                }
            }
        },
        {
            $group: {
                _id: {
                    day: '$_id.day'
                },
                scannedDevices: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                '_id': 1
            }
        }
    ]).allowDiskUse(true);
    res.send(data);
});

module.exports = router;