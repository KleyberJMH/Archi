const {Schema, model} = require('mongoose');
const professionSchema = new Schema({
    professionName:{
        type:String,
        required: true
        },
    professionLvl:{
        type:Number,
        required: true   
    },
    public:{
        type:Boolean,
        default:false
    }
})
module.exports=model('profession',professionSchema)