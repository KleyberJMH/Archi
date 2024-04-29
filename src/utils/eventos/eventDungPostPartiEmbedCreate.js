const Participant = require('../../models/general/pjSch')
const {Embed, EmbedBuilder} =require("discord.js");
/**
 * 
 * @param {[Participant]} participants 
 * @returns {Embed}
 */
module.exports = (participants)=>{

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Participants')
        .setDescription(participants.length == 0 ? 'Sin participantes' : participants.map(p => `${p.PJName}, ${p.PjClass} ${p.PjLvl}`).join('\n'))

    return embed
}