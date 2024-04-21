const { Client, GatewayIntentBits } = require('discord.js')
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
    devUserIds: ['235916525943521290', '164471239606272000'],
    eventsPath: `${__dirname}/events`,
    commandsPath: `${__dirname}/commands`,
    bulkRegister: true,
    validationsPath:`${__dirname}/validations`
});
(async ()=> {

   try{
   await mongoose.connect(process.env.MONGODB_URI);
   console.log('Connected to database.');
   client.login(process.env.TOKEN);
   } catch (error) {
    console.log(`Error: ${error}`);
   } 
})();



