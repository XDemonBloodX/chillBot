//Kolowy
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../util/functions.js");

module.exports.run = async (client, message, args) => {

  const member = getMember(message, args);
  const user = member

  const joined = formatDate(member.joinedAt);
  const roles = member.roles.cache.map(roles => `\`${roles.name}\``).join(', ') || 'none';

  const created = formatDate(member.user.createdAt);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle(`Informations a propos de ${user.tag}`, message.guild.iconURL)

    .setFooter(member.displayName, member.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

    .addField('Member information:', 
    `** Nom:** ${member.displayName}
    **➔ A rejoint à:** ${joined}
    **➔ Roles:** ${roles} 
    ** **
    ** **`, false)

    .addField('User information:', 
    `** ID:** ${member.user.id}
    **➔ Username**: ${member.user.username}
    **➔ Tag**: ${member.user.tag}
    **➔ Crée le**: ${created}
    **➔ Statut**: ${user.presence.status}
    ** **
    ** **`, false)
    
    .setTimestamp()

    if (member.user.presence.game) 
      embed.addField('Joue à', `**> Name:** ${user.presence.game.name}`);
    if (member.user.presence.activities)
      embed.addField('Activité', `**> Name:** ${user.presence.activities[0].state}`)

    message.channel.send(embed);

    
    
    //console.log(user.presence.activities)
    //console.log(user.presence.activities[0])

    
}

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.USERINFO;