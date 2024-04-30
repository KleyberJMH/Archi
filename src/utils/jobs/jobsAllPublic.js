const { CommandInteraction } = require("discord.js");
const pjSch = require('../../models/general/pjSch')
const professionSch = require('../../models/general/professionSch')
const getUser = require("../general/getUser");
const updateUser = require("../general/updateUser");

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports = async (interaction) => {
    const user = await getUser(interaction)
    user.Pjs.forEach(/** @param {pjSch} pj*/pj => {
        pj.Professions.forEach(/** @param {professionSch} job*/ job => {
            job.public = true;
        })
    });
    updateUser(user)
    console.log(user);
    interaction.editReply('Jobs set as public')
}