const {SlashCommandBuilder,PermissionFlagsBits,ChannelType,InteractionType }= require('discord.js')

module.exports = { 
    data:new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Change your discord nickname to you in-game nickname')
    .addStringOption((option) =>
        option
            .setName('nickname')
            .setDescription('Enter your main in-game nickname')
            .setRequired(true)
    ),
    run:async ({ interaction, client, handler })=> {
        try {
            await interaction.deferReply({ ephemeral: true })
            const newNickname = interaction.options.getString('nickname')
            interaction.member
            const clanName = member.roles.cache.filter((role) => role.name == '- Mugiwara -')
    
            // console.log(clanName.Role.name)
            // member.nickname = newNickname
            interaction.followUp(`Your nickname has changed to ${newNickname}`)
            return
    
    
        } catch (error) {
            console.log(`Error in ${__filename}:\n`, error)
        } 
    
    },
    options:{
        devOnly: true
    }
}