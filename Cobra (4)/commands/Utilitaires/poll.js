//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require('discord.js');
const color = "RANDOM";

module.exports.run = async (client, message, args) => {


  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(args.join(" "))
    .addField("Répondre à la question ci-dessus à l'aide d'un de ces réactions:","🟩 - Pour (Oui)\n🟦 - Neutre \n🟥 -  Contre (non)")
    .setTimestamp()
    .setFooter("N'hésitez pas à envoyer un autre sondage");

  const poll = message.channel.send(embed);
  await poll.react("🟩");
  await poll.react("🟦");
  await poll.react("🟥");
};

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.POLL;