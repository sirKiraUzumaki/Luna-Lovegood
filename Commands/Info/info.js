const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Configs/config');

module.exports = {
    help: {
        name: 'info',
        aliases: ['info'],
        description: 'Shows the stats of the Bot',
        category:"Info"
    },
    data : new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows the stats of the Bot'),
    async execute(interaction, client) {
        const mapping = {
            " ": "  ",
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":five:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "!": "!",
            "?": "?",
            "#": "#",
            "*": "*"
        };

        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
        });
        let guilds;
        let channels;
        let users;
        setTimeout(() => {
            guilds =
                `${client.guilds.cache.size}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
            channels =
                `${client.channels.cache.size}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
            let sayy = 0;
            client.guilds.cache.forEach(x => {
                sayy += x.memberCount
            });
            users =
                `${sayy}`
                    .split("")
                    .map(c => mapping[c] || c)
                    .join("")
        }, 200)

        setTimeout(async () => {
            const embed = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1023475257580990485/1059910399358676992/HD-wallpaper-deathly-hallows-logo-green-agd-vector-pattern-abstract-harry-potter-deathly-hallows-fantastic-beasts.jpg")
                .setThumbnail(client.user.avatarURL())
                .setDescription("**Karma Bot Project.**" + "\n\n **Number of servers serviced :** " + guilds +
                    "\n  **Number of channels served : ** " + channels +
                    "\n  **Number of users served : ** " + users +
                    "\n\n **Developer:** \n <@951401829470732299>")
                .addFields({name:"Invite Link: ",value:`**[Add to server!](https://discord.com/api/oauth2/authorize?client_id=1020711551616954438&permissions=8&scope=bot)**`,inline:true})
                .setTimestamp()
                .setFooter({text: config.botName, iconURL: config.footerImg})
                .setColor(config.embedcolor);
            await interaction.reply({
                embeds: [embed],
            });
        }, 500)
    }
}