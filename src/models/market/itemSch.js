const { Schema, model} = require('mongoose');
const {StatSch}=require('./statSch').schema
const itemSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Level:{
        type:Number,
        required:true
    },
    ItemId:{
        type:String,
        required:true
    },
    ImgUrl:{
        type:String,
        default:""
    },
    Stats:{
        type:[StatSch],
        required:true
    },
})
module.exports=model('ItemSch',itemSchema)