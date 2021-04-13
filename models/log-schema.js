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
    year: reqNum,
    month: reqNum,
    date: reqNum,    // 1-31
    day: reqNum,        // 0-6
    hour: reqNum,
    minute: reqNum,
    second: reqNum,
    prices: {
            SafeGasPrice: reqNum,
            ProposeGasPrice: reqNum,
            FastGasPrice: reqNum
        }
})

module.exports = mongoose.model('log-schemas', logSchema)