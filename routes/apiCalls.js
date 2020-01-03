const express = require('express');
const router = express.Router();
const Scan = require('../models/scan');

router.get('/dwellPerDay', async (req, res) => {
    let data = await Scan.aggregate([
        {
            $group: {
                _id: {
                    day: {
                        $dateToString: {
                            format: '%Y-%m-%d',
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
                    day: '$_id.day'
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
});

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