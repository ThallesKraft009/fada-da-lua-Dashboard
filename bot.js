const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Dashboard } = require("./index.js");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

client.login(process.env.token)

client.once('ready', () => {
  
  Dashboard(client);
  console.log('site rodando!')


})