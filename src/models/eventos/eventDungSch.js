const {Schema, model} = require('mongoose');
const participantSchema=require('./participantSch').Schema

const eventDungSchema= new Schema({
    AuthorID:{
        type: String,
        required: true
    },
    GuildID:{
        type: String,
        required: true
    },
    Description:{
        type:String,
        default:'',
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
    },
    achievements:{
        type:Boolean,
        default:false
    },
    keyGiven:{
        type:Boolean,
        default:false
    },
    strictDate:{
        type:Boolean,
        default:false
    },
    participants:{
        type:[participantSchema],
        default:[]
    }
    
})

module.exports = model('eventDung',eventDungSchema)