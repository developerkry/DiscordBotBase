# Discord.JS Bot Base

This package is a fully built, and working [Discord.js](https://www.discord.js.org) Starter Bot for anyone looking to get started developing for the [Discord](https://discord.gg/) Community. Please note, this package assumes you have basic understanding of JavaScript and can read over the [Discord.js Documentation](https://discord.js.org/docs/packages/discord.js/main) to proceed on your own..

# Installation

**Clone The Repository With GIT**

Cloning with GIT assumes you already know how to open the terminal to the location you want the bot stored.

```bash
  git clone https://github.com/developerkry/DiscordBotBase
  cd DiscordBotBase
```
**Manual Download**

Click the Green "Code" button on the Top Right of the GitHub Page. Then Click "Download Zip".

Next, Extract the downloaded Zip Folder to wherever you would like your bot to stay.

### Opening The Console

To open the Bot Console, right click on the folder the bot is located, then hit `Open In Terminal`.

### Initiating The Bot

To Initiate the bot, you must run the following command:
```bash
npm init
```
Then follow the prompts ('Enter' leaves the default value). When you get to the Entry Point, enter `src/shard.js` (Recommended) for sharding or `src/index.js` to run without sharding. You may then continue.

### Installing Packages

To Manually install the packages, run:
```bash
npm i discord.js mongoose colors
```
This will install all the needed packages.
<br/>

# Configuration

The sensitive configuration is done through the initial setup. Any configuration afterwards will be in the config.json file.

### Getting Bot Token

To get the bots token, go to [Discord Developers](https://discord.com/developers), go to your applications on the left. Then either Create a New Application or go into another one.
<br/>
Then go to the Bot page. You can now hit Reset Token, then Copy. 
<br/>
This is the Token you enter. Remember, ***DO NOT*** share this token with ***ANYONE***.

### Getting MongoDB URL

To get the MongoDB URL, go to the [MongoDB Website](https://www.mongodb.com/cloud/atlas/register) and register, then follow the Onboarding Process. Stop when you get to the "Deploy Your Database" page. On this page, pick M0, and name your Cluster, then click Create.

Next you want to enter a username and password into the fields you see, remember the password, or copy it, we need it later. Click "Create User".

For easiest access to your Database, you want to add an IP Address entry. For access from anywhere (You Want This) put "0.0.0.0" and hit "Add Entry".

Now hit "Finish and Close" and "Go to Databases". When you can, click "Connect" on the cluster you just made. Pick "Drivers" as the way to connect to your cluster. Keep everything the same, and copy the Connection String which should look like:
<br/>

```bash
"mongodb+srv://username:<password>@test.ldltumv.mongodb.net/?retryWrites=true&w=majority"
```
Now replace "\<password>" with the password you made earlier for the cluster, the one you had to remember. This is now the final string that you put as your MongoDB URI

# Running The Bot

To Manually start the Bot, open Command Prompt and navigate to the folder that the package.json is located. Then run:
```bash
node .
```
This will start the bot. 
Keep in mind, you must have initiated the bot **and** installed the packages before starting the Bot or **IT WILL NOT WORK**.