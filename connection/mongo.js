const mongoose = require('mongoose');
const logSchema = require('../models/log-schema')
const axios = require('axios')
const mongoPath = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq6wl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

module.exports = async function () {
    let err = null
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch(e => { err = e })
    return err ? null : mongoose

}

module.exports.log = async function (timestamp, { status, result }) {
    if (status == '0') { return }

    let { LastBlock, SafeGasPrice, ProposeGasPrice, FastGasPrice } = result
    let year = timestamp.getFullYear()
    let month = `${year}-${timestamp.getMonth()}`
    let date = `${month}-${timestamp.getDate()}`
    let day = `${timestamp.getDay()}`
    let hour = `${day}-${timestamp.getHours()}`
    let minute = `${hour}-${timestamp.getMinutes()}`
    let second = `${minute}-${timestamp.getSeconds()}`

    await logSchema.findOneAndUpdate({
        _id: timestamp.getTime()
    }, {
        _id: timestamp.getTime(),
        year,
        month,
        date,
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
        async function (err) {
            if (err) {
                console.log(err.codeName)
                content = {"value1": err.name}
                await axios.post('https://maker.ifttt.com/trigger/GasLog_Error/with/key/dLf1E9sIjcO-jo8JZGh7I-ZAMBUr8F8eiYcQ1RmOiyL', content)
            }
        })
}

module.exports.getAll = async function () { return null }