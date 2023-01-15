const mongoose = require('mongoose')

const list = mongoose.Schema({
    list: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    date: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model("List", list)