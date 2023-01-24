const { Client, GatewayIntentBits: gib, Collection, REST, Routes } = require("discord.js");
const { LoadCommands, LoadEvents, LoadSelectMenus } = require("../Loader");

class Bot extends Client {
  /**
   * @param { import ('discord.js').ClientOptions } props;
   */

  constructor(props) {
    if (!props) props = {};

    props.intents = [
      gib.Guilds,
      gib.GuildEmojisAndStickers,
      gib.DirectMessages,
      gib.GuildBans,
      gib.MessageContent,
      gib.GuildInvites,
      gib.GuildWebhooks,
      gib.GuildMessages,
      gib.GuildMembers,
      gib.GuildIntegrations,
      gib.GuildVoiceStates,
      gib.GuildMessageReactions,
    ];
    super(props)
  };

  _init() {
        this.config  = require('../Configs/config');

        if (!this.config.token) return console.error(`[ERROR] : No Token provided in Config file.`);

        this.commands = new Collection();
        
        this.slashCommands = [];

        this.selectMenus = new Collection();
        
        LoadCommands(this);
        LoadEvents(this);
        LoadSelectMenus(this);

        const rest = new REST({ version: '10' }).setToken(this.config.token);

        (async () => {
          try {
            console.log(`Started refreshing ${this.slashCommands.length} application (/) commands.`);

            const data = await rest.put(
              Routes.applicationCommands(this.config.clientId),
              { body: this.slashCommands },
          );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
          } catch (error) {
            console.error(error);
          }
        })();

        this.login(this.config.token).catch(() => {
          console.error(`[ERROR] : Invalid Token provided.`)
        });

  };
}

module.exports.Bot = Bot; 
