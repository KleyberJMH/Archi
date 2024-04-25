const { Client, Message, ActionRowBuilder } = require("discord.js");
const EventDungSch = require('../../models/eventos/eventDungSch')
const dList = require('../../Data/DungList.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {EventDungSch} dungeonEvt
 * @returns {Message}
 */

module.exports = (dungeonEvt) => {
    const tituloComp = new ActionRowBuilder()
        .addComponents
    const msg = new Message({
        components: [
            dungeonEvt.DungeonName,
            "Fila 2",
            "Fila 3"
        ]
    })
    return msg
}