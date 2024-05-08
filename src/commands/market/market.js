const { SlashCommandBuilder } = require("discord.js");
const ItemList = require('../../Data/Items.json');
const marketOfferSch = require("../../models/market/marketOfferSch");
const marketCreateOfferPost = require("../../utils/market/marketCreateOfferPost");
const itemDetailsModal = require("../../Modals/itemDetailsModal");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('Buy and Sell your items')
        .addSubcommand(sc =>
            sc
                .setName('sell')
                .setDescription('Sell an item')
                .addStringOption(so =>
                    so
                        .setAutocomplete(true)
                        .setRequired(true)
                        .setName('item')
                        .setDescription('Item to sell'))
                .addIntegerOption(no =>
                    no
                        .setRequired(true)
                        .setName('price')
                        .setDescription('Price of the item'))
                .addBooleanOption(bo =>
                    bo
                        .setName('detailed')
                        .setDescription('Set items stats manually'))),
    run: async ({ interaction, client, handler }) => {
        switch (interaction.options.getSubcommand()) {
            case 'sell':
                try {
                    let resp
                    const item = ItemList.find((i) => { return i.Name == interaction.options.getString('item') })
                    if (interaction.options.getBoolean('detailed')) {
                        await interaction.showModal(itemDetailsModal(item))
                        resp = await interaction.awaitModalSubmit({
                            // Timeout after a minute of not receiving any valid Modals
                            time: 60000,
                            // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
                            filter: i => i.user.id === interaction.user.id,
                        }).catch(error => {
                            // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
                            console.error(error)
                            return null
                        })
                        resp.deferReply();
                        const val = resp.fields.getTextInputValue('stats')
                        item.Stats = val.split('\n')

                    
                        
                    }
                    if(!interaction.replied)await interaction.deferReply();
                    const newOffer = new marketOfferSch({
                        GuildId: interaction.guildId,
                        UserId: interaction.user.id,
                        Item: item,
                        Price: interaction.options.getInteger('price')
                    })
                    const post = await marketCreateOfferPost(client, newOffer)
                    newOffer.PostID = post.id
                    await newOffer.save();

                    await interaction.editReply('Post Created')
                } catch (error) {
                    interaction.editReply('Error creating post')
                    console.error(error);

                }
                break;

            default:
                break;
        }


    },
    autocomplete: async ({ interaction, client, handler }) => {
        try {

            const focusedOption = interaction.options.getFocused(true).value;
            const filteredChoices = ItemList.filter(item => item.Name.toLowerCase().includes(focusedOption.toLowerCase()));
            const results = filteredChoices.map((j) => { return { name: j.Name, value: j.Name } });
            interaction.respond(results.slice(0, 25));
        } catch (error) {
            console.error(error);
        }
    },
    options: {
        devOnly: true,
    }
}