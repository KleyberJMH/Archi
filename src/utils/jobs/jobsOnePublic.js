const { CommandInteraction, StringSelectMenuBuilder,ActionRowBuilder } = require("discord.js");
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
    const pjSelect = new StringSelectMenuBuilder()
        .setCustomId('pj')
        .setPlaceholder('Select a PJ')
        .addOptions(user.Pjs.map(pj => { return { label: pj.PJName, value: pj.PJName } }))

    const collectorFilter = i => i.user.id === interaction.user.id;
    const pjSelectResponse = await interaction.editReply({
        content: 'Choose the PJ',
        components: [new ActionRowBuilder().addComponents(pjSelect)],
    });
    /**@type {pjSch} */
    let pj;
    try {
        const confirmation = await pjSelectResponse.awaitMessageComponent({ filter: collectorFilter, time: 60 * 1000 });
        pj = user.Pjs.find((pj)=>{return pj.PJName==confirmation.values[0]})
        interaction.editReply({ content: `Selected ${pj.PJName}`, components: [] })
    } catch (e) {
        console.log(e)
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        return
    }
    const jobSelect = new StringSelectMenuBuilder()
        .setCustomId('job')
        .setPlaceholder('Select a Profession')
        .addOptions(pj.Professions.map(job => { return { label: job.professionName, value: job.professionName } }))
    const jobSelectResponse = await interaction.editReply({ content: 'Choose the profession', components: [new ActionRowBuilder().addComponents(jobSelect)] })
    let job
    try {
        const jobSelection = await jobSelectResponse.awaitMessageComponent({ filter: collectorFilter, time: 60 * 1000 })
        job = jobSelection.values[0]
        interaction.editReply({ content: `Selected ${job.professionName}`, components: [] })

    } catch (error) {
        console.log(error)
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        return
    }
    pj.Professions.find((j) => { return j.professionName = job }).public = true;
    updateUser(user)
    console.log(user);
    interaction.editReply(`Job ${job} set as public`)
}