const mongoose = require('mongoose');

let scanSchema = mongoose.Schema({
    manu: {
        type: String
    },
    channel: {
        type: String
    },
    local_id: {
        type: Number
    },
    freq: {
        type: String
    },
    time: {
        type: Date
    },
    rssi: {
        type: String
    },
    mac: {
        type: String
    },
    hostname: {
        type: String
    },
});

let Scan = module.exports = mongoose.model('scan', scanSchema, 'audi_cpt');