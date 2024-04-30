const { Schema, model, Mongoose } = require('mongoose');
const PJSchema = require('./pjSch.js').schema
const userSchema = new Schema({
    GuildId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    DisplayName: {
        type: String,
        required: true
    },
    Clan:{
        type: String,
        default:""
    },
    MainPj:{
        type: PJSchema
      },
    Pjs:{
        type:[PJSchema]
    }
})
module.exports=model('UserSch',userSchema)