const { Schema, model } = require('mongoose');
const professionSch = require('./professionSch');
const pjSchema = new Schema({
    PJName: {
        type: String,
        default: ""
    },
    PjClass: {
        type: String,
    },
    PjLvl: {
        type: Number,
        required: true
    },
    Professions:{
        type:[professionSch.schema]
    },
    urlId: {
        type: String,
    }
})
module.exports = model('pj', pjSchema)