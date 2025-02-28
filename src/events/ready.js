require("colors");
const Discord = require('discord.js')

const MongooseConnection = require('../Modules/MongooseConnection')
const Status = require('../Modules/ClientStatus')

module.exports = {
	name: "ready",
	label: "clientReady",
	once: true,
	async execute(client) {

		await MongooseConnection.init(client.sensitive.MongoDB.URI)

		await Status.set(client, 'dnd', Discord.ActivityType.Competing, 'The Olympics', 'Currently in FIRST PLACE')

		console.log(
			"[ CLIENT ]".bold.cyan +
				" Logged In As:".bold +
				` ${client.user.username}`.bold.cyan
		);
		// console.log(" ");

		function heartbeat() {
			setTimeout(() => {
				heartbeat()
			}, 5000);
		}

		heartbeat()

		setTimeout(() => {
			console.log(' ')
			console.log('#######################################'.bold.red);
			console.log('# Thank You For Using Kry\'s Bot Base! #'.bold.red);
			console.log('#   https://github.com/developerkry   #'.bold.red);
			console.log('#######################################'.bold.red);
		}, 3500);
	},
};
