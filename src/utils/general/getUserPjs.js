const userSch=require('../../models/general/userSch.js')
const pjSch=require('../../models/general/pjSch.js')


/**
 * 
 * @param {String} guildId 
 * @param {String} userId 
 * @returns {[pjSch]}
 */
module.exports= async(guildId, userId)=>{
    var user = await userSch.findOne({GuildId:guildId,UserId:userId})
    if (user==null) {
        user = new userSch({GuildId:interaction.guild.id,UserId:interaction.user.id, DisplayName:interaction.user.displayName})
        await user.save()
    }
    return user.Pjs

}