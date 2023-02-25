const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
async function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.URL, (err) => {
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}
module.exports = connect;