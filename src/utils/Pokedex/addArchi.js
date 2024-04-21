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
            pokedex.archiCollection.push(archi);
            await pokedex.save();
        } else {
            const newPokedex = new Pokedex({
                userId: user,
                guildId: guild,
                archiCollection: archi,
            })
            await newPokedex.save();

        }

    } catch (error) {
        console.log(`Error adding archi: ${error}`)
    }


}

