/// <reference path="../node_modules/discord.js/typings/index.d.ts" />
import * as Discord from 'discord.js';
import helper from './helper';
import * as Config from './config';
import {parse} from './parse';

const bot = new Discord.Client();
bot.on('error', (error)=>{ console.log(error.message); });
bot.on('ready', () => { console.log(`Logged in as ${bot.user.tag}!`); });
bot.on("message",(msg)=>{
	// Do a bit of preprocessing to produce some more useful events.
	if(msg.author.bot)
		return;

	bot.emit('userMessage', msg);

	if(!msg.content.startsWith(Config.prefix))
		return;
	bot.emit('command', msg.content);

	const parts = parse(msg.content.substr(Config.prefix.length));
	bot.emit('command ' + parts.shift(), msg,  parts);
});

// Import all the commands.
import * as path from 'path';
import * as fs from 'fs';
fs.readdir(path.join(__dirname, 'commands'), (err, files)=>{
	console.log("Loading plugins:");
	for(const file of files) {
		const plugin = path.basename(file).split(".")[0]
		console.log(`[${plugin}]`);
		require(`./commands/${plugin}`)['default'](bot, helper);
	}
});

bot.login(Config.token).catch(console.error.bind(console));
