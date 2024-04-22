const { SlashCommandBuilder, Client, Message } = require('discord.js');
const Pokedex = require('../../models/Pokedex');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (user, guild, archi) => {

    const query = {
        userId: user.id,
        guildId: guild.id,
    }

console.log("Empezado borrado de "+archi.Name);
    try {
        console.log("a");
        const pokedex = await Pokedex.findOne(query);
        console.log(pokedex);
        if (pokedex) {
            console.log("hay pokedex");
            const col=pokedex.archiCollection
            const index= col.findIndex((entry) => entry.Name == archi.Name)
            console.log("index: "+index);
            if (index==-1) return undefined
            col[index].Amount--;
            console.log("amount: "+col[index].Amount);
            if(col[index].Amount<1){
                col.splice(index,1);
            }
            const ret= await Pokedex.updateOne(query,{archiCollection: col})
            return ret
        } 
        else{
            console.log("no hay pokedex");
            return undefined
        }

    } catch (error) {
        console.log(`Error removing archi: ${error}`)
    }


}

