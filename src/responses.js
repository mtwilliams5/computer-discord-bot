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
  let arg = name.split(' ');
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

// Utility responses
exports.random = function(bot, channelID) {
  bot.sendMessage({
    to: channelID,
    message: helper.getRandomInt(1, 10)
  });
}

exports.help = function(bot, channelID) {
  let res = "There are two types of commands that can be given to this bot: standard bot-style commands beginning with !, and more natural-language commands starting with the word Computer.\n";
  res += "Below are the commands currently available in this bot:\n\n";

  res += "!help - displays this help text.\n"
  res += "!ping - returns the text 'Pong!'\n";
  res += "!members - returns a list of members of the server and the details of their corresponding character on the sim.\n";
  res += "!trout - slaps the user with a trout.\n";
  res += "!klingons - returns a random verse from the song 'Star Trekkin', with the words adjusted to match the USS Highlander.\n";
  res += "!random - returns a random number between 1 and 10.\n\n";

  res += "Computer ping - returns the text 'Pong!'\n";
  res += "Computer who is everyone - returns a list of members of the sever and the details of their corresponding character on the sim. See also !members\n";
  res += "Computer who is <name> - returns the character details of the named user, providing that user is a known member of the sim.";

  bot.sendMessage({
    to: channelID,
    message: res
  });
}
