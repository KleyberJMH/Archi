const { Events, BaseInteraction, Client } = require('discord.js');
/**
 * 
 * @param {BaseInteraction} interaction 
 * @param {Client} client 
 */
module.exports = (interaction, client) => {
    if (interaction.isButton()) {
        const params=interaction.customId.split('*')
        console.log(params);
    }
}