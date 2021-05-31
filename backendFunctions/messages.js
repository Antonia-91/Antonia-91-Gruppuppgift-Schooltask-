const moment = require('moment');
// --- Display the time of sent message in the chat --- //
function formatMessage(player, msg) {
  return {
    player,
    msg,
    time: moment().format('h:mm a'),
  };
}

module.exports = formatMessage;
