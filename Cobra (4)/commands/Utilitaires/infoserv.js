//Croux
const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const color = "YELLOW";

module.exports.run = (client, bot, message, args) => {


  const guild = message.guild;
  let raison = "Command : serverinfo";
  //message.guild.createInvite({ maxAge: 0, maxUses: 0 });

  const embed = new MessageEmbed()
    .setColor(color)
    .setThumbnail(guild.iconURL())
    .addField(`Plus d'informations à propos de : **${guild.name}** !`,
      `      • Nom : ${guild.name}
       • ID : ${guild.id}
       • Localisation : ${message.channel.guild.region}
       • OWNER : ${guild.owner.user.tag} (${guild.owner.id})
       • Créé le : ${moment(guild.createAt).format('DD/MM/YYYY')}
       • Rejoins le : ${moment(message.member.joinedAt).format("DD/MM/YYYY hh:mm")}
       • Membres : ${guild.memberCount -1} 
       • Bots : ${guild.members.filter(member => member.user.bot).size}
       • Salons textuels : ${guild.channels.cache.filter(ch => ch.type === "text").size}
       • Salons vocaux : ${guild.channels.cache.filter(ch => ch.type === "voice").size}
       • Rôles : ${guild.roles.cache.size}\n${message.channel.guild.roles.map(c => c.name).join(', ')}
       • Lien d'invitation : https://discord.gg/${invite.code}

      `
    );
  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.UTILITAIRES.INFOSERV