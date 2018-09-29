const Discord = require('discord.io-gateway6');
const logger = require('winston');
const auth = require('./auth');
const response = require('./src/responses');
const reminders = require('./src/reminders');

const hour = 3600000;

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'verbose';

//Initialise Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function(evt) {//eslint-disable-line no-unused-vars
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('error', function(err) {
  logger.error(err.message);
});

bot.on('message', function (user, userID, channelID, message, evt) {//eslint-disable-line no-unused-vars
  let args, cmd;

  //Our bot needs to know if it will execute a command
  //It will listen for messages that will start with `!`
  if (message.substring(0,1) == '!') {
    args = message.substring(1).split(' ');
    cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !help
      case 'help':
        response.help(bot, channelID);
      break;
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
      // !tag
      case 'tag':
        {
          const tagTarget = args[0];
          response.tag(bot, channelID, tagTarget);
        }
      break;
    }
  }
  //We also want it to listen for messages that will start with `Computer `
  if (message.substring(0,9) == 'Computer ') {
    args = message.substring(9).split(' ');
    cmd = args[0];

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
        {
          const name = args.join(' ');
          switch(name) {
            case (name.match(/every(one|body)/i) || {}).input:
              response.listAllCrew(bot, channelID);
            break;
            default:
              response.getCrewMember(bot, channelID, name);
            break;
          }
        }
      break;

      // Text generators
      case 'generate':
        {
          const generator = args.join(' ');
          switch(generator) {
            case (generator.match(/impossible access code/i) || {}).input:
              response.generateImpossibleAccessCode(bot, channelID, userID, user);
            break;
            case (generator.match(/access code/i) || {}).input:
              response.generateAccessCode(bot, channelID, userID, user);
            break;
          }
        }
      break;
    }
  }
});

bot.on('disconnect', function() {
  logger.info('Bot disconnected.');
  bot.connect();
});

setInterval(() => { reminders.remindMonthlyMeeting(bot) }, hour * 8);
