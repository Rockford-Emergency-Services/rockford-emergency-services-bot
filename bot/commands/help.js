const Discord = require("discord.js");
const config = require('../config.json');

var cmdInfo = {
	"ban": {
		"name": "ban",
		"desc": "This is the ban command",
		"color": "0x8c0014",
		"thumbnail": "https://i.imgur.com/ybFB9Tq.png",
		"paramDesc": [
			{"desc": "This is the user you are issuing the punishment to. For example, @Rockford Emergency Services."},
			{"desc": "This is the reason as to why the targeted user it being punished. For example, spamming the Discord."},
		],
		"paramTitle": [
			{"title": "-> @username"},
			{"title": "-> Reason"}
		]
	},

	"kick": {
		"name": "kick",
		"desc": "This is the kick command",
		"color": "0x8c0014",
		"thumbnail": "https://i.imgur.com/uqvwhCe.png",
		"paramDesc": [
			{"desc": "This is the user you are issuing the punishment to. For example, @Rockford Emergency Services."},
			{"desc": "This is the reason as to why the targeted user it being punished. For example, spamming the Discord."}
		],
		"paramTitle": [
			{"title": "-> @username"},
			{"title": "-> Reason"}
		]
	},
	
	"purge": {
		"name": "purge",
		"desc": "This is the purge command",
		"color": "0x8c0014",
		"thumbnail": "https://i.imgur.com/jk4JbDM.png",
		"paramDesc": [
			{"desc": "This is the amount of messages you want to delete, the minimum is 2 and the maximum is 100."}
		],
		"paramTitle": [
			{"title": "-> Amount"}
		]
	},

	"say": {
		"name": "say",
		"desc": "This is the say command",
		"color": "0x009935",
		"thumbnail": "https://i.imgur.com/nX6Owzx.png",
		"paramDesc": [
			{"desc": "This is the text that you want the bot to repeat."}
		],
		"paramTitle": [
			{"title": "-> Text"}
		]
	},

	"reload": {
		"name": "reload",
		"desc": "This is the reload command",
		"color": "0x2d00a3",
		"thumbnail": "https://i.imgur.com/HFS7VNu.png",
		"paramDesc": [
			{"desc": "This is the command's unique identifier which will specify the cache you want to delete."}
		],
		"paramTitle": [
			{"title": "cmdName"}
		],
	}
};

module.exports.run = async (client, message, args) => {
	
	let generateMsg = await message.channel.send("Fetching all available commands...");

	if(!args[0]) {
		const allEmbed = new Discord.RichEmbed()
			.setTitle("This is a list of commands for the Rockford Emergency Services bot.")
			.setDescription("You can use command arguments to display certain command information, or certain categories.")
			.setColor(0x00AE86)
			.setTimestamp()
			.setThumbnail("https://i.imgur.com/OJvey5s.png")
			.setFooter("Any bugs should be reported to the bot developer at their earliest convenience.")

			.addBlankField(true)
			.addField(`-> ${config.prefix}help`, "This command shows you all available commands that you can use.\n")
			.addField(`-> ${config.prefix}ping`, "This command shows your ping to the guild and the APIs latency.\n")
			.addField(`-> ${config.prefix}version`, "This command is strictly for the bot developer and can only be used by said developer.")
			.addField(`-> ${config.prefix}reload`, "This command is only available to Discord Administrators, it refreshes a command's cache upon next use.")
			.addField(`-> ${config.prefix}say`, "This command repeats whatever you say for the arguments.")
			.addField(`-> ${config.prefix}kick`, "This command will kick a user from the guild for the specified reason of the Administrator.")
			.addField(`-> ${config.prefix}ban`, "This command will ban a user from the guild for the specified reason of the Administrator.")
			.addField(`-> ${config.prefix}purge`, "This command allows the Administering person to delete a certain amount of messages in bulk.")
			.addBlankField(true)

  		message.channel.send(allEmbed);
  	} else {
  		var commands = ["purge", "kick", "ban", "reload", "say"];
  		var cmdIncludes = commands.includes(args[0]);

  		if(!cmdIncludes) {
  		 	message.reply("please enter a valid command.");
  		} else {
			var paramLength = Object.keys(cmdInfo[args[0]].paramTitle).length;
  			const Embed = new Discord.RichEmbed()
  		 		.setTitle(`This is an extended help menu for the ${args[0]} command.`)
  		 		.setDescription(cmdInfo[args[0]].desc)
  		 		.setColor(cmdInfo[args[0]].color)
  		 		.setThumbnail(cmdInfo[args[0]].thumbnail)
  		 		.addBlankField(true)

  		 		for(i = 0; i < paramLength; i++) {
  		 			Embed.addField(cmdInfo[args[0]].paramTitle[i].title, cmdInfo[args[0]].paramDesc[i].desc)
  		 		}

			message.channel.send({embed: Embed});
  	 	}
  	}

	console.log(`${message.createdTimestamp} - ${message.author.tag} said ?help ${args[0]}.`);
	generateMsg.delete();
}

module.exports.help = {
	name: "help"
}
