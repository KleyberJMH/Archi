const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, Client, Message, ClientVoiceManager } = require('discord.js');
const eventDungSchema = require('../../models/eventos/eventDungSch');
const dList = require('../../Data/DungList.json');
const eventDungCreate = require('../../utils/eventos/eventDungCreate');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('dungeon')
        .setDescription('Dungeon Events')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a dungeon event')
                .addStringOption(option =>
                    option
                        .setName("dungeon")
                        .setDescription('Dungeon Name')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName("date")
                        .setDescription("[NO IMPLEMENTADO]Acepta formato dd/mm/aa hh:mm o bien tiempo relativo (2h, 30m, 1d...)")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName("desired")
                        .setDescription("Desired number of people")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName("min")
                        .setDescription("Minimum number of people (default 1)")
                )
                .addIntegerOption(option =>
                    option
                        .setName("max")
                        .setDescription("Maximum number of people (default 4)")
                )
        ),   
    run: async ({ interaction, client, handler }) => {

        if (interaction.options.getSubcommand() === 'create') {
            const newEvent = new eventDungSchema({
                AuthorID: interaction.user.id,
                GuildID: interaction.guildId,
                DungName: interaction.options.getString('dungeon'),
                DesiredPeople: interaction.options.getInteger('desired'),
                MaxPeople: interaction.options.getInteger('max') ?? 4,
                MinPeople: interaction.options.getInteger('min') ?? 1,
                eventDate: new Date().toString(),  //TODO: Implement actual Date obj creation  interaction.options.getString('date') ??
                eventID:`${interaction.user.id}${interaction.guildId}${interaction.options.getString('dungeon')}${interaction.options.getString('date') ??'1d'}`

            })
            eventDungCreate(newEvent)
            interaction.reply({ content: 'Added', ephemeral: true })
        }
    },
    autocomplete: async ({ interaction, client, handler }) => {
        const focusedOption = interaction.options.getFocused(true).value;
        const filteredChoices = dList.dungs.filter(dung => dung.dungName.toLowerCase().includes(focusedOption.toLowerCase()));
        const results = filteredChoices.map((dung) => {
            return {
                name: `${dung.dungName}`,
                value: `${dung.dungName}`,
            };
        });
        interaction.respond(results.slice(0, 25));
    },
    options:{
        
    }
}