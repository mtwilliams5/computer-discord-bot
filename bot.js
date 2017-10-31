var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth');
var server = require('./server');
var response = require('./responses');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

//Initialise Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function(evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  //Our bot needs to know if it will execute a command
  //It will listen for messages that will start with `!`
  if (message.substring(0,1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
      break;
      // !members
      case 'members':
        response.listAllCrew(bot, channelID);
      break;
      // !trout
      case 'trout':
        response.trout(bot, channelID, user);
      break;
      // !klingons
      case 'klingons':
        response.klingons(bot, channelID);
      break;
      // !random
      case 'random':
        response.random(bot, channelID);
      break;
    }
  }
  //We also want it to listen for messages that will start with `Computer `
  if (message.substring(0,9) == 'Computer ') {
    var args = message.substring(9).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // Computer ping
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
      break;

      // Crew roster checkup
      case 'who':
        var name = args.join(' ');
        switch(name) {
          case (name.match(/every(one|body)/i) || {}).input:
            response.listAllCrew(bot, channelID);
          break;
          default:
            response.getCrewMember(bot, channelID, name);
          break;
        }
      break;
    }
  }
});
