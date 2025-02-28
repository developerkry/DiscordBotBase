require('colors')

module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {
        console.log('[ HANDLERS ]'.bold.blue + ' Started Loading ' + 'EVENTS'.bold.blue)

        let count = 0;

        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
                console.log('[ EVENTS ]'.bold.yellow + ' Loaded Event:'.bold + ` ${event.label.toUpperCase()}`.bold.yellow);
                count++
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
                console.log('[ EVENTS ]'.bold.yellow + ' Loaded Event:'.bold + ` ${event.label.toUpperCase()}`.bold.yellow);
                count++
            }
        }
        console.log('[ HANDLERS ]'.bold.blue + ` ${count} ` + 'EVENTS '.bold.blue + 'Loaded')
        console.log(" ")
    };
}
