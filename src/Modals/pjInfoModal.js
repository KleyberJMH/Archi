const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
/**
 * 
 * @param {String} id 
 */

module.exports = (id) => {
    const modal = new ModalBuilder()
        .setCustomId("pjinfo*" + id)
        .setTitle("PJ Info")
    const pjNameInput = new TextInputBuilder()
        .setCustomId('pjName')
        .setLabel("Whats the name of the PJ?")
        .setStyle(TextInputStyle.Short);
    const pjLvlInput = new TextInputBuilder()
        .setCustomId('pjLvl')
        .setLabel("Whats the lvl of the PJ?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const pjClassInput = new TextInputBuilder()
        .setCustomId('pjClass')
        .setLabel("Whats the class of the PJ?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

const firstRow= new ActionRowBuilder().addComponents(pjNameInput)
const secondRow= new ActionRowBuilder().addComponents(pjLvlInput)
const thirdRow= new ActionRowBuilder().addComponents(pjClassInput)
    modal.addComponents(firstRow,secondRow,thirdRow)
    return modal;

}