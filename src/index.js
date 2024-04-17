require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

new CommandKit({
    client,
    devGuildIds: ['1122901721044242532'],
    devUserIds: ['235916525943521290'],
    eventsPath: `${__dirname}/events`,
    commandsPath: `${__dirname}/commands`,
    //bulkRegister: true,
    validationsPath:`${__dirname}/validations`
})

client.login(process.env.TOKEN);