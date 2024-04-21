const { SlashCommandBuilder } = require('discord.js')
const { ReloadType } = require('commandkit') 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads bot commands'),
    run: async ({ interaction, client, handler }) => {
        await interaction.deferReply()

        await handler.reloadCommands()

        interaction.followUp('Commands reloaded')

        
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:['BanMembers'],
        //deleted: true,
    }
}