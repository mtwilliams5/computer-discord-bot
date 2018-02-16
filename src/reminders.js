const lookup = require('./lookupFunctions');
import channelIDs from '../data/server';

exports.remindMonthlyMeeting = function(bot, channelID = channelIDs.commandstaff) {
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
