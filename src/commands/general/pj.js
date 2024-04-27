const { SlashCommandBuilder, BaseInteraction } = require("discord.js");
const pjSch=require('../../models/general/pjSch.js')

const pjScrapper = require('../../utils/extras/ScrapPJInfo');
const getUser = require("../../utils/general/getUser.js");
const updateUser = require("../../utils/general/updateUser.js");
const getUserPjs = require("../../utils/general/getUserPjs.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pj')
        .setDescription('Manage your game characters')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a PJ')
                .addStringOption(option =>
                    option
                        .setName('name')
                        .setDescription('PJ Name')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List your pjs')),


    run: async ({ interaction, client, handler }) => {
        if (interaction.options.getSubcommand() === 'add') {
            interaction.deferReply();
            const user = await getUser(interaction)
            const pj = await pjScrapper(interaction.options.getString('name'))
            if (user.MainPj == null | user.MainPj == undefined) user.MainPj = pj;
            user.Pjs.push(pj)
            const res = await updateUser(user)
            console.log(res)
            interaction.editReply(`Added ${pj.PJName}(${pj.PjClass} ${pj.PjLvl})to ${user.DisplayName}`)
        }else if (interaction.options.getSubcommand() === 'list'){
            const pjList=(await getUserPjs(interaction.guild.id,interaction.user.id));
            if (pjList.length>0){
                const pjListStr=pjList.map(i => `${i.PJName}, ${i.PjClass} ${i.PjLvl}`).join('\n')
                console.log(pjListStr);
                interaction.reply(pjListStr)
            }else{
                interaction.reply('No PJ found, add one with /pj add')
            }


        }
    },
    options: {
        //cooldown: '1d',
        devOnly: true,
        //userPermissions:['Administrator'],
        //botPermissions:['BanMembers'],
        //deleted: true,
    }

}