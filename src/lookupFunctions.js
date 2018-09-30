const server = require('../data/server');
const crew = require('../data/members');

exports.getAllCrew = function(bot) {
  const members = bot.servers[server.id].members;
  let allCrew = [];
  for (const member in members) {
    if (members[member].roles.indexOf(server.roles.crew) > -1 && crew[member]) {
      const char = crew[member];
      const memberName = bot.servers[server.id].members[member].nick || bot.users[member].username;
      const listing = `${memberName}: ${char.rank} ${char.character}, ${char.position}`
      allCrew.push(listing);
    }
  }
  return allCrew.join('\n');
}

exports.getCrewByName = function(bot, name) {
  const members = bot.servers[server.id].members;
  const memberId = members.length >= 1 ? members.find(member => members[member].nick === name || bot.users[member].username === name) : undefined;
  if (memberId) {
    const char = crew[memberId];
    return char.active ?
      `${name} is ${char.rank} ${char.character}, ${char.position}`
      : `${name} is ${char.rank} ${char.character}, Former ${char.position}`;
  } else {
    return 'That information is not available.';
  }
}

exports.getCrewByUserId = function(bot, id) {
  return crew[id] || false;
}

const getFirstOfMonth = function() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
}

exports.getSecondSunday = function() {
  const date = getFirstOfMonth();
  if(date.getDay() === 0) {
    return date.setDate(date.getDate + 7);
  } else {
    const daysToSecondSunday = 14 - date.getDay();
    return date.setDate(date.getDate + daysToSecondSunday);
  }
}
