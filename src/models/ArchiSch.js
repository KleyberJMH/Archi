const {Schema, model} = require('mongoose');
const archiSchema= new Schema({
    Name:{
        type: String,
        required: true
    },
    Amount:{
        type:Number,
        default:1
    }
})
module.exports = model('ArchiSch',archiSchema)