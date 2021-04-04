const mongoose = require('mongoose');
const logSchema = require('../models/log-schema')
const axios = require('axios')
const mongoPath = process.env.MONGO_URI
let date = new Date()

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
    let hour = `${date}-${timestamp.getHours()}`
    let minute = `${hour}-${timestamp.getMinutes()}`
    let second = `${minute}-${timestamp.getSeconds()}`

    await logSchema.findOneAndUpdate({
        _id: timestamp.getTime()
    }, {
        _id: timestamp.getTime(),
        year,
        month,
        date,
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
        async function (err) {
            if (err) {
                console.log(err.codeName)
                if (err.codeName == 'DuplicateKey') { return null }
                content = { "value1": err.codeName }
                await axios.post(`https://maker.ifttt.com/trigger/GasLog_Error/with/key/${process.env.IFTTT_KEY}`, content)
            }
        })
}

module.exports.get = async function (action = 'date', index = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`) { 
    let res = await logSchema.find(JSON.parse(`{"${action}":"${index}"}`))
    return res
}