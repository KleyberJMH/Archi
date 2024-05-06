const { SlashCommandBuilder, User, CommandInteraction } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('[NO FUNCIONA]Change your discord nickname to you in-game nickname')
    .addStringOption((option) => 
    option
        .setName('nickname')
        .setDescription('Enter your main in-game nickname')
        .setRequired(true)
    ),
    run: async ({ interaction, client, handler }) => {
        try {
            await interaction.deferReply({ephemeral: true})
            const newNickname = interaction.options.getString('nickname')
            /** @type {CommandInteraction}*/
            const inter =  interaction
            inter.member.nickname = newNickname
            const clanName = user.roles.cache.filter((role) => role.name == '- Mugiwara -')
        
            interaction.followUp(`Your nickname has changed to ${newNickname}`)
            return
    
    
        } catch (error) {
            console.log(`Error in ${__filename}:\n`, error)
        }       
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:[''],
        //deleted: true,
    }
}