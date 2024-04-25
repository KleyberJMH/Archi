const { Client, Message, ActionRowBuilder, EmbedBuilder, Embed } = require("discord.js");
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
            reason: 'test',
        }
    });
    console.log('c');
    console.log(`Created thread: ${thread.name}`);

    //   } catch (error) {
    //     console.log("error saving dungeon:\n" + error);
    //  }
}

/**
 * 
 * @param {Client} client 
 * @param {EventDungSch} dungeonEvt 
 * @returns {Embed}
 */
function createMsg(dungeonEvt) {
    var iUrl = ""
    for (const dung of dList.dungs) {

        if (dung.dungName.toLowerCase() == dungeonEvt.DungName.toLowerCase()) {
            iUrl = dung.imgUrl ?? ""
            break;
        }
        else console.log("ifauk");
    }
    const url = dList.dungs.filter(dung => {

        dung.dungName.toLowerCase() == dungeonEvt.DungName.toLowerCase()

    })
    const boolsLiteral = `Achivements are ${dungeonEvt.achievements ? '' : 'NOT'} the focus
    The key is ${dungeonEvt.keyGiven ? '' : 'NOT'} given
    The date is ${dungeonEvt.strictDate?'':'NOT'} strict`

    const peopleLiteral=`Minmum amount of people required: ${dungeonEvt.MinPeople}
    Maximum amount of people aloud: ${dungeonEvt.MaxPeople}`

    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(dungeonEvt.DungName ?? 'missing tittle')
        .setDescription(dungeonEvt.Description ?? "no desc")
        .setThumbnail(iUrl)
        .addFields({ name: new Date(dungeonEvt.eventDate).toDateString(), value: new Date(dungeonEvt.eventDate).toTimeString() })
        .addFields(
            { name: `Desired people: ${dungeonEvt.DesiredPeople}`, value: peopleLiteral },
            { name: '\u200B', value: '\u200B' },
            { name: '🏆', value: dungeonEvt.achievements ? '✔️' : '❌', inline: true },
            { name: '🔑', value: dungeonEvt.keyGiven ? '✔️' : '❌', inline: true },
            { name: '📅', value: dungeonEvt.strictDate ? '✔️' : '❌', inline: true },
            { name: ' ', value: boolsLiteral, inline: false },

        )


        .setImage(iUrl)
        .setTimestamp()
        .setFooter({ text: `ID: ${dungeonEvt.eventID}`});
    return exampleEmbed
}
