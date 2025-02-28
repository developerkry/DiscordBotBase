<div style="text-align: center;">
  <img src="https://i.imgur.com/CfJ6uff.png" width="100%" />
</div>

This package is a fully built, and working [Discord.js](https://www.discord.js.org) Starter Bot for anyone looking to get started developing for the [Discord](https://discord.gg/) Community. Please note, this package assumes you have basic understanding of JavaScript and can read over the [Discord.js Documentation](https://discord.js.org/docs/packages/discord.js/main) to proceed on your own.

---

<div style="text-align: center;">
  <img src="https://i.imgur.com/VSr4ZW7.png" width="100%" />
</div>

## Clone The Repository With GIT

```
git clone https://github.com/developerkry/DiscordBotBase
cd DiscordBotBase
```

## Manual Download

Click the Green "Code" button on the Top Right of the GitHub Page. Then Click "Download Zip".

Extract the folder wherever you want your bot stored.

---

# Opening The Console

Right-click the folder where the bot is located and hit `Open In Terminal`.

---

# Initiating The Bot

To initiate the bot, run:
```
npm init
```
Follow the prompts. When asked for the **Entry Point**, use:
- `src/shard.js` for sharding (recommended)
- `src/index.js` if you want to run without sharding.

---

# Installing Packages

```
npm i discord.js mongoose colors
```

---

<div style="text-align: center;">
  <img src="https://i.imgur.com/HJACY6O.png" width="100%" />
</div>

## Getting Bot Token

Go to [Discord Developers](https://discord.com/developers), open your application (or create one), and navigate to the **Bot** tab.  
Click **Reset Token** and **Copy**.  
This is the token you paste into `sensitive.json`.

**⚠️ NEVER share your token with anyone.**

---

## Getting MongoDB URL

Register at [MongoDB](https://www.mongodb.com/cloud/atlas/register), deploy a **free M0 cluster**, and create a **Database User**.  
Add an IP Access entry for `0.0.0.0/0` to allow access from anywhere.

In **Connect > Drivers**, copy the connection string:
```
mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
```
Replace `<password>` with your database user password, then put this full string into `sensitive.json`.

---

# Running The Bot

To start the bot:
```
node .
```

---

<div style="text-align: center;">
  <img src="https://i.imgur.com/Y9rFcjY.png" width="100%" />
</div>

# Command System Overview

This bot supports **two types of commands**:  
✅ Slash Commands (`/`)  
✅ Prefix Commands (like `!ping`)

---

# Slash Commands (Modern)

- Use `SlashCommandBuilder` from `@discordjs/builders`.
- Automatically registered to Discord every time the bot starts.
- Triggered by `interactionCreate` event.
- Receives `execute(interaction, client)`.

---

# Prefix Commands (Traditional)

- Also use `SlashCommandBuilder` for consistency.
- Defined as prefix commands by adding `prefix: true` to the command object.
- Triggered by `messageCreate` event.
- Receives `execute(message, client)` — no interaction object.

---

# Command Structure Example

All commands (slash or prefix) follow this structure:

```
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command"),
  active: true,    // Must be true to load the command
  prefix: true,    // Marks this as a prefix command
  async execute(message, client) {
    const reply = await message.reply({
      content: `**Self Destructing In...**
# 5`,
    });

    for (let i = 4; i >= 1; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await reply.edit(`**Self Destructing In...**
# ${i}`);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    await reply.edit(`# 💥 Boom 💥`);
  },
};
```

---

# Explanation

| Property       | Description |
|----------------|--------------|
| `data`         | SlashCommandBuilder object used for slash registration. |
| `active`       | Command must have this set to `true` to load. |
| `prefix`       | Set to `true` to make this work as a prefix command. |
| `execute()`    | Logic the command runs (message for prefix, interaction for slash). |

---

# How Commands Are Processed

| Command Type | Collection            | Trigger Event     | Execute Parameters |
|--------------|----------------------|-------------------|---------------------|
| Slash        | `client.commands`    | `interactionCreate` | `(interaction, client)` |
| Prefix       | `client.prefixCommands` | `messageCreate` | `(message, args, client)` |

---

# Prefix Command Handling

For prefix commands, the bot:
1. Listens for messages starting with the configured prefix (`!` by default).
2. Splits the message into:
   - `commandName`
   - `args[]`
3. Checks if a matching prefix command exists.
4. Runs its `execute()` function if found.

---

# Prefix Command Example Usage

```
User: !test
Bot: Self Destructing In...
```

---

# Slash Command Example Usage

```
User: /test
Bot: Self Destructing In...
```

---

# Summary

This bot base is designed for flexibility:  
✅ Full Slash Command Support.  
✅ Full Prefix Command Support.  
✅ Commands are unified in structure for easier development.  

You can develop one command and deploy it both ways if needed — ideal for gradual migration to slash commands.

---

# Notes

- Slash commands are automatically registered on bot restart.
- Prefix commands **do not require registration**; they just work when detected.

---

Need help? Check out:
- [Discord.js Docs](https://discord.js.org/docs/packages/discord.js/main)
- [MongoDB Docs](https://www.mongodb.com/docs/)
