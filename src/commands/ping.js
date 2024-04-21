const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
    run: async ({ interaction, client, handler }) => {
        interaction.reply('Pong!!')       
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:['BanMembers'],
        //deleted: true,
    }
}