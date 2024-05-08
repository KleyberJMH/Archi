const { Schema, model } = require('mongoose');
const ItemSchema = require('./itemSch').schema
const marketOfferSch = new Schema({
    GuildId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    Item: {
        type: ItemSchema,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    PostID: {
        type:String
    }
})
module.exports = model('MerketOfferSch', marketOfferSch)