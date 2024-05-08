const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const itemSch = require('../models/market/itemSch')
/**
 * 
 * @param {itemSch} item 
 */

module.exports = (item) => {
    const modal = new ModalBuilder()
        .setCustomId("iteminfo")
        .setTitle(item.Name)
    const statsInput = new TextInputBuilder()
        .setCustomId('stats')
        .setLabel("Set the stats")
        .setValue(item.Stats.join('\n'))
        .setStyle(TextInputStyle.Paragraph);

    const firstRow = new ActionRowBuilder().addComponents(statsInput)
    modal.addComponents(firstRow)
    return modal;


}