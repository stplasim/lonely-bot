import { config } from "dotenv";
import { Telegraf } from "telegraf";
import "./util/arrayUtility";

// Import components
import commandHandler from "./commands";
import mentionHandler from "./events";
import {logError, logInfo} from "./util/logger";
import { scheduleMemes } from "./scheduler";

// Setup env
config();

// Init net bot
// @ts-ignore
const bot = new Telegraf(process.env.TELEGRAM_BOT);

// Handle mention
mentionHandler(bot);

// Handle commands
commandHandler(bot);

// Init scheduler
//scheduleMemes(bot);

// Start bot
bot.launch()
    .then(() => logInfo(`Bot started! - Version ${process.env.BOT_VERSION}`))
    .catch(e => logError("Starting bot failed", e));