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
    content = {"value1": except.message}
    await axios.post('https://maker.ifttt.com/trigger/GasLog_Error/with/key/dLf1E9sIjcO-jo8JZGh7I-ZAMBUr8F8eiYcQ1RmOiyL', content)
    await process.exit()
})

connect()
setInterval(() => { getPrices() }, 60000)