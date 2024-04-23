const {Schema, model} = require('mongoose');
const eventDungSchema= new Schema({
    AuthorID:{
        type: String,
        required: true
    },
    GuildID:{
        type: String,
        required: true
    },
    DungName:{
        type: String,
        required: true
    },
    DesiredPeople:{
        type:Number,
        default:2,
        required: true
    },
    MinPeople:{
        type:Number,
        default:1
    },
    MaxPeople:{
        type:Number,
        default:4
    },
    eventDate:{
        type:Date,
        required:true
    },
    eventID:{
        type:String,
        required:true
    }
})
module.exports = model('eventDung',eventDungSchema)