const { BaseInteraction, Client} = require('discord.js');

const eventDungBtnClick = require('../../utils/eventos/eventDungBtnClick');

/**
 * 
 * @param {BaseInteraction} interaction 
 * @param {Client} client 
 */
module.exports = (interaction, client) => {
    if (interaction.isButton()) {
        const params = interaction.customId.split('*')
        switch (params[0]) {
            case 'DungEvent':
                eventDungBtnClick(params, interaction)
                break;

            default:
                break;
        }
    }
}
