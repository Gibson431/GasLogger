try { require("dotenv").config() } catch (err) { console.log(err); }
const axios = require('axios')
const mongo = require('./connection/mongo')
var connection = null

async function connect() {
    connection = await mongo()
}

async function getPrices() {
    let timestamp = new Date()
    let { data } = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`)
    mongo.log(timestamp, data)
    console.log(`Safe: ${data.SafeGasPrice}, Recommended: ${data.ProposeGasPrice}, Fast: ${data.FastGasPrice}`);
}

connect()
setInterval(() => { getPrices() }, 5000)