const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs");
const categoryList = readdirSync("./commands");
const categoryHelp = require('../../util/categoryHelp.json');
const color = "RANDOM";

module.exports.run = (client, message, args) => {
message.delete({ timeout: 1000 });

if (!args.length) {
    let listCat=[];
    if(categoryList.length==Object.keys(categoryHelp).length ){
      listCat = Object.values(categoryHelp);
    }
    else {
      listCat = categoryList;
      console.log("Help : Json à mettre à jour")
    }
		
  const embed = new MessageEmbed()
    .setColor(color)
    .addField('Liste des commandes', ` ⁢⁢⁢⁢⁢\nUne liste de toutes les sous-catégories disponibles et leurs commandes\n ⁢⁢⁢⁢Pour plus d\'informations, tapez \`${client.config.PREFIX}help <commande_name>\`\n ⁢⁢⁢⁢⁢`)

  for (var i= 0; i < categoryList.length; i++)
    embed.addField(
      `${listCat[i]}`,
      `${client.commands.filter(cat => cat.help.category === categoryList[i].toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
	);

	return message.channel.send(embed);
 
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

  if (!command) return message.reply("Cette commande n'existe pas !")

    const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
    .setTitle(`\`${command.help.name}\``)
    .addField("Description", `${command.help.description}`)
    .addField("Utilisation", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name} `, true)
		.addField("Cooldown", `${command.help.cooldown}`, true)

  if (command.help.aliases.length > 0) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);

	message.channel.send(embed);
	};
};

module.exports.help = MESSAGES.COMMANDS.MISC.HELP;