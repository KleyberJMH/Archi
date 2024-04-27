const userSch=require('../../models/general/userSch.js')
/**
 * 
 * @param {userSch} user 
 * @returns {userSch}
 */
module.exports= async(user)=>{
    return await userSch.findOneAndReplace({GuildId:user.GuildId, UserId:user.UserId},user,{new:true})
}