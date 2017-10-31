# Computer Discord Bot
The Computer bot is built for use of the USS Highlander RPG on Discord.
https://highlander.pegasusfleet.net

## Installation
```
git clone git@github.com:mtwilliams5/computer-discord-bot.git
cd computer-discord-bot
npm i
npm i -g gulp-cli
```

### Configuration
Create a file in the project root called `auth.json` with the following structure:
```
{
  "token": "<discord_bot_token>"
}
```
Follow the guide [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) to generate your token.


Create a data directory in the project root. Add a file called `server.json` with the following structure:
```
{
  "id": "<discord_server_id>",
  "roles": {
    "crew": "<id_for_crew_role_group>"
  }
}
```

Then create another file within the data directory called `members.json`, with the following structure:
```
{
  "<member_id>" : {
    "character": "<Character Name>",
    "rank": "<Character Rank>",
    "position": "<Character Position>"
  }
}
```

### Running the Bot
To run the bot in development mode, just type `gulp` in the command line. The bot will watch for file changes and restart on every change.

To run the bot without the restart feature, just run `node bot.js`
