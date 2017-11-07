var server = require('../data/server');
var crew = require('../data/members');

exports.getAllCrew = function(bot) {
  let members = bot.servers[server.id].members;
  let res = '';
  for (var m in members) {
    if ((members[m].roles).indexOf(server.roles.crew) > -1) {
      res += bot.servers[server.id].members[m].nick || bot.users[m].username;
      let char = crew[m];
      res += ': ' + char.rank + ' ' + char.character + ', ' + char.position + '\n';
    }
  }
  return res.substring(0, res.length-1);
}

exports.getCrewByName = function(bot, n) {
  let members = bot.servers[server.id].members;
  let res = {};
  for (var m in members) {
    if (members[m].nick == n || bot.users[m].username == n) {
      res.id = m;
    }
  }
  if (res.id) {
    let char = crew[res.id];
    res.msg = n + ' is ' + char.rank + ' ' + char.character + ', ' + char.position;
  } else {
    res.msg = 'That information is not available.';
  }
  return res.msg;
}

exports.getCrewByUserId = function(bot, id) {
  if (crew[id]) {
    return crew[id];
  } else {
    return false;
  }
}
