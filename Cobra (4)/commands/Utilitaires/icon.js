//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {

  const guild = client.guilds.cache.get(args[0]);

  if (guild) {
    var icon = guild.iconURL({format: 'png', dynamic: 'true', size: 2048})
  } else {
    var icon = message.guild.iconURL({format: 'png', dynamic: 'true', size: 2048})
  }

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setImage(icon)
    .setDescription(`Requête de ${message.author}`)
    .setColor("GREEN");

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.ICON;