const { MESSAGES } = require("../../util/constants");

exports.run = (client, message, args) => {

	message.channel.send("Croux développe cette commande... patience !")
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.RELOAD;