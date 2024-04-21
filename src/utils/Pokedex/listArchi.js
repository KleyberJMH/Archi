const { SlashCommandBuilder, Client, Message } = require('discord.js');
const Pokedex = require('../../models/Pokedex');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (user, guild,) => {

    const query = {
        userId: user,
        guildId: guild,
    }


    try {
        const pokedex = await Pokedex.findOne(query);
        if (pokedex) {
            console.log("aaaa")
            console.log(pokedex.archiCollection)
            return pokedex.archiCollection
        } else {
            console.log("bbbbb")
        }

    } catch (error) {
        console.log(`Error listing archi: ${error}`)
    } 


}
