const { MESSAGES } = require("../../util/constants");
const { MessageEmbed } = require("discord.js")
const color = "RED";

module.exports.run = async (client, message, args) => {
  await message.delete({ timeout: 1000 });

  const embed = new MessageEmbed()
  .setColor(color)
  .setTitle("BOT DOWN ! ❌")
  .setDescription(`Down by ${message.author.username}\nFor reloading [clic](https://repl.it/@Crouxxx/NationsGlory-Blue) !`)
  .setTimestamp();

  await client.channels.cache.get(client.config.logChannel).send(embed);

  console.log("Le BOT a été éteint !")
  process.exit();
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.EXIT;