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
        type:Array,
        default:''
    }
});
module.exports = model('Pokedex',pokedexSchema)