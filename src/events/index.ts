import { Telegraf } from "telegraf";

export default function (bot: Telegraf<any>): void {
    // Handle new user
    bot.on('new_chat_members', ctx => {
        ctx.reply(`Yay we have a new member. Please welcome ${ctx.from.username}`);
    })

    // Handle user left
    bot.on('left_chat_member', ctx => {
        ctx.reply(`It is sad that ${ctx.from.username} has left us`);
    })
}