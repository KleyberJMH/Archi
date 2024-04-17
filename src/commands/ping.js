const { SlashCommandBuilder } = require('discord.js')
import { ReloadType } from 'commandkit'

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
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