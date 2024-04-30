const { CommandInteraction, GuildMember } = require("discord.js");
const userSch = require("../../models/general/userSch");

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (interaction) => {
    const job = interaction.options.getString('profession')
    const lvl = parseInt(interaction.options.getString('level'))
    const validUsersIDs = await userSch.find({ "Pjs.Professions": { $elemMatch: { professionName: job, professionLvl: { $gte: lvl }, public:true } } }, 'UserId').exec()
    /**@type {GuildMember[]} */
    const validUsers = []
    for (const vu of validUsersIDs) {validUsers.push(await interaction.guild.members.fetch({user:vu.UserId,force:true,withPresences:true}))}
    var replyStr=""
    for (const vu of validUsers) {
        const presence= interaction.guild.presences.resolve(vu.id)
        if(presence==='online' || presence==='idle' || presence==='dnd'){
            replyStr="🟢"+vu.toString()+"\n"+replyStr
        }else{
            replyStr=replyStr+vu.toString()+"\n"
        }
    }
    replyStr=`The following users have one ${job} of at least level ${lvl}:\n`+replyStr
    interaction.editReply(replyStr)




}