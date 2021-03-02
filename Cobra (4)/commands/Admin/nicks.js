const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args, member) => {
	message.delete({ timeout: 1000 });
	
	message.guild.members.cache.forEach(member => {
		if (args) {
			member.setNickname(args.join(" "));
		} else {
		member.setNickname("");
		}
	})
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.NICKS;