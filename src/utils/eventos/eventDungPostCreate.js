const { Client, Message, ActionRowBuilder, EmbedBuilder, Embed, ButtonBuilder, ButtonStyle } = require("discord.js");
const EventDungSch = require('../../models/eventos/eventDungSch');
const eventDungPostMsgCreate = require("./eventDungPostMsgCreate");
const dList = require('../../Data/DungList.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {EventDungSch} dungeonEvt
 */

module.exports = async (client, dungeonEvt) => {
    // try {
    console.log('a');
    const board = await client.channels.fetch('1232395814291378258'); //TODO Set up config file
    console.log(board);
    console.log("threads: ");
    console.log(board.threads);
    const thread = await board.threads.create({
        name: dungeonEvt.DungName,
        message: {
            embeds: [createMsg(dungeonEvt)],
            autoArchiveDuration: 60,
            components:[createButtons(dungeonEvt)]
        }
    });
    console.log('c');
    console.log(`Created thread: ${thread.name}`);

    //   } catch (error) {
    //     console.log("error saving dungeon:\n" + error);
    //  }
}

/**
 * @param {Client} client 
 * @param {EventDungSch} dungeonEvt 
 * @returns {Embed}
 */
function createMsg(dungeonEvt) {
    //get img urlg
    var iUrl = ""
    for (const dung of dList.dungs) {

        if (dung.dungName.toLowerCase() == dungeonEvt.DungName.toLowerCase()) {
            iUrl = dung.imgUrl ?? ""
            break;
        }
    }

    const boolsLiteral = `Achivements are ${dungeonEvt.achievements ? '' : 'NOT'} the focus
    The key is ${dungeonEvt.keyGiven ? '' : 'NOT'} given
    The date is ${dungeonEvt.strictDate?'':'NOT'} strict`

    const peopleLiteral=`Minmum people: ${dungeonEvt.MinPeople}
    Maximum people: ${dungeonEvt.MaxPeople}`

    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(dungeonEvt.DungName ?? 'missing tittle')
        .setDescription(dungeonEvt.Description ?? "no desc")
        .setThumbnail(iUrl)
        .setImage(iUrl)
        .addFields(
            { name: new Date(dungeonEvt.eventDate).toDateString(), value: new Date(dungeonEvt.eventDate).toTimeString() },
            { name: `Desired people: ${dungeonEvt.DesiredPeople}`, value: peopleLiteral },
            { name: '\u200B', value: '\u200B' },
            { name: 'TEST NAME ', value: boolsLiteral, inline: false },
            { name: '🏆', value: dungeonEvt.achievements ? '✔️' : '❌', inline: true },
            { name: '🔑', value: dungeonEvt.keyGiven ? '✔️' : '❌', inline: true },
            { name: '📅', value: dungeonEvt.strictDate ? '✔️' : '❌', inline: true },

        )
        .setTimestamp()
        .setFooter({ text: `ID: ${dungeonEvt.eventID}`});
    return exampleEmbed
}
/**
 * 
 * @param {EventDungSch} dungeonEvt 
 * @returns {ActionRowBuilder}
 */
function createButtons(dungeonEvt){
    const joinBtn = new ButtonBuilder()
    .setCustomId('DungEvent*join*'+dungeonEvt.eventID)
    .setLabel('Join')
    .setStyle(ButtonStyle.Success);
    const leaveBtn = new ButtonBuilder()
    .setCustomId('DungEvent*leave*'+dungeonEvt.eventID)
    .setLabel('Leave')
    .setStyle(ButtonStyle.Danger);

    return new ActionRowBuilder().setComponents([joinBtn,leaveBtn])

}