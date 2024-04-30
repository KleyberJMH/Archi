const { Client, ThreadChannel, ActionRowBuilder, EmbedBuilder, Embed, ButtonBuilder, ButtonStyle, ForumChannel, Channel , GuildForumTag} = require("discord.js");
const EventDungSch = require('../../models/eventos/eventDungSch');
const dList = require('../../Data/DungList.json');
const eventDungPostPartiEmbedCreate = require("./eventDungPostPartiEmbedCreate");

/**
 * 
 * @param {Client} client 
 * @param {EventDungSch} dungeonEvt
 * @returns {ThreadChannel}
 */

module.exports = async (client, dungeonEvt) => {
    /** @type {ForumChannel}*/
    const board = await client.channels.fetch('1232395814291378258'); //TODO Set up config file
    const avTags= board.availableTags
    const tag={name:dungeonEvt.DungName,moderated:false}
    const index=avTags.findIndex((t) =>{return t.name==dungeonEvt.DungName})
    if(index==-1){
        avTags.push(tag)
        await board.setAvailableTags(avTags)
    }
    const thread = await board.threads.create({
        name: dungeonEvt.DungName,
        message: {
            embeds: [createInfoEmbed(dungeonEvt), eventDungPostPartiEmbedCreate(dungeonEvt.participants)],
            components: [createButtons(dungeonEvt)],
            autoArchiveDuration: 60
        },
        appliedTags:[board.availableTags.find((t) =>{return t.name==dungeonEvt.DungName}).id]
        
    });
    console.log(`Created thread: ${thread.name}`);
    return thread;
}

/**
 * @param {Client} client 
 * @param {EventDungSch} dungeonEvt 
 * @returns {Embed}
 */
function createInfoEmbed(dungeonEvt) {
    //get img urlg
    const iUrl =dList.dungs.find(d => d.dungName.toLowerCase()== dungeonEvt.DungName.toLowerCase()).imgUrl??""
    
    const boolsLiteral = `Achivements are ${dungeonEvt.achievements ? '' : 'NOT'} the focus
    The key is ${dungeonEvt.keyGiven ? '' : 'NOT'} given
    The date is ${dungeonEvt.strictDate ? '' : 'NOT'} strict`

    const peopleLiteral = `Minmum people: ${dungeonEvt.MinPeople}
    Maximum people: ${dungeonEvt.MaxPeople}`

    const embed = new EmbedBuilder()
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
        .setFooter({ text: `ID: ${dungeonEvt.eventID}` })
        
    return embed
}

/**
 * 
 * @param {EventDungSch} dungeonEvt 
 * @returns {ActionRowBuilder}
 */
function createButtons(dungeonEvt) {
    const joinBtn = new ButtonBuilder()
        .setCustomId('DungEvent*join*' + dungeonEvt.eventID)
        .setLabel('Join')
        .setStyle(ButtonStyle.Success);
    const leaveBtn = new ButtonBuilder()
        .setCustomId('DungEvent*leave*' + dungeonEvt.eventID)
        .setLabel('Leave')
        .setStyle(ButtonStyle.Danger);

    return new ActionRowBuilder().setComponents([joinBtn, leaveBtn])

}