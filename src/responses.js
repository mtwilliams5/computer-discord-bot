var lookup = require('./lookupFunctions');
var helper = require('./helperFunctions');

const alpha = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega"
];

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

// RP Responses
exports.generateAccessCode = function(bot, channelID, userID, user) {
  let a = helper.getRandomInt(0,(alpha.length - 1));

  let char = lookup.getCrewByUserId(userID);
  let name;
  if (char) {
    name = char.character.split(" ");
  } else {
    name = user.split(" ");
  }
  let lastName = name[(name.length - 1)];

  let numbers = [];
  let numOfNumbers = helper.getRandomInt(1,4);
  for (let i=0; i < numOfNumbers; i++) {
    numbers.push(helper.getRandomInt(0,9));
  }

  let accessCode = numbers;
  accessCode.push(alpha[a]);

  accessCode = helper.shuffle(accessCode);
  accessCode = accessCode.join('-');

  let res = lastName + '-' + accessCode;

  bot.sendMessage({
    to: channelID,
    message: res
  });
}

exports.generateImpossibleAccessCode = function(bot, channelID, userID, user) {
  let char = lookup.getCrewByUserId(userID);
  let name;
  if (char) {
    name = char.character.split(" ");
  } else {
    name = user.split(" ");
  }
  let lastName = name[(name.length - 1)];

  let numbers = [];
  let numOfNumbers = helper.getRandomInt(20,40);
  for (let i=0; i < numOfNumbers; i++) {
    numbers.push(helper.getRandomInt(0,9));
  }

  let alphas = [];
  let numOfAlphas = helper.getRandomInt(2,5);
  for (let i=0; i < numOfAlphas; i++) {
    alphas.push(alpha[helper.getRandomInt(0,(alpha.length - 1))]);
  }

  let accessCode = numbers.concat(alphas);

  accessCode = helper.shuffle(accessCode);
  accessCode = accessCode.join('-');

  let res = lastName + '-' + accessCode;

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
  res += "Computer generate access code - returns a standard-form access code, using the following pattern: lastName-greekLetter-0-0-0-0.";
  res += "Computer generate impossible access code - returns an extremely long access code, using 2-5 greek letters and 20-40 numbers.";

  bot.sendMessage({
    to: channelID,
    message: res
  });
}
