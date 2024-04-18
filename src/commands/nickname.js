const { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    ChannelType, 
    InteractionType} 
    = require('discord.js')

    /**
 * @param {import('commandkit').SlashCommandProps} param0
 */

const data = new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('[NO FUNCIONA]Change your discord nickname to you in-game nickname')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption((option) => 
    option
        .setName('nickname')
        .setDescription('Enter your main in-game nickname')
        .setRequired(true)
    )

    async function run({ interaction }) {
        try {
            const newNickname = interaction.options.getString('nickname')
            const member =  interaction.member
            const clanName = member.roles.cache.filter((role) => role.name == '- Mugiwara -')
            await interaction.deferReply({ephemeral: true})

            // console.log(clanName.Role.name)
            // member.nickname = newNickname
            interaction.followUp(`Your nickname has changed to ${newNickname}`)
                return

            
        } catch (error) {
            console.log(`Error in ${__filename}:\n`, error)
        }
    }

module.exports = { data, run }