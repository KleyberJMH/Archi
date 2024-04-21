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
        console.log(pokedex);
        return pokedex.archiCollection

    } catch (error) {
        console.log(`Error adding archi: ${error}`)
    }


}
