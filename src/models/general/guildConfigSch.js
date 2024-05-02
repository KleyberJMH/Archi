const { Schema, model } = require("mongoose");

const guildConfigSchema = new Schema({
    GuildId: {
        type: String,
        required: true,
    },
    DungeonPostsChannel: {
        type: String,
        default: ""
    },
    Language: {
        type: String,
        default: 'en'
    }
})
module.exports=model('guildConfig',guildConfigSchema)