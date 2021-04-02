const mongoose = require('mongoose');
const logSchema = require('../models/log-schema')
const mongoPath = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq6wl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

module.exports = async function () {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}

module.exports.log = async function (timestamp, { status, result }) {
    if (status == '0') { return }

    let { LastBlock, SafeGasPrice, ProposeGasPrice, FastGasPrice } = result
    year = timestamp.getFullYear()
    month = `${year}-${timestamp.getMonth()}`
    day = `${month}-${timestamp.getDay()}`
    hour = `${day}-${timestamp.getHours()}`
    minute = `${hour}-${timestamp.getMinutes()}`
    second = `${minute}-${timestamp.getSeconds()}`

    await logSchema.findOneAndUpdate({
        _id: timestamp.getTime()
    }, {
        _id: timestamp.getTime(),
        year,
        month,
        day,
        hour,
        minute,
        second,
        prices: [
            {
                SafeGasPrice,
                ProposeGasPrice,
                FastGasPrice
            }
        ]
    }, {
        upsert: true
    },
        function (err, doc) {
            if (err || !doc) {
                console.log(err);
            }
        })
}

module.exports.getAll = async function () { return null}