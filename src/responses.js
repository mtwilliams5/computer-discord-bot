var lookup = require('./lookupFunctions');
var helper = require('./helperFunctions');

// Crew Lookup Responses
exports.listAllCrew = function(bot, channelID) {
  let res = lookup.getAllCrew(bot);
  bot.sendMessage({
    to: channelID,
    message: res
  });
}

exports.getCrewMember = function(bot, channelID, name) {
  arg = name.split(' ');
  let res = lookup.getCrewByName(bot, arg[1]);
  bot.sendMessage({
    to: channelID,
    message: res
  });
}

// Silly responses
exports.trout = function(bot, channelID, user) {
  bot.sendMessage({
    to: channelID,
    message: 'A trout materialises on the deck, jumps up and slaps ' + user + ' on the face before it dematerialises again.'
  });
}

exports.klingons = function(bot, channelID) {
  let verses = [
    "Star Trekkin' across the universe,\n"
      + "On the Starship Highlander under Captain Tim.\n"
      + "Star Trekkin' across the universe,\n"
      + "Only going forward 'cause we can't find reverse.",
    "There's Klingons on the starboard bow, starboard bow, starboard bow;\n"
      + "there's Klingons on the starboard bow, scrape 'em off, Tim!",
    "It's life, Tim, but not as we know it, not as we know it, not as we know it;\n"
      + "it's life, Tim, but not as we know it, not as we know it, Captain.",
    "It's worse than that, he's dead, Tim, dead, Tim, dead, Tim;\n"
      + "it's worse than tha, he's dead, Tim, dead, Tim, dead!",
    "Ah! We come in peace, shoot to kill, shoot to kill, shoot to kill;\n"
     + "we come in peace, shoot to kill, shoot to kill, men!",
    "Ye cannot change the laws of physics, laws of physics, laws of physics;\n"
     + "ye cannot change the laws of physics, laws of physics, Tim!"
  ];
  let v = helper.getRandomInt(0, 5);

  bot.sendMessage({
    to: channelID,
    message: verses[v]
  });
}

exports.random = function(bot, channelID) {
  bot.sendMessage({
    to: channelID,
    message: helper.getRandomInt(1, 10)
  });
}
