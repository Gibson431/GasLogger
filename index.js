try { require("dotenv").config() } catch (err) { console.log(err); }
const axios = require('axios')
const mongo = require('./connection/mongo')

async function connect() {
    let connection = await mongo()
    if (!connection) {
        console.log(`DB Failed to connect.`);
        process.exit()
    }
    console.log(`DB Connected.`);
}

async function getPrices() {
    let timestamp = new Date()
    let { data } = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`)
    mongo.log(timestamp, data)
    console.log(`Safe: ${data.result.SafeGasPrice}, Recommended: ${data.result.ProposeGasPrice}, Fast: ${data.result.FastGasPrice}`);
}

process.on('unhandledRejection', async (except) => {
    console.log(except.message);
    if (except.message.startsWith('E11000 ')) { return null }
    content = { "value1": except.message }
    await axios.post(`https://maker.ifttt.com/trigger/GasLog_Error/with/key/${process.env.IFTTT_KEY}`, content)
    await process.exit()
})

async function setup() {
    await connect()
    setInterval(() => { getPrices() }, 60000)
}

async function daysBestTime() {
    let d = new Date()
    let filter = { "day": d.getDay() }
    collection = await mongo.getObj(filter)
    let hours = new Array(24).fill(Array(1).fill(0))
    console.log(hours);
    // TODO compute averages per hour or minute
}

setup()
daysBestTime()
