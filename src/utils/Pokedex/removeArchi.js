const { SlashCommandBuilder, Client, Message } = require('discord.js');
const Pokedex = require('../../models/Pokedex');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (user, guild, archi) => {

    const query = {
        userId: user,
        guildId: guild,
    }


    try {
        const pokedex = await Pokedex.findOne(query);
        if (pokedex) {
            pokedex.archiCollection=pokedex.archiCollection.filter(a => a.name!=archi);
            await pokedex.save();
        } 
    } catch (error) {
        console.log(`Error adding archi: ${error}`)
    }


}

