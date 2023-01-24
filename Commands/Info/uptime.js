const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    help: {
        name: 'uptime',
        aliases: ['uptime'],
        description: 'Shows the Bot\'s uptime',
        category: "Info"
    },
    data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription("Shows the Bot\'s uptime"),
	async execute(interaction, client) {
		let uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        let bicon = client.user.displayAvatarURL()
        const botembed = new EmbedBuilder()
            .setTitle(config.botName)
            .setColor(config.embedcolor)
            .setDescription(`**${config.botName} has been active for** \`${uptime}\`. \n **The ping is currently** \`${client.ws.ping} ms\`.**`)
            .setTimestamp()
            .setFooter({text: config.botName, iconURL: config.footerImg})
            .setThumbnail(bicon);
        await interaction.reply({
            embeds: [botembed],
        });

	}
}