const { SlashCommandBuilder, CommandInteraction, ChannelType } = require("discord.js");
const { setDungChan, setMarketChan } = require("../../utils/general/GuildConfig");
const GuildConfig = require("../../utils/general/GuildConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Bot configurations for this server')
        .addSubcommand(scLanguage =>
            scLanguage
                .setName('language')
                .setDescription('Set bot language')
                .addStringOption(opt =>
                    opt
                        .setRequired(true)
                        .setName('language')
                        .setDescription('ES or EN')
                        .setChoices({name:'Español', value:'ES'},{name:'English', value:'EN'})))

        .addSubcommand(sc =>
            sc
                .setName('dungeonchannel')
                .setDescription('set de channel for the dungeon event posts')
                .addChannelOption(opt =>
                    opt
                        .setName('channel')
                        .setDescription('Channel')
                        .addChannelTypes(ChannelType.GuildForum)))
        .addSubcommand(sc =>
            sc
                .setName('marketchannel')
                .setDescription('set de channel for the market offers posts')
                .addChannelOption(opt =>
                    opt
                        .setName('channel')
                        .setDescription('Channel')
                        .addChannelTypes(ChannelType.GuildForum)))
        .addSubcommand(sb =>
            sb
                .setName('test')
                .setDescription('test')),
    run: async ({ interaction, client, handler }) => {

        await interaction.deferReply();
        switch (interaction.options.getSubcommand()) {
            case 'test':
                try {
                    /**@type {Map<String,String>} */
                    const a = GuildConfig.getStrings('EN', 'Jobs.Commands')
                    a.get()
                    console.log(a);
                } catch (error) {
                    console.log(error);
                }
                break;
            case 'language':
                    await GuildConfig.setLanguage(interaction.guildId,interaction.options.getString('language'))
                    interaction.editReply('Language set')
                break;
            case 'dungeonchannel':
                await setDungChan(interaction.guildId, interaction.options.getChannel('channel').id)
                await interaction.editReply(`Channel ${interaction.options.getChannel('channel').name} set as the market offers board`)
                break;
            case 'marketchannel':
                await setMarketChan(interaction.guildId, interaction.options.getChannel('channel').id)
                await interaction.editReply(`Channel ${interaction.options.getChannel('channel').name} set as the market offers board`)
                break;

            default:
                break;
        }

    },
    autocomplete: async ({ interaction, client, handler }) => {
        const focusedOption = interaction.options.getFocused(true).value;
        const filteredChoices = ["ES", "EN"].filter(j => j.toLowerCase().includes(focusedOption.toLowerCase()));
        const results = filteredChoices.map((j) => { return { name: j.name, value: j.name } });
        interaction.respond(results.slice(0, 25));
    },
    options: {
        devOnly: true,

    }
}