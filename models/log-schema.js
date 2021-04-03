const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    required: true
}

const logSchema = new mongoose.Schema({
    _id: reqNum,        // Epoch
    year: reqString,
    month: reqString,
    date: reqString,    // 1-31
    day: reqNum,        // 0-6
    hour: reqString,
    minute: reqString,
    second: reqString,
    prices: [
        {
            SafeGasPrice: reqNum,
            ProposeGasPrice: reqNum,
            FastGasPrice: reqNum
        }
    ]
})

module.exports = mongoose.model('log-schemas', logSchema)