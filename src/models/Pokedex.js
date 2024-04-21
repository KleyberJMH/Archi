const archiSch = require('./ArchiSch.js').Schema
const {Schema, model } = require('mongoose');
const pokedexSchema= new Schema({
    userId:{
        type: String,
        required: true
    },
    guildId:{
        type: String,
        required: true
    },
    archiCollection:{
        type:[archiSch],
        
    },
    userDisplayName:{
        type: String,
        default:""
    },
    guildDisplayName:{
        type: String,
        default:""
    }
});
module.exports = model('Pokedex',pokedexSchema)