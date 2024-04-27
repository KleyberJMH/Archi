const { Events, BaseInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder, CommandInteraction } = require('discord.js');
const participantSch = require('../../models/general/pjSch');
const pjClasses = require('../../Data/General.json').Classes.map(i => i['name'])
const pjInfoModal = require('../../Modals/pjInfoModal');
const eventDungSch = require('../../models/eventos/eventDungSch');
const getUserPjs = require('../../utils/general/getUserPjs');

/**
 * 
 * @param {BaseInteraction} interaction 
 * @param {Client} client 
 */
module.exports = (interaction, client) => {
    if (interaction.isButton()) {
        console.log('button clicked')
        const params = interaction.customId.split('*')
        switch (params[0]) {
            case 'DungEvent':
                dungeonEventBtnClick(params, interaction)
                break;

            default:
                break;
        }
        console.log(params);
    }
}
/**
 * 
 * @param {String[]} params 
 * @param {CommandInteraction} interaction 
 */
async function dungeonEventBtnClick(params, interaction) {

    switch (params[1]) {
        //Dungeon event Join
        case 'join':
            await interaction.deferReply({ ephemeral: true });
            const pjOptns = (await getUserPjs(interaction.guildId, interaction.user.id)).map(
                pj => {
                    return { label: pj.PJName, value: JSON.stringify(pj) }
                })

            const pjSelect = new StringSelectMenuBuilder()
                .setCustomId('pj')
                .setPlaceholder('Select a PJ')
                .addOptions(pjOptns)

            const pjSelectResponse = await interaction.editReply({
                content: 'Choose your PJ',
                components: [new ActionRowBuilder().addComponents(pjSelect)],
            });
            var participant
            
            try {
                const collectorFilter = i => i.user.id === interaction.user.id;
                const confirmation = await pjSelectResponse.awaitMessageComponent({ filter: collectorFilter, time: 60 * 1000 });
                participant = participantSch.hydrate(JSON.parse(confirmation.values[0]))
               // pjSelectResponse.edit({ content: 'Added1 ' + participant.PJName})
               // await pjSelectResponse.delete()
               interaction.editReply("hhhh")
                console.log(participant);

                //Find event by ID
                const dungEvent = await eventDungSch.findOne({ eventID: params[2] }).exec()
                //Add participant
                const addPartRes = dungEvent.addParticipant(participant)
                if (addPartRes === -1) {
                    interaction.editReply(`unable to add selected PJ, check it's not already signed up`)
                }
                else {

                    //Update participants db
                    const result = await eventDungSch.updateOne({ eventID: params[2] }, dungEvent)
                    console.log(result);
                    interaction.editReply('Added2 ' + participant.PJName)
                }
            } catch (e) {
                console.log(e)
                await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
            }


            break;
        case 'leave':
            console.log('leave' + params[2]);
            break;


        default:
            break;
    }

}
