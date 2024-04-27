const {Schema, model} = require('mongoose');
//const pjClasses=require('../../Data/General.json').Classes.map(i=>i['name'])

const pjSchema = new Schema({
    GuildId:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required: true
    },
    PJName:{
        type:String,
        default:""
    },
    PjClass:{
        type:String,
    },
    PjLvl:{
        type:Number,
        required:true
    }
})
module.exports = model('pj',pjSchema)