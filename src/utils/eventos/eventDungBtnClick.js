const participantSch = require('../../models/general/pjSch');
const eventDungSch = require('../../models/eventos/eventDungSch');
const getUserPjs = require('../../utils/general/getUserPjs');
const eventPostModifyParticipants = require('../../utils/eventos/eventPostModifyParticipants');
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonInteraction } = require('discord.js');



/**
 * 
 * @param {String[]} params 
 * @param {ButtonInteraction} interaction 
 */
module.exports = async (params, interaction) => {

    await interaction.deferReply({ ephemeral: true });
    const userPjs = await getUserPjs(interaction.guildId, interaction.user.id)
    const dungEvent = await eventDungSch.findOne({ eventID: params[2] }).exec()
    const pjSelect = new StringSelectMenuBuilder()
        .setCustomId('pj')
        .setPlaceholder('Select a PJ')
        .addOptions(userPjs.map(pj => { return { label: pj.PJName, value: JSON.stringify(pj) } }))
    const collectorFilter = i => i.user.id === interaction.user.id;
    const pjSelectResponse = await interaction.editReply({
        content: 'Choose the PJ',
        components: [new ActionRowBuilder().addComponents(pjSelect)],
    });

    let participant
    try {
        const confirmation = await pjSelectResponse.awaitMessageComponent({ filter: collectorFilter, time: 60 * 1000 });
        participant = participantSch.hydrate(JSON.parse(confirmation.values[0]))
        interaction.editReply({ content: `Selected ${participant.PJName}`, components: [] })
    } catch (e) {
        console.log(e)
        await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        return
    }
    switch (params[1]) {
        //Dungeon event Join
        case 'join':
            //Add participant
            const addPartRes = dungEvent.addParticipant(participant)
            switch (addPartRes) {
                case -1:
                    interaction.editReply(`Character already signed up for event`)
                    break;
                case -2:
                    interaction.editReply(`Error adding PJ`)
                    break;
                default:
                    //Update participants db
                    await eventDungSch.updateOne({ eventID: params[2] }, dungEvent)
                    await eventPostModifyParticipants(interaction.client, dungEvent.postId, dungEvent.participants)
                    interaction.editReply('Added ' + participant.PJName)
                    break;
            } break;
        case 'leave':
            const remPartRes = dungEvent.removeParticipant(participant)
            switch (remPartRes) {
                case -1:
                    interaction.editReply(`Character not signed up for event`)
                    break;
                case -2:
                    interaction.editReply(`Error removing  PJ`)
                    break;
                default:
                    //Update participants db
                    await eventDungSch.updateOne({ eventID: params[2] }, dungEvent)
                    await eventPostModifyParticipants(interaction.client, dungEvent.postId, dungEvent.participants)
                    interaction.editReply('Removed ' + participant.PJName)
                    break;
            }break;


        default:
            break;
    }
}
