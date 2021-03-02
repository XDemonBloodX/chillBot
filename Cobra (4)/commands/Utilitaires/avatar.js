//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {


  const mentionned = message.mentions.users.first();

  if (mentionned) {
    var autheur = mentionned;
  } else {
    var autheur = message.author;
  }

  //image = image.replace("webp","png");
		let image = autheur.displayAvatarURL({format: 'png', dynamic: 'true', size: 2048});

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setImage(image)
    .setDescription(`Requête de ${message.author}`)
    .setColor("GREEN");

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.AVATAR;