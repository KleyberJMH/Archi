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
            const col=pokedex.archiCollection
            const index= col.findIndex((entry) => entry.Name == archi.Name)
            if (index==-1) return undefined
            col[index].Amount--;
            if(col[index].Amount<1){
                col.splice(index,1);
            }
            await Pokedex.updateOne(query,{archiCollection: col})



        } 

    } catch (error) {
        console.log(`Error adding archi: ${error}`)
    }


}

