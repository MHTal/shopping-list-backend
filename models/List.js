const mongoose = require('mongoose')

const list = mongoose.Schema({
    list: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("List", list)