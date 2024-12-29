const { validateSensitiveData } = require('./Modules/ValidateSensitiveData');

(async () => {
    console.clear()
    await validateSensitiveData();

    const { ShardingManager } = require('discord.js');
    const sensitive = require('../sensitive.json');
    require("colors");

    const manager = new ShardingManager('./src/index.js', {
        token: sensitive.Token,
        totalShards: 'auto',
    });

    manager.on('shardCreate', (shard) => {
        shard.on('error', (error) => {
            console.log('[ SHARDS MANAGER ]'.bold.magenta + ` Shard ${shard.id} encountered an error: ${error.message}`.bold.red);
            console.log(' ');
        });
        shard.on('spawn', () => {
            console.log('[ SHARDS MANAGER ]'.bold.magenta + ` Shard ${shard.id} process spawned`.bold.green);
            console.log(' ');
        });
        shard.on('death', () => {
            console.log('[ SHARDS MANAGER ]'.bold.magenta + ` Shard ${shard.id} process exited`.bold.red);
            console.log(' ');
        });
        shard.on('disconnect', () => {
            console.log('[ SHARDS MANAGER ]'.bold.magenta + ` Shard ${shard.id} disconnected`.bold.yellow);
            console.log(' ');
        });
        shard.on('reconnecting', () => {
            console.log('[ SHARDS MANAGER ]'.bold.magenta + ` Shard ${shard.id} is reconnecting`.bold.blue);
            console.log(' ');
        });
    });

    manager.spawn();
})();
