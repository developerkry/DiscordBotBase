const { ActivityType } = require('discord.js')
require("colors");

async function set(client, status, type, name, state) {
  const cStatus = await client.user.setPresence({
    status: status || "dnd", // 'dnd', 'idle', 'invisible', 'online'
    activities: [
      {
        type: type || ActivityType.Custom, // ActivityType.????
        name: name || "customStatus", // Not Important for Custom ActivityType
        state: state || `⚙️ Wow! A Custom Status!!`, // This is only used for Custom ActivityType
      },
    ],
  });

  if (cStatus) {
    console.log("[ CLIENT ]".bold.cyan + " Activated Status".bold);
    console.log(" ");
  } else {
    return;
  }
}

module.exports = {
  set,
};
