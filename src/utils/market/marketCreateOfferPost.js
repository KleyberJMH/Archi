const {Client, ThreadChannel, ActionRowBuilder, EmbedBuilder, Embed, ButtonBuilder, ButtonStyle, ForumChannel, Channel, GuildForumTag, Attachment } = require("discord.js");
const OfferSchema = require('../../models/market/marketOfferSch')
const ItemList = require('../../Data/Items.json')
const GuildConfig = require("../general/GuildConfig");


/**
 * 
 * @param {Client} client 
 * @param {OfferSchema} offer
 * @returns {ThreadChannel}
 */

module.exports = async (client, offer) => {
    /** @type {ForumChannel}*/
    const board = await client.channels.fetch(await GuildConfig.getMarketChanId(offer.GuildId));
    const avTags = board.availableTags
    const tag = { name: offer.Item.Type, moderated: false }
    const index = avTags.findIndex((t) => { return t.name == offer.Item.Type })
    if (index == -1) {
        avTags.push(tag)
        await board.setAvailableTags(avTags)
    }
    const thread = await board.threads.create({
        name: offer.Item.Name,
        message: {
            embeds: [createInfoEmbed(offer)],
            autoArchiveDuration: 60
        },
        appliedTags: [board.availableTags.find((t) => { return t.name == offer.Item.Type }).id],
        //files: new Attachment(offer.Item.ImgUrl2)
    });
    console.log(`Created thread: ${thread.name}`);
    return thread;


}
/**
 * 
 * @param {OfferSchema} offer 
 * @returns {Embed}
 */
function createInfoEmbed(offer) {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(offer.Item.Name)
        .setDescription(`${offer.Price} Kamas`)
        .setThumbnail(offer.Item.ImgUrl)
        .addFields({ name: 'Stats', value: offer.Item.Stats.join('\n') })
        .setTimestamp()
        .setFooter({text:'a'})
    return embed
}