//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const color = "RED"

module.exports.run = async (client, message, args) => {


  if (args[0] === "ano" && message.author.id == "506118119216119810") {
		var mess = args.splice(2).join(' ');
		let user = message.mentions.users.first();
	  if (!user) return message.reply("Il faut mentionner un utilisateur !");
		if (!mess) return message.reply("Il faut préciser un message !");

		mp = new MessageEmbed()
			.setColor(color)
			.setTitle(`On vous a envoyé un MP :`)
			.setDescription(mess)
			.setTimestamp()

	user.send(mp);

	console.log(`
	Anonyme !
	Autheur : ${message.author.username}
	Mp à : ${user.username}
	Message : ${mess}`)

		embed = new MessageEmbed()
	  .setColor(color)
		.setAuthor("")
		.setTitle(`Message privé ANONYME\nà ${user.username}`)
		.setDescription(mess)
		.setTimestamp()

  client.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);   

	} else {
    var mess = args.splice(1).join(' ');
	
  let user = message.mentions.users.first();

  if (!user) return message.reply("Il faut mentionner un utilisateur !");
	if (!mess) return message.reply("Il faut préciser un message !");

		mp = new MessageEmbed()
	  .setColor(color)
		.setAuthor(`${message.author.username}\n(${message.author.id})`, message.author.displayAvatarURL())
		.setTitle(`Vous a envoyé un MP :`)
		.setDescription(mess)
		.setTimestamp()

	user.send(mp);

	console.log(`
	Autheur : ${message.author.username}
	Mp à : ${user.username}
	Message : ${mess}`)

	embed = new MessageEmbed()
	  .setColor(color)
		.setAuthor(message.author.username, message.author.displayAvatarURL())
		.setTitle(`Message privé à ${user.username}`)
		.setDescription(mess)
		.setTimestamp()

  client.channels.cache.find(channel => channel.name === '🔏┃logs').send(embed);   
	}; 
};

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.SEND;