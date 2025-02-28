module.exports = {
    name: 'messageCreate',
    label: 'prefixEvent',
    async execute(message, client) {
        const prefix = client.config.Var.Prefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.prefixCommands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.log(error)
            await message.reply("There was an error while executing this command.")
        }
    
    },
  };
  