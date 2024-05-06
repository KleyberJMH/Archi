const { SlashCommandBuilder, User, CommandInteraction } = require('discord.js')
const getUser=require('../utils/general/getUser.js')
const updateUser=require('../utils/general/updateUser.js')

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

            const user=await getUser(interaction)
            const newNickname = interaction.options.getString('nickname')
            
            user.DisplayName=newNickname;
            await updateUser(user)
            console.log(`${user.DisplayName} - ${user.Clan}`);
            try {
                await interaction.member.setNickname(`${user.DisplayName} - ${user.Clan}`)
            } catch (error) {
                console.error(error)
                interaction.followUp(`Couldnt change nickname`)
                return
            }
        
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