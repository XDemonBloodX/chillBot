const { MESSAGES } = require("../../util/constants");

exports.run = (client, message, args) => {

	message.channel.send(
		message.guild.emojis.cache
			.map(e => `${e} \`<${e.animated ? 'a' : ''}:${e.name}:${e.id}>\``)
			.join("\n"), 
		{ split: { maxLength: 2000, char: '\n' }}
	);
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.EMOJIS;