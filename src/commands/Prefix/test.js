const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command"),
  active: true,
  prefix: true,
  async execute(message, client) {
    const reply = await message.reply({
      content: `**Self Destructing In...**\n# 5`,
    });

    for (let i = 4; i >= 1; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await reply.edit(`**Self Destructing In...**\n# ${i}`)
    }
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    await reply.edit(`# 💥 Boom 💥`)
  },
};
