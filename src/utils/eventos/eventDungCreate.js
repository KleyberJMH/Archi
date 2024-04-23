const {Client, Message} =require("discord.js");
const EventDungSch=require('../../models/eventos/eventDungSch')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports =  async (dungeon)=>{
    try {
        console.log(dungeon);
        new EventDungSch(dungeon).save();
    } catch (error) {
        console.log("error saving dungeon:\n"+error);
    }
}