const { SlashCommandBuilder, EmbedBuilder, APIEmbedField, CommandInteraction } = require("discord.js");
const getUserPjs = require("../../utils/general/getUserPjs.js");
const jobsAllPublic = require("../../utils/jobs/jobsAllPublic.js");
const jobsAllPrivate = require("../../utils/jobs/jobsAllPrivate.js");
const jobsOnePublic = require("../../utils/jobs/jobsOnePublic.js");
const jobsOnePrivate = require("../../utils/jobs/jobsOnePrivate.js");
const jobsFind = require("../../utils/jobs/jobsFind.js");
const jobList=require("../../Data/General.json").Professions
const { autocomplete } = require("../eventos/eventDungCom.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDescription('Professions')
        .addSubcommand(scList =>
            scList
                .setName('list')
                .setDescription('list your jobs'))
        .addSubcommand(scPublicAll =>
            scPublicAll
                .setName('setpublic')
                .setDescription('Make all jobs public'))
        .addSubcommand(sbPublicOne =>
            sbPublicOne
                .setName('setonepublic')
                .setDescription('Make one job public'))
        .addSubcommand(scPrivateAll =>
            scPrivateAll
                .setName('setprivate')
                .setDescription('Make all jobs private'))
        .addSubcommand(sbPrivateOne =>
            sbPrivateOne
                .setName('setoneprivate')
                .setDescription('Make one job private'))
        .addSubcommand(scFind =>
            scFind
                .setName('find')
                .setDescription('Find people of given job and level')
                .addStringOption(opt =>
                    opt
                        .setName('profession')
                        .setDescription('Profession you are looking for')
                        .setAutocomplete(true)
                        .setRequired(true))
                .addStringOption(opt =>
                    opt
                        .setName('level')
                        .setDescription('Minimum level you are looking for')
                        .setRequired(true))),
    run: async ({ interaction, client, handler }) => {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() === 'list') {
            const pjList = await getUserPjs(interaction.guild.id, interaction.user.id);
            const embeds = [];

            pjList.forEach((pj) => {
                /**@type {APIEmbedField[]} */
                const jobs = pj.Professions.map((job) => {
                    const jobName = job.professionName
                    const jobLvl = job.professionLvl.toString()
                    return { name: jobName, value: job.public ? `⭐${jobLvl}` : jobLvl, inline: true }
                })
                console.log(pj);
                const embed = new EmbedBuilder()
                    .setTitle(pj.PJName)
                    .addFields(jobs)

                embeds.push(embed)
            })

            console.log(embeds);
            interaction.editReply({ embeds: embeds })


        } else if (interaction.options.getSubcommand() === 'setprivate') {
            jobsAllPrivate(interaction)
        } else if (interaction.options.getSubcommand() === 'setpublic') {
            jobsAllPublic(interaction)
        } else if (interaction.options.getSubcommand() === 'setoneprivate') {
            jobsOnePrivate(interaction)
        } else if (interaction.options.getSubcommand() === 'setonepublic') {
            jobsOnePublic(interaction)
        } else if (interaction.options.getSubcommand()=== 'find'){
            jobsFind(interaction)
        }
    },
    autocomplete:async ({ interaction, client, handler }) =>{
        const focusedOption = interaction.options.getFocused(true).value;
        const filteredChoices = jobList.filter(j => j.name.toLowerCase().includes(focusedOption.toLowerCase()));
        const results = filteredChoices.map((j) => {return {name: j.name,value: j.name}});
        interaction.respond(results.slice(0, 25));

    },
    options: {
        devOnly: true,

    }

}