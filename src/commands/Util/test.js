const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    active: true,
  async execute(interaction, client) {
    await interaction.reply({
      content: `**Self Destructing In...**\n# 5`,
      ephemeral: true,
    });

    setTimeout(async () => {
      await interaction.editReply({ 
        content: `**Self Destructing In...**\n# 4`
      })
    }, 1000);
    
    setTimeout(async () => {
      await interaction.editReply({ 
        content: `**Self Destructing In...**\n# 3`
      })
    }, 2000);
  
    setTimeout(async () => {
      await interaction.editReply({ 
        content: `**Self Destructing In...**\n# 2`
      })
    }, 3000);
  
    setTimeout(async () => {
      await interaction.editReply({ 
        content: `**Self Destructing In...**\n# 1`
      })
    }, 4000);
  
    setTimeout(async () => {
      await interaction.editReply({ 
        content: `# 💥 Boom 💥`
      })
    }, 5000);
  },
};
