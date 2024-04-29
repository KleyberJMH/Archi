const { BaseInteraction } = require('discord.js')
const userSch=require('../../models/general/userSch.js')
/**
 * 
 * @param {BaseInteraction} interaction 
 * @returns {userSch}
 */
module.exports= async(interaction)=>{
    var user = await userSch.findOne({GuildId:interaction.guild.id,UserId:interaction.user.id})
    if (user==null) {
        user = new userSch({GuildId:interaction.guild.id,UserId:interaction.user.id, DisplayName:interaction.user.displayName})
        await user.save()
    }
    return user

}