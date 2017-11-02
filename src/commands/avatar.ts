import * as Discord from 'discord.js';
import * as config from '../config';

export default function(bot:Discord.Client) {
	bot.on('command avatar', (msg:Discord.Message, args:Array<string>)=>{
		const users = msg.mentions.users.array();
		if(users.length == 0) {
			msg.reply(`No users mentioned. Try \`${config.prefix}avatar @username\``);
		}
		for(const user of users) {
			msg.channel.send(user.avatarURL);
		}
	});
};
