const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('colors')

module.exports = (client) => {
  const clientId = client.sensitive.ID;
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    console.log('[ HANDLERS ]'.bold.blue + ' Started Loading ' + 'COMMANDS'.bold.blue)

    let count = 0;

    for (folder of commandFolders) {
      const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        
        if (command.active) {
          if (!command.prefix) {
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
            console.log('[ COMMANDS ]'.bold.yellow + ' Loaded Command:'.bold + ` ${command.data.name.toUpperCase()}`.bold.yellow);
            count++
          } else {
            client.prefixCommands.set(command.data.name, command);
            console.log('[ PREFIX ]'.bold.yellow + ' Loaded Prefix Command:'.bold + ` ${command.data.name.toUpperCase()}`.bold.yellow);
            count++
          }
        }
      }
    }
    console.log('[ HANDLERS ]'.bold.blue + ` ${count} ` + 'COMMANDS '.bold.blue + 'Loaded')

    const rest = new REST({
      version: '9'
    }).setToken(client.sensitive.Token);

    (async () => {
      try {
        console.log(" ");
        console.log('[ HANDLERS ]'.bold.blue + ' Started Reloading'.bold + ' (/) Application Commands'.bold.blue);

        await rest.put(
          Routes.applicationCommands(clientId), {
          body: client.commandArray
        },
        );

        console.log('[ HANDLERS ]'.bold.blue + ' Successfully Reloaded'.bold + ' (/) Application Commands'.bold.blue);
        console.log(" ");
      } catch (error) {
        console.error(error);
      }
    })();
  };
};
