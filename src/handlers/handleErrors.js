const { EmbedBuilder } = require("discord.js")
require('colors')

module.exports = async (client) => {

  const Embed = new EmbedBuilder()
    .setColor(client.config.Colors.Error)
    .setTimestamp()
    .setFooter({ text: "Anti crash" })
    .setTitle(client.config.Emojis.Error + " | Error Encountered")

  process.on("unhandledRejection", (reason) => {

    console.log(`[ ERROR ]`.red + ` ${reason}`)

    const Channel = client.channels.cache.get(client.config.Channels.Error)
    if (!Channel) return

    Channel.send({
      embeds: [
        Embed
          .setDescription("**Unhandled Rejection/Catch:\n\n** " + reason + " ")
      ]
    })
  })

  process.on("uncaughtException", (err, origin) => {

    console.log(`[ ERROR ]`.red + ` ${err}`)

    const Channel = client.channels.cache.get(client.config.Channels.Error)
    if (!Channel) return

    Channel.send({
      embeds: [
        Embed
          .setDescription("**Uncaught Exception/Catch (monitor):\n\n** " + err + "\n\n" + origin.toString() + " ")
      ]
    })
  })

}
