const {Schema, model} = require('mongoose');
const professionSchema = new Schema({
    professionName:{
        type:String,
        required: true
        },
    professionLvl:{
        type:Number,
        required: true
        
    }
})
module.exports=model('profession',professionSchema)