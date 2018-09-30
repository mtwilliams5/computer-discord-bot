const server = require('../data/server');
const crew = require('../data/members');

exports.getAllCrew = function(bot) {
  let members = bot.servers[server.id].members;
  let res = '';
  for (let m in members) {
    if ((members[m].roles).indexOf(server.roles.crew) > -1) {
      res += bot.servers[server.id].members[m].nick || bot.users[m].username;
      let char = crew[m];
      res += ': ' + char.rank + ' ' + char.character;
      res += char.active ? ', ' : ', Former ';
      res += char.position + '\n';
    }
  }
  return res.substring(0, res.length-1);
}

exports.getCrewByName = function(bot, n) {
  let members = bot.servers[server.id].members;
  let res = {};
  for (let m in members) {
    if (members[m].nick == n || bot.users[m].username == n) {
      res.id = m;
    }
  }
  if (res.id) {
    let char = crew[res.id];
    res.msg = n + ' is ' + char.rank + ' ' + char.character;
    res.msg += char.active ? ', ' : ', Former ';
    res.msg += char.position;
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

const getFirstOfMonth = function() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth();
  return new Date(y, m, 1);
}

exports.getSecondSunday = function() {
  const d = getFirstOfMonth();
  if(d.getDay() == 0) {
    return d.setDate(d.getDate + 7);
  } else {
    const daysToSecondSunday = 14 - d.getDay();
    return d.setDate(d.getDate + daysToSecondSunday);
  }
}
