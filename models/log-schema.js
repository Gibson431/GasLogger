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
    _id: reqNum,        // Year
    year: reqString,
    month: reqString,
    day: reqString,
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