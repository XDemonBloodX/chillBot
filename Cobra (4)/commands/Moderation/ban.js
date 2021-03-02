const { MESSAGES } = require("../../util/constants");
const { MessageEmbed} = require("discord.js");
const color = "RED";

module.exports.run = (client, message, args, settings) => {

  message.delete({ timeout: 1000 });

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${message.author} - Vous devez avoir la permission **\`BAN_MEMBERS\`** pour utiliser la commande .**\`ban\`**`);

  const user = message.mentions.users.first();
  const reason = args.splice(1).join(" ") || "Aucune raison spécifiée...";
  user ? message.guild.member(user).ban({ days: 7, reason: reason }) : message.channel.send("L'utiisateur n'existe pas !")

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`${user.username}\n(${user.id})`, user.avatarURL())
    .setDescription(`**Action :** \`BAN\`\n**Raison :** \`${reason}\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get(client.config.logChannel).send(embed);
};
module.exports.help = MESSAGES.COMMANDS.MODERATION.BAN;