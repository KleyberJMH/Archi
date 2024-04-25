const {Schema, model} = require('mongoose');
const pjClasses=require('../../Data/General.json').Classes.map(i=>i['name'])

const participantSchema = new Schema({
    GuildId:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required: true
    },
    DisplayName:{
        type:String,
        default:""
    },
    PjClass:{
        type:String,
        enum: pjClasses//["Cra","Ecaflip","Eniripsa", "Enutrof", "Feca", "Foggernaut","Iop", "Masqueraider","Osamodas","Pandawa","Rogue","Sacrier","Sadida","Sram","Xelor"]
    }
})
module.exports = model('participant',participantSchema)