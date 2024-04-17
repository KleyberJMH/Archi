const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit')
const mongoose = require('mongoose')
require('dotenv/config');

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

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to database.')

    client.login(process.env.TOKEN);
})


