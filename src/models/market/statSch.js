const { Schema, model} = require('mongoose');
const CaracEnum=require('./enumStats')
const statSchema=new Schema({
    Caracteristic:{
        type:String,
        required:true,
        enum:CaracEnum
    },
    Value:{
        type:String,
        required:true
    }

})
module.exports=model('statSch',statSchema)
