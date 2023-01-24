const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
    help: {
        name: 'invite',
        aliases: ['inv'],
        description: 'Link for Bot\'s Invite',
        category: "Info"
    },
    data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription("Link for Bot\'s Invite"),
	async execute(interaction, client) {
		const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`**${config.botName} Bot Project** \n\n**👋 Hey!\n Do you want Invite me? [Click Here](https://discord.com/api/oauth2/authorize?client_id=1020711551616954438&permissions=8&scope=bot) to Invite me!\nThanks for supporting me.** ❤️`)
            // .addFields({name: "Support Link: ", value: `**[Click Here!]()**`, inline: true})
            // .addFields({name: "Vote Link:", value: `**[Click Here!]()**`, inline: true})
            .setTimestamp()
            .setFooter({text: config.botName, iconURL: config.footerImg})
            .setColor(config.embedcolor);
        await interaction.reply({
            embeds: [embed],
        });

	}
}