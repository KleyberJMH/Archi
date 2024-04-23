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


    try {
        const pkdx = await Pokedex.findOne(query);
        //if user's pokdx exists
        if (pkdx) {
            //User has pkdx, adding the archi

            //Find out if user already has the archi
            const index = pkdx.archiCollection.findIndex((entry) => entry.Name == archi.Name)

            //if user does not have the archi, add archi to collection
            if (index == -1) pkdx.archiCollection.push(archi);
            //if user has archi, increase amount by one
            else pkdx.archiCollection[index].Amount++;
            //save changes
            await Pokedex.updateOne(query, { archiCollection: pkdx.archiCollection });

        } else {
            //First archi of the user, creating colection and adding the archi
            console.log(archi)
            const newPokedex = new Pokedex({
                userId: user.id,
                guildId: guild.id,
                userDisplayName: user.username,
                guildDisplayName: guild.name,
                archiCollection: new Array(archi),
            })
            await newPokedex.save();
        }

    } catch (error) {
        console.log(`Error adding archi: ${error}`)
    }


}

