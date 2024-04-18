const { SlashCommandBuilder } = require('discord.js')
const { ReloadType } = require('commandkit') 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Rename your nickname to your in-game nick and add your Guild name'),
    run: async ({ interaction, client, handler }) => {
        await interaction.deferReply()
        await handler.reloadCommands()

        interaction.followUp('Reloaded!')

        
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:['BanMembers'],
        //deleted: true,
    }
}