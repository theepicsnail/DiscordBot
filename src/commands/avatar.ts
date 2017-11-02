import * as Discord from 'discord.js';
import * as config from '../config';

export default function(bot:Discord.Client) {
	bot.on('command avatar', (msg:Discord.Message, args:Array<string>)=>{
		

		if (msg.mentions.users.array()[0] == null) {
//			msg.channel.send("No user/s mentioned! Try **"+global.prefix+"avatar (user/s)**")
		} else {
			for (let i in msg.mentions.users.array()) {
				msg.channel.send(msg.mentions.users.array()[i].avatarURL);
			}
		}

/*

		const users = msg.mentions.users.array();
		if(users.length == 0) {
			msg.reply(`No users mentioned. Try \`${config.prefix}avatar @username\``);
		}
		for(const user of users) {
			msg.channel.send(user.avatarURL);
			//msg.channel.send(user.avatarURL());
		}*/
	});
};
