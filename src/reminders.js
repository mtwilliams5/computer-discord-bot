const lookup = require('./lookupFunctions');
const channels = require('../data/server').channelIDs;

exports.remindMonthlyMeeting = function(bot, channelID = channels.commandstaff) {
  let lastReminder;
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);

  const isSecondSunday = tomorrow === lookup.getSecondSunday();
  const hasBeenReminded = today.getMonth() === lastReminder.getMonth();

  if (isSecondSunday && !hasBeenReminded) {
    bot.sendMessage({
      to: channelID,
      message: 'Reminder: Pegasus Fleet Monthly Meeting starts tomorrow at 8PM GMT'
    });
    lastReminder = new Date();
  }
}
