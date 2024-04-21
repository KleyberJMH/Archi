const { SlashCommandBuilder, Client, Message } = require('discord.js');
const addArchi = require('../../utils/Pokedex/addArchi.js');
const listArchi = require('../../utils/Pokedex/listArchi.js');
const aList = require('../../Data/ArchisList.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('archi')
        .setDescription('Pokedex')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Adds an Archie')
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('Nombre de el archi en fomrato "El Loquesea" (sin comillas)')
                        .setAutocomplete(true)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Lists an Archie')),

    run: async ({ interaction, client, handler }) => {

        if (interaction.options.getSubcommand() === 'add') {
            //Adding a new archi to the colection
            addArchi(interaction.user.id, interaction.guildId, interaction.options.getString('name'))
            interaction.reply('Added')
        }
        else if (interaction.options.getSubcommand() === 'list') {
            //Listing Collection
            const aCol = listArchi(interaction.user.id, interaction.guildId)
            if (!aCol) interaction.reply('No archis found, please add your first archi with /archi add');
            console.log(`Colection: ${aCol}`);
            interaction.reply(aCol);
        }


    },
    autocomplete: ({ interaction, client, handler }) => {
        const focusedOption = interaction.options.getFocused(true).value;
        // console.log(aList.archis)
        console.log(focusedOption)
        const filteredChoices = aList.archis.filter(archi => archi.name.toLowerCase().includes(focusedOption.toLowerCase()));
        console.log(`filtered: ${filteredChoices}`)
        //interaction.respond(filteredChoices.slice(0,10))
        const results = filteredChoices.map((archi) => {
            return {
                name: `${archi.name}`,
                value: `${archi.name}`,
            };
        });
        interaction.respond(results.slice(0, 25));
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:['BanMembers'],
        //deleted: true,
    }
}