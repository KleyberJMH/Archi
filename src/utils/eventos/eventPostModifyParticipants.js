const { Client, ForumChannel, Message } = require("discord.js");
const {pjSch} = require('../../models/general/pjSch');
const eventDungPostPartiEmbedCreate = require("./eventDungPostPartiEmbedCreate");

/**
 * @param {Client} client
 * @param {String} postID 
 * @param {[pjSch]} participants 
 */
module.exports=async function (client,postID, participants) {
    /** @type {ForumChannel}*/
    const board =  await client.channels.fetch('1232395814291378258'); //TODO Set up config file
    const thread = await board.threads.fetch(postID)
    const message= (await thread.messages.fetch()).last() 
    await message.edit({content:message.content,embeds:[message.embeds[0],eventDungPostPartiEmbedCreate(participants)]})
   
}