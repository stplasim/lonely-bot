const env = require('dotenv');
const telegraf = require('telegraf');

// Setup env
env.config()

// Init telegraf
const bot = new telegraf(process.env.TELEGRAM_BOT);

// Handle mention
require('./events')(bot);

// Init commands
require('./commands')(bot);

// Init scheduler
require('./scheduler')(bot);

// Start bot
bot.launch()
  .then(() => console.log(`Bot started! - Version ${process.env.BOT_VERSION}`))
  .catch(e => console.error(`Starting bot failed: ${e}`));
