const participantSch = require('../../models/general/pjSch');
const eventDungSch = require('../../models/eventos/eventDungSch');
const getUserPjs = require('../../utils/general/getUserPjs');
const eventPostModifyParticipants = require('../../utils/eventos/eventPostModifyParticipants');
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonInteraction } = require('discord.js');
const GuildConfig = require('../general/GuildConfig');



/**
 * 
 * @param {String[]} params 
 * @param {ButtonInteraction} interaction 
 */
module.exports = async (params, interaction) => {
    const channel = interaction.channel
    await interaction.deferReply({ ephemeral: true });
    const strings=GuildConfig.getStrings(await GuildConfig.getLanguage(interaction.guildId),'Jobs.Buttons')
    const userPjs = await getUserPjs(interaction.guildId, interaction.user.id)
    const dungEvent = await eventDungSch.findOne({ eventID: params[2] }).exec()
    const opts=userPjs.map(pj => { return { label: pj.PJName, value: pj.PJName } })
    const pjSelect = new StringSelectMenuBuilder()
        .setCustomId('pj')
        .setPlaceholder('Select a PJ')
        .addOptions(opts)
    const collectorFilter = i => i.user.id === interaction.user.id;
    const pjSelectResponse = await interaction.editReply({
        content: strings['ChoosePJ'],
        components: [new ActionRowBuilder().addComponents(pjSelect)],
    });

    let participant
    try {
        const confirmation = await pjSelectResponse.awaitMessageComponent({ filter: collectorFilter, time: 60 * 1000 });
        participant = userPjs.find((pj)=>{return pj.PJName==confirmation.values[0]})
        
        interaction.editReply({ content: strings['Selected']+`${participant.PJName}`, components: [] })
    } catch (e) {
        console.log(e)
        await interaction.editReply({ content: strings[CancelNoResponse], components: [] });
        return
    }
    switch (params[1]) {
        //Dungeon event Join
        case 'join':
            //Add participant
            const addPartRes = dungEvent.addParticipant(participant)
            switch (addPartRes) {
                case -1:
                    interaction.editReply(strings['AlreadySigned'])
                    break;
                case -2:
                    interaction.editReply(strings['ErrorAdd'])
                    break;
                default:
                    //Update participants db
                    await eventDungSch.updateOne({ eventID: params[2] }, dungEvent)
                    await eventPostModifyParticipants(interaction.guildId,interaction.client, dungEvent.postId, dungEvent.participants)
                    interaction.editReply(strings['Added'] + participant.PJName)
                    break;
            } break;
        case 'leave':
            const remPartRes = dungEvent.removeParticipant(participant)
            switch (remPartRes) {
                case -1:
                    interaction.editReply(strings['NotSigned'])
                    break;
                case -2:
                    interaction.editReply(strings['ErrorRem'])
                    break;
                default:
                    //Update participants db
                    await eventDungSch.updateOne({ eventID: params[2] }, dungEvent)
                    await eventPostModifyParticipants(interaction.guildId,interaction.client, dungEvent.postId, dungEvent.participants)
                    interaction.editReply(strings['Removed'] + participant.PJName)
                    break;
            }break;


        default:
            break;
    }
}
