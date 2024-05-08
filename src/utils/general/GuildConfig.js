const guildConfigSch = require('../../models/general/guildConfigSch')
const guildConfig = require('../../models/general/guildConfigSch')
module.exports = {
    /**
     * 
     * @param {String} guildId 
     * @returns {guildConfig}
     */
    async all(guildId) {
        return await getAll(guildId)
    },
    /**
     * 
     * @param {String} lang 
     * @returns {JSON}
     */
    allStrings(lang) {

        return require(`../../Data/Languages/Strings${lang.toUpperCase()}.json`)

    },
    getStrings(lang, strings) {
        const jsonStrings = require(`../../Data/Languages/Strings${lang}.json`)
        const path=strings.split('.')
        let current=jsonStrings;
        for (const pr of path) {
            current=current[pr]
        }    
        return current;
    },
    /**
     * 
     * @param {String} guildId 
     * @returns {String}
     */
    async getLanguage(guildId) {
        return (await getAll(guildId)).Language
    },
    async setLanguage(guildId, lang){
        const config = await getAll(guildId)
        config.Language=lang
        return (await guildConfigSch.replaceOne({ GuildId: config.GuildId }, config).exec()).modifiedCount
    },
    async setDungChan(guildId, chanId) {
        const config = await getAll(guildId)
        config.DungeonPostsChannel = chanId
        return (await guildConfigSch.replaceOne({ GuildId: config.GuildId }, config).exec()).modifiedCount
    },
    async setMarketChan(guildId, chanId) {
        const config = await getAll(guildId)
        config.MarketPostsChannel = chanId
        return (await guildConfigSch.replaceOne({ GuildId: config.GuildId }, config).exec()).modifiedCount
    },
    async getDungChanId(guildId) {
        const res = await guildConfig.findOne({ GuildId: guildId }).exec()
        return res.DungeonPostsChannel
    },
    async getMarketChanId(guildId) {
        const res = await guildConfig.findOne({ GuildId: guildId }).exec()
        return res.MarketPostsChannel
    }
}

async function getAll(guildId) {
    let config = await guildConfig.findOne({ GuildId: guildId }).exec()
    if (config == null) {
        config = new guildConfig({ GuildId: guildId })
        await config.save()
    }
    return config
}