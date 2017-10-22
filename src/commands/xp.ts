import * as Discord from 'discord.js';
import helper from '../helper';

const DB = helper.getDB('xp');
let XP = DB.getCollection('xp') || DB.addCollection("xp", {
	unique: ['id']
});

function updateXP(msg: Discord.Message) {
	const id = msg.author.id;

	let record = XP.by('id', id);
	if(!record) {
		record = XP.insert({
			'id':id,
			'xp':0,
			'level': 1,
			'nextLevel': 50
		});
	}

	record['xp'] += 1;

	if(record['xp'] >= record['nextLevel']) {
		// Level up!
		record['level'] ++;
		record['nextLevel'] += Math.min(
			Math.floor(50 * Math.pow(record['level'], 1.16)),
			1000
		);
		msg.reply("Level up!")
	}

	XP.update(record);
}

export default function(bot:Discord.Client) {
	bot.on('userMessage', (msg:Discord.Message)=>{
		updateXP(msg);
	});

	bot.on('command xp', (msg:Discord.Message, args:Array<string>)=>{
		const users = msg.mentions.users.array();
		if(users.length == 0)
			users.unshift(msg.author);
		
		const idLookup = XP.by('id');
		var out = "";
		for(const user of users) {
			var record = idLookup(user.id);
			if(record) 
				out += `\n${user.username}: ${record['xp']}`;
		}
		if(out)
			msg.reply("```" + out+"```");
	});
};